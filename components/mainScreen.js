import React from 'react';
import { StyleSheet, Text, View, FlatList, Image, Dimensions, ActivityIndicator, TouchableOpacity, TouchableWithoutFeedback, ScrollView, ImageBackground} from 'react-native';
import { createStackNavigator } from 'react-navigation';
import Loader from './Loader';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';

var w = Dimensions.get('window').width;
var h = Dimensions.get('window').height;
Expo.ScreenOrientation.allow(Expo.ScreenOrientation.Orientation.PORTRAIT_UP);


export default class Collection extends React.Component {
  constructor(props){
    super(props);
    collectionThumbnails = [];
    this.state = {x: collectionThumbnails.length};
    db.collection('collections').orderBy('url').get().then(snapshot => {
      snapshot.docs.forEach(doc => {
        var url = doc.data().url;
        var collectionIdentifier = doc.data().collectionIdentifier;
        collectionThumbnails.push({key: collectionThumbnails.length, source: url, collectionIdentifier: collectionIdentifier});
        this.setState({x: collectionThumbnails.length});
      });
    });
  }
  onSwipeLeft(gestureState) {
    this.props.navigation.navigate('MyPosts', {navigation: this.props.navigation});
  }

  render(){
    const config = {
      velocityThreshold: 0.3,
      directionalOffsetThreshold: 80
    };
    if (collectionThumbnails.length > 0) {
      return(
        <View style = {styles.container}>
        <ScrollView>
        <FlatList
        extraData = {this.state}
        data={collectionThumbnails}
        renderItem={ ({item}) => {
       return (
         <TouchableOpacity onPress = {() =>  {this.props.navigation.navigate('Collection', {collectionName: item.collectionIdentifier})}} >
         <View style = {styles.box}>
         <ImageBackground source = {{uri: item.source}} style = {styles.image}>
         <View style = {styles.overlay}>
         </View>
         </ImageBackground>
         </View>
         </TouchableOpacity>
       )}}
        numColumns={2}
        />
        </ScrollView>
          <View> <Text> hello </Text> </View>
        </View>
      );
    }
    else{
      return(
        <Loader alpha={1} />
      )
    }
  }
}


const styles = StyleSheet.create({
  image: {
    width: w/2.2,
    height: h/2.7,
    marginHorizontal: ((w-w/2.2*2)/6),
    marginVertical: h/150,
    borderWidth: h*w/1050000,
    borderColor: 'black',

  },
  container: {
    flex: 1,
    paddingTop: 22
  },
  center: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  },
  box: {
    marginHorizontal: ((w-w/2.2*2)/6),
    marginVertical: h/150,
    width: w/2.15,
    height:  h/2.6,
    backgroundColor: 'black',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    height: 50,
    backgroundColor: 'red',
    opacity: 0.3
  },
});

// <TouchableOpacity onPress = {() => this.props.callBackFromParentCollection(item.collectionIdentifier)} >
/*  <GestureRecognizer
    onSwipeLeft={(state) => this.onSwipeLeft(state)}
    config={config}
    style={{
    }}
    >
    </GestureRecognizer>*/
