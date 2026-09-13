using Microsoft.EntityFrameworkCore;
using NailInventoryAPI.Data;
using NailInventoryAPI.Models;

namespace Nail_InventoryAPI.Repositories;

public class EsmalteRepository : IEsmalteRepository
{
    private readonly AppDbContext _context;

    public EsmalteRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<Esmalte>> GetAllAsync(
        string? marca,
        DateTime? vencimentoAte)
    {
        var query = _context.Esmaltes.AsQueryable();

        if (!string.IsNullOrWhiteSpace(marca))
        {
            query = query.Where(e => e.Marca == marca);
        }

        if (vencimentoAte.HasValue)
        {
            query = query.Where(e =>
                e.DataVencimento.HasValue &&
                e.DataVencimento.Value <= vencimentoAte.Value);
        }

        return await query.ToListAsync();
    }

    public async Task<Esmalte?> GetByIdAsync(int id)
    {
        return await _context.Esmaltes.FindAsync(id);
    }

    public async Task<Esmalte> AddAsync(Esmalte esmalte)
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

    public async Task<IEnumerable<string>> GetMarcasAsync()
    {
        return await _context.Esmaltes
            .Select(e => e.Marca)
            .Distinct()
            .OrderBy(m => m)
            .ToListAsync();
    }
}