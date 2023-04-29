using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace DestinationBucketListBackend.Model;

[Table("Destination")]
public class Destination
{
    [Key]
    public Guid Id { get; set; }
    
    [JsonIgnore]
    public User User { get; set; }
    [Required]
    public Guid UserId { get; set; }
    
}