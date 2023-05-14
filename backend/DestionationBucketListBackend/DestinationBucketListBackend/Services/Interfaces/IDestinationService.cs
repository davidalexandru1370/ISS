using DestinationBucketListBackend.Enums;
using DestinationBucketListBackend.Model;
using DestinationBucketListBackend.Model.DTO;

namespace DestinationBucketListBackend.Services.Interfaces;

public interface IDestinationService
{
    public Task<Destination> AddDestinationAsync(IFormFile destinationImage, Destination destination);
    public Task<IEnumerable<DestinationDto>> GetAllDestinationsByUserId(Guid userId);
    public Task<Destination> GetDestinationByIdAsync(Guid destinationId);
    public Task<Destination> UpdateDestinationAsync(Destination destination);
    public Task DeleteDestinationByIdAsync(Guid userRequestId, RolesEnum rolesEnum, Guid destinationId);
    public Task MarkDestinationAsPublicAsync(Guid destinationId, Guid userId);
    public Task<IEnumerable<DestinationDto>> GetAllPublicDestinations(Guid userId);
    public Task RemoveFromFavoriteAsync(Guid destinationId, Guid userId);
}