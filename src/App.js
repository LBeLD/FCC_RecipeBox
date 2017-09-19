import React, { Component } from 'react';
import Header from './Header';
import Gallery from './Gallery';
import AddRecipeModal from './Add_Recipe_Modal';
import RecipeModal from './Recipe_Modal';

export default class App extends Component{

  constructor(props){
    super(props);
    this.state =
    {
      recipes: [
        {}
      ]
      ,
      showAddModal:false,
      showRecipeModal: false,
      showEditModal:false,
      recipeIndex:0
    }
    this.openAddRecipeModal = this.openAddRecipeModal.bind(this);
    this.closeAddRecipeModal = this.closeAddRecipeModal.bind(this);
    this.saveNewRecipe = this.saveNewRecipe.bind(this);
    this.openRecipeModal = this.openRecipeModal.bind(this);
    this.closeRecipeModal = this.closeRecipeModal.bind(this);
    this.deleteRecipe = this.deleteRecipe.bind(this);
    this.openEditRecipeModal = this.openEditRecipeModal.bind(this);
    this.closeEditRecipeModal = this.closeEditRecipeModal.bind(this);
    this.deleteIngredientItem = this.deleteIngredientItem.bind(this);
    this.retrieveIngrediens = this.retrieveIngrediens.bind(this);
    this.deleteInstructionItem = this.deleteInstructionItem.bind(this);
    this.retrieveInstructions = this.retrieveInstructions.bind(this);
    this.saveEditedRecipe = this.saveEditedRecipe.bind(this);
  }

  //If localStorage is empty, parse saved object and setState
  componentWillMount() {
    let recipes = JSON.parse(localStorage.getItem('recipes')) ||
    [
      {
      name:'Pizza Dough',
      ingredients:['3 cups all-purpose flour', '1 (.25 ounce) package active dry yeast','2 tablespoons vegetable oil', '1 teaspoon salt', '1 tablespoon white sugar', '1 cup warm water (110 degrees F/45 degrees C)'],
      instructions:['Combine flour, salt, sugar, and yeast in a large bowl. Mix in oil and warm water. Spread out on a large pizza pan. Top as desired.','Bake at 375 degrees C (190 degrees C) for 20 to 25 minutes.'],
      imgUrl:'http://ctboom.com/wp-content/uploads/connecticut-pizza-robbery.jpg'
    },
      {
        name:'Waffles',
        ingredients:['2 cups sifted flour', '1 teaspoon baking powder', '1 teaspoon baking soda', '1 teaspoon salt','4 large eggs, at room temperature','2 cups buttermilk','2 cups buttermilk', '1 cup melted butter'],
        instructions:['Preheat a waffle iron according to manufacturer instructions. Spray waffle iron with non-stick cooking spray or brush with oil', 'Whisk flour, baking powder, baking soda, and salt together in a bowl.','Beat eggs in a large bowl until light and fluffy. Stir flour mixture into eggs, one third at a time, alternating with buttermilk, until just combined; stir in butter.','Pour batter into preheated waffle iron; cook until golden brown, about 3 minutes.'],
        imgUrl:'https://www.macheesmo.com/wp-content/uploads/2015/06/strawberry-waffles-1-3.jpg'
      },
      {
        name:'Caipirinha Cocktail',
        ingredients:['1 lime, quartered', '1 teaspoon white sugar', '2 fluid ounces cachaca (Brazilian rum)', '1 1/2 cups ice'],
        instructions:['Combine sugar and lime quarters in a pint glass.', 'Crush and mix together using a cocktail muddler', 'Add cachaca and stir. Fill with ice and stir again'],
        imgUrl:'https://assets.epicurious.com/photos/579a2d8e437fcffe02f7230b/master/pass/caipirinha-072816.jpg'
      }
    ]

    this.setState({recipes});
  }
//Open Add Recipe Modal
  openAddRecipeModal(){
    this.setState({showAddModal:true})
  }
//Close Add Recipe Modal
  closeAddRecipeModal(){
    this.setState({showAddModal:false})
  }
//Save new Recipe
  saveNewRecipe(newRecipe){
    let recipes = this.state.recipes.concat(newRecipe);
    localStorage.setItem('recipes', JSON.stringify(recipes));
    this.setState({
      recipes,
      showAddModal:false
    })
  }

//Open Recipe Modal and change recipeIndex state
  openRecipeModal(clickedIndex){
    this.setState({
      showRecipeModal:true,
      recipeIndex:clickedIndex
    })
  }
//Close Recipe Modal
  closeRecipeModal(){
    this.setState({showRecipeModal:false})
  }
//Open Edit Recipe Modal
    openEditRecipeModal(){
      this.setState({
        showEditModal:true
      })
    }
//Close Edit Recipe Modal
    closeEditRecipeModal(){
      this.setState({
        showEditModal:false
      })
    }


//Delete Ingredient Item from List
 deleteIngredientItem(clickedItem){
   const recipes = this.state.recipes;
   let index = this.state.recipeIndex
   recipes[index].ingredients = recipes[index].ingredients.filter((e,i)=>{
     return i !== clickedItem
   });

   this.setState({
     recipes
   })
 }

