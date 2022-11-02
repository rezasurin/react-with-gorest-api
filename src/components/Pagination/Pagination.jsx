import React from "react";
import { usePagination } from "../../hooks/usePagination";

export default function Pagination({ currentPage, totalPage,onPageChange}) {
  const pageRange = usePagination({totalItems: totalPage, currentPage})

  const handleNextPage = () => {
    localStorage.clear()
    onPageChange(currentPage + 1)

  }
  const handlePrevPage = () => {
    localStorage.clear()
    onPageChange(currentPage - 1)
  }

  return (
    <ul
    style={{
      width: "100%",
      justifyContent: "center",
      alignItems: "center",
      display: "flex",
      flexDirection: "row",
      gap:"1rem",
      listStyleType: "none"
    }}
    >
      
    <li
    onClick={handlePrevPage}
    style={{
      cursor: "pointer"
    }}
    >
      BEFORE
    </li>
      {
        pageRange?.map((item, idx) => (
          <li
          style={{
            width: "40px",
            height: "40px",
            border: "1px solid #131313",
            margin: "auto 4px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center ",
            cursor: "pointer",
            backgroundColor: currentPage === item ? 'yellow' : "white"
          }}
          onClick={() => onPageChange(item)}
          >
            {item}
          </li>
        ))
      }
      <li
      onClick={handleNextPage}
      style={{
        cursor: "pointer"
      }}
      >
        NEXT
      </li>

    </ul>
  )
}