"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import styles from "./page.module.css";


export default function WholesalerDashboard(){


const router = useRouter();


const [analytics,setAnalytics] = useState({

totalMedicine:0,

totalRetailers:0,

categories:0

});




// FETCH ANALYTICS


const getAnalytics = async()=>{


try{


const token = localStorage.getItem("token");



const res = await axios.get(

"http://localhost:5000/dashboard/analytics",


{

headers:{

Authorization:`Bearer ${token}`

}

}


);



console.log(res.data);



if(res.data.success){


setAnalytics(res.data.analytics);


}


else{


alert(res.data.message);


}



}

catch(error){


console.log(error);


}


};





useEffect(()=>{


getAnalytics();


},[]);









return(

<div className={styles.dashboard}>





{/* SIDEBAR */}



<div className={styles.sidebar}>



<div>



<h2 className={styles.logo}>

MediLink AI

</h2>



<p className={styles.subtitle}>

Wholesaler Panel

</p>



</div>









<div className={styles.menu}>



<button

onClick={()=>

router.push("/wholesaler/dashboard")

}

>

Dashboard

</button>








<button

onClick={()=>

router.push("/wholesaler/addmedicine")

}

>

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








<button

onClick={()=>

router.push("/wholesaler/profile")

}

>

Profile

</button>








<button

onClick={()=>

router.push("/wholesaler/settings")

}

>

Settings

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











{/* MAIN CONTENT */}



<div className={styles.main}>





<h1 className={styles.heading}>

Welcome Back 👋

</h1>





<p className={styles.text}>

Manage your medicine network, inventory and connected retailers

</p>










{/* ANALYTICS */}




<div className={styles.analytics}>






<div className={styles.box}>


<h2>

{analytics.totalMedicine}

</h2>


<p>

Total Medicines

</p>



</div>










<div className={styles.box}>


<h2>

{analytics.totalRetailers}

</h2>


<p>

Connected Retailers

</p>



</div>










<div className={styles.box}>


<h2>

{analytics.categories}

</h2>


<p>

Medicine Categories

</p>



</div>






</div>










{/* QUICK ACTIONS */}




<h2 className={styles.section}>

Quick Actions

</h2>






<div className={styles.actions}>





<button

onClick={()=>

router.push("/wholesaler/addmedicine")

}

>

+ Add Medicine

</button>








<button

onClick={()=>

router.push("/wholesaler/medicines")

}

>

View Inventory

</button>







<button

onClick={()=>

router.push("/wholesaler/retailers")

}

>

View Retailers

</button>






</div>






</div>





</div>


);


}