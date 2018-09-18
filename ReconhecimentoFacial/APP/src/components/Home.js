import React from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { Avatar, Button } from 'react-native-elements';
import ReconhecimentoFacialFetchService from '../services/ReconhecimentoFacialFetchService';
import Loader from './Loader';

export default class Home extends React.Component {
    static navigationOptions = {
        title: 'Reconhecimento Facial'
    };

    constructor() {
        super();
        this.state = {
            fotoCamera: {},
            fotoGaleria: {},
            loading: false
        };
    }

    componentWillReceiveProps(nextProps) {
        const fotoCamera = nextProps.navigation.getParam('fotoCamera');

        if (fotoCamera) {
            this.setState({ fotoCamera: fotoCamera });
        }

        const fotoGaleria = nextProps.navigation.getParam('fotoGaleria');

        if (fotoGaleria) {
            this.setState({ fotoGaleria: fotoGaleria });
        }
    }

    possuiImagem() {
        return this.state.fotoCamera.uri && this.state.fotoGaleria.uri;
    }

    compararFotos() {
        this.setState({ loading: true });

        ReconhecimentoFacialFetchService.compararFotos(this.state.fotoCamera, this.state.fotoGaleria)
            .then((retorno) => {
                this.setState({ loading: false });

                if (retorno.success) {
                    Alert.alert("Comparação realiada com sucesso", retorno.message);
                } else {
                    Alert.alert(retorno.message, retorno.data[0].message);
                }
            })
            .catch(err => {
                console.warn(err);
                this.setState({ loading: false });
            });
    }

    render() {
        const { navigation } = this.props;

        return (
            <View style={styles.container}>
                <Loader loading={this.state.loading} />
                <View style={styles.avatars} >
                    <View style={styles.avatar}>
                        <Avatar
                            ref={component => this.avatarFotoGaleria = component}
                            xlarge
                            title="UP"
                            source={{ uri: (this.state.fotoGaleria || {}).uri }}
                            activeOpacity={0.7}
                        />
                    </View>

                    <View style={styles.avatar}>
                        <Avatar
                            ref={component => this.avatarFotoCamera = component}
                            xlarge
                            title="PH"
                            source={{ uri: (this.state.fotoCamera || {}).uri }}
                            activeOpacity={0.7}
                        />
                    </View>
                </View>

                <View>
                    <View style={styles.botao}>
                        <Button
                            rightIcon={{ name: 'photo' }}
                            title='CARREGAR FOTO'
                            onPress={() => navigation.navigate('GaleriaFotos', { name: 'GaleriaFotos' })} />
                    </View>

                    <View style={styles.botao}>
                        <Button
                            rightIcon={{ name: 'camera-front' }}
                            title='TIRAR FOTO'
                            onPress={() => navigation.navigate('Camera', { name: 'Camera' })} />
                    </View>

                    <View style={styles.botao}>
                        <Button
                            rightIcon={{ name: 'compare' }}
                            title='COMPARAR FOTOS'
                            disabled={!this.possuiImagem()}
                            onPress={() => this.compararFotos()} />
                    </View>
                </View>
            </View >
        );
    }
}

const styles = StyleSheet.create({
    botao: {
        marginBottom: 5
    },
    avatar: {
        margin: 20
    },
    avatars: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-end',
        marginBottom: 50
    },
    modalBackground: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'space-around',
        backgroundColor: '#00000040'
    },
    activityIndicatorWrapper: {
        backgroundColor: '#FFFFFF',
        height: 100,
        width: 100,
        borderRadius: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around'
    }
});
