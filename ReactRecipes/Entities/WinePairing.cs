namespace ReactRecipes.Entities
{
    public class WinePairing
    {
        public List<string> PairedWines { get; set; } = new List<string>();
        public string? PairingText { get; set; }
        public List<ProductMatches> ProductMatches { get; set; } = new List<ProductMatches>();
    }

}

