using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace DestinationBucketListBackend.Model;

[Table("Destination")]
public class Destination
{
    [Key] public Guid Id { get; set; }

    [JsonIgnore] public virtual User? User { get; set; }
    [Required] public Guid UserId { get; set; }

    [Required(ErrorMessage = "Description is mandatory!")]
    public string Description { get; set; } = null!;

    [Required(ErrorMessage = "Location can not be empty!")]
    public string Location { get; set; } = null!;

    [Required(ErrorMessage = "Title can not be empty!")]
    public string Title { get; set; } = null!;

    [Required(ErrorMessage = "Start date can not be empty")]
    public DateOnly StartDate { get; set; }

    [Required(ErrorMessage = "End date can not be empty")]
    public DateOnly StopDate { get; set; }

    [Required(ErrorMessage = "Price can not be empty or negative")]
    public double Price { get; set; }
    
    public string? ImageUrl { get; set; }

    [NotMapped] public IFormFile? DestinationImage { get; set; } = null!;
}