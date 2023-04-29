using DestinationBucketListBackend.Model;

namespace DestinationBucketListBackend.Service.Interfaces;

public interface IUserService
{
    public Task<AuthResult> Login(User user);
    public Task<AuthResult> Register(User user);
}