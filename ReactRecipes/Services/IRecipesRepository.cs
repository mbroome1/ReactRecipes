using ReactRecipes.Models;

namespace ReactRecipes.Services
{
    public interface IRecipesRepository
    {
        Task<RecipeSearch> GetRecipesAsync(string searchQuery, int? numberOfRecords, int? offset);
        Task<Recipe> GetRecipeAsync(int id);
    }
}
