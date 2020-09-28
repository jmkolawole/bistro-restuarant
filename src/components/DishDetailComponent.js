import React, { Component } from 'react';
import {
    Card, CardImg, CardText, CardBody, CardTitle,  Breadcrumb, BreadcrumbItem,
    Button, Modal, ModalHeader, ModalBody, Row, Label, Col, CardHeader
} from 'reactstrap';
import { Control, LocalForm, Errors } from "react-redux-form"
import { Link } from 'react-router-dom';
import {Loading} from './LoadingComponent';
import {baseUrl} from '../shared/baseUrl';
import {FadeTransform, Fade, Stagger} from 'react-animation-components';





const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => (val) && (val.length >= len);
class CommentForm extends Component {
    constructor(props) {
        super(props);


        this.state = {
            isModalOpen: false
        }


        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

    handleSubmit(values) {
        this.toggleModal();
        this.props.postComment(this.props.dishId,values.rating, values.author, values.comment)
    }



    render() {
        return (
            <>
            <Button color="outline-dark" onClick={this.toggleModal}>Submit Comment</Button>

            <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                <ModalHeader toggle={this.toggleModal}>Add Comment</ModalHeader>

                <ModalBody>
                    <LocalForm onSubmit={(values) => this.handleSubmit(values)}>


                        <Row className=" form-group">

                        <Label htmlFor="rating" sm={12}>Rating </Label>
                            <Col sm={12}>

                                <Control.select model=".rating" className="form-control" name="rating">

                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>

                                </Control.select>
                            </Col>

                        </Row>

                        <Row className=" form-group">
                            <Label htmlFor="author" className=" col-12">Name </Label>
                            <Col md={12}>
                                <Control.text model=".author" name="author" id="author" className=" form-control " 
                                validators={{
                                    minLength: minLength(3),
                                    maxLength: maxLength(15)
                                }} />


                                    <Errors className="text-danger" model=".author" show="touched" messages={{
                                        minLength: 'Must be greater than 2 characters',
                                        maxLength: 'Must be 15 characters or less'
                                    }} />
                            </Col>
                        </Row>


                        <Row className=" form-group">
                                <Label htmlFor="comment" sm={12}> Comment</Label>
                                <Col sm={12}>
                                    <Control.textarea model=".comment" className=" form-control" id="comment" name="comment" rows="6" />
                                </Col>
                        </Row>


                        <Row className=" form-group">
                                <Col md={12}>
                                    <Button type="submit" color="primary">
                                        Submit
                                    </Button>
                                </Col>
                        </Row>

                    </LocalForm>

                </ModalBody>

            </Modal>

            </>
        )
    }
}


function RenderDish({ dish }) {

    if (dish != null) {

        return (
            <div>
             <FadeTransform in transformProps={{
                exitTransform: 'scale(0.5) translateY(-50%)'

            }}>   
                <Card>
                    <CardImg width="100%" src={baseUrl + dish.image} alt={dish.name} />
                    <CardBody>
                        <CardTitle><h3>{dish.name}</h3></CardTitle>
                        <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
            </FadeTransform>    

            </div>
        );
    } else {
        return <div></div>;
    }
}


const RenderComments = ({ comments, postComment, dishId }) => {
	if (comments != null) {
		return (
			<>
				
                <Card>
                <CardHeader><h4>Comments</h4></CardHeader>
                <CardBody>    
                <ul className="list-unstyled">  
                <Stagger in>   
				{comments.map((comment) => (
					     
                         <Fade in>    
                        <li key={comment.id}></li>     
						<li className="mb-2">{comment.comment}</li>
						<li>
							-- {comment.author}{" "}
							{new Intl.DateTimeFormat("en-US", {
								year: "numeric",
								month: "short",
								day: "2-digit",
							}).format(new Date(Date.parse(comment.date)))}
						</li>
                        </Fade>
                        
					
                ))}
                </Stagger>
                </ul>
                </CardBody>
                </Card>
				<CommentForm dishId={dishId} postComment={postComment}/>
			</>
		);
	} else {
		return <div />;
	}
};




const DishDetail = (props) => {
    if(props.isLoading){
        return (
            <div className=" container">
                <div className="row">

                     <Loading/>
                </div>    

            </div>
        );
    }else if(props.errMess){
        return (
            <div className=" container">
                <div className="row">
                    <h4>{props.errMess}</h4>
                </div>    

            </div>
        );
    }

    else if(props.dish != null)
    {
        return (

            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to='/home'>Home</Link></BreadcrumbItem>
                        <BreadcrumbItem><Link to='/menu'>Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
    
                    <div className="col-12">
                        <h3>{props.dish.name}</h3>
                        <hr />
                    </div>
    
                    <div className="col-sm-5 col-12">
                        <RenderDish dish={props.dish} />
                    </div>
    
                    <div className="col-sm-5 col-12">
                        
                        <RenderComments comments={props.comments} postComment={props.postComment} dishId={props.dish.id}/>
                        
                    </div>
                </div>
    
    
    
            </div>
        );     
    }
   
}


export default DishDetail;


