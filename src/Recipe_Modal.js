import React, { Component } from 'react';
import { Modal, Button, FormGroup, FormControl, Glyphicon, InputGroup } from 'react-bootstrap';

export default class RecipeModal extends Component {

  constructor(props){
    super(props);

    this.state = {
      newRecipe: {
        name:'',
        ingredients: [],
        instructions: [],
        imgUrl: '',
      },
      backUpIngredients:[],
      backUpInstructions:[],
      newIngredient:'',
      newInstruction:''
    }

    this.handleDeleteRecipe =  this.handleDeleteRecipe.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.handleRecipeNameChange = this.handleRecipeNameChange.bind(this);
    this.handleRecipeImgUrlChange = this.handleRecipeImgUrlChange.bind(this);
    this.handleAddNewIngredient = this.handleAddNewIngredient.bind(this);
    this.handleSaveNewIndredient = this.handleSaveNewIndredient.bind(this);
    this.handleEnterSaveIngredient = this.handleEnterSaveIngredient.bind(this);
    this.handleAddNewInstruction = this.handleAddNewInstruction.bind(this);
    this.handleSaveNewInstruction = this.handleSaveNewInstruction.bind(this);
    this.handlEnterSaveInstruction = this.handlEnterSaveInstruction.bind(this);
    this.handleSaveEditedRecipe = this.handleSaveEditedRecipe.bind(this);

  }

  handleDeleteRecipe(){
    this.props.deleteRecipe();
  }

  handleDeleteIngredientItem(ingredient,index){
    //Save deleted items in case user cancel modal
    let backUpIngredients = this.state.backUpIngredients.concat(ingredient);
    this.setState({backUpIngredients});

    this.props.deleteIngredientItem(index);
  }

  handleDeleteInstructionItem(instruction, index){
    //Save deleted items in case user cancel modal
    let backUpInstructions = this.state.backUpInstructions.concat(instruction);
    this.setState({backUpInstructions});

    this.props.deleteInstructionItem(index);
  }

  handleRecipeNameChange(event){
    this.setState({
      newRecipe:
      {
        name:event.target.value,
        ingredients:this.state.newRecipe.ingredients,
        instructions:this.state.newRecipe.instructions,
        imgUrl: this.state.newRecipe.imgUrl
      }
    })
  }

  handleRecipeImgUrlChange(event){
    this.setState({
      newRecipe:
      {
        name:this.state.newRecipe.name,
        ingredients:this.state.newRecipe.ingredients,
        instructions:this.state.newRecipe.instructions,
        imgUrl: event.target.value
      }
    })
  }

  handleAddNewIngredient(event){
    this.setState(
      {
        newIngredient:event.target.value
      }
      );
  }

  handleAddNewInstruction(event){
    this.setState(
      {
        newInstruction:event.target.value
      }
    )
  }

  handleSaveNewIndredient(){
    if(this.state.newIngredient) {
      let newList = this.state.newRecipe.ingredients.concat(this.state.newIngredient);
      this.setState(
        {
          newRecipe:{
            name:this.state.newRecipe.name,
            ingredients:newList,
            instructions:this.state.newRecipe.instructions,
            imgUrl:this.state.newRecipe.imgUrl
          },
          newIngredient:''
        }
      )
    }
  }

  handleSaveNewInstruction(){
    if(this.state.newInstruction) {
      let newList = this.state.newRecipe.instructions.concat(this.state.newInstruction);
      this.setState(
        {
          newRecipe:{
            name:this.state.newRecipe.name,
            ingredients:this.state.newRecipe.ingredients,
            instructions:newList,
            imgUrl:this.state.newRecipe.imgUrl
          },
          newInstruction:''
        }
      )
    }
  }

  handleEnterSaveIngredient(event){
    if(event.key === 'Enter'){
      this.handleSaveNewIndredient();
    }
  }

  handlEnterSaveInstruction(event){
    if(event.key === 'Enter'){
      this.handleSaveNewInstruction();
    }
  }

  handleRemoveNewIngredient(index){
    let newIngredients = this.state.newRecipe.ingredients.filter((e,i)=>{
      return i !== index
    });

    this.setState(
      {
        newRecipe:
        {
          name:this.state.newRecipe.name,
          ingredients:newIngredients,
          instructions:this.state.newRecipe.instructions,
          imgUrl:this.state.newRecipe.imgUrl
        }
      }
    )
  }

  handleRemoveNewInstruction(index){
    let newInstructions = this.state.newRecipe.instructions.filter((e,i)=>{
      return i !== index
    });

    this.setState(
      {
        newRecipe:
        {
          name:this.state.newRecipe.name,
          ingredients:this.state.newRecipe.ingredients,
          instructions:newInstructions,
          imgUrl:this.state.newRecipe.imgUrl
        }
      }
    )
  }

