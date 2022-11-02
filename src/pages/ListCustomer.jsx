import React, { useEffect, useState } from "react";
import LoadingSpinner from "../components/LoadingSpinner";
import Pagination from "../components/Pagination/Pagination";
import { useGetListCustomerQuery } from "../services/customer";
import { useNavigate } from "react-router";
import classes from "./styles/ListCustomer.module.css";
import { useDispatch, useSelector } from "react-redux";

export default function ListCustomer() {
  const navigate = useNavigate();
  const [paginate, setPaginate] = useState({
    perPage: 20,
    page: 1,
  });
  const [dataCustomer, setDataCustomer] = useState([]);
  const { data, error, isLoading, isFetching, refetch } =
    useGetListCustomerQuery(paginate.page, paginate.perPage);

  const { data: dataFromState } = useSelector((state) => state.customerSlice);

  useEffect(() => {
    if (!isLoading) {
      setDataCustomer(dataFromState);
    }
  }, [data, dataFromState]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div>
      <div className={classes.listWrapper}>
        <div
          style={{
            display: "flex",
          }}
        >
          <div className={classes.headerList}>
            <p
              style={{
                textAlign: "left",
              }}
            >
              Name
            </p>
          </div>
          <div className={classes.headerList}>
            <p
              style={{
                textAlign: "center",
              }}
            >
              Status
            </p>
          </div>
          <div className={classes.headerList}>
            <p
              style={{
                textAlign: "center",
              }}
            >
              Actions
            </p>
          </div>
        </div>
        {isFetching ? (
          <LoadingSpinner />
        ) : (
          <ul style={{}}>
            {dataCustomer?.map((cust, idx) => (
              <>
                <li
                  style={{
                    display: "flex",
                    alignItems: "center",
                    backgroundColor: "#f5f5f5",
                    borderRadius: "4px",
                    boxShadow: "1px 1px 12px 5px rgba(0,0,0,0.1)",
                  }}
                >
                  <div
                    style={{
                      minWidth: "400px",
                      // padding: "0 1rem",
                      textAlign: "start",
                    }}
                  >
                    <p style={{ lineHeight: "1.25rem", fontWeight: "600" }}>
                      {cust.name}
                    </p>
                    <small
                      style={{
                        color: "darkgray",
                        textTransform: "lowercase",
                      }}
                    >
                      @
                      {cust.name?.split(" ")[0] +
                        "_" +
                        cust.name.split(" ")[cust.name?.split(" ").length - 1]}
                    </small>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "start",
                        gap: "0.5rem",
                      }}
                    >
                      <span
                        style={{
                          display: "inline-block",
                          width: "1rem",
                          height: "1rem",
                          backgroundColor:
                            cust.status === "active" ? "green" : "red",
                          borderRadius: "50%",
                        }}
                      />
                      <p>{cust.status}</p>
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <button
                      onClick={() => navigate(`/customer-detail/${cust.id}`)}
                    >
                      View cust.
                    </button>
                  </div>
                </li>
              </>
            ))}
          </ul>
        )}
      </div>
      <Pagination
        currentPage={paginate.page}
        onPageChange={(page) => {
          refetch();
          setPaginate((prevState) => ({ ...prevState, page }));
        }}
        countItem={data?.meta.pagination.total}
        totalPage={data?.meta.pagination.pages}
      />
    </div>
  );
}
