import React, {Component} from 'react';
import {AppRegistry,Platform, StyleSheet, Text, View,ScrollView,Button} from 'react-native';
import RNFS from 'react-native-fs'
import { zip, unzip, unzipAssets, subscribe } from 'react-native-zip-archive'


export default class SysFile extends React.Component {
    static navigationOptions = {
        title: 'SysFile',
    };
    zipFile(){
        const targetPath = `${RNFS.DocumentDirectoryPath}/test.zip`
        const sourcePath = `${RNFS.DocumentDirectoryPath}/test`
        zip(sourcePath,targetPath)
        .then((path) => {
            console.warn(`zip completed at ${path}`)
        })
        .catch((error) => {
            console.warn(error)
        })
    }
    unzipFile(){
        const sourcePath = `${RNFS.DocumentDirectoryPath}/test.zip`
        const targetPath = RNFS.DocumentDirectoryPath
        unzip(sourcePath, targetPath)
        .then((path) => {
            console.warn(`unzip completed at ${path}`)
        })
        .catch((error) => {
            console.warn(error)
        })
    }
    downloadFile() {
        const downloadDest = `${RNFS.DocumentDirectoryPath}/test.zip`;
        const formUrl="http://192.168.2.234:8000/ShadowsocksX-NG.1.7.1.zip"
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
                console.warn('file://' + downloadDest)
    
            }).catch(err => {
                console.warn('err', err);
            });
        }
        catch (e) {
            console.warn(error);
        }
    
    }
    readDir(){
        RNFS.readDir(RNFS.DocumentDirectoryPath)
        .then((result) => {
            console.warn('GOT RESULT', result);

            // stat the first file
            return Promise.all([RNFS.stat(result[result.length-1].path), result[result.length-1].path]);
        })
        .then((statResult) => {
            console.warn(statResult)
            if (statResult[0].isFile()) {
                return RNFS.readFile(statResult[1],'utf8');
            }
            return 'no file';
        })
        .then((contents) => {
            // warn the file contents
            console.warn("ssssss",contents);
        })
        .catch((err) => {
            console.warn(err.message, err.code);
        });
    }
    writeFile(){
        var path = RNFS.DocumentDirectoryPath + '/test.txt';
        RNFS.writeFile(path, 'Lorem ipsum dolor sit amet', 'utf8')
        .then((success) => {
            console.warn('FILE WRITTEN!',RNFS.DocumentDirectoryPath + '/test.txt');
        })
        .catch((err) => {
            console.warn(err.message);
        });
    }
    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{marginTop:30, fontSize:30}} onPress={()=>this.downloadFile()}>downloadFile</Text>
                <Text style={{marginTop:30, fontSize:30}} onPress={()=>this.readDir()}>readDir</Text>
                <Text style={{marginTop:30, fontSize:30}} onPress={()=>this.writeFile()}>writeFile</Text>
                <Text style={{marginTop:30, fontSize:30}} onPress={()=>this.zipFile()}>zipFile</Text>
                <Text style={{marginTop:30, fontSize:30}} onPress={()=>this.unzipFile()}>unzipFile</Text>
            </View>
        );
    }
}