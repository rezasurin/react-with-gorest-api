import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom'
import LoadingSpinner from "../components/LoadingSpinner";
import { customerApi, useGetDetailCustomerQuery, useGetListCustomerQuery } from "../services/customer";
import { useDispatch } from "react-redux";
import { deleteCustomer } from "../services/customerSlice";

export default function CustomerDetail() {
  const { id } = useParams()
  const dispatch = useDispatch()
  const [ dataDetail, setDataDetail ] = useState({})
  const navigate = useNavigate()
  const { data, error, isLoading, isFetching } = useGetDetailCustomerQuery(
    id
  );
  const { data: dataList} = useGetListCustomerQuery()

  const DETAIL_FORM = [
    {
      accessor: "name",
      title: "Full Name"
    },
    {
      accessor: "status",
      title: "Status Account"
    },
    {
      accessor: "account_id",
      title: "AccountID"
    },
    {
      accessor: "email",
      title: "Email"
    },
    {
      accessor: "gender",
      title: "Gender"
    },
  ]

  useEffect(() => {
    if (data) {
      setDataDetail(data.data)
    } 
  }, [data])

  // console.log(dataDetail.name, "<< DATA DETAIL")

  if (isLoading) {
    return <LoadingSpinner />
  }

  const handleDeleteCustomer = (id) => {
    dispatch(deleteCustomer(id))
    // localStorage.setItem("")
    
    // deleteCustomer(id).then(() => console.log("DELETED"))
    navigate("/list-customer")

    // console.log(patchCollection, dataList.data, "<< CHECK")
  }



  return (
    <div
    style={{
      display: "grid",
      width: "90%",
      placeContent: "center",
      margin: "0 auto",
      gridTemplateColumns: "repeat(2, 1fr)",
      gridTemplateRows: "repeat(4, 1fr)",
      gridAutoFlow: "row",
      padding: "2rem 1rem",
      backgroundColor: "white",
      alignItems: "center",
      gap: "0 0.75rem"
    }}
    >
      {
        DETAIL_FORM.map((item, idx) => (
          <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "start",
            // // minWidth: "400px",
            padding: "0.25rem 0",
            // gap: '0.5rem',
            // height: '3.5rem'

          }}
          >
            <p
            style={{
              textAlign: "left",
              fontSize: "1.25rem",
              fontWeight: "700",
              color: "#FF8A00"
            }}
            >
              {item.title}
            </p>
            <div>
                {
                  item.accessor !== 'status' ?
                  <div
                  style={{
                    display: "flex",
                    padding: "0.75rem 0.5rem",
                    border: "1px solid #cccccc"
                  }}
                  >
                    <p
                    style={{
                      textAlign: "left",
                      textTransform: "capitalize",
                    }}
                    >
                      {
                        item.accessor === "account_id" ?
                        "@"+dataDetail?.name?.split(" ")[0]?.toLowerCase() + "_" + dataDetail?.name?.split(" ")[dataDetail?.name?.split(" ").length - 1]
                        :
                        dataDetail[item.accessor]
                      }
                    </p>
                  </div>
                  :
                  <div
                  style={{
                    border: `1px solid ${dataDetail[item.accessor] === "inactive" ? "red" : "#59ff6c"}`,
                    padding: "0.75rem 0",
                    textTransform: "capitalize"
                  }}
                  >
                    <p
                    style={{
                      color: dataDetail[item.accessor] === "inactive" ? "red" : "#59ff6c"
                    }}
                    >
                      {
                        dataDetail[item.accessor]
                      }
                    </p>
                  </div>
                }
            </div>
          </div>
        ))
      }
      <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: '0.5rem',
        justifyContent: "end",
        gridArea: "2 / 2 / last-line / 2",
        height: "100%"
      }}
      >
        <button
        onClick={() => navigate("/list-customer")}
        >RETURN TO LIST CUSTOMER</button>
        <button
        style={{
          backgroundColor: "red"
        }}
        onClick={() => handleDeleteCustomer(id)}
        >DELETE CUSTOMER</button>
      </div>
    </div>
  )
}