using Microsoft.AspNetCore.Mvc;
using Nail_InventoryAPI.Repositories;
using NailInventoryAPI.DTOs;
using NailInventoryAPI.Models;
using NailInventoryAPI.Repositories;

namespace NailInventoryAPI.Controllers;

[ApiController]
[Route("api/[controller]")]
public class EsmaltesController : ControllerBase
{
    private readonly IEsmalteRepository _repository;

    public EsmaltesController(IEsmalteRepository repository)
    {
        _repository = repository;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<EsmalteReadDto>>> GetEsmaltes(
        [FromQuery] string? marca,
        [FromQuery] DateTime? vencimentoAte)
    {
        var esmaltes = await _repository.GetAllAsync(marca, vencimentoAte);

        var dtos = esmaltes.Select(e => new EsmalteReadDto
        {
            Id = e.Id,
            Nome = e.Nome,
            Marca = e.Marca,
            DataVencimento = e.DataVencimento,
            Observacoes = e.Observacoes,
            CaminhoImagem = e.CaminhoImagem
        });

        return Ok(dtos);
    }

    [HttpGet("marcas")]
    public async Task<ActionResult<IEnumerable<string>>> GetMarcas()
    {
        var marcas = await _repository.GetMarcasAsync();

        return Ok(marcas);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<EsmalteReadDto>> GetEsmalte(int id)
    {
        var e = await _repository.GetByIdAsync(id);

        if (e == null)
        {
            return NotFound();
        }

        return Ok(new EsmalteReadDto
        {
            Id = e.Id,
            Nome = e.Nome,
            Marca = e.Marca,
            DataVencimento = e.DataVencimento,
            Observacoes = e.Observacoes,
            CaminhoImagem = e.CaminhoImagem
        });
    }

    [HttpPost]
    public async Task<ActionResult<EsmalteReadDto>> PostEsmalte(
        EsmalteCreateDto dto)
    {
        var esmalte = new Esmalte
        {
            Nome = dto.Nome,
            Marca = dto.Marca,
            DataVencimento = dto.DataVencimento,
            Observacoes = dto.Observacoes,
            CaminhoImagem = dto.CaminhoImagem
        };

        var created = await _repository.AddAsync(esmalte);

        var readDto = new EsmalteReadDto
        {
            Id = created.Id,
            Nome = created.Nome,
            Marca = created.Marca,
            DataVencimento = created.DataVencimento,
            Observacoes = created.Observacoes,
            CaminhoImagem = created.CaminhoImagem
        };

        return CreatedAtAction(
            nameof(GetEsmalte),
            new { id = created.Id },
            readDto);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> PutEsmalte(
        int id,
        EsmalteCreateDto dto)
    {
        var esmalte = await _repository.GetByIdAsync(id);

        if (esmalte == null)
        {
            return NotFound();
        }

        esmalte.Nome = dto.Nome;
        esmalte.Marca = dto.Marca;
        esmalte.DataVencimento = dto.DataVencimento;
        esmalte.Observacoes = dto.Observacoes;
        esmalte.CaminhoImagem = dto.CaminhoImagem;

        await _repository.UpdateAsync(esmalte);

        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteEsmalte(int id)
    {
        var esmalte = await _repository.GetByIdAsync(id);

        if (esmalte == null)
        {
            return NotFound();
        }

        await _repository.DeleteAsync(id);

        return NoContent();
    }
}