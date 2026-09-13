namespace NailInventoryAPI.Services;

public interface IGoogleImageSearchService
{
    Task<string?> BuscarImagemAsync(string marca, string nome);
}