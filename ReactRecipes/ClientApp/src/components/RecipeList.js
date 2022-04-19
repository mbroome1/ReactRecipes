import React, { Component } from 'react'
import RecipeCard from './RecipeCard';

export default class RecipeList extends Component {
    static displayName = RecipeList.name;

    constructor(props) {
        super(props);
        this.state = {
            recipes: props.recipes
        }
    }
  render() {
    return (

      <div>
        <h4 className="lead text-primary">Search Results: "Pasta"</h4>
        <div className="row">
        {
            this.state.recipes.map(recipe => (
                <RecipeCard key={recipe.id} recipe={recipe} />
            ))
        }
        </div>
      </div>
    )
  }
}