 //Delete Instruction Item from List
 deleteInstructionItem(clickedItem){
   const recipes=this.state.recipes;
   let index=this.state.recipeIndex;
   recipes[index].instructions = recipes[index].instructions.filter((e,i)=>{
     return i !== clickedItem
   });

   this.setState({
     recipes
   })
 }

//retrieve deleted recipe ingredients when close Modal
  retrieveIngrediens(backUpIngredients){
    const recipes = this.state.recipes;
    let index = this.state.recipeIndex;
    recipes[index].ingredients = recipes[index].ingredients.concat(backUpIngredients);

    this.setState({
      recipes
    })
  }

//retrieve deleted recipe instructions when close Modal
retrieveInstructions(backUpInstructions){
  const recipes = this.state.recipes;
  let index = this.state.recipeIndex;
  recipes[index].instructions = recipes[index].instructions.concat(backUpInstructions);

  this.setState({
    recipes
  })
}

//Delete Recipe
  deleteRecipe(){
    let recipes = this.state.recipes.filter((recipe,index)=>{
      return this.state.recipeIndex !== index
    })

    localStorage.setItem('recipes', JSON.stringify(recipes));

    this.setState({
      recipes,
      showRecipeModal:false,
      recipeIndex:0
    })
  }

//Save Edited Recipe
  saveEditedRecipe(newName,newIngredients,newInstructions,newImgUrl){
    const recipes = this.state.recipes;
    let index = this.state.recipeIndex;

    if(newName !== '') {
      recipes[index].name = newName;
    } else if (newImgUrl !== '') {
      recipes[index].imgUrl = newImgUrl;
    } else if(newIngredients.length !== 0){
      recipes[index].ingredients = recipes[index].ingredients.concat(newIngredients);
    } else if(newInstructions.length !==0){
      recipes[index].instructions = recipes[index].instructions.concat(newInstructions);

    }

    localStorage.setItem('recipes', JSON.stringify(recipes));

    this.setState({recipes})

  }



  render() {
    return(
      <div className='App'>
        <Header openAddRecipeModal = {this.openAddRecipeModal}/>
        <Gallery
          recipes={this.state.recipes}
          openRecipeModal={this.openRecipeModal}/>
        {this.state.recipes.length > 0 && (
          <div>
            <RecipeModal
              showRecipeModal={this.state.showRecipeModal}
              recipes={this.state.recipes}
              closeRecipeModal={this.closeRecipeModal}
              index={this.state.recipeIndex}
              arr={this.state.arr}
              deleteRecipe={this.deleteRecipe}
              openEditRecipeModal={this.openEditRecipeModal}
              closeEditRecipeModal={this.closeEditRecipeModal}
              deleteIngredientItem={this.deleteIngredientItem}
              retrieveIngrediens={this.retrieveIngrediens}
              deleteInstructionItem={this.deleteInstructionItem}
              retrieveInstructions={this.retrieveInstructions}
              saveEditedRecipe={this.saveEditedRecipe}/>
          </div>
        )}
        <AddRecipeModal
          showAddModal={this.state.showAddModal}
          closeAddRecipeModal={this.closeAddRecipeModal}
          saveNewRecipe={this.saveNewRecipe}/>
      </div>
    );
  }
}
