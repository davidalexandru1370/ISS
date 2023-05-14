namespace DestinationBucketListBackend.Settings;

public class AppSettings
{
    public string Secret { get; set; } = null!;
    public int RefreshTokenTimeToLive { get; set; }
    public int AccessTokenTimeToLive { get; set; }
}