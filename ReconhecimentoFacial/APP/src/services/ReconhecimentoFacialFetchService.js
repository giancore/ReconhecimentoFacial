import { Platform } from 'react-native';

const enderecoApi = Platform.OS === 'ios' ? 'http://localhost:8080/api/' : 'http://10.0.3.2:5000/api/'

export default class ReconhecimentoFacialFetchService {

    static compararFotos(fotoCamera, fotoGaleria) {
        const uri = enderecoApi + 'ReconhecimentoFacial';

        var arquivos = new FormData();
        arquivos.append('fotoCamera', {
            uri: fotoCamera.uri,
            name: 'fotoCamera.jpg',
            type: 'image/jpg'
        });

        arquivos.append('fotoGaleria', {
            uri: fotoGaleria.uri,
            name: 'fotoGaleria.jpg',
            type: 'image/jpg'
        });

        return fetch(uri,
            {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'multipart/form-data'
                },
                body: arquivos
            })
            .then(resposta => resposta.json());
    };
}