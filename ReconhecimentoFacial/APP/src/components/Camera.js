import React, { Component } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { RNCamera } from "react-native-camera";

export default class Camera extends Component {
    static navigationOptions = {
        title: 'Camera',
    };

    tirarFoto = async () => {
        if (this.camera) {
            const options = { quality: 0.5, base64: true };
            const data = await this.camera.takePictureAsync(options);

            this.props.navigation.navigate('Home', {
                fotoCamera: data
            });
        }
    };

    render() {
        return (
            <View style={styles.container}>
                <RNCamera
                    ref={camera => {
                        this.camera = camera;
                    }}
                    style={styles.preview}
                    type={RNCamera.Constants.Type.front}
                    autoFocus={RNCamera.Constants.AutoFocus.on}
                    flashMode={RNCamera.Constants.FlashMode.off}
                    permissionDialogTitle={"Permission to use camera"}
                    permissionDialogMessage={
                        "We need your permission to use your camera phone"
                    }
                />
                <View style={styles.buttonContainer}>
                    <TouchableOpacity onPress={this.tirarFoto} style={styles.capture}>
                        <Text style={styles.buttonText}> Tirar Foto </Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        backgroundColor: "black"
    },
    preview: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center"
    },
    buttonContainer: {
        flex: 0,
        flexDirection: "row",
        justifyContent: "center"
    },
    capture: {
        flex: 0,
        backgroundColor: "#fff",
        borderRadius: 5,
        padding: 15,
        paddingHorizontal: 20,
        alignSelf: "center",
        margin: 20
    },
    buttonText: {
        fontSize: 14
    }
});