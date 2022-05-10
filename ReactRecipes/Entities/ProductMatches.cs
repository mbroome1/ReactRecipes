namespace ReactRecipes.Entities
{
    public class ProductMatches
    {
        public int? Id { get; set; }
        public string? Title { get; set; }
        public double AverageRating { get; set; } = 0;
        public string? Description { get; set; }
        public string? ImageUrl { get; set; }
        public string? Link { get; set; }
        public string? Price { get; set; }
        public double Ratingcount { get; set; } = 0;
        public double Score { get; set; } = 0;
    }
}
