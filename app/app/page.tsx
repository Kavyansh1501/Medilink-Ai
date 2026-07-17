"use client";

import { useRouter } from "next/navigation";
import styles from "./page.module.css";

export default function Home() {

  const router = useRouter();


  return (

    <div className={styles.container}>


      {/* Navbar */}

      <nav className={styles.navbar}>

        <h2 className={styles.logo}>
          MediLink AI
        </h2>


        <div className={styles.navLinks}>

          <p>Home</p>

          <p>Features</p>

          <p>About</p>

        </div>


      </nav>





      {/* Hero Section */}


      <section className={styles.hero}>


        <div className={styles.left}>


          <h1>

            Find Medicines
            Faster With AI

          </h1>



          <p>

            Search medicine availability instantly
            and discover connected retailers near you
            without creating an account.

          </p>



          <div className={styles.buttons}>


            <button

              className={styles.customerBtn}

              onClick={() =>
                router.push("/customer/search")
              }

            >

              Search Medicine

            </button>



            <button

              className={styles.wholesalerBtn}

              onClick={() =>
                router.push("/wholesaler/login")
              }

            >

              Wholesaler Login

            </button>


          </div>


        </div>




        <div className={styles.right}>

          <img
            src="/doctor.png"
            alt="doctor"
          />

        </div>


      </section>






      {/* Portal Section */}



      <section className={styles.portal}>


        <h2>
          Choose Your Service
        </h2>




        <div className={styles.cards}>




          {/* Customer */}


          <div className={styles.card}>


            <h3>
              Customer
            </h3>


            <p>

              Find medicines and nearby retailers
              instantly without login.

            </p>



            <button

              onClick={() =>
                router.push("/customer/search")
              }

            >

              Search Medicine

            </button>


          </div>







          {/* Wholesaler */}



          <div className={styles.card}>


            <h3>
              Wholesaler
            </h3>



            <p>

              Manage medicines,
              retailers and medicine network.

            </p>




            <div>


              <button

                onClick={() =>
                  router.push("/wholesaler/login")
                }

              >

                Login

              </button>




              <button

                onClick={() =>
                  router.push("/wholesaler/register")
                }

              >

                Register

              </button>


            </div>


          </div>




        </div>


      </section>








      {/* Features */}


      <section className={styles.features}>


        <h2>
          Platform Features
        </h2>



        <div className={styles.featureCards}>


          <div>


            <h3>
              Medicine Search
            </h3>


            <p>

              Quickly find required medicines.

            </p>


          </div>




          <div>


            <h3>
              Retailer Finder
            </h3>


            <p>

              Get retailer details and contact information.

            </p>


          </div>





          <div>


            <h3>
              AI Prescription
            </h3>


            <p>

              Future AI based prescription scanning.

            </p>


          </div>




        </div>



      </section>







      {/* Footer */}


      <footer className={styles.footer}>


        © 2026 MediLink AI | AI Medicine Discovery Platform


      </footer>





    </div>

  );

}