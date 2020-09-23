import React from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, ListGroup, ListGroupItem, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';




function RenderDish({ dish }) {

    if (dish != null) {

        return (
            <div>
                <Card>
                    <CardImg width="100%" src={dish.image} alt={dish.name} />
                    <CardBody>
                        <CardTitle><h3>{dish.name}</h3></CardTitle>
                        <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
            </div>
        );
    } else {
        return <div></div>;
    }
}


function RenderComments({ value }) {
    if (value != null) {

        return value.map((comment) => {
            return (
                <ListGroup>
                    <div key={comment.id}>
                        <ListGroupItem className="border-0">{comment.comment}</ListGroupItem>
                        <ListGroupItem className="border-0">--{comment.author}, {""}
                            {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit' }).format(new Date(Date.parse(comment.date)))}</ListGroupItem>
                        <hr />
                    </div>
                </ListGroup>

            );
        });
    } else {
        return (
            <div></div>
        );
    }


}



function RenderHeading({ value }) {
    if (value == null) {
        return <div></div>;
    } else {
        return <h3>Comments</h3>;
    }
}
const DishDetail = (props) => {

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
                    <RenderHeading value={props.dish} />
                    <RenderComments value={props.comments} />
                </div>
            </div>



        </div>
    );
}


export default DishDetail;