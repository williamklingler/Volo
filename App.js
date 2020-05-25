import React from 'react';
import { StyleSheet, Text, View, FlatList, Image, Dimensions} from 'react-native';
import * as firebase from 'firebase';
import { createStackNavigator } from 'react-navigation';
import { GestureHandler } from 'expo'
import 'firebase/firestore';
import Collection from './components/Collection';
import MainScreen from './components/mainScreen';
import Loader from './components/Loader';
import SignUp from './components/SignUp';
import Login from './components/Login';
import UploadImage from './components/UploadImage';
import ImagePicker from './components/ImagePicker';
import ImageBrowser from './components/ImageBrowser';
import Gesture from './components/Gesture';
import LoaderNoFlash from './components/LoaderNoFlash';
import MyPosts from './components/MyPosts';

var w = Dimensions.get('window').width;
var h = Dimensions.get('window').height;
Expo.ScreenOrientation.allow(Expo.ScreenOrientation.Orientation.PORTRAIT_UP);

class App2 extends React.Component {
  static navigationOptions = {
    header: null,
  };
  constructor(props){
    super();
    self = this;
    this.state = {loggedIn: false, isLoading: true};
  }
  componentWillMount(){
    const firebaseConfig = {
      apiKey: "redacted",
      authDomain: "redacted",
      databaseURL: "redacted",
      projectId: "redacted",
      storageBucket: "redacted",
      messagingSenderId: "redacted"
    };

    firebase.initializeApp(firebaseConfig);
    db = firebase.firestore();
    db.settings({timestampsInSnapshots: true});

  }
  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log(user.uid);
        this.setState({ loggedIn: true, isLoading: false });
      } else {
        console.log('not logged in');
        this.setState({ loggedIn: false, isLoading: false });
      }
    });
  }

  render() {

    if (this.state.loggedIn == true)
    {
      return (
        <MainScreen navigation = {this.props.navigation} />
      );
    }
    else if (!this.state.isLoading) {
      return(
        <View style = {styles.container} >
        <SignUp navigation = {this.props.navigation}/>
        </View>
      )
    }
    else {
      return(
        <Loader />
      )
    }
  }
}

export default class App extends React.Component{
  render(){
    return (
      <RootStack />
    )
  }
}
const RootStack = createStackNavigator(
  {
    Home: App2,
    MainScreen: MainScreen,
    Collection: Collection,
    Login: Login,
    SignUp: SignUp,
    UploadImage: UploadImage,
    ImagePicker: ImagePicker,
    ImageBrowser: ImageBrowser,
    Gesture: Gesture,
    LoaderNoFlash: LoaderNoFlash,
    MyPosts: MyPosts
  },
  {
    initialRouteName: 'Home',
  }
);


const styles = StyleSheet.create({
  image: {
    width: w/2.2,
    height: h/2.7,
    marginHorizontal: ((w-w/2.2*2)/4),
    marginVertical: h/100,

  },
  container: {
    flex: 1,
    paddingTop: 22
  },
})
