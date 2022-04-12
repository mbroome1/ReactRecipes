using ReactRecipes.Models;

namespace ReactRecipes.Services
{
    public interface IRecipesRepository
    {
        Task<RecipeSearchDto> GetRecipesAsync(string searchQuery, int? numberOfRecords, int? offset);
        Task<RecipeDto> GetRecipeAsync(int id);
    }
}
