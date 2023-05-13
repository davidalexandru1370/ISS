using DestinationBucketListBackend.DbContext;
using DestinationBucketListBackend.Exceptions;
using DestinationBucketListBackend.Model;
using DestinationBucketListBackend.Repository.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace DestinationBucketListBackend.Repository;

public class DestinationRepository : IDestinationRepository
{
    private readonly DestinationBucketDbContext _destinationBucketDbContext;

    public DestinationRepository(DestinationBucketDbContext destinationBucketDbContext)
    {
        _destinationBucketDbContext = destinationBucketDbContext;
    }

    public async Task<Destination> AddDestinationAsync(Destination destination)
    {
        var result = await _destinationBucketDbContext.Set<Destination>().AddAsync(destination);
        await _destinationBucketDbContext.SaveChangesAsync();

        return result.Entity;
    }

    public async Task DeleteDestinationAsync(Guid destinationId)
    {
        var foundDestination = await GetDestinationByIdAsync(destinationId);

        _destinationBucketDbContext.Set<Destination>().Remove(foundDestination);
        await _destinationBucketDbContext.SaveChangesAsync();
    }

    public async Task<IEnumerable<Destination>> GetAllDestinationsByUserIdAsync(Guid userId)
    {
        var destinations =
            await _destinationBucketDbContext.Set<Destination>().Where(d => d.UserId == userId).ToListAsync() as
                IEnumerable<Destination>;

        return destinations;
    }

    public async Task<Destination> GetDestinationByIdAsync(Guid destinationId)
    {
        var destination = await _destinationBucketDbContext.Set<Destination>()
            .FirstOrDefaultAsync(d => d.Id == destinationId);

        if (destination is null)
        {
            throw new RepositoryException("Destination does not exist!");
        }

        return destination;
    }

    public async Task<Destination> UpdateDestinationAsync(Destination destination)
    {
        var foundDestination = await GetDestinationByIdAsync(destination.Id);

        _destinationBucketDbContext.Entry(foundDestination).CurrentValues.SetValues(destination);

        await _destinationBucketDbContext.SaveChangesAsync();

        return destination;
    }
}