using System;
using System.Threading.Tasks;
using Labsit.ReconhecimentoFacial.Domain.ValueObjects;
using Microsoft.ProjectOxford.Face.Contract;

namespace Labsit.ReconhecimentoFacial.Domain.Services
{
    public interface IFaceClientService
    {
        Face[] DetectFace(byte[] imagem);
        VerifyResult Verify(Guid faceId1, Guid faceId2);
    }
}