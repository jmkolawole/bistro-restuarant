import React, { Component } from 'react';
//import logo from './logo.svg';

import Menu from './MenuComponent';
import DishDetail from './DishDetailComponent';
import Header from './HeaderComponent';
import Home from "./HomeComponent";
import Footer from './FooterComponent';
import {DISHES} from '../shared/dishes';
import {Switch, Route, Redirect} from 'react-router-dom';


class Main extends Component {

  constructor(props){
     super(props);
     this.state = {
       dishes : DISHES,
       selectedDish: null
     }
  }

  onDishSelect(dishId){
    this.setState({
        selectedDish : dishId
    });
  }



  render() {
    const Homepage = () => {
      return (
        <Home/>
      );
    }
    return (
      <div className="">
        
        <Header />
        <Switch>
          <Route path="/home" component={Homepage} />
          <Route exact path="/menu" component={() => <Menu dishes={this.state.dishes}/>}/>
          <Redirect to="/home" />
        </Switch>  
        <Menu dishes={this.state.dishes} onClick={(dishId) => this.onDishSelect(dishId)} />
        <DishDetail selectedDish={this.state.dishes.filter((dish) => dish.id === this.state.selectedDish)[0]}/>
        <Footer />    
      </div>
    );
  }
}

export default Main;
