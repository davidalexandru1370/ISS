using DestionationBucketListBackend.Model;

namespace DestionationBucketListBackend.Utilities.Interfaces;

public interface IJwtUtilities
{
    public string GenerateJwtToken(User user, int expiredTimeInMinutes);
}