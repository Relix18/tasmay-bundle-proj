import React, { useEffect } from "react";
import "../styles/Pagination.scss";
import { productStatus } from "../redux/product/productSlice";
import { useSelector } from "react-redux";

const Pagination = ({
  totalPosts,
  postPerPage,
  setCurrentPage,
  currentPage,
}) => {
  let pages = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postPerPage); i++) {
    pages.push(i);
  }
  useEffect(() => {
    pages;
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [pages]);

  const isPrev = currentPage > 1;
  const isNext = currentPage < pages.length;

  return (
    <div id="Pagination">
      <button
        onClick={() => setCurrentPage(currentPage - 1)}
        disabled={!isPrev}
        className="btn"
      >
        Prev
      </button>
      {pages.map((page, index) => (
        <button
          className={`${currentPage === page ? "active" : ""}`}
          key={index}
          onClick={() => setCurrentPage(page)}
        >
          {page}
        </button>
      ))}
      <button
        onClick={() => setCurrentPage(currentPage + 1)}
        disabled={!isNext}
        className="btn"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
