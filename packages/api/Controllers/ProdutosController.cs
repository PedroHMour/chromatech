// Importações de pacotes e namespaces necessários para o funcionamento do controller.
using Microsoft.AspNetCore.Mvc;      
using Microsoft.EntityFrameworkCore; 
using Chromatech.Api.Models;         
using Chromatech.Api.Data;          
using System.Collections.Generic;
using System.Threading.Tasks;       

namespace Chromatech.Api.Controllers
{
    [ApiController] // Marca a classe como um controller de API, habilitando recursos automáticos.
    [Route("api/[controller]")] // Define a rota base para este controller como "/api/produtos"
    public class ProdutosController : ControllerBase
    {
        // Declara uma variável privada e somente leitura para guardar a instância do nosso contexto de banco de dados.
        // O 'readonly' garante que ela só pode ser definida no construtor.
        private readonly DataContext _context;

        // Este é o construtor do controller.
        // O ASP.NET Core automaticamente "injetará" uma instância do DataContext aqui (Injeção de Dependência).
        // Isso nos dá acesso ao banco de dados dentro de todo o controller.
        public ProdutosController(DataContext context)
        {
            _context = context;
        }

        // Este método responde a requisições HTTP GET para a rota "/api/produtos"
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Produto>>> GetProdutos()
        {
            // A palavra 'await' pausa a execução do método até que a operação com o banco de dados seja concluída.
            // _context.Produtos se refere à nossa tabela de Produtos.
            // .ToListAsync() é um método do Entity Framework que busca todos os registros da tabela de forma assíncrona.
            var produtos = await _context.Produtos.ToListAsync();

            // Retorna a lista de produtos encontrada com um status HTTP 200 OK.
            return Ok(produtos);
        }

        // Este método responde a requisições HTTP POST para a rota "/api/produtos"
        [HttpPost]
        public async Task<ActionResult<Produto>> PostProduto(Produto produto)
        {
            // Adiciona o novo objeto 'produto' (que veio do corpo da requisição)
            // ao contexto do Entity Framework. Neste momento, ele ainda não está no banco.
            _context.Produtos.Add(produto);

            // 'await' pausa a execução até que as mudanças (a adição do novo produto)
            // sejam efetivamente salvas no banco de dados.
            await _context.SaveChangesAsync();

            // Retorna uma resposta HTTP 201 Created.
            // Isso indica que o recurso foi criado com sucesso e também retorna o produto criado,
            // incluindo o 'Id' que foi gerado pelo banco de dados.
            return CreatedAtAction(nameof(GetProdutos), new { id = produto.Id }, produto);
        }
    }
}