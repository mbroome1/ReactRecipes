import React, { Component } from "react";
import Loading from "./Loading";
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

    handlePageChange = this.handlePageChange.bind(this);

    handleSearchInput = (e) => {
        this.setState({search:e.target.value});
        localStorage.setItem("search", e.target.value)
    }

    async fetchResultsFromApi(searchValue, offsetValue) {
        if(!offsetValue) {
            offsetValue = 0;
        }
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
            const response = await fetch(`api/recipes?searchQuery=${searchValue}&offset=${offsetValue}`, init)
            const data = await response.json();
            if (response.ok) {
                console.log(data)
                this.setState({ recipeData: data })

            } else if (response.status === 500) {
                this.setState(prevState => ({
                    errors: [...prevState.errors, data]
                }));
            }

            else {
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
            console.log(error);
        }
        finally {
            this.setState({loading: false});
            localStorage.setItem("search", this.state.search);
            localStorage.setItem("recipes", JSON.stringify(this.state.recipeData));
        }
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        const searchValue = e.target.search.value;
        
        await this.fetchResultsFromApi(searchValue, 0);
    }

    async handlePageChange(offset) {
        const search = this.state.search;
        if (search === '') {
            alert("search is empty");
            return;
        }

        await this.fetchResultsFromApi(search, offset);
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

        if (this.state.loading === true) {
            contents = <Loading />;

        } else if (this.state.errors && this.state.errors.length > 0) {
            contents = this.state.errors.map((error, i) => (
                <p key={i} className="text-danger">{error}</p>
            ));

        } else if (this.state.recipeData.results && this.state.recipeData.results.length > 0) {
            contents = <RecipeList
                recipes={this.state.recipeData.results}
                search={this.state.search}
                offset={this.state.recipeData.offset}
                number={this.state.recipeData.number}
                totalResults={this.state.recipeData.totalResults}
                handlePageChange={this.handlePageChange}
            />;

        } else if (!this.state.search || !this.state.recipeData.results) {
            contents = "";
        }
        else {
            contents = <p className="lead">No results found.</p>
        }

        return (
            <div>
                <h4 className="mb-3">Search:</h4>
                <form onSubmit={this.handleSubmit}>
                    <div className="mb-3 input-group">
                        <input type="search" id="search" name="search" className="form-control" value={this.state.search} onChange={this.handleSearchInput} />
                        <input type="submit" className="btn btn-secondary" value="Search" />
                    </div>
                 </form>

                 <div>{contents}</div>
             </div>
        );
    }
}