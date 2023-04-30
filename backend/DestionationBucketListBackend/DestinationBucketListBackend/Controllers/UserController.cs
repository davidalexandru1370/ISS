using DestinationBucketListBackend.Model;
using DestinationBucketListBackend.Model.DTO;
using DestinationBucketListBackend.Services.Interfaces;
using DestinationBucketListBackend.Utilities.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace DestinationBucketListBackend.Controller;

[ApiController]
[Route("api/[controller]")]
public class UserController : ControllerBase
{
    private IUserService _userService;
    private ICookieUtilities _cookieUtilities;

    public UserController(IUserService userService, ICookieUtilities cookieUtilities)
    {
        _userService = userService;
        _cookieUtilities = cookieUtilities;
    }

    [HttpPost("authentificate")]
    public async Task<ActionResult> Authentificate([FromBody] UserDto user)
    {
        if (user is null)
        {
            return BadRequest("Invalid User!");
        }

        var response = await _userService.Login(new User()
        {
            Email = user.Email,
            Name = user.Name,
            Password = user.Password
        });

        if (string.IsNullOrWhiteSpace(response.AccessToken))
        {
            return StatusCode(403, response);
        }

        _cookieUtilities.setCookiePrivate("accessToken", response.AccessToken, HttpContext, 7);
        _cookieUtilities.setCookiePrivate("refreshToken", response.RefreshToken, HttpContext, 7);

        return Ok(response);
    }

    [HttpGet("authorize")]
    public IActionResult Authorize()
    {
        return Ok();
    }

    [HttpPost("register")]
    public async Task<ActionResult> Register([FromBody] UserDto user)
    {
        var response = await _userService.Register(new User()
        {
            Email = user.Email,
            Name = user.Name,
            Password = user.Password
        });

        if (response.Result == false)
        {
            return BadRequest(response);
        }

        _cookieUtilities.setCookiePrivate("accessToken", response.AccessToken, HttpContext, 7);
        _cookieUtilities.setCookiePrivate("refreshToken", response.RefreshToken, HttpContext, 7);
        return Ok(response);
    }
}