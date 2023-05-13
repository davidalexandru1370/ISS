using DestinationBucketListBackend.Model;

namespace DestinationBucketListBackend.Repository.Interfaces;

public interface IUserRepository
{
    public Task<User> GetUserByIdAsync(Guid userId);
}