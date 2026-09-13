namespace NailInventoryAPI.Services;

public interface IGoogleImageSearchService
{
    Task<string?> BuscarImagemAsync(string nome, string marca);
}