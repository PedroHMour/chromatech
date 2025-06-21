# --- Estágio 1: Build da Aplicação ---
# Usamos a imagem oficial do .NET SDK 8.0 para compilar nossa aplicação.
# A nomenclatura 'alpine' se refere a uma versão leve do Linux, otimizada para contêineres.
FROM mcr.microsoft.com/dotnet/sdk:8.0-alpine AS build

# Definimos o diretório de trabalho dentro do contêiner.
WORKDIR /app

# Copiamos os arquivos de projeto (.csproj e .sln) primeiro.
# Isso otimiza o cache do Docker. Se não mudarmos as dependências, o Docker não precisa baixá-las de novo.
COPY ["Chromatech.Api.csproj", "."]

# Restauramos as dependências do NuGet.
RUN dotnet restore "Chromatech.Api.csproj"

# Copiamos o resto do código fonte do projeto.
COPY . .

# Publicamos a aplicação em modo de Release (otimizado para produção).
# A saída será colocada na pasta /app/publish.
RUN dotnet publish "Chromatech.Api.csproj" -c Release -o /app/publish

# --- Estágio 2: Imagem Final ---
# Agora, usamos uma imagem muito menor, que contém apenas o necessário para RODAR a aplicação.
FROM mcr.microsoft.com/dotnet/aspnet:8.0-alpine AS final

WORKDIR /app

# Copiamos apenas os arquivos publicados do estágio de build para a imagem final.
COPY --from=build /app/publish .

# O ENTRYPOINT define o comando que será executado quando o contêiner iniciar.
ENTRYPOINT ["dotnet", "Chromatech.Api.dll"]