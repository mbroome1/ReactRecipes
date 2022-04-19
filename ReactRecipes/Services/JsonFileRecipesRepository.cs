//using Newtonsoft.Json;
using ReactRecipes.Models;
using System.Text;
using System.Text.Json;

namespace ReactRecipes.Services
{
    public class JsonFileRecipesRepository : IRecipesRepository
    {
        public JsonFileRecipesRepository()
        {

        }

        public async Task<RecipeDto> GetRecipeAsync(int id)
        {
            using (StreamReader reader = new StreamReader("JsonRecipe.json", Encoding.UTF7))
            {
                var json = await reader.ReadToEndAsync();
                reader.Close();

                var options = new JsonSerializerOptions
                {
                    PropertyNameCaseInsensitive = true
                };
                var result = JsonSerializer.Deserialize<RecipeDto>(json, options);

                return result;
            };
        }

        public async Task<RecipeSearchDto> GetRecipesAsync(string searchQuery, int? numberOfRecords, int? offset)
        {
            using (StreamReader reader = new StreamReader("JsonRecipesSearch.json", Encoding.UTF7))
            {
                var json = await reader.ReadToEndAsync();
                reader.Close();

                var options = new JsonSerializerOptions
                {
                    PropertyNameCaseInsensitive = true
                };

                var result = JsonSerializer.Deserialize<RecipeSearchDto>(json, options);

                return result;
            };
        }
    }
}
