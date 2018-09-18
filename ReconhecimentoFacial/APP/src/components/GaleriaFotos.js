import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import CameraRollPicker from 'react-native-camera-roll-picker';

export default class ImageGallery extends Component {
    static navigationOptions = {
        title: 'Galeria de Fotos',
    };

    constructor(props) {
        super(props);

        this.state = {
            num: 0,
            selected: [],
            foto: {}
        };
    }

    getSelectedImages(images, current) {
        var num = images.length;

        this.setState({
            num: num,
            selected: images,
        });

        var RNGRP = require('react-native-get-real-path');
        var RNFS = require('react-native-fs');

        RNGRP.getRealPathFromURI(images[0].uri).then(path => {
            RNFS.readFile(path, 'base64').then(imageBase64 => {
                var foto = {
                    base64: imageBase64,
                    uri: 'file://' + path,
                    height: images[0].height,
                    width: images[0].width
                };

                this.props.navigation.navigate('Home', {
                    fotoGaleria: foto
                });
            });
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.content}>
                    <Text style={styles.text}>
                        <Text style={styles.bold}> {this.state.num} </Text> imagem selecionada
          </Text>
                </View>
                <CameraRollPicker
                    scrollRenderAheadDistance={500}
                    initialListSize={1}
                    pageSize={3}
                    removeClippedSubviews={false}
                    groupTypes='SavedPhotos'
                    batchSize={5}
                    maximum={1}
                    selected={this.state.selected}
                    assetType='Photos'
                    imagesPerRow={3}
                    imageMargin={5}
                    callback={this.getSelectedImages.bind(this)} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F6AE2D',
    },
    content: {
        marginTop: 15,
        height: 50,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        flexWrap: 'wrap',
    },
    text: {
        fontSize: 16,
        alignItems: 'center',
        color: '#fff',
    },
    bold: {
        fontWeight: 'bold',
    },
    info: {
        fontSize: 12,
    },
});