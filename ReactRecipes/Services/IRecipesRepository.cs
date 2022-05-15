using ReactRecipes.Models;
using ReactRecipes.ResourceParameters;

namespace ReactRecipes.Services
{
    public interface IRecipesRepository
    {
        Task<RecipeSearchDto> GetRecipesAsync(RecipesSearchResourceParameters recipesSearchResourceParameters);
        Task<RecipeDto> GetRecipeAsync(int id);
    }
}
