namespace ReactRecipes.Models
{
    public class RecipeDto
    {
        public int Id { get; set; }
        public bool Vegetarian { get; set; }
        public bool Vegan { get; set; }
        public bool GlutenFree { get; set; }
        public bool DairyFree { get; set; }
        public bool VeryHealthy { get; set; }
        public bool Cheap { get; set; }
        public bool VeryPopular { get; set; }
        public bool Sustainable { get; set; }
        public int WeightWatcherSmartPoints { get; set; }
        public string Gaps { get; set; }
        public bool LowFodmap { get; set; }
        public int AggregateLikes { get; set; }
        public float SpoonacularScore { get; set; }
        public float HealthScore { get; set; }
        public string CreditsText { get; set; }
        public string License { get; set; }
        public string SourceName { get; set; }
        public float PricePerServing { get; set; }
        public List<ExtendedIngredientDto> ExtendedIngredients { get; set; } = new List<ExtendedIngredientDto>();
        public string Title { get; set; }
        public string Author { get; set; }
        public int ReadyInMinutes { get; set; }
        public int Servings { get; set; }
        public string SourceUrl { get; set; }
        public string Image { get; set; }
        public string ImageType { get; set; }
        public string Summary { get; set; }
        public List<string> Cuisines { get; set; } = new List<string>();
        public List<string> DishTypes { get; set; } = new List<string>();
        public List<string> Diets { get; set; } = new List<string>();
        public List<string> Occasions { get; set; } = new List<string>();
        //public WinePairingDto WinePairing { get; set; } = new WinePairingDto();
        public string Instructions { get; set; }
        public List<AnalyzedInstructionDto> AnalyzedInstructions { get; set; } = new List<AnalyzedInstructionDto>();
        public object OriginalId { get; set; }
        public string SpoonacularSourceUrl { get; set; }
    }
}
