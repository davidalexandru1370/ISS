using DestinationBucketListBackend.Exceptions;
using DestinationBucketListBackend.ExtensionMethods;
using DestinationBucketListBackend.Model;
using DestinationBucketListBackend.Services.Interfaces;
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
    [Consumes("multipart/form-data")]
    public async Task<ActionResult<Destination>> AddDestination([FromForm] Destination destination)
    {
        try
        {
            DateTime.TryParse(Request.Form["StartDate"].ToString(), out var startDate);
            DateTime.TryParse(Request.Form["StopDate"].ToString(), out var stopDate);

            var result = await _destinationService.AddDestinationAsync(destination.DestinationImage, new Destination()
            {
                Description = destination.Description,
                Location = destination.Location,
                Price = destination.Price,
                ImageUrl = destination.ImageUrl,
                Title = destination.Title,
                StartDate = DateOnly.FromDateTime(startDate),
                StopDate = DateOnly.FromDateTime(stopDate),
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

    [HttpPut]
    [Route("update-destination")]
    public async Task<ActionResult<Destination>> UpdateDestination([FromBody] Destination destination)
    {
        try
        {
            var result = await _destinationService.UpdateDestinationAsync(destination);
            return Ok(result);
        }
        catch (RepositoryException repositoryException)
        {
            return BadRequest(repositoryException);
        }
    }

    [HttpGet]
    [Route("get-by-user")]
    public async Task<ActionResult<Destination>> GetDestinationsByUserId()
    {
        try
        {
            var userId = User.GetUserId();
            var result = await _destinationService.GetAllDestinationsByUserIdAsync(userId);
            return Ok(result);
        }
        catch (RepositoryException repositoryException)
        {
            return BadRequest(repositoryException.Message);
        }
        catch (DestinationBucketException)
        {
            return Forbid();
        }
    }

    [HttpDelete]
    [Route("delete-destination")]
    public async Task<IActionResult> DeleteDestination(Destination destination)
    {
        try
        {
            var userId = User.GetUserId();
            var userRole = User.GetUserRole();
            await _destinationService.DeleteDestinationByIdAsync(userId, userRole, destination.Id);
            return Ok();
        }
        catch (RepositoryException repositoryException)
        {
            return BadRequest(repositoryException.Message);
        }
        catch (DestinationBucketException)
        {
            return Forbid();
        }
    }

    [HttpPut]
    [Route("add-destination-to-public")]
    public async Task<IActionResult> AddDestinationToBePublic(Guid destinationId)
    {
        try
        {
            var userId = User.GetUserId();
            await _destinationService.MarkDestinationAsPublicAsync(destinationId, userId);
            return Ok();
        }
        catch (RepositoryException repositoryException)
        {
            return BadRequest(repositoryException.Message);
        }
        catch (DestinationBucketException)
        {
            return Forbid();
        }
    }
}