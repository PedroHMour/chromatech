using Microsoft.EntityFrameworkCore;
using Chromatech.Api.Models; // Importando nossos modelos

namespace Chromatech.Api.Data
{
    // A classe DataContext herda de DbContext, o coração do Entity Framework
    public class DataContext : DbContext
    {
        // O construtor é necessário para a configuração da conexão
        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {
        }

        // Cada DbSet representa uma tabela no banco de dados.
        // Esta linha diz ao EF Core: "Quero uma tabela chamada 'Produtos'
        // que será baseada na minha classe 'Produto'".
        public DbSet<Produto> Produtos { get; set; }

        // Você pode adicionar outras tabelas aqui no futuro
        public DbSet<Representante> Representantes { get; set; }
    }
}