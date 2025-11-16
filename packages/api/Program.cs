// =======================================================================
// COPIA E COLA ESTE CÓDIGO INTEIRO
// FICHEIRO: packages/api/Program.cs
// =======================================================================

using Chromatech.Api.Data; // <-- ESTA É A LINHA QUE FALTAVA (CS0246)
using Chromatech.Api.Models;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

var myAllowSpecificOrigins = "_myAllowSpecificOrigins";
builder.Services.AddCors(options =>
{
    options.AddPolicy(name: myAllowSpecificOrigins,
                      policy =>
                      {
                          policy.AllowAnyOrigin()
                                .AllowAnyHeader()
                                .AllowAnyMethod();
                      });
});

builder.Services.AddDbContext<DataContext>(options =>
{
    options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection"));
});

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// =======================================================================
// INÍCIO DO CÓDIGO PARA APLICAR MIGRATIONS E SEED DE DADOS
using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    try
    {
        var context = services.GetRequiredService<DataContext>();
        context.Database.Migrate();
        // Chama o nosso novo método para popular o banco de dados
        DataSeeder.Seed(context);
    }
    catch (Exception ex)
    {
        var logger = services.GetRequiredService<ILogger<Program>>();
        logger.LogError(ex, "Ocorreu um erro durante a execução das migrations ou do seeder.");
    }
}
// FIM DO CÓDIGO
// =======================================================================


if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors(myAllowSpecificOrigins);
app.UseAuthorization();
app.MapControllers();
app.Run();


// =======================================================================
// INÍCIO DA CLASSE PARA POPULAR O BANCO DE DADOS
// =======================================================================
public static class DataSeeder
{
    public static void Seed(DataContext context)
    {
        // --- SEED DE PRODUTOS ---
        // Verifica se a tabela de Produtos já tem algum dado.
        if (!context.Produtos.Any())
        {
            var produtos = new List<Produto>
            {
                new Produto
                {
                    Nome = "Chromatech Tupana A1",
                    DescricaoCurta = "Impressora 3D multicolorida com a única tecnologia de mistura de cores do mundo.",
                    Historia = "A Tupana A1 foi desenvolvida para atender às demandas da indústria 4.0 na Amazônia, oferecendo uma plataforma robusta e confiável para engenheiros e designers. Com um chassi de metal reforçado e componentes de alta qualidade, ela garante repetibilidade e precisão em todas as impressões.",
                    Preco = 16900.00m,
                    UrlImagemPrincipal = "/images/Tupana-A1.png",
                    Especificacoes = new List<string> { "Volume de Impressão: 300x300x400mm", "Tecnologia: Mistura de Cores (CMYK)", "Nivelamento Automático", "Extrusora Direct Drive" }
                }
                // Adiciona os outros produtos (Kit de Bicos, Filamento) aqui se quiseres
            };

            context.Produtos.AddRange(produtos);
        }

        // --- SEED DE REPRESENTANTES ---
        // Verifica se a tabela de Representantes já tem algum dado.
        if (!context.Representantes.Any())
        {
            var representantes = new List<Representante>
            {
                new Representante
                {
                    Nome = "Gisele Lima",
                    Cargo = "CEO",
                    Biografia = "Liderando a Chromatech com visão estratégica e paixão por inovação.",
                    UrlFoto = "/images/team/giselle.jpeg"
                },
                new Representante
                {
                    Nome = "Bruno",
                    Cargo = "CFO",
                    Biografia = "Gerenciando as finanças com precisão para o crescimento sustentável da empresa.",
                    UrlFoto = "/images/team/placeholder-male-1.jpg"
                },
                new Representante
                {
                    Nome = "Tony",
                    Cargo = "CTO",
                    Biografia = "Líder técnico, impulsionando a pesquisa e desenvolvimento de novas tecnologias.",
                    UrlFoto = "/images/team/placeholder-male-2.jpg"
                },
                new Representante
                {
                    Nome = "Dharlan",
                    Cargo = "COO",
                    Biografia = "Gerenciando as operações e garantindo a excelência da logística.",
                    UrlFoto = "/images/team/dharlan.jpg"
                },
                new Representante
                {
                    Nome = "Pedro Henrique",
                    Cargo = "Desenvolvedor de Software",
                    Biografia = "Arquiteto e desenvolvedor da plataforma Chromatech, focado em performance e usabilidade.",
                    UrlFoto = "/images/team/pedro.jpg"
                },
                new Representante
                {
                    Nome = "Andrey",
                    Cargo = "Cadista",
                    Biografia = "Especialista em modelagem 3D, transformando ideias complexas em protótipos precisos.",
                    UrlFoto = "/images/team/andrey.jpg"
                }
            };

            context.Representantes.AddRange(representantes);
        }

        // Salva TODAS as mudanças no banco de dados de uma só vez
        context.SaveChanges();
    }
}
// FIM DA CLASSE
// =======================================================================