namespace ReactRecipes.Models
{
    public class EquipmentDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string LocalizedName { get; set; }
        public string Image { get; set; }
        public TemperatureDto Temperature { get; set; }
    }
}