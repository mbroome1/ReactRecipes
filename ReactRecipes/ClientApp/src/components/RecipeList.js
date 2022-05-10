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
            totalResults: props.totalResults,
            totalPages: 0,
            currentPage: 0
        }
    }

    // Function that calculates total page count and the selected current page, then overrides default state.
    calculatePages() {
        const calculatedNumberOfPages = Math.ceil(Number(this.state.totalResults) / Number(this.state.number));
        const calculateCurrentPage = (this.state.offset / this.state.number) + 1;

        this.setState({
            totalPages: calculatedNumberOfPages,
            currentPage: calculateCurrentPage
        })
    }

    // Clicked pagination page event: workout new offset from page number, then call parent
    // compent's (Recipes) handle method to do a re-fetch with the new offset.
    onPageChange(pageNumber) {
        const newOffset = Math.max(0,pageNumber-1)*this.state.number;
        this.props.handlePageChange(newOffset);
    }

    componentDidMount() {
        this.calculatePages();
    }

  render() {
    // Create an array of ascending page numbers based on total page count state.
    const pageCountArray = [];
      for (let count = 0; count < this.state.totalPages; count++) {
        pageCountArray.push(count+1);
      }

    return (

      <div>
        {
          this.state.search> '' && <h3 className="text-primary">Search results for: "{this.state.search}"</h3>
        }
        <h5 className="">Total Results: {this.state.totalResults}</h5>
        {/*<p className="lead text-secondary">Number to show: "{this.state.number}"</p>*/}
        {/*<p className="lead text-secondary">Offset: "{this.state.offset}"</p>*/}
        {/*<p className="lead text-secondary">TotalPages: "{this.state.totalPages}"</p>*/}
        {/*<p className="lead text-secondary">CurrentPage: "{this.state.currentPage}"</p>*/}

            <p className="lead mt-5">Page {this.state.currentPage} of {this.state.totalPages}</p>

        <div className="row">
        {
            this.state.recipes.map(recipe => (
                <RecipeCard key={recipe.id} recipe={recipe} />
            ))
        }
            </div>

            <nav className="mt-3">
            <ul className="pagination d-flex flex-wrap justify-content-center">
                {
                    // Previous button
                    this.state.currentPage > 1
                        && <li className="page-item"><a className="page-link" onClick={() => this.onPageChange(this.state.currentPage-1)}>Previous</a></li>
                }

                {
                    // Iterate through the pageCountArray array above and map page numbers to <li> tags.
                    pageCountArray.map((page,index) => (
                        
                        page === this.state.currentPage 
                            ? <li key={index} className="page-item active">
                                <a className="page-link">{page}</a>
                            </li>
                            : <li key={index} className="page-item"><a className="page-link" onClick={() => this.onPageChange(page)}>{page}</a></li>
                    ))
                }
            
                {
                    // Next button
                    this.state.currentPage < this.state.totalPages
                        && <li className="page-item">
                                <a className="page-link" onClick={() => this.onPageChange(this.state.currentPage+1)}>Next</a>
                            </li>
                }
            </ul>
        </nav>
      </div>
    )
  }
}
