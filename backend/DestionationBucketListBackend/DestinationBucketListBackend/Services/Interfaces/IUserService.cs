using DestinationBucketListBackend.Model;

namespace DestinationBucketListBackend.Services.Interfaces;

public interface IUserService
{
    public Task<AuthResult> Login(User user);
    public Task<AuthResult> Register(User user);
}