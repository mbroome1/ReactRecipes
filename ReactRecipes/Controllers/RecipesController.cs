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
        public async Task<ActionResult<RecipeSearch>> GetRecipes( string searchQuery, int? numberOfRecords = 10, int? offset = 0)
        {
            var recipes = await recipesRepository.GetRecipesAsync(searchQuery, numberOfRecords, offset);
            if (recipes == null)
            {
                return NotFound();
            }
            return Ok(recipes);
        }
    }
}