  handleCloseModal(){
    this.props.closeRecipeModal();
    //update state with removed items
    this.props.retrieveIngrediens(this.state.backUpIngredients);
    this.props.retrieveInstructions(this.state.backUpInstructions)
    this.setState({
      newRecipe: {
        name:'',
        ingredients: [],
        instructions: [],
        imgUrl: '',
      },
      backUpIngredients:[],
      backUpInstructions:[],
      newIngredient:'',
      newInstruction:''
    })
  }

  handleSaveEditedRecipe(){
    let newName = this.state.newRecipe.name;
    let newIngredients = this.state.newRecipe.ingredients;
    let newInstructions = this.state.newRecipe.instructions;
    let newImgUrl = this.state.newRecipe.imgUrl;

    this.props.saveEditedRecipe(newName, newIngredients,newInstructions,newImgUrl);

    this.setState({newRecipe:{
      name:'',
      ingredients:[],
      instructions:[],
      imgUrl:''
    }})

    this.props.closeRecipeModal();
  }

  render(){
    let noImage = 'http://lakefarmbeef.co.nz/wp-content/themes/lakefarm/img/noimage.png';
    let recipe = this.props.recipes;
    let index = this.props.index;
    return(
      <div>
        <Modal show={this.props.showRecipeModal} onHide={this.props.closeRecipeModal}>
          <Modal.Header closeButton>
            <Modal.Title>Edit your recipe</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className='modalImg'>
              <img alt='recipe' src={recipe[index].imgUrl ==='' ? noImage : recipe[index].imgUrl} />
            </div>
            <hr />
            <h4>Recipe Name:</h4>
            <FormGroup>
              <FormControl
                type="text"
                defaultValue={recipe[index].name}
                onChange={this.handleRecipeNameChange}
                />
            </FormGroup>
            <hr />
            <h4>Ingredients:</h4>
            <ul>
              {recipe[index].ingredients.map((ingredient, index) =>{
                return(
                  <li key={index}>{ingredient}
                    <span
                      className="glyphicon glyphicon-remove"
                      onClick={this.handleDeleteIngredientItem.bind(this,ingredient,index)}>
                    </span>
                  </li>
                )
              })}
            </ul>
            <ul>
              {this.state.newRecipe.ingredients.map((newIngredient,index)=>{
                return(
                  <li key={index}>{newIngredient}
                    <span
                      className="glyphicon glyphicon-remove"
                      onClick={this.handleRemoveNewIngredient.bind(this,index)}>
                    </span>
                  </li>
                );
              })}
            </ul>
            <FormGroup>
              <InputGroup className='inputField'>
                <FormControl
                  type="text"
                  value={this.state.newIngredient}
                  onChange={this.handleAddNewIngredient}
                  onKeyPress={this.handleEnterSaveIngredient}/>
                <InputGroup.Addon>
                  <Glyphicon
                    glyph="plus"
                    onClick={this.handleSaveNewIndredient}/>
                </InputGroup.Addon>
              </InputGroup>
            </FormGroup>
            <hr />
            <h4>Instructions:</h4>
            <ul>
              {recipe[index].instructions.map((instruction, index) =>{
                return(
                  <li key={index}>{instruction}
                    <span
                      className="glyphicon glyphicon-remove"
                      onClick={this.handleDeleteInstructionItem.bind(this, instruction, index)}>
                    </span>
                    </li>
                )
              })}
            </ul>
            <ul>
              {this.state.newRecipe.instructions.map((instruction, index)=>{
                return(
                  <li key={index}>{instruction}
                    <span
                      className="glyphicon glyphicon-remove"
                      onClick={this.handleRemoveNewInstruction.bind(this,index)}>
                    </span>
                  </li>
                );
              })}
            </ul>
            <FormGroup>
              <InputGroup className='inputField'>
                <FormControl
                  type="text"
                  value={this.state.newInstruction}
                  onChange={this.handleAddNewInstruction}
                  onKeyPress={this.handlEnterSaveInstruction}/>
                <InputGroup.Addon>
                  <Glyphicon
                    glyph="plus"
                    onClick={this.handleSaveNewInstruction}/>
                </InputGroup.Addon>
              </InputGroup>
            </FormGroup>
            <hr />
              <h4>Image URL:</h4>
              <FormGroup>
                <FormControl
                  type="text"
                  defaultValue={recipe[index].imgUrl}
                  onChange={this.handleRecipeImgUrlChange}
                  />
              </FormGroup>
          </Modal.Body>
          <Modal.Footer className='recipeModalButtons'>
              <Button className='recipeModalButton'
                      bsSize='small'
                      bsStyle='info'
                      onClick={this.handleSaveEditedRecipe}>Save</Button>
              <Button className='recipeModalButton'
                      bsSize='small'
                      bsStyle='danger'
                      onClick={this.handleDeleteRecipe}>Delete</Button>
              <Button className='recipeModalButton'
                      bsSize='small'
                      bsStyle='warning'
                      onClick={this.handleCloseModal}
                      >Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
