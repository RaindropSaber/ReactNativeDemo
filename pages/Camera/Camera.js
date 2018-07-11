import React, {Component} from 'react';
import {AppRegistry,
        Platform, 
        StyleSheet, 
        Text, 
        View,
        ScrollView,
        Button,
        Dimensions,
        TouchableOpacity,
        CameraRoll
} from 'react-native';
import {RNCamera} from 'react-native-camera';
export default class Camera extends React.Component {
    static navigationOptions = {
        title: 'Camera',
    };
    render() {
        return (
          <View style={styles.container}>
            <RNCamera
                ref={ref => {
                  this.camera = ref;
                }}
                style = {styles.preview}
                type={RNCamera.Constants.Type.back}
                flashMode={RNCamera.Constants.FlashMode.on}
                onCameraReady={()=>this.onCameraReady()}
                onMountError={()=>this.onMountError()}
                onBarCodeRead={(res)=>this.onBarCodeRead(res)}
                permissionDialogTitle={'Permission to use camera'}
                permissionDialogMessage={'We need your permission to use your camera phone'}
            />
            <View style={{flex: 0, flexDirection: 'row', justifyContent: 'center',}}>
                <TouchableOpacity
                    onPress={()=>this.takePicture()}
                    style = {styles.capture}
                >
                    <Text style={{fontSize: 14}}> SNAP </Text>
                </TouchableOpacity>
            </View>
          </View>
        );
      }
    onCameraReady(){
        alert("onCameraReady")
    }
    onMountError(){
        alert("onMountError")
    }
    takePicture = async function() {
        if (this.camera) {
            const options = {quality: 0.5};
            const data = await this.camera.takePictureAsync(options)
            console.warn("缓存地址",data.uri);
            this.props.navigation.navigate('Gallery',data.uri)
            // this.saveImg(data.uri)
        }
    };
    saveImg(img) {
        var promise = CameraRoll.saveImageWithTag(img);
        promise.then(function(result) {
          alert('保存成功！地址如下：\n' + result);
        }).catch(function(error) {
          alert('保存失败！\n' + error);
        });
      }
} 
const styles = StyleSheet.create({
      container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'black'
      },
      preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center'
      },
      capture: {
        flex: 0,
        backgroundColor: '#fff',
        borderRadius: 5,
        padding: 15,
        paddingHorizontal: 20,
        alignSelf: 'center',
        margin: 20
      }
});