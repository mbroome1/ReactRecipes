import React, { Component } from "react";
import RecipeList from "./RecipeList";

export class Recipes extends Component {
    static displayName = Recipes.name;

    state = {
        search: '',
        recipeData: {
            // results: [],
            // offset: 0,
            // number: 0,
            // totalResults: 0
        },
        loading: false,
        errors: []
    }

    handleSearchInput = (e) => {
        this.setState({search:e.target.value});
        localStorage.setItem("search", e.target.value)
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        const searchValue = e.target.search.value;
        const init = {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'mode': 'cors'
            }
        }
        this.setState({loading: true, errors: []});
        // console.log(this.state);

        
        try {
            const response = await fetch(`api/recipes?searchQuery=${searchValue}`, init)
            const data = await response.json();
            if (response.ok) {
                this.setState({recipeData: data})
                console.log(data);
            } else {
                this.setState({recipeData: []})

                for(const err in data.errors) {
                    data.errors[err].forEach(msg => {
                        this.setState(prevState => ({
                            errors: [...prevState.errors, msg]
                        }));
                    });
                }

            }
        }
        catch (error) {
            console.log(error)
        }
        finally {
            this.setState({loading: false});
            localStorage.setItem("search", this.state.search);
            localStorage.setItem("recipes", JSON.stringify(this.state.recipeData));
        }

    }

    componentDidMount = () => {
        const searchFromStorage = localStorage.getItem("search");
        const recipesFromStorage = localStorage.getItem("recipes");

        if (searchFromStorage) {
            this.setState({search: searchFromStorage});
        }

        if (recipesFromStorage) {
            this.setState({recipeData: JSON.parse(recipesFromStorage)})
        }
    }
        
    render() {
        let contents = ''; 

        if (this.state.loading === true ) {
            contents = "Loading";

        } else if (this.state.errors && this.state.errors.length>0) {
            contents = this.state.errors.map((error, i) => (
                    <p key={i} className="text-danger">{error}</p>
            ));

        } else if (this.state.recipeData.results && this.state.recipeData.results.length>0) {
            contents = <RecipeList 
                            recipes={this.state.recipeData.results} 
                            search={this.state.search} 
                            offset={this.state.recipeData.offset} 
                            number={this.state.recipeData.number} 
                            totalResults={this.state.recipeData.totalResults} 
                        />;
            
        }

        return (
            <div>
                <h1 className="display-2">Recipes</h1>
                <form onSubmit={this.handleSubmit}>
                    <div className="mb-3 input-group">
                        <input type="search" id="search" name="search" className="form-control" value={this.state.search} onChange={this.handleSearchInput} />
                        <input type="submit" className="btn btn-primary" value="Search" />
                    </div>
                 </form>

                 <div>{contents}</div>
             </div>
        );
    }
}