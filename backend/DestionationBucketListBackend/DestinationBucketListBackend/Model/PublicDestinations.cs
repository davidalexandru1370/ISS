using System.ComponentModel.DataAnnotations.Schema;

namespace DestinationBucketListBackend.Model;

public class PublicDestinations
{
    public virtual Destination? Destination { get; set; }
    public virtual User? User { get; set; }
    [ForeignKey("User")] public Guid UserId { get; set; }
    [ForeignKey("Destination")] public Guid DestinationId { get; set; }
}