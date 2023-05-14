using DestinationBucketListBackend.Enums;
using DestinationBucketListBackend.Exceptions;
using DestinationBucketListBackend.Repository.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Authorization.Infrastructure;

namespace DestinationBucketListBackend.Identity;

public class RolesInDbAuthorizationHandler : AuthorizationHandler<RolesAuthorizationRequirement>, IAuthorizationHandler
{
    private readonly IUserRepository _userRepository;
    private readonly IHttpContextAccessor _httpContextAccessor;

    public RolesInDbAuthorizationHandler(IUserRepository userRepository, IHttpContextAccessor httpContextAccessor)
    {
        _userRepository = userRepository;
        _httpContextAccessor = httpContextAccessor;
    }

    protected override async Task HandleRequirementAsync(AuthorizationHandlerContext context,
        RolesAuthorizationRequirement requirement)
    {
        if (context.User is null || !context.User.Identity.IsAuthenticated)
        {
            context.Fail();
            return;
        }

        var isAuthorized = false;

        if (requirement.AllowedRoles is null || requirement.AllowedRoles.Any() == false)
        {
            isAuthorized = true;
        }
        else
        {
            try
            {
                var userId = Guid.Parse(context.User.Claims.FirstOrDefault(c => c.Type == "Id").Value);
                var user = await _userRepository.GetUserByIdAsync(userId);
                
                if (requirement.AllowedRoles.Any(x => x == Enum.GetName(typeof(RolesEnum), user.Role)))
                {
                    _httpContextAccessor.HttpContext.User = context.User;
                    isAuthorized = true;
                }
            }
            catch (Exception exception) when (exception is RepositoryException ||
                                              exception is FormatException)
            {
                context.Fail();
            }
        }

        if (isAuthorized)
        {
            context.Succeed(requirement);
        }
        else
        {
            context.Fail();
        }
    }
}