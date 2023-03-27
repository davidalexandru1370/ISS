using DestionationBucketListBackend.DbContext;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<DestinationBucketDbContext>(options => 
    options.UseSqlServer(builder.Configuration.GetConnectionString("Dev")));

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
{
    
}

app.MapControllers();
app.Run();