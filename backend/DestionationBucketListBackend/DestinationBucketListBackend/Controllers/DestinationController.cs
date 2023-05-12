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
using Microsoft.Win32.SafeHandles;

namespace DestinationBucketListBackend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class DestinationController : ControllerBase
{
    private readonly IDestinationService _destinationService;
    private static string ApiKey = "AIzaSyBG_DScFgkNUOooWMoGvv2D1C7V85gKg5A";
    private static string Bucket = "destinationbucketimages.appspot.com";
    private static string AuthEmail = "admin@gmail.com";
    private static string AuthPassword = "123456789";

    public DestinationController(IDestinationService destinationService)
    {
        _destinationService = destinationService;
    }

    [HttpPost]
    [Route("add-destination")]
    public async Task<ActionResult<Destination>> AddDestination([FromBody] DestinationDto destination)
    {
        try
        {
            var result = await _destinationService.AddDestinationAsync(new Destination()
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
        catch (DestinationBucketException destinationBucketException)
        {
            return Unauthorized();
        }
    }

    [AllowAnonymous]
    [HttpPost]
    [Route("add-image")]
    public async Task UploadImageToFirebase()
    {
        // of course you can login using other method, not just email+password
        var auth = new FirebaseAuthProvider(new FirebaseConfig(ApiKey));
        var a = await auth.SignInWithEmailAndPasswordAsync(AuthEmail, AuthPassword);

        // you can use CancellationTokenSource to cancel the upload midway

        var cancellation = new CancellationTokenSource();
        FileStream stream =
            System.IO.File.Open(@"windows-xp-desktop-background-wallpaper-azul-800x600.jpg",
                FileMode.Open);
        var task = new FirebaseStorage(
                Bucket,
                new FirebaseStorageOptions
                {
                    AuthTokenAsyncFactory = () => Task.FromResult(a.FirebaseToken),
                    ThrowOnCancel =
                        true // when you cancel the upload, exception is thrown. By default no exception is thrown
                })
            .Child("images")
            .PutAsync(stream, cancellation.Token);

        task.Progress.ProgressChanged += (s, e) => Console.WriteLine($"Progress: {e.Percentage} %");

        // cancel the upload
        // cancellation.Cancel();

        try
        {
            // error during upload will be thrown when you await the task
            Console.WriteLine("Download link:\n" + await task);
        }
        catch (Exception ex)
        {
            Console.WriteLine("Exception was thrown: {0}", ex);
        }
        finally
        {
            await stream.DisposeAsync();
        }
    }
}

