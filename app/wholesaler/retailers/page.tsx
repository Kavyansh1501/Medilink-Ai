"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import styles from "./page.module.css";

interface Retailer{

    id:number;

    retailer_name:string;

    phone:string;

    address:string;

    pincode:string;

    latitude:string;

    longitude:string;

    medicines:string[];

}

export default function Retailers(){

const router = useRouter();



/* ===========================
        STATES
=========================== */


const [retailers,setRetailers]=useState<Retailer[]>([]);

const [loading,setLoading]=useState(true);

const [search,setSearch]=useState("");

const [filter,setFilter]=useState("all");



/* ADD POPUP */

const [showAdd,setShowAdd]=useState(false);



/* EDIT POPUP */

const [showEdit,setShowEdit]=useState(false);



/* FORM */

const [retailerId,setRetailerId]=useState<number>();

const [retailerName,setRetailerName]=useState("");

const [phone,setPhone]=useState("");

const [address,setAddress]=useState("");

const [pincode,setPincode]=useState("");

const [latitude,setLatitude]=useState("");

const [longitude,setLongitude]=useState("");

const [selectedMedicines,setSelectedMedicines]=useState<string[]>([]);



/* Medicines */

const [medicineList,setMedicineList]=useState<string[]>([]);





/* ===========================
      FETCH RETAILERS
=========================== */


const getRetailers = async()=>{


try{


const token = localStorage.getItem("token");


const res = await axios.get(

"http://localhost:5000/retailer/all",

{

headers:{

Authorization:`Bearer ${token}`

}

}

);



if(res.data.success){

setRetailers(res.data.data);

}



}

catch(error){

console.log(error);

}

finally{

setLoading(false);

}



};






/* ===========================
      FETCH MEDICINES
=========================== */


const getMedicines = async()=>{


try{


const token=localStorage.getItem("token");


const res=await axios.get(

"http://localhost:5000/medicine/all",

{

headers:{

Authorization:`Bearer ${token}`

}

}

);



if(res.data.success){

setMedicineList(

res.data.data.map((m:any)=>m.medicine_name)

);

}



}

catch(error){

console.log(error);

}


};






useEffect(()=>{


getRetailers();

getMedicines();


},[]);







/* ===========================
      SEARCH + FILTER
=========================== */


const filteredRetailers = useMemo(()=>{


let data=[...retailers];



if(search){

data=data.filter((item)=>

item.retailer_name.toLowerCase().includes(search.toLowerCase()) ||

item.phone.includes(search) ||

item.pincode.includes(search)

);

}




if(filter==="gps"){

data=data.filter(

item=>item.latitude && item.longitude

);

}



if(filter==="nogps"){

data=data.filter(

item=>!item.latitude || !item.longitude

);

}



return data;



},[retailers,search,filter]);








/* ===========================
      ANALYTICS
=========================== */


const analytics={

total:retailers.length,

gps:retailers.filter(

r=>r.latitude && r.longitude

).length,



nogps:retailers.filter(

r=>!r.latitude || !r.longitude

).length,



medicineCount:medicineList.length

};








/* ===========================
      RESET FORM
=========================== */


const clearForm=()=>{

setRetailerId(undefined);

setRetailerName("");

setPhone("");

setAddress("");

setPincode("");

setLatitude("");

setLongitude("");

setSelectedMedicines([]);

};








/* ===========================
        ADD
=========================== */


const addRetailer = async()=>{


// backend in next part


};








/* ===========================
       EDIT
=========================== */


const editRetailer=(item:Retailer)=>{


setRetailerId(item.id);

setRetailerName(item.retailer_name);

setPhone(item.phone);

setAddress(item.address);

setPincode(item.pincode);

setLatitude(item.latitude);

setLongitude(item.longitude);

setSelectedMedicines(item.medicines);

setShowEdit(true);


};








/* ===========================
      UPDATE
=========================== */


const updateRetailer=async()=>{


// backend next


};








/* ===========================
      DELETE
=========================== */


const deleteRetailer=async(id:number)=>{


// backend next


};
return (

<div className={styles.dashboard}>

    {/* ================= SIDEBAR ================= */}

    <aside className={styles.sidebar}>

        <div>

            <h2 className={styles.logo}>
                MediLink AI
            </h2>

            <p className={styles.subtitle}>
                Wholesaler Panel
            </p>

        </div>


        <div className={styles.menu}>

            <button onClick={() => router.push("/wholesaler/dashboard")}>
                Dashboard
            </button>

            <button onClick={() => router.push("/wholesaler/addmedicine")}>
                Add Medicine
            </button>

            <button onClick={() => router.push("/wholesaler/medicines")}>
                Medicine Inventory
            </button>

            <button className={styles.active}>
                Retailers
            </button>

            <button onClick={() => router.push("/wholesaler/profile")}>
                Profile
            </button>

            <button onClick={() => router.push("/wholesaler/settings")}>
                Settings
            </button>

        </div>


        <button

            className={styles.logout}

            onClick={() => {

                localStorage.removeItem("token");

                router.push("/wholesaler/login");

            }}

        >

            Logout

        </button>

    </aside>





    {/* ================= MAIN ================= */}

    <main className={styles.main}>


        <div className={styles.header}>

            <div>

                <h1>
                    Retailer Management
                </h1>

                <p>

                    Manage all connected retailers

                </p>

            </div>


            <button

                className={styles.addRetailer}

                onClick={() => {

                    clearForm();

                    setShowAdd(true);

                }}

            >

                + Add Retailer

            </button>


        </div>





        {/* Analytics */}


        <div className={styles.analytics}>


            <div className={styles.analyticsCard}>

                <h2>

                    {analytics.total}

                </h2>

                <span>

                    Total Retailers

                </span>

            </div>



            <div className={styles.analyticsCard}>

                <h2>

                    {analytics.gps}

                </h2>

                <span>

                    With GPS

                </span>

            </div>



            <div className={styles.analyticsCard}>

                <h2>

                    {analytics.nogps}

                </h2>

                <span>

                    Without GPS

                </span>

            </div>



            <div className={styles.analyticsCard}>

                <h2>

                    {analytics.medicineCount}

                </h2>

                <span>

                    Medicines

                </span>

            </div>


        </div>





        {/* Search */}


        <div className={styles.topBar}>


            <input

                className={styles.search}

                placeholder="Search retailer..."

                value={search}

                onChange={(e) =>

                    setSearch(e.target.value)

                }

            />


            <div className={styles.filters}>


                <button

                    onClick={() => setFilter("all")}

                >

                    All

                </button>


                <button

                    onClick={() => setFilter("gps")}

                >

                    With GPS

                </button>


                <button

                    onClick={() => setFilter("nogps")}

                >

                    Without GPS

                </button>


            </div>


        </div>






        {/* Retailers */}


        {

            loading ?

                <h2>

                    Loading...

                </h2>

                :

                <div className={styles.grid}>


                    {

                        filteredRetailers.map((item) => (

                            <div

                                key={item.id}

                                className={styles.card}

                            >


                                <div className={styles.cardHeader}>


                                    <h2>

                                        {item.retailer_name}

                                    </h2>


                                    <div>


                                        <button

                                            className={styles.edit}

                                            onClick={() =>

                                                editRetailer(item)

                                            }

                                        >

                                            Edit

                                        </button>



                                        <button

                                            className={styles.delete}

                                            onClick={() =>

                                                deleteRetailer(item.id)

                                            }

                                        >

                                            Delete

                                        </button>


                                    </div>


                                </div>





                                <div className={styles.info}>


                                    <p>

                                        📞 {item.phone}

                                    </p>


                                    <p>

                                        📍 {item.address}

                                    </p>


                                    <p>

                                        PIN : {item.pincode}

                                    </p>


                                    <p>

                                        Latitude : {item.latitude || "Not Added"}

                                    </p>


                                    <p>

                                        Longitude : {item.longitude || "Not Added"}

                                    </p>


                                </div>






                                <div className={styles.medicineSection}>


                                    <h3>

                                        Medicines

                                    </h3>


                                    <div className={styles.badges}>


                                        {

                                            item.medicines.map(

                                                (medicine, index) => (

                                                    <span

                                                        key={index}

                                                        className={styles.badge}

                                                    >

                                                        {medicine}

                                                    </span>

                                                )

                                            )

                                        }


                                    </div>


                                </div>


                            </div>

                        ))

                    }


                </div>

        }






        {/* ================= ADD POPUP ================= */}


        {

            showAdd && (

                <div className={styles.modal}>


                    <div className={styles.modalCard}>


                        <h2>

                            Add Retailer

                        </h2>


                        {/*

                        Form fields

                        will be added in Part 3

                        */}


                    </div>


                </div>

            )

        }







        {/* ================= EDIT POPUP ================= */}


        {

            showEdit && (

                <div className={styles.modal}>


                    <div className={styles.modalCard}>


                        <h2>

                            Edit Retailer

                        </h2>


                        {/*

                        Form fields

                        will be added in Part 3

                        */}


                    </div>


                </div>

            )

        }


    </main>

</div>

);
}