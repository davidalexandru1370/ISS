using System.Text;
using DestinationBucketListBackend.DbContext;
using DestinationBucketListBackend.Middlewares;
using DestinationBucketListBackend.Repository;
using DestinationBucketListBackend.Repository.Interfaces;
using DestinationBucketListBackend.Services;
using DestinationBucketListBackend.Services.Interfaces;
using DestinationBucketListBackend.Settings;
using DestinationBucketListBackend.Utilities;
using DestinationBucketListBackend.Utilities.Interfaces;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<DestinationBucketDbContext>();
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<IJwtUtilities, JwtUtilities>();
builder.Services.AddScoped<ICookieUtilities, CookieUtilities>();
builder.Services.AddScoped<IDestinationRepository, DestinationRepository>();
builder.Services.AddScoped<IDestinationService, DestinationService>();
builder.Services.Configure<AppSettings>(builder.Configuration.GetSection("AppSettings"));

builder.Services.AddAuthentication(options =>
    {
        options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
        options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
        options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
    })
    .AddJwtBearer(options =>
    {
        options.SaveToken = true;
        options.RequireHttpsMetadata = false;
        options.TokenValidationParameters = new TokenValidationParameters()
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidAudience = builder.Configuration["JWT:Audience"],
            ValidIssuer = builder.Configuration["JWT:Issuer"],
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["JWT:Secret"]))
        };
    });

var app = builder.Build();
app.UseCors(
    options => options.WithOrigins("http://localhost:3000").AllowAnyMethod().AllowAnyHeader().AllowCredentials());
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseAuthentication();

app.UseAuthorization();

app.UseAuthorizeMiddleware();

app.MapControllers();

app.Run();