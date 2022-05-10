namespace ReactRecipes.Models
{
    public class WinePairingDto
    {
        public List<string> PairedWines { get; set; } = new List<string>();
        public string? PairingText { get; set; }
        public List<ProductMatchesDto> ProductMatches { get; set; } = new List<ProductMatchesDto>();
    }

}

