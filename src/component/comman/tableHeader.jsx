import React, { Component } from 'react';

//column : array(title)
//sortColumn object 
//onSort()

class TableHeader extends Component {
    
    raisSort = path =>{
        const sortColumn = { ...this.props.sortColumn };
        if (sortColumn.path === path) {
          sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
        } else {
          sortColumn.path = path;
          sortColumn.order = "asc";
        }
        this.props.OnSort(sortColumn);
    }

    render() { 
        return ( 
        <thead>
            <tr>
                {this.props.columns.map(column => (
                    <th key={column.path || column.key} onClick={() => this.raisSort(column.path)}>{ column.lable }</th>
                ))}
            </tr>
        </thead> );
    }
}
 
export default TableHeader;