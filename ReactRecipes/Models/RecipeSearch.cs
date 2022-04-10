namespace ReactRecipes.Models
{
    public class RecipeSearch
    {
        public List<RecipeSearchResult> Results { get; set; } = new List<RecipeSearchResult>();
        public int Offset { get; set; }
        public int Number { get; set; }
        public int TotalResults { get; set; }
    }
}
