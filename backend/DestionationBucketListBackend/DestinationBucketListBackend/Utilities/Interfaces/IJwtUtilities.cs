using DestinationBucketListBackend.Model;

namespace DestinationBucketListBackend.Utilities.Interfaces;

public interface IJwtUtilities
{
    public string GenerateJwtToken(User user, int expiredTimeInMinutes);
}