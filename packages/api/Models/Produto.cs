namespace Chromatech.Api.Models
{
    public class Produto
    {
        public int Id { get; set; }
        public string Nome { get; set; } = string.Empty;
        public string DescricaoCurta {  get; set; } = string.Empty;
        public string Historia {  get; set; } = string.Empty;
        public decimal Preco { get; set; }
        public string UrlImagemPrincipal { get; set; } = string.Empty;
        public List<string> Especificacoes { get; set; } =new List<string>();
    }
}
