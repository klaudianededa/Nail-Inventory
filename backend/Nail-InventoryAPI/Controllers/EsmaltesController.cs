using Microsoft.AspNetCore.Mvc;
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
    public async Task<ActionResult<IEnumerable<EsmalteReadDto>>> GetAll()
    {
        var esmaltes = await _repository.GetAllAsync();

        var resultado = esmaltes.Select(e => new EsmalteReadDto
        {
            Id = e.Id,
            Nome = e.Nome,
            Marca = e.Marca,
            DataVencimento = e.DataVencimento,
            Observacoes = e.Observacoes,
            CaminhoImagem = e.CaminhoImagem
        });

        return Ok(resultado);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<EsmalteReadDto>> GetById(int id)
    {
        var esmalte = await _repository.GetByIdAsync(id);

        if (esmalte is null)
            return NotFound();

        return Ok(new EsmalteReadDto
        {
            Id = esmalte.Id,
            Nome = esmalte.Nome,
            Marca = esmalte.Marca,
            DataVencimento = esmalte.DataVencimento,
            Observacoes = esmalte.Observacoes,
            CaminhoImagem = esmalte.CaminhoImagem
        });
    }

    [HttpPost]
    public async Task<ActionResult<EsmalteReadDto>> Create(EsmalteCreateDto dto)
    {
        var esmalte = new Esmalte
        {
            Nome = dto.Nome,
            Marca = dto.Marca,
            DataVencimento = dto.DataVencimento,
            Observacoes = dto.Observacoes,
            CaminhoImagem = dto.CaminhoImagem
        };

        await _repository.CreateAsync(esmalte);

        var resultado = new EsmalteReadDto
        {
            Id = esmalte.Id,
            Nome = esmalte.Nome,
            Marca = esmalte.Marca,
            DataVencimento = esmalte.DataVencimento,
            Observacoes = esmalte.Observacoes,
            CaminhoImagem = esmalte.CaminhoImagem
        };

        return CreatedAtAction(nameof(GetById), new { id = esmalte.Id }, resultado);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, EsmalteCreateDto dto)
    {
        var esmalte = await _repository.GetByIdAsync(id);

        if (esmalte is null)
            return NotFound();

        esmalte.Nome = dto.Nome;
        esmalte.Marca = dto.Marca;
        esmalte.DataVencimento = dto.DataVencimento;
        esmalte.Observacoes = dto.Observacoes;
        esmalte.CaminhoImagem = dto.CaminhoImagem;

        await _repository.UpdateAsync(esmalte);

        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var esmalte = await _repository.GetByIdAsync(id);

        if (esmalte is null)
            return NotFound();

        await _repository.DeleteAsync(id);

        return NoContent();
    }
}