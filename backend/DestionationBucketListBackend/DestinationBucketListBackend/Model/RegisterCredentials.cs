namespace DestinationBucketListBackend.Model.DTO;

public class RegisterCredentials
{
    public string Email { get; set; } = string.Empty;

    public string Password { get; set; } = string.Empty;

    public string? Name { get; set; } = string.Empty;
}