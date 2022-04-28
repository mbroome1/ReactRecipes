using Microsoft.AspNetCore.Mvc;
using ReactRecipes.Models;
using System.Text.Json;

namespace ReactRecipes.Services
{
    public class SpoonacularRecipesRepository : IRecipesRepository
    {
        private readonly IHttpClientFactory clientFactory;
        private readonly IConfiguration config;

        public SpoonacularRecipesRepository(IHttpClientFactory clientFactory, IConfiguration config)
        {
            this.clientFactory = clientFactory ?? throw new ArgumentNullException(nameof(clientFactory));
            this.config = config ?? throw new ArgumentNullException(nameof(config));
        }

        public async Task<RecipeDto> GetRecipeAsync(int id)
        {
            var httpClient = clientFactory.CreateClient();
            var key = config["spoonacular"];

            string url =
                $@"https://api.spoonacular.com/recipes/{id}/information?apiKey={key}";

            HttpRequestMessage request = new HttpRequestMessage(HttpMethod.Get, url);
            HttpResponseMessage response = await httpClient.SendAsync(request);

            if (response.IsSuccessStatusCode)
            {
                var responseAsJson = await response.Content.ReadFromJsonAsync<RecipeDto>();
                return responseAsJson;
            }
            else
            {
                throw new Exception(response.ReasonPhrase);
                //throw new Exception("Custom Error Message from GetRecipeAsync in Sp.Repository");
            }
        }

        public async Task<RecipeSearchDto> GetRecipesAsync(string searchQuery, int? numberOfRecords, int? offset)
        {
            var httpClient = clientFactory.CreateClient();
            var key = config["spoonacular"];

            string url = 
                $"https://api.spoonacular.com/recipes/complexSearch?query={searchQuery}&number={numberOfRecords}&offset={offset}&apiKey={key}";

            HttpRequestMessage request = new HttpRequestMessage(HttpMethod.Get, url);
            HttpResponseMessage response = await httpClient.SendAsync(request);

            //if (response.IsSuccessStatusCode)
            //{
                var responseAsJson = await response.Content.ReadFromJsonAsync<RecipeSearchDto>();
                return responseAsJson;
            //}
            //else
            //{
            //    throw new Exception("Custom Error Message from GetRecipesAsync in Sp.Repository");
            //}



        }
    }
}
