import React, { Component } from 'react';
import { FlatList, View, Text, Alert } from 'react-native';
import { ListItem } from 'react-native-elements';
import { connect } from 'react-redux';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import Swipeout from 'react-native-swipeout';
import { deleteFavorite } from '../redux/ActionCreators';

const mapStateToProps = state => {
    return {
      dishes: state.dishes,
      favorites: state.favorites
    }
}

const mapDispatchToProps = dispatch => ({
    deleteFavorite: (dishId) => dispatch(deleteFavorite(dishId))
})

class Favorites extends Component {

    static navigationOptions = {
        title: 'My Favorites'
    };

    render() {

        const { navigate } = this.props.navigation;
        
        const renderMenuItem = ({item, index}) => {
    
            const rightButton = [
                {
                    text: 'Delete',
                    type: 'delete',
                    onPress: () => Alert.alert(
                        'Delete Favorites',
                        'Are you sure you want to delete ' + item.name + ' from My Favorites?',
                        [
                            {
                                text: 'Cancel',
                                style: 'cancel',
                                onPress: () => console.log(item.name + 'is NOT deleted!')

                            },
                            {
                                text: 'Delete',
                                style: 'delete',
                                onPress: () => this.props.deleteFavorite(item.id)
                            }
                        ],
                        { cancelable: false}
                    )
                }
            ];

            return (
                <Swipeout right={rightButton} autoClose={true} >
                    <ListItem
                        key={index}
                        title={item.name}
                        subtitle={item.description}
                        hideChevron={true}
                        onPress={() => navigate('DishDetail', { dishId: item.id })}
                        leftAvatar={{ source: {uri: baseUrl + item.image}}}
                        />
                </Swipeout>
            );
        };

        if (this.props.dishes.isLoading) {
            return(
                <Loading />
            );
        }
        else if (this.props.dishes.errMess) {
            return(
                <View>            
                    <Text>{this.props.dishes.errMess}</Text>
                </View>            
            );
        }
        else {
            return (
                <FlatList 
                    data={this.props.dishes.dishes.filter(dish => this.props.favorites.some(el => el === dish.id))}
                    renderItem={renderMenuItem}
                    keyExtractor={item => item.id.toString()}
                    />
            );
        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Favorites);