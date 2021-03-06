import React, {Component} from 'react';
import {AppRegistry,Platform, StyleSheet, Text, View,ScrollView,Button} from 'react-native';
import Sound from 'react-native-sound';
import RNFS from 'react-native-fs'
Sound.setCategory('Playback');
const url3= `${RNFS.DocumentDirectoryPath}/test.mp3`
const url2="file:///Users/ugen/Music/%E7%BD%91%E6%98%93%E4%BA%91%E9%9F%B3%E4%B9%90/test.mp3"
const url="https://music.163.com/song/media/outer/url?id=27937466.mp3"
export default class Audio extends React.Component {
    static navigationOptions = {
        title: 'Audio',
    };
    constructor(props){
        super(props);
        this.state={
            s:{}
        }
    }
    downloadFile() {
        return new Promise((r,j)=>{
            const downloadDest = `${RNFS.DocumentDirectoryPath}/test.mp3`;
            const formUrl="http://192.168.2.234:8000/test.mp3"
            const options = {
                fromUrl: formUrl,
                toFile: downloadDest,
                background: true,
                begin: (res) => {
                    console.warn('begin', res);
                    console.warn('contentLength:', res.contentLength / 1024 / 1024, 'M');
                },
                progress: (res) => {
        
                    let pro = res.bytesWritten / res.contentLength;
        
                    this.setState({
                        progressNum: pro,
                    });
                }
            };
            try {
                const ret = RNFS.downloadFile(options);
                ret.promise.then(res => {
                    console.warn('success', res);
                    this.setState({
                        downloadDest: 'file://' + downloadDest,
                    });
                    r(downloadDest)
                    console.warn('file://' + downloadDest)
                }).catch(err => {
                    console.warn('err', err);
                    j()
                });
            }
            catch (e) {
                console.warn("ssss",error);
                j(e)
            }
        })        
    }
    async soundLoad(){
        downloadDest =await this.downloadFile()
        this.state.s = new Sound(downloadDest,null, (e) => {
            if (e) {
                 console.warn('音乐加载失败');
                return;
            }
                 console.warn('音乐加载成功');
        });
    }
    soundPaly(){
        alert('soundPaly')
        this.state.s.play(() => this.state.s.release());
    }
    soundPause(){
        alert('soundPause')
        this.state.s.pause();
    }
    soundStop(){
        alert('soundStop')
        this.state.s.stop();
    }
    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{marginTop:50}} onPress={()=>this.soundLoad()}>Load</Text>
                <Text style={{marginTop:50}} onPress={()=>this.soundPaly()}>Play</Text>
                <Text style={{marginTop:50}} onPress={()=>this.soundPause()}>Pause</Text>
                <Text style={{marginTop:50}} onPress={()=>this.soundStop()}>Stop</Text>
            </View>
        );
    }
}


