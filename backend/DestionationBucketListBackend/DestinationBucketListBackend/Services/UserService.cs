using DestinationBucketListBackend.DbContext;
using DestinationBucketListBackend.Model;
using DestinationBucketListBackend.Service.Interfaces;
using DestinationBucketListBackend.Utilities.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace DestinationBucketListBackend.Service;

public class UserService : IUserService
{
    private DestinationBucketDbContext _dataContext;
    private IJwtUtilities _jwtUtilities;
    
    public UserService(DestinationBucketDbContext dataContext, IJwtUtilities jwtUtilities)
    {
        _dataContext = dataContext;
        _jwtUtilities = jwtUtilities;
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

            int accessTokenExpireTimeInMinutes = 15;
            int refreshTokenExpireTimeInMinutes = 10080;

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

                if (isCreated != null)
                { 
                    var jwtToken = _jwtUtilities.GenerateJwtToken(user, 15);
                    var refreshToken = _jwtUtilities.GenerateJwtToken(user, 10080);
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