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

    //async getLocalStorage() {
    //    return await localStorage.getItem("recipe");

    //}

    async componentDidMount() {



        //const recipeFromStorage = await getLocalStorage()

        //if (recipeFromStorage) {
        //    this.setState({ recipeData: JSON.parse(recipeFromStorage) })
        //}

        try {
            const init = {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'mode': 'cors'
                    }
            }
            //console.log(this.state.recipeData.id)
            if (this.state.paramId != this.state.recipeData.id) {
                const response = await fetch(`api/recipes/${this.state.paramId}`, init)
                const data = await response.json();
                if (response.ok) {
                    this.setState({ recipeData: data })
                } else {
                    this.setState({ recipeData: {} })

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
            console.log(error);
        }
        finally {
            this.setState({ loading: false });
            localStorage.setItem("recipe", JSON.stringify(this.state.recipeData));
        }
    }

    setInnerHTML(stuff) {
        return {__html: stuff};
    }

    
    render() {
        if (this.state.loading === true) {
            return "Loading...";
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
            <h1 className="display-2">{recipeState.title}</h1>
            <div>
                <img src={recipeState.image} className="img-fluid" />
            </div>
            <div dangerouslySetInnerHTML={this.setInnerHTML(recipeState.summary)}></div>
            <h4 className="mt-5">Ready in {recipeState.readyInMinutes} minutes</h4>
            <h4>Servings: {recipeState.servings}</h4>

            <div className="mt-5">
                <h2>Ingredients</h2>
                <table className="table table-borderless">
                    <thead>
                        <tr className=''>
                            <th>Ingredient</th>
                            <th>Unit</th>
                            {/* <th>Original</th> */}
                            <th className="text-secondary">Original Name</th>
                        </tr>
                    </thead>
                {
                    recipeState.extendedIngredients.map(ingredient => (
                        <tbody>
                            <tr>
                                <td>{ingredient.name}</td>
                                <td>{ingredient.amount} {ingredient.unit}</td>
                                {/* <td>{ingredient.original}</td> */}
                                <td className="text-secondary">{ingredient.originalName}</td>
                            </tr>
                        </tbody>
                    ))
                }
                </table>
            </div>

            {/* <h2>Instructions</h2>
            <div dangerouslySetInnerHTML={this.setInnerHTML(recipeState.instructions)}></div> */}

            <h2>Instructions</h2>
            <ol>
            {
                recipeState.analyzedInstructions[0].steps.map(step => (
                   <li>{step.Step}</li>
                ))
            }
            </ol>
            
    </div>
    )
  }
}
