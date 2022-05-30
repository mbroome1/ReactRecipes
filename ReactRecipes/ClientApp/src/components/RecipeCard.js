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
            <div className="card border-0 shadow bg-light rounded overflow-hidden h-100">
                <img src={this.state.recipe.image} alt="recipe photo" className="img-fluid" />
                <div className="card-body">
                    <h6>{this.state.recipe.title}</h6>
                    </div>
                    <div className="card-footer bg-transparent text-center border-0">
                        <a href={'./recipes/' + this.state.recipe.id} className="btn btn-outline-secondary">View</a>
                    </div>
            </div>
        </div>

    )
  }
}
