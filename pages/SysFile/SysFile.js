import React, {Component} from 'react';
import {AppRegistry,Platform, StyleSheet, Text, View,ScrollView,Button} from 'react-native';

export default class SysFile extends React.Component {
    static navigationOptions = {
        title: 'SysFile',
    };
    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>SysFile</Text>
            </View>
        );
    }
}