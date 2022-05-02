import React, { Component } from 'react'
import RecipeCard from './RecipeCard';

export default class RecipeList extends Component {
    static displayName = RecipeList.name;

    constructor(props) {
        super(props);
        this.state = {
            recipes: props.recipes,
            search: props.search,
            offset: 10,
            number: props.number,
            totalResults: props.totalResults,
            totalPages: 0,
            currentPage: 0
        }
    }

    calculatePages() {
        const calculatedNumberOfPages = Math.ceil(Number(this.state.totalResults) / Number(this.state.number));
        const calculateCurrentPage = (this.state.offset / this.state.number) + 1;

        this.setState({
            totalPages: calculatedNumberOfPages,
            currentPage: calculateCurrentPage
        })
    }

    componentDidMount() {
        this.calculatePages();
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
        <p className="lead text-secondary">TotalPages: "{this.state.totalPages}"</p>
        <p className="lead text-secondary">CurrentPage: "{this.state.currentPage}"</p>
        
        <div className="row">
        {
            this.state.recipes.map(recipe => (
                <RecipeCard key={recipe.id} recipe={recipe} />
            ))
        }
        </div>
        <div>
        <nav aria-label="Page navigation example">
            <ul className="pagination justify-content-center">
                {
                    this.state.currentPage > 1
                        && <li className="page-item"><a className="page-link" href="">Previous</a></li>
                }
            
                <li className="page-item active"><a className="page-link" href="">1</a></li>
                <li className="page-item"><a className="page-link" href="">2</a></li>
                <li className="page-item"><a className="page-link" href="">3</a></li>
                {
                    this.state.currentPage >= this.state.totalPages
                        && <li className="page-item"><a className="page-link" href="">Next</a></li>
                }
            </ul>
        </nav>
        </div>
      </div>
    )
  }
}
