using DestinationBucketListBackend.DbContext;
using DestinationBucketListBackend.Exceptions;
using DestinationBucketListBackend.Model;
using DestinationBucketListBackend.Model.DTO;
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

    public async Task<IEnumerable<DestinationDto>> GetAllDestinationsByUserId(Guid userId)
    {
        var publicDestinations =
            (from E in _destinationBucketDbContext.Set<Destination>()
                    .Where(d => d.UserId == userId)
                join C in _destinationBucketDbContext.Set<PublicDestinations>() on E.Id equals C.DestinationId
                group C by E.Id
                into res
                select new DestinationDto()
                {
                    Id = res.FirstOrDefault().Destination.Id,
                    Description = res.FirstOrDefault().Destination.Description,
                    Location = res.FirstOrDefault().Destination.Location,
                    Price = res.FirstOrDefault().Destination.Price,
                    Title = res.FirstOrDefault().Destination.Title,
                    ImageUrl = res.FirstOrDefault().Destination.ImageUrl,
                    OwnerEmail = res.FirstOrDefault().User.Email,
                    StartDate = res.FirstOrDefault().Destination.StartDate,
                    StopDate = res.FirstOrDefault().Destination.StopDate,
                    numberOfTimesFavorated = res.Count(),
                    IsPublic = res.FirstOrDefault().UserId == userId
                }
            ) as IEnumerable<DestinationDto>;

        var privateDestinations = _destinationBucketDbContext.Set<Destination>()
            .Where(d => d.UserId == userId && d.IsPublic == false)
            .Select(dest => new DestinationDto()
            {
                IsPublic = false,
                Description = dest.Description,
                Location = dest.Location,
                Price = dest.Price,
                Title = dest.Title,
                ImageUrl = dest.ImageUrl,
                OwnerEmail = dest.User!.Email,
                StartDate = dest.StartDate,
                StopDate = dest.StopDate,
                numberOfTimesFavorated = 0,
                Id = dest.Id
            }) as IEnumerable<DestinationDto>;

        IEnumerable<DestinationDto> destinations = privateDestinations.Union(publicDestinations);
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

    public async Task AddDestinationToPublicListAsync(PublicDestinations publicDestination)
    {
        try
        {
            await _destinationBucketDbContext.Set<PublicDestinations>().AddAsync(publicDestination);
            await _destinationBucketDbContext.SaveChangesAsync();
        }
        catch (Exception)
        {
            throw new RepositoryException("Invalid operation");
        }
    }

    public Task<IEnumerable<DestinationDto>> GetAllPublicDestinations(Guid userId)
    {
        var publicDestinations =
            (from destination in _destinationBucketDbContext.Set<Destination>().Where(d => d.IsPublic == true)
                join publicDestination in _destinationBucketDbContext.Set<PublicDestinations>()
                        .Include(pd => pd.User) on
                    destination.Id equals publicDestination.DestinationId
                group publicDestination by destination.Id
                into res
                select new DestinationDto()
                {
                    Id = res.FirstOrDefault().Destination.Id,
                    Description = res.FirstOrDefault().Destination.Description,
                    Location = res.FirstOrDefault().Destination.Location,
                    Price = res.FirstOrDefault().Destination.Price,
                    Title = res.FirstOrDefault().Destination.Title,
                    ImageUrl = res.FirstOrDefault().Destination.ImageUrl,
                    OwnerEmail = res.FirstOrDefault().User.Email,
                    StartDate = res.FirstOrDefault().Destination.StartDate,
                    StopDate = res.FirstOrDefault().Destination.StopDate,
                    numberOfTimesFavorated = res.Count(),
                    IsPublic = res.FirstOrDefault().UserId == userId
                }
            ) as IEnumerable<DestinationDto>;

        return Task.FromResult(publicDestinations);
    }

    public async Task DeleteFromPublicDestinationByDestinationIdAndUserIdAsync(Guid destinationId, Guid userId)
    {
        var publicDestination = _destinationBucketDbContext.Set<PublicDestinations>()
            .FirstOrDefault(pd => pd.DestinationId == destinationId && pd.UserId == userId);

        if (publicDestination is null)
        {
            throw new RepositoryException("Invalid destination");
        }

        _destinationBucketDbContext.Set<PublicDestinations>().Remove(publicDestination);
        await _destinationBucketDbContext.SaveChangesAsync();
    }

    public async Task DeleteFromPublicDestinationByDestinationIdAsync(Guid destinationId)
    {
        await _destinationBucketDbContext.Set<PublicDestinations>()
            .Where(pd => pd.DestinationId == destinationId)
            .ExecuteDeleteAsync();

        await _destinationBucketDbContext.SaveChangesAsync();
    }
}