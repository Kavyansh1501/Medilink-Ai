"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import styles from "./page.module.css";


export default function MedicineInventory(){

const router = useRouter();


const [medicines,setMedicines] = useState<any[]>([]);


const [editId,setEditId] = useState<number | null>(null);

const [editName,setEditName] = useState("");

const [editType,setEditType] = useState("");





// =======================
// FETCH MEDICINES
// =======================


const getMedicines = async()=>{


try{


const token = localStorage.getItem("token");


const res = await axios.get(

"http://localhost:5000/medicine/all",

{

headers:{

Authorization:`Bearer ${token}`

}

}

);


console.log(res.data);


if(res.data.success){

setMedicines(res.data.data);

}



}

catch(error){

console.log(error);

}


};






useEffect(()=>{


getMedicines();


},[]);









// =======================
// DELETE MEDICINE
// =======================



const deleteMedicine = async(id:number)=>{


try{


const token = localStorage.getItem("token");



const res = await axios.post(

"http://localhost:5000/medicine/delete",


{

id:id

},


{

headers:{

Authorization:`Bearer ${token}`

}

}

);


alert(res.data.message);


getMedicines();



}

catch(error){

console.log(error);

}


};









// =======================
// EDIT BUTTON
// =======================


const startEdit=(medicine:any)=>{


setEditId(medicine.id);


setEditName(medicine.medicine_name);


setEditType(medicine.medicine_type);


};









// =======================
// UPDATE MEDICINE
// =======================



const updateMedicine = async()=>{


try{


const token = localStorage.getItem("token");



const res = await axios.post(

"http://localhost:5000/medicine/update",


{

id:editId,

medicineName:editName,

medicineType:editType

},


{

headers:{

Authorization:`Bearer ${token}`

}

}


);



alert(res.data.message);



setEditId(null);



getMedicines();




}

catch(error){

console.log(error);

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
onClick={()=>router.push("/wholesaler/dashboard")}
>
Dashboard
</button>



<button
onClick={()=>router.push("/wholesaler/addmedicine")}
>
Add Medicine
</button>



<button>
Medicine Inventory
</button>



<button
onClick={()=>router.push("/wholesaler/retailers")}
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


<h1>
Medicine Inventory
</h1>





<div className={styles.grid}>


{

medicines.map((item)=>(



<div

className={styles.card}

key={item.id}

>





{

editId===item.id ?

<>


<input

className={styles.input}

value={editName}

onChange={(e)=>
setEditName(e.target.value)
}

/>




<select

className={styles.input}

value={editType}

onChange={(e)=>
setEditType(e.target.value)
}

>

<option>
Tablet
</option>


<option>
Capsule
</option>


<option>
Syrup
</option>


<option>
Injection
</option>


</select>





<button

className={styles.save}

onClick={updateMedicine}

>

Save

</button>





</>


:

<>


<h2>

{item.medicine_name}

</h2>



<p>

Type : {item.medicine_type}

</p>





<div className={styles.buttons}>



<button

className={styles.edit}

onClick={()=>
startEdit(item)
}

>

Edit

</button>





<button

className={styles.delete}

onClick={()=>
deleteMedicine(item.id)
}

>

Delete

</button>




</div>


</>


}





</div>


))

}


</div>



</div>




</div>


);


}