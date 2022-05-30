import React, { Component } from 'react';
import RecipeCard from './RecipeCard';

export class Home extends Component {
  static displayName = Home.name;
  constructor(props) {
    super(props);
    this.state = {
        featuredRecipes: [
          {
            id: 659988,
            title: "Shrimp pasta with white wine tomato cream sauce",
            image: "https://spoonacular.com/recipeImages/659988-312x231.jpg"
          },
          {
            id: 1095742,
            title: "Winter Vegetable Minestrone Soup",
            image: "https://spoonacular.com/recipeImages/1095742-312x231.jpg"
          },
          {
            id: 655239,
            title: "Peanut Butter Banana French Toast",
            image: "https://spoonacular.com/recipeImages/655239-312x231.jpg"
          },
          {
            id: 657875,
            title: "Raspberry Jam Swirled Buns",
            image: "https://spoonacular.com/recipeImages/657875-312x231.jpg"
          }
        ]
    }
}
  render () {
    return (
        <div>
            <div className="hero p-6 text-center bg-hero rounded">
              <h1 className="display-4">Feeling Hungry?</h1>
              <p className="mt-3 lead">Why not browse for something to cook and eat.</p>
              <div className="mt-4 ">
                <a href="./recipes" className="btn btn-lg btn-outline-secondary">Browse Recipes</a>
              </div>
            </div>
            
            <div className="mt-5 pt-5">
              <h1 className="mb-4">Featured</h1>
              <div className="row justify-content-center">
              {
                  this.state.featuredRecipes.map(recipe => (
                      <RecipeCard key={recipe.id} recipe={recipe} />
                  ))
              }
            </div>
            </div>
           
        </div>
    );
  }
}
/*

  <h1 className="">Welcome</h1>
  <p className="lead">- Pages</p>
  <ul>
    <li><a href="/recipes" className="link-primary">recipes search page</a></li>
    <li><a href="/recipes/654959" className="link-primary">get recipe by id page (e.g. 654959)</a></li>
  </ul> 
    */
