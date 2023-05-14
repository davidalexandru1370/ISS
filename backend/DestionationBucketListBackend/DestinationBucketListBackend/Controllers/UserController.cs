using DestinationBucketListBackend.Exceptions;
using DestinationBucketListBackend.ExtensionMethods;
using DestinationBucketListBackend.Model;
using DestinationBucketListBackend.Model.DTO;
using DestinationBucketListBackend.Services.Interfaces;
using DestinationBucketListBackend.Utilities.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace DestinationBucketListBackend.Controllers;

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
    public async Task<ActionResult> Authentificate([FromBody] RegisterCredentials user)
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

    [Authorize]
    [HttpGet("authorize")]
    public ActionResult<UserDto> Authorize()
    {
        try
        {
            return Ok(new UserDto()
            {
                Email = User.GetUserEmail(),
                Username = User.GetUserName(),
                Role = User.GetUserRole()
            });
        }
        catch (DestinationBucketException)
        {
            return Forbid();
        }
    }

    [HttpPost]
    [Route("logout")]
    public ActionResult Logout()
    {
        var accessToken = HttpContext.Request.Cookies.Where(c => c.Key == "accessToken");
        var refreshToken = HttpContext.Request.Cookies.Where(c => c.Key == "refreshToken");

        if (accessToken == null || refreshToken == null)
        {
            return BadRequest();
        }

        _cookieUtilities.setCookiePrivate("accessToken", "", HttpContext, 2);
        _cookieUtilities.setCookiePrivate("refreshToken", "", HttpContext, 2);
        return Ok();
    }

    [HttpPost("register")]
    public async Task<ActionResult> Register([FromBody] RegisterCredentials user)
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