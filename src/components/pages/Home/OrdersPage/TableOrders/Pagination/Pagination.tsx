import React from "react";
import classes from "./Pagination.module.scss";

interface PaginationProps {
  tableLengthPage: number;
  totalTableLength: number;
  paginate: (pageNumber: number) => void;
  currentPage: number;
  handlePageChange: (way: string) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  tableLengthPage,
  totalTableLength,
  paginate,
  currentPage,
  handlePageChange,
}) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalTableLength / tableLengthPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <div className={classes.pagination}>
      <ul className={classes.pagination__inner}>
        <li onClick={() => handlePageChange("backUp")}>
          <a href="#" className={classes.pageLink}>
            &lt;
          </a>
        </li>
        {pageNumbers.map((elem) => (
          <li key={elem} onClick={() => paginate(elem)}>
            <a href="#"> {elem}</a>
          </li>
        ))}
        <li onClick={() => handlePageChange("moveOn")}>
          <a href="#" className={classes.pageLink}>
            &gt;
          </a>
        </li>
      </ul>
    </div>
  );
};
