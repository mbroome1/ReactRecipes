using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ReactRecipes.Models;
using ReactRecipes.Services;

namespace ReactRecipes.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RecipesController : ControllerBase
    {
        private readonly IRecipesRepository recipesRepository;

        public RecipesController(IRecipesRepository recipesRepository)
        {
            this.recipesRepository = recipesRepository ?? throw new ArgumentNullException(nameof(recipesRepository));
        }

        [HttpGet()]
        public async Task<ActionResult<RecipeSearchDto>> GetRecipes(
            string searchQuery, int? numberOfRecords = 10, int? offset = 0)
        {
            var recipes = await recipesRepository.GetRecipesAsync(searchQuery, numberOfRecords, offset);
            if (recipes == null)
            {
                return NotFound();
            }
            return Ok(recipes);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<RecipeDto>> GetRecipe(int recipeId)
        {
            var recipe = await recipesRepository.GetRecipeAsync(recipeId);
            if (recipe == null)
            {
                return NotFound();
            }

            return  Ok(recipe);
        }
    }
}
