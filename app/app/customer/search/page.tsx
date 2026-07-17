"use client";

import { useState } from "react";
import styles from "./page.module.css";


export default function SearchMedicine() {


const [medicine,setMedicine] = useState("");
const [location,setLocation] = useState("");


const [results,setResults] = useState<any[]>([]);




const searchMedicine = ()=>{


if(!medicine || !location){

alert("Enter medicine and location");

return;

}



// temporary data
// later comes from backend


const data=[

{

medicineName:"Dolo 650",

type:"Tablet",

wholesaler:"Kavya Drug House",

retailers:[


{

name:"Apollo Pharmacy",

phone:"9876543210",

address:"Sanjay Place Agra"

},


{

name:"City Medical Store",

phone:"9876543211",

address:"Kamla Nagar Agra"

}


]


}

];



setResults(data);



};






return(

<div className={styles.container}>




<h1 className={styles.heading}>

Find Your Medicine Instantly

</h1>




<p className={styles.subtitle}>

Search medicines and discover connected retailers near you

</p>






<div className={styles.searchBox}>



<input

type="text"

placeholder="Enter Medicine Name"

value={medicine}

onChange={(e)=>setMedicine(e.target.value)}

className={styles.input}

/>




<input

type="text"

placeholder="Enter Your Location"

value={location}

onChange={(e)=>setLocation(e.target.value)}

className={styles.input}

/>




<button

className={styles.button}

onClick={searchMedicine}

>

Search Medicine

</button>




</div>







<div className={styles.results}>



{


results.map((item,index)=>(


<div

key={index}

className={styles.card}

>



<h2>

{item.medicineName}

</h2>



<p>

Medicine Type : {item.type}

</p>




<p>

Wholesaler : {item.wholesaler}

</p>




<h3>

Available Retailers

</h3>





{


item.retailers.map(

(r:any,i:number)=>(


<div

key={i}

className={styles.retailer}

>


<p>

🏥 {r.name}

</p>



<p>

📞 {r.phone}

</p>



<p>

📍 {r.address}

</p>



</div>


)


)


}



</div>


))


}



</div>





</div>

);


}