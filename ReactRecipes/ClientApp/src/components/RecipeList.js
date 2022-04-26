import React, { Component } from 'react'
import RecipeCard from './RecipeCard';

export default class RecipeList extends Component {
    static displayName = RecipeList.name;

    constructor(props) {
        super(props);
        this.state = {
            recipes: props.recipes,
            search: props.search,
            offset: props.offset,
            number: props.number,
            totalResults: props.totalResults
        }
    }
  render() {
    return (

      <div>
        {
          this.state.search> '' && <h4 className="lead text-primary">Search results for: "{this.state.search}"</h4>
        }
        <p className="lead text-secondary">Total Results: "{this.state.totalResults}"</p>
        <p className="lead text-secondary">Number to show: "{this.state.number}"</p>
        <p className="lead text-secondary">Offset: "{this.state.offset}"</p>
        
        <div className="row">
        {
            this.state.recipes.map(recipe => (
                <RecipeCard key={recipe.id} recipe={recipe} />
            ))
        }
        </div>
        <div>
        <nav aria-label="Page navigation example">
          <ul class="pagination justify-content-center">
            <li class="page-item"><a class="page-link" href="">Previous</a></li>
            <li class="page-item active"><a class="page-link" href="">1</a></li>
            <li class="page-item"><a class="page-link" href="">2</a></li>
            <li class="page-item"><a class="page-link" href="">3</a></li>
            <li class="page-item"><a class="page-link" href="">Next</a></li>
          </ul>
        </nav>
        </div>
      </div>
    )
  }
}
