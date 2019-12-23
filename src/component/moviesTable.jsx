import Like from "./comman/like";
import React, { Component } from "react";
import TableHeader from "./comman/tableHeader";

class MoviesTable extends Component {
  
//resumed from 19 pagination

  render() { 
    const { movies, sortColumn, OnLike, OnDelete, onSort } = this.props;

    console.log("onSort in moviesTable: "+OnDelete);

    const columns = [
      { path: "title", lable: "Title"},
      { path: "genre.name", lable: "Genre"},
      { path: "numberInStock", lable: "Stock"},
      { path: "dailyRentalRate", lable: "Rate"},
      { key: "like"},
      { key: "delete"},
    ];

    return ( 
      <table className="table">
      <TableHeader
        columns = { columns }
        sortColumn = {sortColumn }
        onSort = { onSort }/>
      <tbody>
        {movies.map(movie => (
          <tr key={movie._id}>
            <td>{movie.title}</td>
            <td>{movie.genre.name}</td>
            <td>{movie.numberInStock}</td>
            <td>{movie.dailyRentalRate}</td>
            <td>
              <Like onClick={() => OnLike(movie)} liked={movie.liked} />
            </td>
            <td>
              <button
                onClick={() => OnDelete(movie)}
                className="btn btn-danger btn-sm"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
     );
  }
}

export default MoviesTable;
