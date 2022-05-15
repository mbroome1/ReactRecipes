using Microsoft.AspNetCore.Mvc;
using ReactRecipes.Models;
using ReactRecipes.ResourceParameters;
using System.Net;
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

        public async Task<RecipeSearchDto> GetRecipesAsync(RecipesSearchResourceParameters recipesSearchResourceParameters)
        {
            var httpClient = clientFactory.CreateClient();
            var key = config["spoonacular"];
            string url = 
                $"https://api.spoonacular.com/recipes/complexSearch" +
                $"?query={recipesSearchResourceParameters.SearchQuery}" +
                $"&number={recipesSearchResourceParameters.NumberOfRecords}" +
                $"&offset={recipesSearchResourceParameters.Offset}" +
                $"&apiKey={key}";

            try
            {
                HttpRequestMessage request = new HttpRequestMessage(HttpMethod.Get, url);
                HttpResponseMessage response = await httpClient.SendAsync(request);

                if (response.IsSuccessStatusCode)
                {
                    var responseAsJson = await response.Content.ReadFromJsonAsync<RecipeSearchDto?>();
                    if (responseAsJson == null)
                    {
                        throw new Exception("Unable to get recipes.");

                    }
                    return responseAsJson;
                }
                else if (response.StatusCode == HttpStatusCode.PaymentRequired)
                {
                    throw new Exception("Sorry, the server has exceeded its daily access limit to external recipes. Please try again later.");
                }
                else if (response.StatusCode == HttpStatusCode.Unauthorized)
                {
                    throw new Exception("Unauthorised request to external api.");
                }
                else
                {
                    throw new Exception("Something went wrong on the server.");
                }
            }
            catch (Exception ex)
            {
                //throw new Exception("Custom Error Message from GetRecipesAsync in Sp.Repository");
                throw new Exception(ex.Message);
            }





        }
    }
}
