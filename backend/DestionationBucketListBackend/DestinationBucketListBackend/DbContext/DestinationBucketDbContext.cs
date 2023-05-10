using DestinationBucketListBackend.Model;
using Microsoft.EntityFrameworkCore;

namespace DestinationBucketListBackend.DbContext;

public class DestinationBucketDbContext : Microsoft.EntityFrameworkCore.DbContext
{

    public DestinationBucketDbContext(DbContextOptions<DestinationBucketDbContext> options) : base(options)
    {
        
    }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseNpgsql(@"Host=localhost;Username=postgres;Password=postgres;Database=DestinationBucketList");
    }

    public virtual DbSet<User> Users { get; set; } = null!;
    public virtual DbSet<Destination> Destinations { get; set; } = null!;
}