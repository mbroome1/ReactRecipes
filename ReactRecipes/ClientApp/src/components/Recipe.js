import React, { Component } from 'react'
import Loading from './Loading';

export default class Recipe extends Component {
    static displayName = Recipe.name;

    constructor(props) {
        super(props)
        this.state = {
            paramId: parseInt(this.props.match.params['id']),
            loading: true,
            recipeData: {},
            errors: [],
            useMetric: true
        }

        this.handleMeasureToggle = this.handleMeasureToggle.bind(this);
    }

    async getLocalStorageRecipe() {
        return await localStorage.getItem("recipe");
    }
    async getLocalStorageMeasure() {
        return await localStorage.getItem("useMetric");
    }

    async componentDidMount() {

        const measureFromStorage = await this.getLocalStorageMeasure();
        
        if (measureFromStorage !== null) {
            // convert string to bool
            const measureValue = (measureFromStorage === "true"); 
            // set measurement state
            this.setState({ useMetric: measureValue });
        }




        const recipeFromStorage = await this.getLocalStorageRecipe();

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
            console.log(typeof (this.state.paramId));
            console.log(typeof (this.state.recipeData.id));
            if (parseInt(this.state.paramId) !== this.state.recipeData.id) {
            const response = await fetch(`api/recipes/${this.state.paramId}`, init)
                const data = await response.json();
/*                console.log(data);*/
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

    handleMeasureToggle(e) {
        const isMetric = e.target.value === "metric" ? true : false;
        this.setState({
            useMetric: isMetric
        })
        localStorage.setItem("useMetric", isMetric);
    }
    
    render() {
        if (this.state.loading === true) {
            return <Loading />
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
            <div className="mb-4"><button className="btn btn-secondary" onClick={()=> this.handleGoBack()}>Go Back</button></div>
            <h1 className="mb-3">{recipeState.title}</h1>
            <div className="row">
                <div className="col-md-6">
                    <img src={recipeState.image} alt="" className="img-fluid" />
                </div>
                <div className="col-md-6">
                    <div dangerouslySetInnerHTML={this.setInnerHTML(recipeState.summary)}></div>
                    <h5 className="mt-5">Ready in {recipeState.readyInMinutes} minutes</h5>
                    <h5 className="mt-2">Servings: {recipeState.servings}</h5>
                </div>
            </div>


            <div className="mt-5">
                <h2>Ingredients</h2>
                <div class="btn-group btn-group-sm my-3">
                    <input type="radio" class="btn-check" name="measure" id="measureMetric" value="metric" autoComplete="off" checked={this.state.useMetric} onChange={this.handleMeasureToggle} />
                    <label className="btn btn-outline-secondary w-" htmlFor="measureMetric" onChange={this.handleMeasureToggle}>Metric</label>

                    <input type="radio" class="btn-check" name="measure" id="measureUs" value="us" autoComplete="off" checked={!this.state.useMetric} onChange={this.handleMeasureToggle} />
                    <label className="btn btn-outline-secondary" htmlFor="measureUs" >Us</label>
                </div>
                <table className="table table-sm table-borderless">
                    <thead>
                        <tr>
                            <th>Ingredient</th>
                            <th>Unit</th>
                            <th className="text-secondary">Ingredient Ext.</th>
                        </tr>
                    </thead>


                {
                    recipeState.extendedIngredients.map((ingredient,index) => (
                        <tbody key={index}>
                            <tr>
                                <td>{ingredient.name}</td>
                                <td>
                                {
                                    this.state.useMetric 
                                        ? `${ingredient.measures.metric.amount} ${ingredient.measures.metric.unitShort}` 
                                        : `${ingredient.measures.us.amount} ${ingredient.measures.us.unitShort}` 
                                }
                                </td>
                                <td className="text-secondary">{ingredient.originalName}</td>
                            </tr>
                        </tbody>
                    ))
                }
                </table>
            </div>

            <h2 className="py-3">Instructions</h2>
            <div dangerouslySetInnerHTML={this.setInnerHTML(recipeState.instructions)}></div>

            <div className="mt-4">
                <h5 className="">
                    View full details about this recipe at: <a className="link" href={recipeState.sourceUrl}>{recipeState.creditsText}</a>
                </h5>
             </div>

            {/* NOT IN USE:  Some recipes have incomplete steps. */}
            {/*<h2 className="py-3">Instructions - Set 1</h2>*/}
            {/*<ol className="instruction-list">*/}
            {/*    {*/}
            {/*        recipeState.analyzedInstructions[0].steps.map((step, index) => (*/}
            {/*            <li key={index} className="ps-2 pb-2">{step.Step}</li>*/}
            {/*    ))*/}
            {/*}*/}
            {/*</ol>*/}

            
    </div>
    )
  }
}
