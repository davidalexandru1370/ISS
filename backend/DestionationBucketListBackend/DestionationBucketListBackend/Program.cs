using DestionationBucketListBackend.DbContext;
using DestionationBucketListBackend.Service;
using DestionationBucketListBackend.Service.Interfaces;
using DestionationBucketListBackend.Utilities;
using DestionationBucketListBackend.Utilities.Interfaces;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<IJwtUtilities, JwtUtilities>();
builder.Services.AddScoped<ICookieUtilities, CookieUtilities>();
builder.Services.AddDbContext<DestinationBucketDbContext>(options => 
    options.UseSqlServer(builder.Configuration.GetConnectionString("Dev")));

var app = builder.Build();
app.UseCors(options => options.WithOrigins("http://localhost:3000").AllowAnyMethod().AllowAnyHeader().AllowCredentials());
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
{
    
}
app.UseAuthorization();
app.MapControllers();
app.Run();