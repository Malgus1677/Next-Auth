"use client";

import ProtectedComponent from "@/components/protected";

function ProtectedClientPage() {

  return (
    <div className=' flex justify-center items-center'>
        <h1>Protected Client Page</h1>
        <i style={{color : 'red'}} className=' mx-5'> Client-Side</i> protected page
        <ProtectedComponent/>
    </div>
  )
}

export default ProtectedClientPage;