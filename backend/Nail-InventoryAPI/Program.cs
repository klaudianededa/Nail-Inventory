using Microsoft.EntityFrameworkCore;
using NailInventoryAPI.Data;
using NailInventoryAPI.Repositories;
using NailInventoryAPI.Services;

var builder = WebApplication.CreateBuilder(args);

var connectionString = builder.Configuration.GetConnectionString("TiDBConnection");
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString)));

builder.Services.AddScoped<IEsmalteRepository, EsmalteRepository>();

builder.Services.AddHttpClient<IGoogleImageSearchService, GoogleImageSearchService>();

builder.Services.AddControllers();
builder.Services.AddOpenApi();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();