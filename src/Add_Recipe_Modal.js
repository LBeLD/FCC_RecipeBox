import React, { Component } from 'react';
import { Modal, Button, FormGroup, ControlLabel,FormControl   } from 'react-bootstrap';

export default class AddRecipeModal extends Component {

    constructor(props){
      super(props);
        this.state = {
          newRecipe:{
            name:'',
            ingredients: [],
            instructions:[],
            imgUrl:''
          }
        }
      this.handleAddNewRecipeName = this.handleAddNewRecipeName.bind(this);
      this.handleSaveNewRecipe = this.handleSaveNewRecipe.bind(this);
      this.handleAddNewRecipeIngredients = this.handleAddNewRecipeIngredients.bind(this);
      this.handleAddNewRecipeInstruction = this.handleAddNewRecipeInstruction.bind(this);
      this.handleAddNewImgUrl = this.handleAddNewImgUrl.bind(this);
    }

    handleAddNewRecipeName(event){
      this.setState({
        newRecipe:{
          name:event.target.value,
          ingredients:this.state.newRecipe.ingredients,
          instructions:this.state.newRecipe.instructions,
          imgUrl:this.state.newRecipe.imgUrl
        }
      });
    }

    handleAddNewRecipeIngredients(event){
      this.setState({
        newRecipe:{
          name:this.state.newRecipe.name,
          ingredients:event.target.value.split(','),
          instructions:this.state.newRecipe.instructions,
          imgUrl:this.state.newRecipe.imgUrl
        }
      })
    }

    handleAddNewRecipeInstruction(event){
      this.setState({
        newRecipe:{
          name:this.state.newRecipe.name,
          ingredients:this.state.newRecipe.ingredients,
          instructions:event.target.value.split(','),
          imgUrl:this.state.newRecipe.imgUrl
        }
      })
    }

    handleAddNewImgUrl(event){
      this.setState({
        newRecipe:{
          name:this.state.newRecipe.name,
          ingredients:this.state.newRecipe.ingredients,
          instructions:this.state.newRecipe.instructions,
          imgUrl:event.target.value
        }
      })
    }

    handleSaveNewRecipe(){
      if(this.state.newRecipe.name !== '') {
        this.props.saveNewRecipe(this.state.newRecipe);
        this.setState({
          newRecipe:{
            name:'',
            ingredients: [],
            instructions:[],
            imgUrl:''
          }
        })
      }
      alert('Please add a name to your recipe to save it');
    }

  render(){
    return(
      <div>
        <Modal show={this.props.showAddModal} onHide={this.props.closeAddRecipeModal}>
          <Modal.Header closeButton>
            <Modal.Title>Add a New Recipe</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <FormGroup>
              <ControlLabel>Recipe Name :</ControlLabel>
              <FormControl
                placeholder='Enter recipe name'
                type="text"
                value={this.state.newRecipe.name}
                onChange={this.handleAddNewRecipeName}/>
            </FormGroup>
            <FormGroup controlId="formControlsTextarea">
             <ControlLabel>Enter Recipe Ingredients :</ControlLabel>
             <FormControl
               componentClass="textarea"
               placeholder="Enter ingredients spaced by commas"
               value={this.state.newRecipe.ingredients}
               onChange={this.handleAddNewRecipeIngredients}/>
           </FormGroup>
           <FormGroup controlId="formControlsTextarea">
            <ControlLabel>Recipe Instructions :</ControlLabel>
            <FormControl
              componentClass="textarea"
              placeholder="Enter instructions spaced by commas"
              value={this.state.newRecipe.instructions}
              onChange={this.handleAddNewRecipeInstruction}/>
          </FormGroup>
          <FormGroup>
            <ControlLabel>Image URL :</ControlLabel>
            <FormControl
              placeholder='Enter image ULR'
              type="text"
              value={this.state.newRecipe.imgUrl}
              onChange={this.handleAddNewImgUrl}/>
          </FormGroup>
          </Modal.Body>
          <Modal.Footer className='addRecipeModalFooter'>
            <Button
              className='addRecipeModalButton'
              bsSize='small'
              bsStyle='info'
              onClick={this.handleSaveNewRecipe}
              >Save</Button>
            <Button
              className='addRecipeModalButton'
              bsSize='small'
              bsStyle='warning'
              onClick={this.props.closeAddRecipeModal}
                    >Cancel</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
