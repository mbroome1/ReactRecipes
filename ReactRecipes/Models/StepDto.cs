using System.Text.Json.Serialization;

namespace ReactRecipes.Models
{
    public class StepDto
    {
        public int Number { get; set; }

        [JsonPropertyName("Step")]
        public string Description { get; set; }
        public List<IngredientDto> Ingredients { get; set; } = new List<IngredientDto>();
        public List<EquipmentDto> Equipment { get; set; } = new List<EquipmentDto>();
        public LengthDto Length { get; set; }
    }
}