import React, { Component } from 'react'

export default class RecipeCard extends Component {
    static displayName = RecipeCard.name;
    
    constructor(props) {
        super(props);
        this.state = {
            recipe: props.recipe
        };
    }
  render() {
    return (
        <div className="col-sm-6 col-lg-4 col-xl-3 mb-3">
            <div className="card border-light">
                {/*<img src={this.state.recipe.image} alt="recipe photo" />*/}
                <div className="card-body">
                    <h6>{this.state.recipe.title}</h6>
                    <a href={'/recipes/' + this.state.recipe.id} className="link-primary">View</a>
                </div>
                
            </div>
        </div>

    )
  }
}
