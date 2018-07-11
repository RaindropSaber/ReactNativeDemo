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
        Alert,
} from 'react-native';
import {RNCamera} from 'react-native-camera';
const deviceWidthDp= Dimensions.get('window').width;
const deviceHeightDp= Dimensions.get('window').height;
export default class QRcode extends React.Component {
    static navigationOptions = {
        title: 'QRcode',
    };
    constructor(props) {
        super(props);
        this.state = {
            onBarCodeRead:true,
        };
    }
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
            <View style={styles.content}>
                    <View style={styles.QRcodeBox}></View>
                    <Text style={styles.tips}>将二维码放入框内自动扫描</Text>
            </View>
          </View>
        );
      }
    onCameraReady(){
        console.log("onCameraReady")
    }
    onMountError(){
        console.log("onMountError")
    }
    onBarCodeRead(res){
        if(this.state.onBarCodeRead){
            this.setState({
                onBarCodeRead:false,
            })
            Alert.alert(res.type,
                res.data,
                [
                    {text:"确认",
                    onPress: () => this.setState({
                        onBarCodeRead:true,
                    })
                    },
                    {text:"退出",onPress: () => this.props.navigation.navigate("Home")}
                ]
            )
        }
        
    }
} 
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'black',
        alignItems: 'center',
        justifyContent: 'center',
    },
    preview: {
        width:deviceWidthDp,
        height:deviceHeightDp-64,
        position:'absolute',
        top:0
    },
    content: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    QRcodeBox:{
        width:250,
        height:250,
        borderWidth:3,
        borderColor:"green",
    },
    tips:{
        marginTop:5,
        color:"#FFFFFF",
    },
});