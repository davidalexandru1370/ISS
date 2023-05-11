using DestinationBucketListBackend.Model;

namespace DestinationBucketListBackend.Services.Interfaces;

public interface IDestinationService
{
    public Task<Destination> AddDestinationAsync(Destination destination);
    public Task DeleteDestinationAsync(Guid destinationId);
    public Task<IEnumerable<Destination>> GetAllDestinationsByUserIdAsync(Guid userId);
    public Task<Destination> GetDestinationByIdAsync(Guid destinationId);
}