import React, { Component } from "react";
import { Text, View, ScrollView, FlatList, Modal, StyleSheet, Button, Alert, PanResponder } from 'react-native';
import { Card, Input, Icon, Rating } from "react-native-elements";
import { connect } from "react-redux";
import { baseUrl } from "../shared/baseUrl";
import { postFavorite, postComment } from "../redux/ActionCreators";
import moment from "moment";
import * as Animatable from 'react-native-animatable';


const mapStateToProps = state => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    favorites: state.favorites
  };
};

const mapDispatchToProps = dispatch => ({
  postComment: (dishId, rating, author, comment) =>
    dispatch(postComment(dishId, rating, author, comment)),
  postFavorite: dishId => dispatch(postFavorite(dishId))
});

function RenderDish(props) {

  const dish = props.dish;

  const recognizeDrag = ({ moveX, moveY, dx, dy }) => {
    if ( dx < -200 )
        return true;
    else
        return false;
}

  const panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (e, gestureState) => {
          return true;
      },
      onPanResponderEnd: (e, gestureState) => {
          console.log("pan responder end", gestureState);
          if (recognizeDrag(gestureState))
              Alert.alert(
                  'Add Favorite',
                  'Are you sure you wish to add ' + dish.name + ' to favorite?',
                  [
                  {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                  {text: 'OK', onPress: () => {props.favorite ? console.log('Already favorite') : props.onPress()}},
                  ],
                  { cancelable: false }
              );

          return true;
      }
  })

  if (dish != null) {
    return (
      <Animatable.View animation="fadeInDown" duration={2000} {...panResponder.panHandlers} >
        <Card featuredTitle={dish.name} image={{ uri: baseUrl + dish.image }}>
          <Text style={{ margin: 10 }}>{dish.description}</Text>
          <View
            style={{ justifyContent: "center", flex: 1, flexDirection: "row" }}
          >
            <Icon
              raised
              reverse
              name={props.favorite ? "heart" : "heart-o"}
              type="font-awesome"
              color="#f50"
              onPress={() =>
                props.favorite ? console.log("Already Favorite") : props.onPress()
              }
            />
            <Icon
              raised
              reverse
              name="pencil"
              type="font-awesome"
              color="#512DA8"
              onPress={() => props.toggleModal()}
            />
          </View>
        </Card>
      </Animatable.View>
    );
  } 
  else {

    return <View></View>;

  }
}

function RenderComments(props) {
  const comments = props.comments;
  const renderCommentItem = ({ item, index }) => {
    return (
      <View key={index} style={{ margin: 10, alignItems: "flex-start" }}>
        <Text style={{ fontSize: 14 }}>{item.comment}</Text>
        <Rating
          style={{ marginTop: 20, marginBottom: 20, flex: 1 }}
          type="star"
          startingValue={item.rating}
          readonly
          imageSize={14}
        />
        <Text style={{ fontSize: 12 }}>
          {"---- " + item.author},{" "}
          {moment(new Date(item.date)).format("DD-MMM-YYYY")}
        </Text>
      </View>
    );
  };

  return (
   <Animatable.View animation="fadeInUp" duration={2000} >
      <Card title="Comments">
      <FlatList
        data={comments}
        renderItem={renderCommentItem}
        keyExtractor={item => item.id.toString()}
      />
    </Card>
   </Animatable.View>
  );
}

class DishDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dishId: "",
      rating: "",
      author: "",
      comment: "",
      showModal: false
    };
  }

  toggleModal = () => {
    this.setState({ showModal: !this.state.showModal });
  };

  markFavorite = dishId => {
    this.props.postFavorite(dishId);
  };

  static navigationOptions = {
    title: "Dish Details"
  };

  resetForm = () => {
    this.setState({
      rating: "",
      author: "",
      comment: ""
    });
  };

  handleComment = () => {
    const dishId = this.getDishId();
    const rating = this.state.rating;
    const author = this.state.author;
    const comment = this.state.comment;
    this.props.postComment(dishId, rating, author, comment);
    this.resetForm();
    this.toggleModal();
  };

  getDishId = () => {
    const dishId = this.props.navigation.getParam("dishId", "");
    return dishId;
  };

  render() {
    const dishId = this.getDishId();
    return (
      <ScrollView>
        <RenderDish
          dish={this.props.dishes.dishes[+dishId]}
          favorite={this.props.favorites.some(el => el === dishId)}
          onPress={() => this.markFavorite(dishId)}
          toggleModal={this.toggleModal}
        />
        <RenderComments
          comments={this.props.comments.comments.filter(
            comment => comment.dishId === dishId
          )}
        />
        <Modal
          animationType={"slide"}
          transparent={false}
          visible={this.state.showModal}
          onDismiss={() => {
            this.toggleModal();
            this.resetForm();
          }}
          onRequestClose={() => {
            this.toggleModal();
            this.resetForm();
          }}
        >
          <View styles={styles.modal}>
            <Rating
              showRating
              ratingCount={5}
              type="star"
              startingValue=''
              style={{ paddingVertical: 10 }}
              onFinishRating={_rating => {
                this.setState({ rating: _rating });
              }}
            />

            <View style={styles.formRow}>
              <Input
                style={styles.formItem}
                placeholder=" Author"
                leftIcon={{ type: "font-awesome", name: "user" }}
                onChangeText={value => {
                  this.setState({ author: value });
                }}
              ></Input>
            </View>
            <View style={styles.formRow}>
              <Input
                style={styles.modalText}
                placeholder=" Comment"
                leftIcon={{ type: "font-awesome", name: "comment" }}
                onChangeText={value => {
                  this.setState({ comment: value });
                }}
              />
            </View>
            <View style={styles.formRow}>
              <Button
                onPress={() => {
                  this.handleComment();
                }}
                title="Submit"
                color="#512DA8"
              />
            </View>
            <View style={styles.formRow}>
              <Button
                onPress={() => {
                  this.resetForm();
                  this.toggleModal();
                }}
                title="Cancel"
                color="#696969"
              />
            </View>
          </View>
        </Modal>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  modal: {
    justifyContent: "center",
    margin: 20
  },
  formRow: {
    margin: 10
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(DishDetail);