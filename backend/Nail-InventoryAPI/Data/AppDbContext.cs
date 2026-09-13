using Microsoft.EntityFrameworkCore;
using NailInventoryAPI.Models;

namespace NailInventoryAPI.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options)
        : base(options)
    {
    }

    public DbSet<Esmalte> Esmaltes { get; set; }
}