import React, { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router";

export default function MainLayout({children}) {
  const location = useLocation()
  const navigate = useNavigate()
  const pathName = location.pathname?.split("/")[1]

  useEffect(() => {
    if (!document.cookie) {
      navigate("/")
    } 
  }, [document.cookie])

  return (
    <div
    style={{
      width: "90vw",
      padding: "2rem 1rem",
      backgroundColor: "white",
      position: "relative"
    }}
    >
      <div
      style={{
        position: "relative",
        backgroundColor: "#FFFAE6",
        display: "inline-block",
        padding: "0 0.25rem",
        minWidth: "40%",
        top: "-2rem",
        left: "3%",
        borderRadius: "0 0px 20px 20px"
      }}
      >
        <h2 style={{textTransform: "capitalize", color: "#FF8A00"}}>{pathName.split("-").join(" ")}</h2>
      </div>
      <Outlet />
    </div>
  )
}