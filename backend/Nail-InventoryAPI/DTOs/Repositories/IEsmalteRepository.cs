using NailInventoryAPI.Models;

namespace NailInventoryAPI.Repositories;

public interface IEsmalteRepository
{
    Task<IEnumerable<Esmalte>> GetAllAsync();
    Task<Esmalte?> GetByIdAsync(int id);
    Task<Esmalte> CreateAsync(Esmalte esmalte);
    Task UpdateAsync(Esmalte esmalte);
    Task DeleteAsync(int id);
}