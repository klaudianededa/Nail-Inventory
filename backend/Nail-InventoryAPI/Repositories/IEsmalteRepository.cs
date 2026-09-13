using NailInventoryAPI.Models;

namespace NailInventoryAPI.Repositories;

public interface IEsmalteRepository
{
    Task<IEnumerable<Esmalte>> GetAllAsync(string? marca, DateTime? vencimentoAte);
    Task<Esmalte?> GetByIdAsync(int id);
    Task<Esmalte> AddAsync(Esmalte esmalte);
    Task UpdateAsync(Esmalte esmalte);
    Task DeleteAsync(int id);
    Task<IEnumerable<string>> GetMarcasAsync();
}