using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace DestinationBucketListBackend.Model;

[Table("PublicDestinations")]
[PrimaryKey(nameof(UserId), nameof(DestinationId))]
public class PublicDestinations
{
    public virtual Destination? Destination { get; set; }
    public virtual User? User { get; set; }
    [ForeignKey("User")] public Guid UserId { get; set; }
    [ForeignKey("Destination")] public Guid DestinationId { get; set; }
}