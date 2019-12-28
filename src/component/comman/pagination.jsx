import React from 'react';
import _ from "lodash";
import PropTypes from "prop-types";

const Pagination = props => {
  
  const {itemCount, pageSize, onPageChange, currentPage } = props;
  const pageCount = Math.ceil(itemCount / pageSize);
  if(pageCount === 1) return null;
  const pages = _.range(1,pageCount + 1);
  //{console.log("itemCount = "+itemCount+" PageSize = "+pageSize+" currentPage = "+currentPage)}
  return (
  <nav>
    <ul className="pagination">
      { pages.map(page => ( <li key={page} className={ page === currentPage ? "page-item active" : "page-item"} onClick={() => onPageChange(page)}>
        <a className="page-link">{page}</a>
      </li>))}     
    </ul>
  </nav>
  );
};

Pagination.propType = {
  itemCount: PropTypes.number.isRequired, 
  pageSize: PropTypes.number.isRequired, 
  onPageChange: PropTypes.func.isRequired, 
  currentPage: PropTypes.number.isRequired
}

export default Pagination;
