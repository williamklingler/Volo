import React from 'react';
import { StyleSheet, Text, View, FlatList, Image, Dimensions, ActivityIndicator, Button, ImageBackground, TouchableOpacity} from 'react-native';
import 'firebase/firestore';
import * as firebase from 'firebase';
import Loader from './Loader';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';

var w = Dimensions.get('window').width;
var h = Dimensions.get('window').height;
Expo.ScreenOrientation.allow(Expo.ScreenOrientation.Orientation.PORTRAIT_UP);

export default class Collection extends React.Component {
  constructor(props){
    super(props);
    linkImages = [];
    self = this;
    this.state = {x: linkImages.length};
    //rows = [];
    db.collection(this.props.navigation.state.params.collectionName).orderBy('link').get().then(snapshot => {
        snapshot.docs.forEach(doc => {
          var url = doc.data().link;
          var uiid = doc.data().uiid;
          linkImages.push({key: linkImages.length, source: url, uiid: uiid});
          this.setState({x: linkImages.length});
        });
      });
  }
  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log(user.uid);
        this.setState({ loggedIn: true, isLoading: false, userEmail: user.email });
      } else {
        console.log('not logged in');
        this.setState({ loggedIn: false, isLoading: false });
      }
    });
  }
  Like(uiid){
    db.collection('users').doc(self.state.userEmail).update({
    likes: firebase.firestore.FieldValue.arrayUnion(uiid)
});
  }

  render(){
    if (linkImages.length > 0){
    return(
      <View style = {styles.container}>
      <FlatList
      extraData = {this.state}
        data={linkImages}
        renderItem={({item}) => {
          return(
            <View style = {{justifyContent: 'center', alignItems: 'center'}}>
            <TouchableOpacity onPress = {() => this.Like(item.uiid)}>
            <ImageBackground source = {{uri: item.source}} style = {styles.image} >
            </ImageBackground>
            </TouchableOpacity>
            </View>
          )
        }}
        numColumns={1} />
        </View>
      )
      }
    else{
      return(
        <Loader/>
      )
    }
  }
}

const styles = StyleSheet.create({
  image: {
    position: 'relative',
    width: w/1.2,
    height: h/1.5,
    marginHorizontal: ((w-w/2.2*2)/4),
    marginVertical: h/100,

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
  }
})

/*
<FlatList
  data={listItems}
  renderItem={({item}) => <Image source = {{uri: "https://firebasestorage.googleapis.com/v0/b/firestore-tut-a487e.appspot.com/o/square%20map.jpg?alt=media&token=80c53e4e-171d-4ffe-ad1c-f8381a995469"}} style = {styles.image} />}
  numColumns={2}
/>
*/
