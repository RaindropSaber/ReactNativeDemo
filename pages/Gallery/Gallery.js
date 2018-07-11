import React, {Component} from 'react';
import {AppRegistry,Platform, StyleSheet, Text, View,ScrollView,Button,CameraRoll,Image,PixelRatio,
    TouchableOpacity,} from 'react-native';
import ImagePicker from 'react-native-image-picker';
export default class Gallery extends React.Component {
    static navigationOptions = {
        title: 'Gallery',
    };
    constructor(props){
		super(props);
		this.state = {
            imgURL: null,
		}
    }
    componentWillMount(){
        this.setState({
            imgURL: this.props.navigation.state.params
        });
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.image}>
                    <Image style={styles.img}
                    source={{uri: this.state.imgURL}}
                    resizeMode="contain" />
                </View>
                <View>
                    <Text onPress={this.saveImg.bind(this, this.state.imgURL)} style={styles.saveImg}>
                    保存图片到相册
                    </Text>
                </View>
                <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}>
                    <View>
                        <Text style={styles.saveImg}>选择照片</Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
    saveImg(img) {
        var promise = CameraRoll.saveToCameraRoll(img||"");
        promise.then(function(result) {
            alert('保存成功！地址如下：\n' + result);
        }).catch(function(error) {
            alert('保存失败！\n' + error);
        });
    }
    
    selectPhotoTapped() {
        const options = {
            title: '选择图片', 
            cancelButtonTitle: '取消',
            takePhotoButtonTitle: '拍照', 
            chooseFromLibraryButtonTitle: '选择照片', 
            cameraType: 'back',
            mediaType: 'photo',
            videoQuality: 'high', 
            durationLimit: 10, 
            maxWidth: 300,
            maxHeight: 300,
            quality: 0.8, 
            angle: 0,
            allowsEditing: false, 
            noData: false,
            storageOptions: {
                skipBackup: true  
            }
        };

        ImagePicker.showImagePicker(options, (response) => {
            console.warn('Response = ', response);

            if (response.didCancel) {
                console.warn('User cancelled photo picker');
            }
            else if (response.error) {
                console.warn('ImagePicker Error: ', response.error);
            }
            else if (response.customButton) {
                console.warn('User tapped custom button: ', response.customButton);
            }
            else {
                this.setState({
                    imgURL: response.uri
                });
            }
        });
    }
}
     
    //样式定义
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 30,
        alignItems:'center'
    },
    image:{
        borderWidth:1,
        width:262,
        height:467,
        borderRadius:5,
        borderColor:'#ccc'
    },
    img:{
        height:467,
        width:262,
    },
    saveImg:{
        height:30,
        padding:6,
        textAlign:'center',
        backgroundColor:'#3BC1FF',
        color:'#FFF',
        marginTop:10,
    }
});