import React, {Component} from 'react';
import {AppRegistry,Platform, StyleSheet, Text, View,ScrollView,Button} from 'react-native';
import Sound from 'react-native-sound';
Sound.setCategory('Playback');
const url2="https://m10.music.126.net/20180711170417/cf247a93a4d571987ed56e68b087cebf/ymusic/4d9b/c650/4133/73b6c1f02c5a0dd72edbfedbe24b17f0.mp3"
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
    soundLoad(){
        this.state.s = new Sound(url2,null, (e) => {
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

