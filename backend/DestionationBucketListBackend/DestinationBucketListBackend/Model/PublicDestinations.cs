using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;

namespace DestinationBucketListBackend.Model;

[Table("PublicDestinations")]
[PrimaryKey(nameof(UserId), nameof(DestinationId))]
public class PublicDestinations
{
    [JsonIgnore]public virtual Destination? Destination { get; set; }
    [JsonIgnore]public virtual User? User { get; set; }
    [ForeignKey("User")] public Guid UserId { get; set; }
    [ForeignKey("Destination")] public Guid DestinationId { get; set; }
}