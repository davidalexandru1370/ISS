using DestinationBucketListBackend.DbContext;
using DestinationBucketListBackend.Exceptions;
using DestinationBucketListBackend.Model;
using DestinationBucketListBackend.Repository.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace DestinationBucketListBackend.Repository;

public class UserRepository : IUserRepository
{
    private readonly DestinationBucketDbContext _destinationBucketDbContext;

    public UserRepository(DestinationBucketDbContext dbContext)
    {
        _destinationBucketDbContext = dbContext;
    }

    public async Task<User> GetUserByIdAsync(Guid userId)
    {
        var user = await _destinationBucketDbContext.Set<User>().FirstOrDefaultAsync(u => u.Id == userId);

        if (user is null)
        {
            throw new RepositoryException("Invalid user");
        }

        return user;
    }
}