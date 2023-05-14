using System.Security.Claims;
using DestinationBucketListBackend.DbContext;
using DestinationBucketListBackend.Enums;
using DestinationBucketListBackend.Exceptions;

namespace DestinationBucketListBackend.ExtensionMethods;

public static class ExtensionMethods
{
    public static Guid GetUserId(this ClaimsPrincipal claimsPrincipal)
    {
        if (claimsPrincipal is null)
        {
            throw new DestinationBucketException("Invalid user");
        }

        try
        {
            var userId = Guid.Parse(claimsPrincipal.Claims.FirstOrDefault(c => c.Type == "Id").Value);
            return userId;
        }
        catch (FormatException)
        {
            throw new DestinationBucketException("Invalid user");
        }
    }

    public static string GetUserEmail(this ClaimsPrincipal claimsPrincipal)
    {
        if (claimsPrincipal is null)
        {
            throw new DestinationBucketException("Invalid user");
        }

        try
        {
            var email = claimsPrincipal.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Email).Value;

            if (email is null)
            {
                throw new DestinationBucketException("Invalid email");
            }

            return email;
        }
        catch (Exception e)
        {
            throw new DestinationBucketException(e.Message);
        }
    }

    public static RolesEnum GetUserRole(this ClaimsPrincipal claimsPrincipal)
    {
        if (claimsPrincipal is null)
        {
            throw new DestinationBucketException("Invalid user");
        }

        try
        {
            var userRole = claimsPrincipal.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Role).Value;
            return (RolesEnum)Enum.Parse(typeof(RolesEnum), userRole);
        }
        catch (Exception)
        {
            throw new DestinationBucketException("Invalid user");
        }
    }

    public static string GetUserName(this ClaimsPrincipal claimsPrincipal)
    {
        if (claimsPrincipal is null)
        {
            throw new DestinationBucketException("Invalid user");
        }

        try
        {
            var email = claimsPrincipal.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Name).Value;

            if (email is null)
            {
                throw new DestinationBucketException("Invalid email");
            }

            return email;
        }
        catch (Exception e)
        {
            throw new DestinationBucketException(e.Message);
        }
    }
}