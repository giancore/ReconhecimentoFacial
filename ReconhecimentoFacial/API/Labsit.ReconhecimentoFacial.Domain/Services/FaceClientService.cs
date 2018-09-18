using System;
using System.IO;
using Flunt.Notifications;
using Labsit.ReconhecimentoFacial.Domain.Shared.Settings;
using Microsoft.Extensions.Options;
using Microsoft.ProjectOxford.Face;
using Microsoft.ProjectOxford.Face.Contract;

namespace Labsit.ReconhecimentoFacial.Domain.Services
{
    public class FaceClientService : Notifiable, IFaceClientService
    {
        readonly IFaceServiceClient _faceServiceClient;

        public FaceClientService(IOptions<AzureSettings> azureSettings)
        {
            _faceServiceClient = new FaceServiceClient(azureSettings.Value.SubscriptionKey, azureSettings.Value.BaseUri);
        }

        public Face[] DetectFace(byte[] imagem)
        {
            var result = _faceServiceClient.DetectAsync(new MemoryStream(imagem));

            return result.Result;
        }

        public VerifyResult Verify(Guid faceId1, Guid faceId2)
        {
            var result = _faceServiceClient.VerifyAsync(faceId1, faceId2);

            return result.Result;
        }
    }
}