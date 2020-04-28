import React, { Component } from 'react';
import { DISHES } from '../shared/dishes';
import { LEADERS } from '../shared/leaders';
import { View, Platform, Text, ScrollView, Image, StyleSheet } from 'react-native';
import { createDrawerNavigator, DrawerItems, SafeAreaView } from 'react-navigation';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { fetchDishes, fetchComments, fetchPromos, fetchLeaders } from '../redux/ActionCreators';
import { HomeNavigator, MenuNavigator, ContactUsNavigator, AboutUsNavigator, ReservationNavigator, FavoritesNavigator, LoginNavigator } from './stackNavigators';

const mapStateToProps = state => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders
  }
}

const mapDispatchToProps = dispatch => ({
  fetchDishes: () => dispatch(fetchDishes()),
  fetchComments: () => dispatch(fetchComments()),
  fetchPromos: () => dispatch(fetchPromos()),
  fetchLeaders: () => dispatch(fetchLeaders()),
})

const CustomDrawerContentComponent = (props) => (
  <ScrollView>
    <SafeAreaView style={styles.container} forceInset={{ top: 'always', horizontal: 'never' }}>
      <View style={styles.drawerHeader}>
        <View style={{flex:1}}>
        <Image source={require('./images/logo.png')} style={styles.drawerImage} />
        </View>
        <View style={{flex: 2}}>
          <Text style={styles.drawerHeaderText}>Ristorante Con Fusion</Text>
        </View>
      </View>
      <DrawerItems {...props} />
    </SafeAreaView>
  </ScrollView>
);

const MainNavigator = createDrawerNavigator({
  Login: 
    { screen: LoginNavigator,
      navigationOptions: {
        title: 'Login',
        drawerLabel: 'Login',
        drawerIcon: ({ tintColor }) => (
          <Icon 
            name='sign-in'
            type='font-awesome'
            size={24}
            color={tintColor}
          />
        )
      }
    },
  Home: 
    { screen: HomeNavigator,
      navigationOptions: {
        title: 'Home',
        drawerLabel: 'Home',
        drawerIcon: ({ tintColor }) => (
          <Icon 
            name='home'
            type='font-awesome'
            size={24}
            color={tintColor}
          />
        )
      }
    },
  AboutUs: {
    screen: AboutUsNavigator,
    navigationOptions: {
      title: 'About Us',
      drawerLabel: 'About Us',
      drawerIcon: ({ tintColor }) => (
        <Icon 
          name='info-circle'
          type='font-awesome'
          size={24}
          color={tintColor}
        />
      )
    }
  },
  Menu: 
    { screen: MenuNavigator,
      navigationOptions: {
        title: 'Menu',
        drawerLabel: 'Menu',
        drawerIcon: ({ tintColor }) => (
          <Icon 
            name='list'
            type='font-awesome'
            size={24}
            color={tintColor}
          />
        )
      }
    },
  ContactUs:
  {
    screen: ContactUsNavigator,
    navigationOptions: {
      title: 'Contact Us',
      drawerLabel: 'ContactUs',
      drawerIcon: ({ tintColor }) => (
        <Icon 
          name='address-card'
          type='font-awesome'
          size={22}
          color={tintColor}
        />
      )
    }
  },
  Favorites:
  {
    screen: FavoritesNavigator,
    navigationOptions: {
      title: 'My Favorites',
      drawerLabel: 'My Favorites',
      drawerIcon: ({ tintColor }) => (
        <Icon 
          name='heart'
          type='font-awesome'
          size={22}
          color={tintColor}
        />
      )
    }
  },
  Reservation:
  {
    screen: ReservationNavigator,
    navigationOptions: {
      title: 'Reserve Table',
      drawerLabel: 'Reserve Table',
      drawerIcon: ({ tintColor }) => (
        <Icon 
          name='cutlery'
          type='font-awesome'
          size={24}
          color={tintColor}
        />
      )
    }
  }
},
  
 {
  initialRouteName: 'Home',
  drawerBackgroundColor: '#D1C4E9',
  contentComponent: CustomDrawerContentComponent
});

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dishes: DISHES,
      leaders: LEADERS,
      selectedDish: null
    };
  }

  onDishSelect(dishId) {
    this.setState({selectedDish: dishId})
  }

  componentDidMount() {
    this.props.fetchDishes();
    this.props.fetchComments();
    this.props.fetchPromos();
    this.props.fetchLeaders();
  }
  

  render() {
 
    return (
      <View style={{flex:1, paddingTop: Platform.OS === 'ios' ? 0 : Expo.Constants.statusBarHeight }}>
        <MainNavigator />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  drawerHeader: {
    backgroundColor: '#512DA8',
    height: 140,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    flexDirection: 'row'
  },
  drawerHeaderText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold'
  },
  drawerImage: {
    margin: 10,
    width: 80,
    height: 60
  }
});
  
export default connect(mapStateToProps, mapDispatchToProps)(Main);