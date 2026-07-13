"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import styles from "./page.module.css";

export default function WholesalerLogin() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

 const login = async () => {

if(!email || !password){

alert("Please fill all fields");
return;

}


try{


const res = await axios.post(

"http://localhost:5000/wholesaler/login",

{

email:email,

password:password

}

);



console.log("FULL RESPONSE:",res.data);



if(res.data.success){



console.log("JWT TOKEN:",res.data.token);



localStorage.setItem(

"token",

res.data.token

);



console.log(

"SAVED TOKEN:",

localStorage.getItem("token")

);



alert("Login Successful");


router.push("/wholesaler/dashboard");


}

else{


alert(res.data.message);


}



}

catch(error){


console.log(error);


alert("Login error");


}



};
  return (
    <div className={styles.container}>
      <div className={styles.card}>

        <h1 className={styles.title}>Wholesaler Login</h1>

        <input
          type="email"
          placeholder="Business Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={styles.input}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={styles.input}
        />

        <button
          className={styles.button}
          onClick={login}
        >
          Login
        </button>

        <p className={styles.text}>
          Don't have an account?
        </p>

        <button
          className={styles.registerButton}
          onClick={() => router.push("/wholesaler/register")}
        >
          Register
        </button>

      </div>
    </div>
  );
}