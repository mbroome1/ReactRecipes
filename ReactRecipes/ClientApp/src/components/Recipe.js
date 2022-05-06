import React, { Component } from 'react'

export default class Recipe extends Component {
    static displayName = Recipe.name;

    constructor(props) {
        super(props)
        this.state = {
            paramId: this.props.match.params['id'],
            loading: true,
            recipeData: {},
            errors: []
        }

    }

    async getLocalStorage() {
        return await localStorage.getItem("recipe");

    }

    async componentDidMount() {

        const recipeFromStorage = await this.getLocalStorage()

        if (recipeFromStorage !== null) {
            this.setState({ recipeData: JSON.parse(recipeFromStorage) })
        }


        try {
            const init = {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'mode': 'cors'
                    }
            }

            // If browser local storage (previously accessed) recipe id is equal to the current requested recipe id, load existing 
            // state instead of fetching from API. Otherwise fetch recipe from API and store in local storage.
            if (this.state.paramId != this.state.recipeData.id) {
            const response = await fetch(`api/recipes/${this.state.paramId}`, init)
            console.log(response)
                const data = await response.json();
            if (response.ok) {
                console.log("I got to response.ok");
                    this.setState({ recipeData: data })
            } else {
                console.log("Failed to get to response.ok, in else block");

                    this.setState({ recipeData: {} })
                    console.log(`Error:: ${data}`)
                    for (const err in data.errors) {
                        data.errors[err].forEach(msg => {
                            this.setState(prevState => ({
                                errors: [...prevState.errors, msg]
                            }));
                        });
                    }

                }
            }

        }
        catch (error) {
            this.setState(prevState => ({
                errors: [...prevState.errors, "Something went wrong on the server fetching this recipe."]
            }));
        }
        finally {
            this.setState({ loading: false });
            localStorage.setItem("recipe", JSON.stringify(this.state.recipeData));
        }
    }

    setInnerHTML(stuff) {
        return {__html: stuff};
    }

    handleGoBack() {
        return this.props.history.goBack();
    }

    
    render() {
        if (this.state.loading === true) {
            return (
                <div className="text-center">
                    <div className="spinner-grow spinner-grow-sm text-dark" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                    <div className="spinner-grow spinner-grow-sm text-dark" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                    <div className="spinner-grow spinner-grow-sm text-dark" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>);
        }
        
        if (this.state.errors && this.state.errors.length>0) {
            let errorList = this.state.errors.map((error, i) => (
                    <p key={i} className="text-danger">{error}</p>
                    )
                    );
            return errorList;
        }

    const recipeState = this.state.recipeData;
    return (
        <div>
            <div><button className="btn btn-secondary" onClick={()=> this.handleGoBack()}>Go Back</button></div>
            <h1 className="display-2">{recipeState.title}</h1>
            <div className="row">
                <div className="col-md-6">
                    <img src={recipeState.image} className="img-fluid" />
                </div>
                <div className="col-md-6">
                    <div dangerouslySetInnerHTML={this.setInnerHTML(recipeState.summary)}></div>
                    <h4 className="mt-5">Ready in {recipeState.readyInMinutes} minutes</h4>
                    <h4 className="lead text-success">Servings: {recipeState.servings}</h4>
                </div>
            </div>


            <div className="mt-5">
                <h2>Ingredients</h2>
                <table className="table table-borderless">
                    <thead>
                        <tr>
                            <th>Ingredient</th>
                            <th>Unit</th>
                            <th className="text-secondary">Original Name</th>
                        </tr>
                    </thead>
                {
                    recipeState.extendedIngredients.map(ingredient => (
                        <tbody>
                            <tr>
                                <td>{ingredient.name}</td>
                                <td>{ingredient.amount} {ingredient.unit}</td>
                                <td className="text-secondary">{ingredient.originalName}</td>
                            </tr>
                        </tbody>
                    ))
                }
                </table>
            </div>


            <h2 className="py-3">Instructions</h2>
            <ol className="instruction-list">
            {
                recipeState.analyzedInstructions[0].steps.map(step => (
                   <li className="ps-2 pb-2">{step.Step}</li>
                ))
            }
            </ol>
            
    </div>
    )
  }
}
