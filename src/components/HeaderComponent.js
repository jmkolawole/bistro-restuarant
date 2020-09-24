import React, { Component } from 'react';
import { Navbar, NavbarBrand , Nav, NavbarToggler, Collapse, NavItem, Jumbotron,
Button,Modal, ModalHeader,ModalBody, Form,FormGroup,Label,Input} from 'reactstrap';
import {NavLink} from 'react-router-dom';

class Header extends Component {

    constructor(props){
        super(props);

        this.state = {
            isNavOpen : false,
            isModalOpen: false
        };

        this.toggleNav = this.toggleNav.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
    }


    toggleNav(){
    this.setState({
       isNavOpen : !this.state.isNavOpen      
    });
    }


    toggleModal(){
      this.setState({
          isModalOpen : !this.state.isModalOpen
      });
    }

    handleLogin(event){
        this.toggleModal();
        alert("Username: " + this.username.value + "Password: " + this.password.value + "Remember :" + this.remember.checked);
        event.preventDefault();
    }


    render() {
        return (
            <>
            <Navbar dark expand="md">
                <div className="container">
                   <NavbarToggler onClick={this.toggleNav} /> 
                    <NavbarBrand className="mr-auto" href="/">
                        <img src="assets/images/logo.png" height="30" width="40" alt="Ristorante Con Fusion " />
                    </NavbarBrand>

                <Collapse isOpen={this.state.isNavOpen} navbar>    
                    <Nav navbar>
                        <NavItem>
                           <NavLink className="nav-link" to="/home">
                                    <span className=" fa fa-home fa-lg">Home</span>
                           </NavLink>
                        </NavItem>   

                        <NavItem>
                           <NavLink className="nav-link" to="/aboutus">
                                    <span className=" fa fa-info fa-lg">About Us</span>
                           </NavLink>
                        </NavItem>


                        <NavItem>
                           <NavLink className="nav-link" to="/menu">
                                    <span className=" fa fa-list fa-lg">Menu</span>
                           </NavLink>
                        </NavItem>

                        <NavItem>
                           <NavLink className="nav-link" to="/contactus">
                                    <span className=" fa fa-home fa-lg">Contact Us</span>
                           </NavLink>
                        </NavItem>   


                    </Nav>

                    <Nav className=" ml-auto" navbar>
                            <NavItem>
                                <Button outline onClick={this.toggleModal}>
                                  <span>Login</span>
                                </Button>
                            </NavItem>
                    </Nav>   
                </Collapse>        

                </div>
            </Navbar>

            <Jumbotron>
           <div className="container">
               <div className="row row-header">
                   <div className="col-12 col-sm-6">
                       <h1>Ristorante con Fusion</h1>
                       <p>We take inspiration from the World's best cuisines, and create a unique fusion experience. Our lipsmacking creations will tickle your culinary senses!</p>
                   </div>
               </div>
           </div>
       </Jumbotron>
       <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
           <ModalHeader toggle={this.toggleModal}>Login</ModalHeader>

           <ModalBody>
                  <Form onSubmit={this.handleLogin}>

                  <FormGroup>
                  <Label htmlFor="username">Username </Label>
                   <Input type="text" id="username" name="username" placeholder="Username" innerRef={(input) => this.username = input} />              
                  </FormGroup>

                  <FormGroup>
                  <Label htmlFor="username">Password </Label>
                   <Input type="password" id="password" name="password" placeholder="username" innerRef={(input) => this.password = input} />              
                  </FormGroup>
                  

                  <FormGroup check>
                  <Label check>
                     <Input type="checkbox" id="remember" name="remember" innerRef={(input) => this.remember = input}/>
                    Remember Me
                  </Label>                                 
                  </FormGroup>


                  <FormGroup>
                           
                  <Button type="submit" color="primary" value="Submit"> 
                                   Login     

                    </Button>              

                
                </FormGroup>      

                  </Form>    

           </ModalBody>        
       </Modal>     
            </>
        );
    }
} 

export default Header;