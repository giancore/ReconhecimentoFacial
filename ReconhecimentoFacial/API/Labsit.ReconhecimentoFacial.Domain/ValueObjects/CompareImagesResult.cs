using Labsit.ReconhecimentoFacial.Domain.Shared.ValueObjects;

namespace Labsit.ReconhecimentoFacial.Domain.ValueObjects
{
    public class CompareImagesResult : ValueObject
    {
        public bool IsIdentical { get; set; }
        public double Confidence { get; set; }
    }
}