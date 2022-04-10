//using Newtonsoft.Json;
using ReactRecipes.Models;
using System.Text.Json;

namespace ReactRecipes.Services
{
    public class JsonFileRecipesRepository : IRecipesRepository
    {
        public JsonFileRecipesRepository()
        {

        }

        public async Task<Recipe> GetRecipeAsync(int id)
        {
            using (StreamReader reader = new StreamReader("JsonRecipesSearch.json"))
            {
                var json = await reader.ReadToEndAsync();
                reader.Close();

                var options = new JsonSerializerOptions
                {
                    PropertyNameCaseInsensitive = true
                };
                var result = JsonSerializer.Deserialize<Recipe>(json, options);

                return result;
            };
        }

        public async Task<RecipeSearch> GetRecipesAsync(string searchQuery, int? numberOfRecords, int? offset)
        {
            using (StreamReader reader = new StreamReader("JsonRecipesSearch.json"))
            {
                var json = await reader.ReadToEndAsync();
                reader.Close();

                var options = new JsonSerializerOptions
                {
                    PropertyNameCaseInsensitive = true
                };

                var result = JsonSerializer.Deserialize<RecipeSearch>(json, options);

                return result;
            };
        }
    }
}
