using System.Text.Json;

namespace Nail_InventoryAPI.Services
{
    public class GoogleImageSearchService
    {
    }
}
using System.Text.Json;

namespace NailInventoryAPI.Services;

public class GoogleImageSearchService : IGoogleImageSearchService
{
    private readonly HttpClient _httpClient;
    private readonly IConfiguration _configuration;

    public GoogleImageSearchService(HttpClient httpClient, IConfiguration configuration)
    {
        _httpClient = httpClient;
        _configuration = configuration;
    }

    public async Task<string?> BuscarImagemAsync(string marca, string nome)
    {
        var apiKey = _configuration["GoogleSearch:ApiKey"];
        var cx = _configuration["GoogleSearch:SearchEngineId"];

        // Adiciona o "fundo branco" na busca
        var query = Uri.EscapeDataString($"esmalte {marca} {nome} fundo branco");

        // searchType=image restringe para buscar apenas fotos, num=1 traz apenas o primeiro resultado
        var url = $"https://www.googleapis.com/customsearch/v1?key={apiKey}&cx={cx}&q={query}&searchType=image&num=1";

        var response = await _httpClient.GetAsync(url);
        if (!response.IsSuccessStatusCode) return null;

        var content = await response.Content.ReadAsStringAsync();
        using var json = JsonDocument.Parse(content);

        if (json.RootElement.TryGetProperty("items", out var items) && items.GetArrayLength() > 0)
        {
            return items[0].GetProperty("link").GetString();
        }

        return null;
    }
}