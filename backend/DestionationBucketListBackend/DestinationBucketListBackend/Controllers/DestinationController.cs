using System.Text;
using DestinationBucketListBackend.Exceptions;
using DestinationBucketListBackend.ExtensionMethods;
using DestinationBucketListBackend.Model;
using DestinationBucketListBackend.Model.DTO;
using DestinationBucketListBackend.Services.Interfaces;
using Firebase.Auth;
using Firebase.Storage;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace DestinationBucketListBackend.Controllers;

[Authorize]
[ApiController]
[Route("api/[controller]")]
public class DestinationController : ControllerBase
{
    private readonly IDestinationService _destinationService;


    public DestinationController(IDestinationService destinationService)
    {
        _destinationService = destinationService;
    }

    [HttpPost]
    [Route("add-destination")]
    public async Task<ActionResult<Destination>> AddDestination([FromForm] Destination destination)
    {
        try
        {
            var result = await _destinationService.AddDestinationAsync(destination.DestinationImage, new Destination()
            {
                Description = destination.Description,
                Location = destination.Location,
                Price = destination.Price,
                ImageUrl = destination.ImageUrl,
                Title = destination.Title,
                StartDate = destination.StartDate,
                StopDate = destination.StopDate,
                UserId = User.GetUserId()
            });

            return Ok(result);
        }
        catch (RepositoryException repositoryException)
        {
            return BadRequest(repositoryException.Message);
        }
        catch (DestinationBucketException)
        {
            return Unauthorized();
        }
    }
}