using System.Net;
using DestinationBucketListBackend.Model;
using DestinationBucketListBackend.Settings;
using DestinationBucketListBackend.Utilities.Interfaces;
using Microsoft.Extensions.Options;

namespace DestinationBucketListBackend.Middlewares
{
    public class AuthorizeMiddleware
    {
        private readonly RequestDelegate _next;

        private readonly List<string> _middlewareFor = new()
        {
            "mainpage"
        };

        public AuthorizeMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task InvokeAsync(
            HttpContext httpContext,
            IJwtUtilities jwtUtilities,
            ICookieUtilities cookieUtilities,
            IOptions<AppSettings> appSettings)
        {
            char delimitator = '/';
            var path = httpContext.Request.Path.Value?.Split(delimitator)
                .Where(s => String.IsNullOrWhiteSpace(s) == false).ToList();

            if (path is null)
            {
                httpContext.Response.StatusCode = (int)StatusCodes.Status403Forbidden;
                await httpContext.Response.WriteAsync("Forbidden");
            }

            if (path.Count > 0 && _middlewareFor.Contains(path[path.Count - 1]))
            {
                var accessToken = httpContext.Request.Cookies["accessToken"];
                var refreshToken = httpContext.Request.Cookies["refreshToken"];

                if (accessToken is null || refreshToken is null)
                {
                    httpContext.Response.StatusCode = (int)HttpStatusCode.Forbidden;
                    await httpContext.Response.WriteAsync("Forbidden");
                    return;
                }

                Guid? userId = jwtUtilities.ValidateJwtToken(accessToken);
                Guid? isRefreshTokenValid = jwtUtilities.ValidateJwtToken(refreshToken);

                if (isRefreshTokenValid is null)
                {
                    httpContext.Response.StatusCode = (int)HttpStatusCode.Forbidden;
                    await httpContext.Response.WriteAsync("Forbidden");
                    return;
                }
                
                var userIdStoredInToken = Guid.Parse(jwtUtilities.GetFieldFromToken(accessToken, "Id"));
                var accessTokenIssuedDate = jwtUtilities.GetIssuedDate(accessToken);
            
                if (userId is null)
                {
                    string newAccessToken = jwtUtilities.GenerateJwtToken(new User { Id = userIdStoredInToken }, appSettings.Value.AccessTokenTimeToLive);
                    cookieUtilities.setCookiePrivate("accessToken", newAccessToken, httpContext, appSettings.Value.AccessTokenTimeToLive);
                }
            }
            await _next(httpContext);
        }
    }

    public static class AuthorizeMiddlewareExtensions
    {
        public static IApplicationBuilder UseAuthorizeMiddleware(this IApplicationBuilder builder)
        {
            return builder.UseMiddleware<AuthorizeMiddleware>();
        }
    }
}