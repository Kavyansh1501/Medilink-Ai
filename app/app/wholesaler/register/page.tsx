"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import styles from "./page.module.css";

export default function WholesalerRegister() {
  const router = useRouter();

  const [businessName, setBusinessName] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [licenseNumber, setLicenseNumber] = useState("");
  const [gstNumber, setGstNumber] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");

  const register = async () => {
    if (
      !businessName ||
      !ownerName ||
      !licenseNumber ||
      !gstNumber ||
      !email ||
      !phone ||
      !address ||
      !password
    ) {
      alert("Please fill all fields");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:5000/wholesaler/register",
        {
          businessName,
          ownerName,
          licenseNumber,
          gstNumber,
          email,
          phone,
          address,
          password,
        }
      );

      if (res.data.success) {
        alert(res.data.message);
        router.push("/wholesaler/login");
      } else {
        alert(res.data.message);
      }

    } catch (error) {
      console.error(error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>

        <h1 className={styles.title}>Wholesaler Registration</h1>

        <input
          type="text"
          placeholder="Business Name"
          className={styles.input}
          value={businessName}
          onChange={(e) => setBusinessName(e.target.value)}
        />

        <input
          type="text"
          placeholder="Owner Name"
          className={styles.input}
          value={ownerName}
          onChange={(e) => setOwnerName(e.target.value)}
        />

        <input
          type="text"
          placeholder="Drug License Number"
          className={styles.input}
          value={licenseNumber}
          onChange={(e) => setLicenseNumber(e.target.value)}
        />

        <input
          type="text"
          placeholder="GST Number"
          className={styles.input}
          value={gstNumber}
          onChange={(e) => setGstNumber(e.target.value)}
        />

        <input
          type="email"
          placeholder="Business Email"
          className={styles.input}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="text"
          placeholder="Phone Number"
          className={styles.input}
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <textarea
          placeholder="Business Address"
          className={styles.textarea}
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className={styles.input}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          className={styles.button}
          onClick={register}
        >
          Register
        </button>

        <p className={styles.text}>
          Already have an account?
        </p>

        <button
          className={styles.registerButton}
          onClick={() => router.push("/wholesaler/login")}
        >
          Login
        </button>

      </div>
    </div>
  );
}