"use client";

import {useState} from "react";
import {useRouter} from "next/navigation";
import axios from "axios";
import styles from "./page.module.css";


export default function AddMedicine(){


const router=useRouter();


const [medicineName,setMedicineName]=useState("");

const [medicineType,setMedicineType]=useState("");



const [retailerName,setRetailerName]=useState("");

const [phone,setPhone]=useState("");

const [address,setAddress]=useState("");

const [pincode,setPincode]=useState("");

const [latitude,setLatitude]=useState("");

const [longitude,setLongitude]=useState("");



const [retailers,setRetailers]=useState<any[]>([]);





// ADD RETAILER


const addRetailer=()=>{


if(
!retailerName ||
!phone ||
!address ||
!pincode
){


alert("Fill retailer details");

return;

}



const data={


retailerName,

phone,

address,

pincode,

latitude,

longitude


};




setRetailers([

...retailers,

data

]);




setRetailerName("");

setPhone("");

setAddress("");

setPincode("");

setLatitude("");

setLongitude("");



};








// SAVE MEDICINE


const saveMedicine=async()=>{



if(
!medicineName ||
!medicineType ||
retailers.length===0
){

alert("Complete details");

return;

}




const data={


medicineName,

medicineType,

retailers


};




try{


const token=localStorage.getItem("token");



const res=await axios.post(

"http://localhost:5000/medicine/add",

data,


{

headers:{

Authorization:`Bearer ${token}`

}

}


);





if(res.data.success){


alert(res.data.message);


setMedicineName("");

setMedicineType("");

setRetailers([]);


}

else{


alert(res.data.message);


}



}

catch(error){


console.log(error);

alert("Server Error");


}



};








return(

<div className={styles.dashboard}>





{/* SIDEBAR */}


<div className={styles.sidebar}>


<h2 className={styles.logo}>

MediLink AI

</h2>




<div className={styles.menu}>


<button
onClick={()=>
router.push("/wholesaler/dashboard")
}
>

Dashboard

</button>



<button>

Add Medicine

</button>



<button
onClick={()=>
router.push("/wholesaler/medicines")
}
>

Medicine Inventory

</button>



<button
onClick={()=>
router.push("/wholesaler/retailers")
}
>

Retailers

</button>


</div>





<button

className={styles.logout}

onClick={()=>{


localStorage.removeItem("token");

router.push("/wholesaler/login");


}}

>

Logout

</button>




</div>









{/* MAIN */}



<div className={styles.main}>


<h1>Add Medicine</h1>



<div className={styles.card}>



<input

className={styles.input}

placeholder="Medicine Name"

value={medicineName}

onChange={(e)=>
setMedicineName(e.target.value)
}

/>





<select

className={styles.input}

value={medicineType}

onChange={(e)=>
setMedicineType(e.target.value)
}

>


<option value="">

Medicine Type

</option>



<option>Tablet</option>

<option>Capsule</option>

<option>Syrup</option>

<option>Injection</option>



</select>






<h2>

Retailer Details

</h2>





<input

className={styles.input}

placeholder="Retailer Name"

value={retailerName}

onChange={(e)=>
setRetailerName(e.target.value)
}

/>




<input

className={styles.input}

placeholder="Phone Number"

value={phone}

onChange={(e)=>
setPhone(e.target.value)
}

/>





<textarea

className={styles.textarea}

placeholder="Address"

value={address}

onChange={(e)=>
setAddress(e.target.value)
}

/>






<input

className={styles.input}

placeholder="Pincode"

value={pincode}

onChange={(e)=>
setPincode(e.target.value)
}

/>







<input

className={styles.input}

placeholder="Latitude (Optional)"

value={latitude}

onChange={(e)=>
setLatitude(e.target.value)
}

/>





<input

className={styles.input}

placeholder="Longitude (Optional)"

value={longitude}

onChange={(e)=>
setLongitude(e.target.value)
}

/>







<button

className={styles.addBtn}

onClick={addRetailer}

>

+ Add Retailer

</button>






{


retailers.map((r,index)=>(


<p

className={styles.item}

key={index}

>

{index+1}. {r.retailerName}

</p>


))

}







<button

className={styles.save}

onClick={saveMedicine}

>

Save Medicine

</button>




</div>


</div>


</div>

);


}