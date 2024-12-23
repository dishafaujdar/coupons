import { useEffect, useState } from "react";

export default function Signout() {

    const[userData , setUserData] = useState("");

    useEffect(()=>{
        const storedData = localStorage.getItem("userData");
        setUserData(storedData ? JSON.parse(storedData) : "");
        console.log(storedData);
        
        localStorage.removeItem("userData");
    },[])

  return (
    <div>
      <div className="space-y-6">
        <section className="text-center mt-32 py-12 bg-gradient-to-r from-primary to-secondary text-white">
          <h1 className="text-4xl font-bold mb-4">
            {userData} Logout Succesfully 🐝
          </h1>
          <p className="text-xl mb-6">
            Hope you've find and share the best deals for today
          </p>
        </section>
      </div>
    </div>
  );
}


