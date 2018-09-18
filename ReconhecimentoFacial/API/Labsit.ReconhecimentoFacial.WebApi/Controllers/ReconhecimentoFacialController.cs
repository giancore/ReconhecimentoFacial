using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Labsit.ReconhecimentoFacial.Domain.Commands;
using Labsit.ReconhecimentoFacial.Domain.Handlers;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Labsit.ReconhecimentoFacial.WebApi.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    [ApiController]
    public class ReconhecimentoFacialController : ControllerBase
    {
        readonly CompareImagesHandler _handler;

        public ReconhecimentoFacialController(CompareImagesHandler compareImagesHandler)
        {
            _handler = compareImagesHandler;
        }

        [HttpPost]
        public async Task<IActionResult> Post(IFormCollection arquivos)
        {
            if (arquivos == null)
            {
                return BadRequest();
            }

            var command = new CompareImagesCommand();

            using (var memoryStream = new System.IO.MemoryStream())
            {
                var photoCamera = arquivos.Files.GetFile("fotoCamera");

                await photoCamera.CopyToAsync(memoryStream);
                command.ImageFromCamera = memoryStream.ToArray();
            }

            using (var memoryStream = new System.IO.MemoryStream())
            {
                var photoGallery = arquivos.Files.GetFile("fotoGaleria");

                await photoGallery.CopyToAsync(memoryStream);
                command.ImageFromGallery = memoryStream.ToArray();
            }

            var response = _handler.Handle(command);

            return Ok(response);
        }
    }
}