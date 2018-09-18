using System.Linq;
using Flunt.Notifications;
using Labsit.ReconhecimentoFacial.Domain.Commands;
using Labsit.ReconhecimentoFacial.Domain.Services;
using Labsit.ReconhecimentoFacial.Domain.Shared.Commands;
using Labsit.ReconhecimentoFacial.Domain.Shared.Handlers;

namespace Labsit.ReconhecimentoFacial.Domain.Handlers
{
    public class CompareImagesHandler : Notifiable, IHandler<CompareImagesCommand>
    {
        readonly string ErrorMessageDefault = "Não foi possível realizar a comparação de imagens.";

        readonly IFaceClientService _faceClientService;

        public CompareImagesHandler(IFaceClientService faceClientService)
        {
            _faceClientService = faceClientService;
        }

        public ICommandResult Handle(CompareImagesCommand command)
        {
            command.Validate();
            if (command.Invalid)
            {
                AddNotifications(command);
                return new CommandResult(false, ErrorMessageDefault, Notifications);
            }

            var resultImageFromCamera = _faceClientService.DetectFace(command.ImageFromCamera);

            if (resultImageFromCamera == null || !resultImageFromCamera.Any())
            {
                AddNotification("ImageFromCamera", "Não foi possível detectar um rosto na foto tirada pela câmera.");
                return new CommandResult(false, ErrorMessageDefault, Notifications);
            }

            if (resultImageFromCamera.Length > 1)
            {
                AddNotification("ImageFromCamera", "A imagem enviada pela câmera possui mais de um rosto.");
                return new CommandResult(false, ErrorMessageDefault, Notifications);
            }

            var resultImageFromGallery = _faceClientService.DetectFace(command.ImageFromGallery);

            if (resultImageFromGallery == null  || !resultImageFromGallery.Any())
            {
                AddNotification("ImageFromGallery", "Não foi possível detectar um rosto na foto enviada da galeria de imagens.");
                return new CommandResult(false, ErrorMessageDefault, Notifications);
            }

            if (resultImageFromGallery.Length > 1)
            {
                AddNotification("ImageFromGallery", "A imagem enviada da galeria possui mais de um rosto.");
                return new CommandResult(false, ErrorMessageDefault, Notifications);
            }

            var result = _faceClientService.Verify(resultImageFromCamera.FirstOrDefault().FaceId, resultImageFromGallery.FirstOrDefault().FaceId);

            if (result.IsIdentical)
                return new CommandResult(true, $"As fotos são da mesma pessoa com {result.Confidence} de certeza.", result);
            else
                return new CommandResult(true, $"As fotos não são da mesma pessoa com {result.Confidence} de certeza.", result);
        }
    }
}