import { Component } from "react";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import {
  postComment,
  fetchDishes,
  fetchComments,
  fetchPromos,
  fetchLeaders,
  postFeedback,
} from "../redux/ActionCreators";
import { actions } from "react-redux-form";

import Home from "./HomeComponent";
import Menu from "./MenuComponent";
import DishDetail from "./DishdetailComponent";
import Header from "./HeaderComponent";
import Footer from "./FooterComponent";
import Contact from "./ContactComponent";
import About from "./AboutComponent";

const mapStateToProps = (state) => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders,
  };
};

const mapDispatchToProps = (dispatch) => ({
  postFeedback: (
    firstName,
    lastName,
    telnum,
    email,
    agree,
    contactType,
    feedback
  ) =>
    dispatch(
      postFeedback(
        firstName,
        lastName,
        telnum,
        email,
        agree,
        contactType,
        feedback
      )
    ),

  postComment: (dishId, rating, author, comment) =>
    dispatch(postComment(dishId, rating, author, comment)),

  fetchDishes: () => {
    dispatch(fetchDishes());
  },

  resetFeedbackForm: () => {
    dispatch(actions.reset("feedback"));
  },

  fetchComments: () => dispatch(fetchComments()),

  fetchPromos: () => dispatch(fetchPromos()),

  fetchLeaders: () => dispatch(fetchLeaders()),
});

class Main extends Component {
  componentDidMount() {
    this.props.fetchDishes();
    this.props.fetchComments();
    this.props.fetchPromos();
    this.props.fetchLeaders();
  }

  render() {
    const HomePage = () => {
      return (
        <Home
          dish={this.props.dishes.dishes.filter((dish) => dish.featured)[0]}
          dishesLoading={this.props.dishes.isLoading}
          dishErrMsg={this.props.dishes.errMsg}
          promotion={
            this.props.promotions.promotions.filter(
              (promo) => promo.featured
            )[0]
          }
          promosLoading={this.props.promotions.isLoading}
          promosErrMsg={this.props.promotions.errMsg}
          leader={
            this.props.leaders.leaders.filter((leader) => leader.featured)[0]
          }
          leadersLoading={this.props.leaders.isLoading}
          leadersErrMsg={this.props.leaders.errMsg}
        />
      );
    };
    //.filter((leader) => leader.featured)[0]
    const DishWithId = ({ match }) => {
      return (
        <DishDetail
          dish={
            this.props.dishes.dishes.filter(
              (dish) => dish.id === parseInt(match.params.dishId, 10)
            )[0]
          }
          isLoading={this.props.dishes.isLoading}
          errMsg={this.props.dishes.errMsg}
          comments={this.props.comments.comments.filter(
            (comment) => comment.dishId === parseInt(match.params.dishId, 10)
          )}
          postComment={this.props.postComment}
          commentsErrMsg={this.props.comments.errMsg}
        />
      );
    };

    return (
      <div>
        <Header />
        <TransitionGroup>
          <CSSTransition
            key={this.props.location.key}
            classNames="page"
            timeout={300}
          >
            <Switch>
              <Route path="/home" component={HomePage} />
              <Route
                exact
                path="/menu"
                component={() => <Menu dishes={this.props.dishes} />}
              />
              <Route path="/menu/:dishId" component={DishWithId} />
              <Route
                exact
                path="/contactus"
                component={() => (
                  <Contact
                    resetFeedbackForm={this.props.resetFeedbackForm}
                    postFeedback={this.props.postFeedback}
                  />
                )}
              />
              <Route
                path="/aboutus"
                component={() => <About leaders={this.props.leaders} />}
              />
              <Redirect to="/home" />
            </Switch>
          </CSSTransition>
        </TransitionGroup>
        <Footer />
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));

/* ! MY CODE 
promotion={
            this.props.promotions.promotions.filter(
              (promo) => promo.featured
            )[0]
          }
          promoLoading={this.props.promotions.isLoading}
          promoErrMsg={this.props.promotions.errMsg} */

/* CODE COPIED FROM seem-less

*/
