namespace DestinationBucketListBackend.Model.DTO;

public class DestinationDto
{
    public Guid Id { get; set; }

    public string Description { get; set; } = null!;

    public string Location { get; set; } = null!;

    public string Title { get; set; } = null!;

    public DateOnly StartDate { get; set; }

    public bool IsPublic { get; set; }

    public DateOnly StopDate { get; set; }

    public double Price { get; set; }

    public string? ImageUrl { get; set; }

    public string OwnerEmail { get; set; } = null!;

    public int? numberOfTimesFavorated { get; set; } = 1;
}