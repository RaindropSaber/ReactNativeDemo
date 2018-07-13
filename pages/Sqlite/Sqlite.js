import React, {Component} from 'react';
import {AppRegistry,
        Platform, 
        StyleSheet, 
        Text, 
        View,
        ScrollView,
        Button,
        AsyncStorage,
        Dimensions,
        AlertIOS} from 'react-native';
import Realm from 'realm';
const deviceWidthDp = Dimensions.get('window').width;


const PersonSchema = {
    name: 'Person',
    primaryKey:'id',    
    properties: {
        id:'int',
        name: 'string',
        tel_number: {type: 'string', default: '156xxxxxxxx'}, 
        city: 'string' 
    }
};
let realm = new Realm({schema: [PersonSchema]});
async function createData(){
    let id=parseInt(await importId())
    let name=await importName()
    let tel_number=await importTel_number()
    let city=await importCity()
    realm.write(() => {
        realm.create('Person', {id:id, name:name, tel_number:tel_number, city:city});
    })
}
function importId(){
    return new Promise((r,j)=>{
        AlertIOS.prompt("输入要插入的id",
            null,
            [{text:'确定',onPress:(e)=>{r(e)},style:'secure-text'}],
            'plain-text', 
        )
    })
}
function importName(){
    return new Promise((r,j)=>{
        AlertIOS.prompt("输入要插入的name",
            null,
            [{text:'确定',onPress:(e)=>{r(e)},style:'secure-text'}],
            'plain-text', 
        )
    })
}
function importTel_number(){
    return new Promise((r,j)=>{
        AlertIOS.prompt("输入要插入的tel_number",
            null,
            [{text:'确定',onPress:(e)=>{r(e)},style:'secure-text'}],
            'plain-text', 
        )
    })
}
function importCity(){
    return new Promise((r,j)=>{
        AlertIOS.prompt("输入要插入的city",
            null,
            [{text:'确定',onPress:(e)=>{r(e)},style:'secure-text'}],
            'plain-text', 
        )
    })
}
async function inquireData(){
    let id=parseInt(await importId())
    let persons = realm.objects('Person').filtered(`id=${id}`);
    console.warn(persons)
    persons==={}?alert("查询为空"):alert(`${persons["0"].id}\n${persons["0"].name}\n${persons["0"].tel_number}\n${persons["0"].city}`)
    
}
function inquireAllData(){
    let persons = realm.objects('Person');
    console.warn(persons)
    persons==={}?alert("查询为空"):console.warn(persons)
}
async function deleteData(){
    let id=parseInt(await importId())
    realm.write(()=>{
        let persons = realm.objects('Person').filtered(`id=${id}`);
        realm.delete(persons)
    })
}
function deleteAllData(){
    realm.write(()=>{
        let persons = realm.objects('Person');
        realm.delete(persons)
    })
}

export default class Sqlite extends React.Component {
    static navigationOptions = {
        title: 'Sqlite',
    };
    constructor(props){
        super(props);
        this.state={
        }
    }
    componentWillMount(){
       
    }
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
                        <View style={[{backgroundColor:"aqua"},styles.text]}><Text style={{fontSize:20}} onPress={()=>createData()}>createData</Text></View>
                        <View style={[{backgroundColor:"aqua"},styles.text]}><Text style={{fontSize:20}} onPress={()=>inquireData()}>inquireData</Text></View>
                        <View style={[{backgroundColor:"aqua"},styles.text]}><Text style={{fontSize:20}} onPress={()=>deleteData()}>deleteData</Text></View>
                        <View style={[{backgroundColor:"aqua"},styles.text]}><Text style={{fontSize:20}} onPress={()=>inquireAllData()}>inquireAllData</Text></View>
                        <View style={[{backgroundColor:"aqua"},styles.text]}><Text style={{fontSize:20}} onPress={()=>deleteAllData()}>clear</Text></View>
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