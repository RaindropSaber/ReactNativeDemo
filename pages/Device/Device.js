import React, {Component} from 'react';
import {AppRegistry,Platform,Dimensions,StyleSheet, Text, View,ScrollView,Button} from 'react-native';
import DeviceInfo from 'react-native-device-info'
import List from './../../components/List'
import styles from '../Home.css'
const deviceWidthDp = Dimensions.get('window').width;

export default class Device extends React.Component {
    static navigationOptions = {
        title: 'Device',
    };
    constructor(props){
		super(props);
		this.state = {
            module:[
                {title:"获取设备品牌",description:"getBrand"},
                {title:"获取设备制造商",description:"getManufacturer"},
                {title:"获取设备操作系统名称",description:"getSystemName"},
                {title:"获取设备操作系统版本",description:"getSystemVersion"},
                {title:"获取应用程序内部版本号",description:"getBuildNumber"},
                {title:"获取设备唯一ID",description:"getUniqueID"},
                {title:"获取设备区域设置",description:"getDeviceLocale"},
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
        this.setState((module)=>{
            module:module
        })
    }
    onTouchList = (item)=>{
        alert(DeviceInfo[item.description]());
    }
}
