using DestionationBucketListBackend.Model;

namespace DestionationBucketListBackend.Service.Interfaces;

public interface IUserService
{
    public Task<AuthResult> Login(User user);
    public Task<AuthResult> Register(User user);
}