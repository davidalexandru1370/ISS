using DestinationBucketListBackend.Model;
using DestinationBucketListBackend.Model.DTO;

namespace DestinationBucketListBackend.Repository.Interfaces;

public interface IDestinationRepository
{
    public Task<Destination> AddDestinationAsync(Destination destination);
    public Task DeleteDestinationAsync(Guid destinationId);
    public Task<IEnumerable<DestinationDto>> GetAllDestinationsByUserId(Guid userId);
    public Task<Destination> GetDestinationByIdAsync(Guid destinationId);
    public Task<Destination> UpdateDestinationAsync(Destination destination);
    public Task AddDestinationToPublicListAsync(PublicDestinations publicDestination);
    public Task<IEnumerable<DestinationDto>> GetAllPublicDestinations(Guid userId);

}