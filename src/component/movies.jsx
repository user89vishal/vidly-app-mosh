import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import MoviesTable from "./moviesTable";
import Pagination from "./comman/pagination";
import { paginate } from "../utils/paginate";
import ListGroup  from "./comman/listGroup";
import { getGenres } from "../services/fakeGenreService";
import _ from "lodash";


class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    selectedGenre: "",
    currentPage: 1,
    sortColumn: { path: "title", order: "asc" },
    pageSize: 4
  };

  componentDidMount() {    
    const genres = [{ _id: "", name: "All Genres"},...getGenres()];
    this.setState({movies: getMovies(), genres});
  }

  handleGenreSelect = genre =>{
    this.setState({selectedGenre: genre, currentPage: 1})
  }

  handleSort = sortColumn =>{  
    this.setState({ sortColumn })
  }

  handleDelete = movie => {
    const movies = this.state.movies.filter(m => m._id !== movie._id);
    this.setState({ movies });
  };

  handleLike = (movie) =>{
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;
    this.setState({movies});
  }

  handlePageChange = page =>{
    this.setState({currentPage: page})
  }; 

  getPagedData(){

    const { 
      pageSize, 
      currentPage, 
      selectedGenre, 
      sortColumn,
      movies: allMovies 
    } = this.state;

    const filtered =  
        selectedGenre && selectedGenre._id 
          ? allMovies.filter(m => m.genre._id === selectedGenre._id)
          : allMovies;

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const movies = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: movies};
  }

  render() {
    const { length: count } = this.state.movies;
    const { pageSize, 
            currentPage, 
            sortColumn
          } = this.state;

    if (count === 0) return <p>There is no movie left in database</p>;

    const { totalCount, data: movies } = this.getPagedData();

    return (
      
      <div className="row">
         <div className="col-3 ">
            <ListGroup 
              items={this.state.genres}
              selectedItem={this.state.selectedGenre}
              onItemSelect={this.handleGenreSelect}/>
         </div>
         <div className="col">
          <p>Showing {totalCount} movies from database</p>
            <MoviesTable
              movies = {movies}
              sortColumn = {sortColumn} 
              onLike = {this.handleLike} 
              onDelete = {this.handleDelete}
              onSort = {this.handleSort}/>
            <Pagination 
              itemCount={totalCount}
              pageSize={pageSize}
              currentPage={currentPage}
              onPageChange={this.handlePageChange}/>
        </div>

      </div>
    );
  }
}

export default Movies;
