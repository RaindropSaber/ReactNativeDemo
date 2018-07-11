/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {AppRegistry,Platform, StyleSheet, Text, View,ScrollView,Button} from 'react-native';
import List from './../components/List'
import styles from './Home.css'
type Props = {};
export default class Home extends Component<Props> {
    static navigationOptions = {
        title: 'React Native',
    };
    constructor(props){
		super(props);
		this.state = {
            module:[
                {title:"设备信息",description:"react-native-device-info",navigatePage:'Device'},
                {title:"相机功能",description:"react-native-camera",navigatePage:'Camera'},
                {title:"扫码功能",description:"react-native-camera",navigatePage:'QRcode'},
                {title:"相册功能",description:"react-native-image-picker",navigatePage:'Gallery'},
                {title:"音频功能",description:"react-native-sound",navigatePage:'Audio'},
                {title:"文件功能",description:"react-native-fs",navigatePage:'SysFile'},
            ],
		}
    }
    render() {
        return (
            <View style={styles.main}>
                <View style={styles.ScrollView}><ScrollView>{this.state.module}</ScrollView></View>
            </View>
            
        );
    }
    componentWillMount(){
        this.ListMount(this.state.module)
    }
    ListMount(module){
        for(i in module){
            module.splice(i,1,
                <List key={i} item={module[i]} onTouchList={(item)=>this.onTouchList(item)} />
            );
        }
        this.setState({
            module:module
        })
    }
    onTouchList = (item)=>{
        this.props.navigation.navigate(item.navigatePage)
    }
}





