using Flunt.Notifications;
using Flunt.Validations;
using Labsit.ReconhecimentoFacial.Domain.Shared.Commands;

namespace Labsit.ReconhecimentoFacial.Domain.Commands
{
    public class CompareImagesCommand : Notifiable, ICommand
    {
        public byte[] ImageFromGallery { get; set; }
        public byte[] ImageFromCamera { get; set; }

        public void Validate()
        {
            AddNotifications(new Contract()
                            .Requires()
                            .IsNotNull(ImageFromGallery, "ImageFromGallery", "É obrigatório o envio de uma foto da galeria de imagens.")
                            .IsNotNull(ImageFromCamera, "ImageFromCamera", "É obrigatório o envio de uma foto da camera tirada na hora."));
        }
    }
}