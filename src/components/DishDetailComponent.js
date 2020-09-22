import React,{Component} from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, ListGroup, ListGroupItem} from 'reactstrap';



class DishDetail extends Component{

    



    renderComments(comment){
        console.log(comment);
      if(comment != null){
        return comment.map((value) => {
            return (
                <div key={value.id}>
                <ListGroupItem className="border-0">{value.comment}</ListGroupItem>
                <ListGroupItem className="border-0">--{value.author}, {""}
                 {new Intl.DateTimeFormat('en-US',{year:'numeric', month:'short',day:'2-digit'}).format(new Date(Date.parse(value.date)))}</ListGroupItem>
                <hr/>
                </div>

            ); 
        });
      }
          
    }    
    


    renderDish(dish){
        if(dish != null){
  
           /* const comments = dish.comments.map((comment) => {
                <div key={comment.id}>
                   {this.renderComments(comment)}

                </div>
                         
            }); 
            */
            
            
          return (

            <div className="row">
                <div className="col-sm-5 col-12">   
            <Card>
               <CardImg width="100%" src={dish.image} alt={dish.name} />
               <CardBody>
                 <CardTitle><h3>{dish.name}</h3></CardTitle>
                 <CardText>{dish.description}</CardText>
                </CardBody> 
            </Card> 
                </div>


                <div className="col-sm-5 col-12">
               
                <h3>Comments</h3>
                
                 <ListGroup>
                 {this.renderComments(dish.comments)}
                 </ListGroup>    
                    
                </div>    
        
            </div>     
          )
        }else{
          return (
            <div></div>
          );
        }
    }
    

    render(){

        return(
            <div className="container"> 
            {this.renderDish(this.props.selectedDish)}
            </div>
            ); 
    }

}


export default DishDetail;