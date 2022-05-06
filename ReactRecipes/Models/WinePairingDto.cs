namespace ReactRecipes.Models
{
    public class WinePairingDto
    {
        public List<string> PairedWines { get; set; } = new List<string>();
        public string? PairingText { get; set; }
        public List<string> ProductMatches { get; set; } = new List<string>();
    }

}

