namespace ReactRecipes.Models
{
    public class RecipeSearchDto
    {
        public List<RecipeSearchResultDto> Results { get; set; } = new List<RecipeSearchResultDto>();
        public int Offset { get; set; }
        public int Number { get; set; }
        public int TotalResults { get; set; }
    }
}
