using DestinationBucketListBackend.Exceptions;
using DestinationBucketListBackend.Model;
using DestinationBucketListBackend.Repository.Interfaces;
using DestinationBucketListBackend.Services.Interfaces;
using Firebase.Auth;
using Firebase.Storage;

namespace DestinationBucketListBackend.Services;

public class DestinationService : IDestinationService
{
    private IDestinationRepository _destinationRepository;
    private static readonly string ApiKey = "AIzaSyBG_DScFgkNUOooWMoGvv2D1C7V85gKg5A";
    private static readonly string Bucket = "destinationbucketimages.appspot.com";
    private static readonly string AuthEmail = "admin@gmail.com";
    private static readonly string AuthPassword = "123456789";

    public DestinationService(IDestinationRepository destinationRepository)
    {
        _destinationRepository = destinationRepository;
    }

    public async Task<Destination> AddDestinationAsync(IFormFile destinationImage, Destination destination)
    {
        var imageLink = await UploadImageToFirebase(destinationImage);
        destination.ImageUrl = imageLink;
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

    private async Task<string> UploadImageToFirebase(IFormFile destinationImage)
    {
        var auth = new FirebaseAuthProvider(new FirebaseConfig(ApiKey));
        var a = await auth.SignInWithEmailAndPasswordAsync(AuthEmail, AuthPassword);

        var cancellation = new CancellationTokenSource();
        var stream = destinationImage.OpenReadStream();

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
            var link = await task;
            return link;
        }
        catch (Exception ex)
        {
            throw new DestinationBucketException("Error while uploading the image");
        }
        finally
        {
            await stream.DisposeAsync();
        }
    }
}