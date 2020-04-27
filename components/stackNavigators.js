import React from 'react';
import Home from './HomeComponent';
import Menu from './MenuComponent';
import ContactUs from './ContactComponent';
import AboutUs from './AboutComponent';
import DishDetail from './DishdetailComponent';
import Reservation from './ReservationComponent';
import { createStackNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';


export const MenuNavigator = createStackNavigator({
    Menu: { screen: Menu,
      navigationOptions: ({ navigation }) => ({
        headerLeft: <Icon name='menu' size={30}
          color='white' onPress={() => navigation.toggleDrawer()}
        />
      })
    },
    DishDetail: { screen: DishDetail }
  },
  {
    initialRouteName: 'Menu',
    navigationOptions: {
        headerStyle: {
            backgroundColor: "#512DA8"
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            color: "#fff"            
        }
    }
  }
  );
  
  export const HomeNavigator = createStackNavigator({
    Home: { screen: Home }
  }, {
    navigationOptions: ({ navigation }) => ({
      headerStyle: {
          backgroundColor: "#512DA8"
      },
      headerTitleStyle: {
          color: "#fff"            
      },
      headerTintColor: "#fff",
      headerLeft: <Icon name='menu' size={30}
        color='white' onPress={() => navigation.toggleDrawer()}
      />  
    })
  });
  
  export const ContactUsNavigator = createStackNavigator({
    ContactUs: { screen: ContactUs }
  }, {
    navigationOptions: ({ navigation }) => ({
      headerStyle: {
          backgroundColor: "#512DA8"
      },
      headerTitleStyle: {
          color: "#fff"            
      },
      headerTintColor: "#fff",
      headerLeft: <Icon name='menu' size={30}
        color='white' onPress={() => navigation.toggleDrawer()}
      />  
    })
  });
  
  export const AboutUsNavigator = createStackNavigator({
    AboutUs: { screen: AboutUs }
  }, {
    navigationOptions: ({ navigation }) => ({
      headerStyle: {
          backgroundColor: "#512DA8"
      },
      headerTitleStyle: {
          color: "#fff"            
      },
      headerTintColor: "#fff",
      headerLeft: <Icon name='menu' size={30}
        color='white' onPress={() => navigation.toggleDrawer()}
      />  
    })
  });

  export const ReservationNavigator = createStackNavigator({
    Reservation: { screen: Reservation }
  }, {
    navigationOptions: ({ navigation }) => ({
      headerStyle: {
          backgroundColor: "#512DA8"
      },
      headerTitleStyle: {
          color: "#fff"            
      },
      headerTintColor: "#fff",
      headerLeft: <Icon name="menu" size={24}
        iconStyle={{ color: 'white' }} 
        onPress={ () => navigation.navigate('DrawerToggle') } />    
    })
  })