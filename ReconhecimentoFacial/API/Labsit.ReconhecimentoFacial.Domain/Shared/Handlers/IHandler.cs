using Labsit.ReconhecimentoFacial.Domain.Shared.Commands;

namespace Labsit.ReconhecimentoFacial.Domain.Shared.Handlers
{
    public interface IHandler<T> where T : ICommand
    {
        ICommandResult Handle(T command);
    }
}