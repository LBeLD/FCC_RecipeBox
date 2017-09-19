import React, { Component } from 'react';
import { Tooltip, OverlayTrigger } from 'react-bootstrap';
export default class Header extends Component{

  constructor(props){
    super(props);

    this.handleOpenAddRecipeModal = this.handleOpenAddRecipeModal.bind(this);
  }

  handleOpenAddRecipeModal(){
    this.props.openAddRecipeModal();
  }

  render() {
    const tooltip = <Tooltip id="tooltip">Click to add a new recipe</Tooltip>

  return(
      <div className='header'>
        <h3>RECIPE BOX
          <OverlayTrigger placement="right" overlay={tooltip}>
          <span
          className='addRecipeButton'
          onClick={this.handleOpenAddRecipeModal}
          >+</span>
           </OverlayTrigger>
        </h3>
      </div>
    );
  }
}
