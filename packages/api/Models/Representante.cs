namespace Chromatech.Api.Models
{
    public class Representante
    {
        public int Id { get; set; }
        public string Nome { get; set; } = string.Empty;
        public string Cargo { get; set; } = string.Empty;
        public string Biografia { get; set; } = string.Empty;
        public string UrlFoto { get; set; } = string.Empty;
    }
}
