using Microsoft.EntityFrameworkCore;
using NailInventoryAPI.Data;
using NailInventoryAPI.Models;

namespace NailInventoryAPI.Repositories;

public class EsmalteRepository : IEsmalteRepository
{
    private readonly AppDbContext _context;

    public EsmalteRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<Esmalte>> GetAllAsync()
    {
        return await _context.Esmaltes.ToListAsync();
    }

    public async Task<Esmalte?> GetByIdAsync(int id)
    {
        return await _context.Esmaltes.FindAsync(id);
    }

    public async Task<Esmalte> CreateAsync(Esmalte esmalte)
    {
        _context.Esmaltes.Add(esmalte);
        await _context.SaveChangesAsync();

        return esmalte;
    }

    public async Task UpdateAsync(Esmalte esmalte)
    {
        _context.Esmaltes.Update(esmalte);
        await _context.SaveChangesAsync();
    }

    public async Task DeleteAsync(int id)
    {
        var esmalte = await GetByIdAsync(id);

        if (esmalte is not null)
        {
            _context.Esmaltes.Remove(esmalte);
            await _context.SaveChangesAsync();
        }
    }
}