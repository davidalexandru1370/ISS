namespace DestinationBucketListBackend.Exceptions;

public class RepositoryException : DestinationBucketException
{
    public RepositoryException(string message) : base(message)
    {
    }
}