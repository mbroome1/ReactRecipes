namespace ReactRecipes.Models
{
    public class AnalyzedInstructionDto
    {
        public string Name { get; set; }
        public List<StepDto> Steps { get; set; } = new List<StepDto>();
    }
}