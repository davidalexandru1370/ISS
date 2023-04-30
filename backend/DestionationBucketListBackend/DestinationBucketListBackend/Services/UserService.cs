using DestinationBucketListBackend.DbContext;
using DestinationBucketListBackend.Model;
using DestinationBucketListBackend.Services.Interfaces;
using DestinationBucketListBackend.Settings;
using DestinationBucketListBackend.Utilities.Interfaces;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;

namespace DestinationBucketListBackend.Services;

public class UserService : IUserService
{
    private readonly DestinationBucketDbContext _dataContext;
    private readonly IJwtUtilities _jwtUtilities;
    private readonly IOptions<AppSettings> _appSettings;

    public UserService(
        DestinationBucketDbContext dataContext,
        IJwtUtilities jwtUtilities,
        IOptions<AppSettings> appSettings)
    {
        _dataContext = dataContext;
        _jwtUtilities = jwtUtilities;
        _appSettings = appSettings;
    }

    public async Task<AuthResult> Login(User user)
    {
        var _user = await _dataContext.Users.SingleOrDefaultAsync(x => x.Email == user.Email);
        AuthResult badResult = new AuthResult
        {
            Result = false,
            AccessToken = String.Empty,
            RefreshToken = String.Empty,
        };

        if (_user == null || BCrypt.Net.BCrypt.Verify(user.Password, _user.Password) == false)
        {
            badResult.Error = "Email address or password is wrong!";
            return badResult;
        }

        int accessTokenExpireTimeInMinutes = _appSettings.Value.AccessTokenTimeToLive;
        int refreshTokenExpireTimeInMinutes = _appSettings.Value.RefreshTokenTimeToLive;

        var jwtToken = _jwtUtilities.GenerateJwtToken(_user, accessTokenExpireTimeInMinutes);
        var refreshToken = _jwtUtilities.GenerateJwtToken(_user, refreshTokenExpireTimeInMinutes);

        return new AuthResult()
        {
            Result = true,
            AccessToken = jwtToken,
            RefreshToken = refreshToken,
            Error = string.Empty,
        };
    }

    public async Task<AuthResult> Register(User user)
    {
        User? existingUser;

        try
        {
            existingUser = await _dataContext.Users.SingleOrDefaultAsync(x => x.Email == user.Email);
        }
        catch (Exception)
        {
            existingUser = null;
        }

        var result = new AuthResult()
        {
            AccessToken = string.Empty,
            Error = string.Empty,
            RefreshToken = String.Empty,
            Result = false
        };

        if (existingUser != null)
        {
            result.Error = ("There exists an account associated with this email address");
            return result;
        }

        user.Password = BCrypt.Net.BCrypt.HashPassword(user.Password);
        try
        {
            var isCreated = await _dataContext.Users.AddAsync(user);

            if (isCreated is not null)
            {
                int accessTokenExpireTimeInMinutes = _appSettings.Value.AccessTokenTimeToLive;
                int refreshTokenExpireTimeInMinutes = _appSettings.Value.RefreshTokenTimeToLive;
                var jwtToken = _jwtUtilities.GenerateJwtToken(user, accessTokenExpireTimeInMinutes);
                var refreshToken = _jwtUtilities.GenerateJwtToken(user, refreshTokenExpireTimeInMinutes);
                await _dataContext.SaveChangesAsync();
                return new AuthResult()
                {
                    AccessToken = jwtToken,
                    RefreshToken = refreshToken,
                    Result = true,
                    Error = string.Empty
                };
            }
        }
        catch (Exception exception)
        {
            result.Error = exception.StackTrace!;
        }

        return result;
    }
}