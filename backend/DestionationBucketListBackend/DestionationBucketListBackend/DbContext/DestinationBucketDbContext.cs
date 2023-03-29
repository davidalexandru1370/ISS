using DestionationBucketListBackend.Model;
using Microsoft.EntityFrameworkCore;

namespace DestionationBucketListBackend.DbContext;

public class DestinationBucketDbContext : Microsoft.EntityFrameworkCore.DbContext
{

    public DestinationBucketDbContext(DbContextOptions<DestinationBucketDbContext> options) : base(options)
    {
        
    }

    public virtual DbSet<User> Users { get; set; } = null!;
}