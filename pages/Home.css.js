import {StyleSheet,Dimensions} from 'react-native';
const deviceWidthDp = Dimensions.get('window').width;
const styles = StyleSheet.create({
    
    main: {
        flex: 1,
        flexDirection:'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#E1FFFF',
    },
    ScrollView:{
        marginTop:15,
        width:deviceWidthDp,
        alignItems:'center',
        justifyContent:'center',
        overflow:'hidden',
    },
});
module.exports = styles;