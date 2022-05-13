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
        public async Task<ActionResult<RecipeSearchDto?>> GetRecipes(
            string searchQuery, int? numberOfRecords = 10, int? offset = 0)
        {
            try
            {
                var recipes = await recipesRepository.GetRecipesAsync(searchQuery, numberOfRecords, offset);
                
                if (recipes.Results.Count == 0)
                {
                    return NotFound();
                }

                return Ok(recipes);
            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }

        }

        [HttpGet("{id}")]
        public async Task<ActionResult<RecipeDto>> GetRecipe(int id)
        {
            var recipe = await recipesRepository.GetRecipeAsync(id);
            if (recipe == null)
            {
                return NotFound();
            }

            return  Ok(recipe);
        }
    }
}
