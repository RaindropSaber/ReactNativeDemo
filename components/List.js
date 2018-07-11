import React, { Component } from 'react';
import {
    TouchableHighlight,
    StyleSheet,
    Text,
    View,
    Dimensions
} from 'react-native';
const deviceWidthDp = Dimensions.get('window').width;
export default class List extends Component {
    touch(){
        this.props.onTouchList(this.props.item)
    }
    render() {
        return (
            <TouchableHighlight style={styles.main} onPress={()=>this.touch()}>
                <View style={styles.text}>
                    <Text style={styles.title}>{this.props.item.title}</Text>
                    <Text>{this.props.item.description}</Text>
                </View> 
            </TouchableHighlight>
        );
    }
}

const styles = StyleSheet.create({

    main:{
        height:80,
        width:deviceWidthDp-30,
        backgroundColor:'#E3D4F5',
        alignItems:'center',
        justifyContent:'center',
        marginBottom:5,
        borderTopLeftRadius:10,
        borderBottomEndRadius:10,
        borderBottomStartRadius:10,
        borderTopRightRadius:10,
        flexShrink:0,
    },
    text:{
        height:80,
        alignItems:'center',
        justifyContent:'flex-start',
        color:"#638df2",
    },
    title:{
        fontSize:20,
        marginBottom:10,
        marginTop:25,
        color:"#638df2",
    }

});