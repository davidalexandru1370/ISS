using DestinationBucketListBackend.Enums;

namespace DestinationBucketListBackend.Model.DTO;

public class UserDto
{
    public string Username { get; set; }
    public string Email { get; set; }
    public RolesEnum Role { get; set; }
}