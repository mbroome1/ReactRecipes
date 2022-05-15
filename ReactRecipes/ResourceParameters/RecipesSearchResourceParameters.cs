using System.ComponentModel.DataAnnotations;

namespace ReactRecipes.ResourceParameters
{
    public class RecipesSearchResourceParameters
    {
        [Required(ErrorMessage = "Search must not be empty.")]
        public string SearchQuery { get; set; } = "";
        public int NumberOfRecords { get; set; } = 10;
        public int Offset { get; set; } = 0;
    }
}
