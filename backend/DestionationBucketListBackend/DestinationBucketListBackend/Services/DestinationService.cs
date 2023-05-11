using DestinationBucketListBackend.Model;
using DestinationBucketListBackend.Repository.Interfaces;
using DestinationBucketListBackend.Services.Interfaces;

namespace DestinationBucketListBackend.Services;

public class DestinationService : IDestinationService
{
    private IDestinationRepository _destinationRepository;

    public DestinationService(IDestinationRepository destinationRepository)
    {
        _destinationRepository = destinationRepository;
    }

    public async Task<Destination> AddDestinationAsync(Destination destination)
    {
        var result = await _destinationRepository.AddDestinationAsync(destination);
        return result;
    }

    public async Task DeleteDestinationAsync(Guid destinationId)
    {
        await _destinationRepository.DeleteDestinationAsync(destinationId);
    }

    public async Task<IEnumerable<Destination>> GetAllDestinationsByUserIdAsync(Guid userId)
    {
        var destinations = await _destinationRepository.GetAllDestinationsByUserIdAsync(userId);
        return destinations;
    }

    public async Task<Destination> GetDestinationByIdAsync(Guid destinationId)
    {
        var destination = await _destinationRepository.GetDestinationByIdAsync(destinationId);
        return destination;
    }
}