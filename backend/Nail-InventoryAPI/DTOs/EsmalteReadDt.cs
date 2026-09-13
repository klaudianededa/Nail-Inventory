namespace NailInventoryAPI.DTOs;

public class EsmalteReadDto
{
    public int Id { get; set; }
    public string Nome { get; set; } = string.Empty;
    public string Marca { get; set; } = string.Empty;
    public DateTime? DataVencimento { get; set; }
    public string? Observacoes { get; set; }
    public string? CaminhoImagem { get; set; }
}