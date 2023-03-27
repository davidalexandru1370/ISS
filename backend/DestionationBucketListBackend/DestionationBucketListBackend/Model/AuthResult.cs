namespace DestionationBucketListBackend.Model;

public class AuthResult
{
    public string AccessToken { get; set; } = String.Empty;
    public string RefreshToken { get; set; } = String.Empty;
    public bool Result { get; set; }
    public string? Error { get; set; }
}