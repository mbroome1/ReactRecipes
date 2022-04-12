namespace ReactRecipes.Models
{
    public class ExtendedIngredientDto
    {
        public int Id { get; set; }
        public string Aisle { get; set; }
        public string Image { get; set; }
        public string Consistency { get; set; }
        public string Name { get; set; }
        public string NameClean { get; set; }
        public string Original { get; set; }
        public string OriginalString { get; set; }
        public string OriginalName { get; set; }
        public float Amount { get; set; }
        public string Unit { get; set; }
        public List<string> Meta { get; set; } = new List<string>();
        public List<string> MetaInformation { get; set; } = new List<string>();
        public MeasuresDto Measures { get; set; }
    }
}