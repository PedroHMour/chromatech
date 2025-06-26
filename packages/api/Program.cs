using Chromatech.Api.Data;
using Chromatech.Api.Models; // Adicionada esta importação
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
// INÍCIO DA NOVA CLASSE PARA POPULAR O BANCO DE DADOS
public static class DataSeeder
{
    public static void Seed(DataContext context)
    {
        // Verifica se a tabela de Produtos já tem algum dado.
        // Se tiver, não faz nada.
        if (context.Produtos.Any())
        {
            return;
        }

        // Cria uma lista de produtos de exemplo
        var produtos = new List<Produto>
        {
            new Produto
            {
                // O Id não precisa ser definido, o banco de dados gerará automaticamente
                Nome = "Chromatech Titan Pro",
                DescricaoCurta = "Impressora 3D de alta precisão para prototipagem industrial e peças finais.",
                Historia = "A Titan Pro foi desenvolvida para atender às demandas da indústria 4.0 na Amazônia, oferecendo uma plataforma robusta e confiável para engenheiros e designers. Com um chassi de metal reforçado e componentes de alta qualidade, ela garante repetibilidade e precisão em todas as impressões.",
                Preco = 7850.00m,
                UrlImagemPrincipal = "/images/products/titan-pro-1.png",
                Especificacoes = new List<string> { "Volume de Impressão: 300x300x400mm", "Velocidade Máx: 180mm/s", "Nivelamento Automático", "Extrusora Direct Drive" }
            },
            new Produto
            {
                Nome = "Kit de Bicos (Nozzles) de Aço",
                DescricaoCurta = "Conjunto de 5 bicos de aço endurecido para materiais abrasivos.",
                Historia = "Essenciais para quem trabalha com filamentos compostos como fibra de carbono ou madeira, estes bicos resistem ao desgaste, garantindo uma extrusão consistente e uma longa vida útil.",
                Preco = 125.50m,
                UrlImagemPrincipal = "/images/products/kit-nozzle.png",
                Especificacoes = new List<string> { "Material: Aço Endurecido", "Tamanhos: 0.2, 0.4, 0.6, 0.8, 1.0mm", "Compatibilidade: Titan Pro, Ender 3, etc." }
            },
            new Produto
            {
                Nome = "Filamento PETG Premium (Branco)",
                DescricaoCurta = "1kg de filamento PETG de alta qualidade, resistente e fácil de imprimir.",
                Historia = "Nosso filamento PETG é produzido localmente com controle de qualidade rigoroso para garantir um diâmetro consistente de 1.75mm, resultando em impressões sem falhas, com ótima aderência entre camadas e alta resistência mecânica.",
                Preco = 95.00m,
                UrlImagemPrincipal = "/images/products/filamento-petg.png",
                Especificacoes = new List<string> { "Material: PETG", "Diâmetro: 1.75mm (±0.02mm)", "Peso: 1kg", "Temperatura de Impressão: 230-250°C" }
            }
        };

        // Adiciona a lista de produtos ao contexto do banco de dados
        context.Produtos.AddRange(produtos);
        // Salva as mudanças no banco de dados
        context.SaveChanges();
    }
}
// FIM DA NOVA CLASSE
// =======================================================================