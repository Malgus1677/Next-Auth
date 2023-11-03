import { verifyWithCredential } from "@/actions/authActions";
import React from "react";

const VerifyPage = async ({searchParams : {token}}) => {
  const res = await verifyWithCredential(token);
  return (
    <h1 style={{color: 'green', fontSize: '40px'}}> {res?.msg} </h1>
  );
}; 

export default VerifyPage;