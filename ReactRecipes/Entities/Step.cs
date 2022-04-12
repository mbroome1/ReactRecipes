using System.Text.Json.Serialization;

namespace ReactRecipes.Entities
{
    public class Step
    {
        public int Number { get; set; }

        [JsonPropertyName("Step")]
        public string Description { get; set; }
        public List<Ingredient> Ingredients { get; set; } = new List<Ingredient>();
        public List<Equipment> Equipment { get; set; } = new List<Equipment>();
        public Length Length { get; set; }
    }

}

