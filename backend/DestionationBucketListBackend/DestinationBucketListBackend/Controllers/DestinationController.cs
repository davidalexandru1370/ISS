using DestinationBucketListBackend.Model;
using DestinationBucketListBackend.Model.DTO;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace DestinationBucketListBackend.Controllers;

[Authorize]
[ApiController]
public class DestinationController : ControllerBase
{

    [HttpGet]
    public async Task<ActionResult<Destination>> AddDestination(DestinationDto destination)
    {
        
    }
}