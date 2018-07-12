import React, {Component} from 'react';
import {AppRegistry,Platform, StyleSheet, Text, View,ScrollView,Button,AsyncStorage,Dimensions,AlertIOS} from 'react-native';
const deviceWidthDp = Dimensions.get('window').width;
export default class Sqlite extends React.Component {
    static navigationOptions = {
        title: 'Sqlite',
    };
    render() {
        return (
            <View style={styles.main}>
                <View style={[styles.main,styles.AsyncStorageMain]}>
                    <Text style={{fontSize:30}}>AsyncStorage</Text>
                    <View style={styles.AsyncStorage}>
                        <View style={[{backgroundColor:"pink"},styles.text]}><Text style={{fontSize:20}} onPress={()=>this.setItem()}>setItem</Text></View>
                        <View style={[{backgroundColor:"pink"},styles.text]}><Text style={{fontSize:20}} onPress={()=>this.getItem()}>getItem</Text></View>
                        <View style={[{backgroundColor:"pink"},styles.text]}><Text style={{fontSize:20}} onPress={()=>this.removeItem()}>removeItem</Text></View>
                        <View style={[{backgroundColor:"pink"},styles.text]}><Text style={{fontSize:20}} onPress={()=>AsyncStorage.getAllKeys((error,key)=>console.warn(error||key))}>getAllKeys</Text></View>
                        <View style={[{backgroundColor:"pink"},styles.text]}><Text style={{fontSize:20}} onPress={()=>AsyncStorage.clear((error)=>console.warn(error||'clear成功'))}>clear</Text></View>
                    </View>
                </View>
                <View style={[styles.main,styles.RealmMain]}>
                    <Text style={{fontSize:30}}>Realm</Text>
                    <View style={styles.Realm}>
                        <View style={[{backgroundColor:"aqua"},styles.text]}><Text style={{fontSize:20}} onPress={()=>this.setItem()}>setItem</Text></View>
                        <View style={[{backgroundColor:"aqua"},styles.text]}><Text style={{fontSize:20}} onPress={()=>this.getItem()}>getItem</Text></View>
                        <View style={[{backgroundColor:"aqua"},styles.text]}><Text style={{fontSize:20}} onPress={()=>this.removeItem()}>removeItem</Text></View>
                        <View style={[{backgroundColor:"aqua"},styles.text]}><Text style={{fontSize:20}} onPress={()=>AsyncStorage.getAllKeys((error,key)=>console.warn(error||key))}>getAllKeys</Text></View>
                        <View style={[{backgroundColor:"aqua"},styles.text]}><Text style={{fontSize:20}} onPress={()=>AsyncStorage.clear((error)=>console.warn(error||'clear成功'))}>clear</Text></View>
                    </View>
                </View>
                
            </View>
        );
    }
    setItem(){
        AlertIOS.prompt("输入要储存的Key-Value",
            'login对应Key\npassword对应Value',
            [{text:'确定',onPress:(e)=>AsyncStorage.setItem(e.login,e.password,(error)=>console.warn(error||"setItem成功",e.password)),style:'secure-text'}],
            'login-password', 
        )
    }
    getItem(){
        AlertIOS.prompt("输入要读取的Key",
            null,
            [{text:'确定',onPress:(e)=>AsyncStorage.getItem(e,(error,result)=>console.warn(error||`getItem成功${e}->${result}`)),style:'secure-text'}],
            'plain-text', 
        )
    }
    removeItem(){
        AlertIOS.prompt("输入要删除的Key",
            null,
            [{text:'确定',onPress:(e)=>AsyncStorage.removeItem(e,(error)=>console.warn(error||"removeItem成功")),style:'secure-text'}],
            'plain-text', 
        )
    }
}
const styles=StyleSheet.create({
    main:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    text:{
        width:150,
        marginTop:10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    AsyncStorageMain:{
        backgroundColor:'aqua',
    },
    AsyncStorage:{
        width:deviceWidthDp,
        alignItems: 'center',
        justifyContent: 'space-around',
        flexWrap:'wrap',
    },
    RealmMain:{
        backgroundColor:'pink',
    },
    Realm:{
        width:deviceWidthDp,
        alignItems: 'center',
        justifyContent: 'space-around',
    }
})