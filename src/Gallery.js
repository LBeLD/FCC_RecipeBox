import React, { Component } from 'react';
import { Grid, Col, Thumbnail, Row} from 'react-bootstrap';

export default class Galley extends Component {

  handleopenRecipeModal(index){
    this.props.openRecipeModal(index);
  }

  render() {
    let noImage = 'http://lakefarmbeef.co.nz/wp-content/themes/lakefarm/img/noimage.png';
    return(
      <div className='gallery'>
        <Grid>
          <Row>
            {this.props.recipes.map((recipe,index)=>{
              return(
                <Col className='col' key={index} xs={12} sm={4} md={3}>
                  <Thumbnail
                    className='thumbNail'
                    src={recipe.imgUrl === '' ? noImage : recipe.imgUrl}
                    alt="Recipe"
                    onClick={this.handleopenRecipeModal.bind(this,index)}>
                    <h4>{recipe.name}</h4>
                  </Thumbnail>
                </Col>
              );
            })
          }
          </Row>
        </Grid>
      </div>
    );
  }
}
