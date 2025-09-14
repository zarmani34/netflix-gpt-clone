import React from 'react'
import { ClipLoader } from "react-spinners";

const Spinner = ({color="#6C63FF"}) => {
    const override = {
        display: "block",
        margin: "12.5% auto",
      };
  return (
    <div className="spinner-container my-1/2 mx-auto">
        <ClipLoader size={100} color={color} cssOverride={override} />
      </div>
  )
}

export default Spinner
