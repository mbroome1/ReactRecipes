using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ReactRecipes.Models;
using ReactRecipes.ResourceParameters;
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
            [FromQuery] RecipesSearchResourceParameters recipesSearchResourceParameters)
        {
            try
            {
                var recipes = await recipesRepository.GetRecipesAsync(recipesSearchResourceParameters);

                return Ok(recipes);
            }
            catch (Exception ex)
            {
 
                return StatusCode(500, ex.Message);
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
