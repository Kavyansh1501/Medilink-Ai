const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const app = express();

app.use(cors());
app.use(express.json());

const SECRET_KEY = "mysecretkey";

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "2743",
    database: "medical"
});

connection.connect((err) => {
    if (err) {
        console.log("Database Connection Failed");
        console.log(err);
    } else {
        console.log("Database Connected Successfully");
    }
});

app.post("/wholesaler/register", (req, res) => {
    const { businessName, ownerName, licenseNumber, gstNumber, email, phone, address, password } = req.body;
    if (!businessName || !ownerName || !licenseNumber || !gstNumber || !email || !phone || !address || !password) {
        return res.json({ success: false, message: "Please fill all fields" });
    }
    connection.query("SELECT * FROM wholesaler WHERE email=?", [email], (err, result) => {
        if (err) {
            console.log(err);
            return res.json({ success: false, message: "Database Error" });
        }
        if (result.length > 0) {
            return res.json({ success: false, message: "Email already registered" });
        }
        bcrypt.hash(password, 10, (err, hash) => {
            if (err) {
                console.log(err);
                return res.json({ success: false, message: "Password Hashing Failed" });
            }
            connection.query(
                `INSERT INTO wholesaler (business_name, owner_name, license_number, gst_number, email, phone, address, password) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
                [businessName, ownerName, licenseNumber, gstNumber, email, phone, address, hash],
                (err, result) => {
                    if (err) {
                        console.log(err);
                        return res.json({ success: false, message: "Registration Failed" });
                    }
                    res.json({ success: true, message: "Wholesaler Registered Successfully" });
                }
            );
        });
    });
});

app.post("/wholesaler/login", (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.json({ success: false, message: "Please fill all fields" });
    }
    connection.query("SELECT * FROM wholesaler WHERE email=?", [email], (err, result) => {
        if (err) {
            console.log(err);
            return res.json({ success: false, message: "Database Error" });
        }
        if (result.length === 0) {
            return res.json({ success: false, message: "Wholesaler Not Found" });
        }
        const user = result[0];
        bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) {
                console.log(err);
                return res.json({ success: false, message: "Login Failed" });
            }
            if (!isMatch) {
                return res.json({ success: false, message: "Incorrect Password" });
            }
            const token = jwt.sign(
                { id: user.id, businessName: user.business_name, email: user.email, role: "wholesaler" },
                SECRET_KEY,
                { expiresIn: "1h" }
            );
            res.json({ success: true, message: "Login Successful", token: token });
        });
    });
});

function verifyToken(req, res, next) {
    const bearerHeader = req.headers["authorization"];
    if (!bearerHeader) {
        return res.status(401).json({ success: false, message: "No Token Provided" });
    }
    const token = bearerHeader.split(" ")[1];
    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(401).json({ success: false, message: "Invalid Token" });
        }
        req.user = decoded;
        next();
    });
}

// ==========================================
// CUSTOMER DASHBOARD
// ==========================================
app.get("/customer/dashboard", verifyToken, (req, res) => {
    if (req.user.role !== "customer") {
        return res.status(403).json({ success: false, message: "Access Denied" });
    }
    res.json({ success: true, message: "Welcome Customer", user: req.user });
});

// ==========================================
// WHOLESALER DASHBOARD
// ==========================================
app.get("/wholesaler/dashboard", verifyToken, (req, res) => {
    if (req.user.role !== "wholesaler") {
        return res.status(403).json({ success: false, message: "Access Denied" });
    }
    res.json({ success: true, message: "Welcome Wholesaler", user: req.user });
});

// ==========================================
// ADD MEDICINE + RETAILERS
// ==========================================
app.post("/medicine/add", verifyToken, (req, res) => {
    if (req.user.role !== "wholesaler") {
        return res.json({ success: false, message: "Only wholesaler allowed" });
    }
    const { medicineName, medicineType, retailers } = req.body;
    const wholesalerId = req.user.id;
    if (!medicineName || !medicineType || !retailers || retailers.length === 0) {
        return res.json({ success: false, message: "Complete medicine details" });
    }
    // insert medicine
    connection.query(
        "INSERT INTO medicine(wholesaler_id,medicine_name,medicine_type) VALUES(?,?,?)",
        [wholesalerId, medicineName, medicineType],
        function (err, result) {
            if (err) {
                console.log(err);
                return res.json({ success: false, message: "Medicine Insert Failed" });
            }
            const medicineId = result.insertId;
            // insert retailers
            retailers.forEach((item) => {
                connection.query(
                    `INSERT INTO retailer
                    (wholesaler_id, medicine_id, retailer_name, phone, address, pincode, latitude, longitude)
                    VALUES(?,?,?,?,?,?,?,?)`,
                    [wholesalerId, medicineId, item.retailerName, item.phone, item.address, item.pincode, item.latitude, item.longitude],
                    function (err, result) {
                        if (err) {
                            console.log(err);
                        }
                    }
                );
            });
            res.json({ success: true, message: "Medicine Added Successfully" });
        }
    );
});

// ==========================================
// WHOLESALER DASHBOARD ANALYTICS
// ==========================================
app.get("/dashboard/analytics", verifyToken, (req, res) => {
    if (req.user.role !== "wholesaler") {
        return res.json({ success: false, message: "Access denied" });
    }
    const wholesalerId = req.user.id;
    const data = {};

    // Total Medicines
    connection.query(
        "SELECT COUNT(*) AS totalMedicine FROM medicine WHERE wholesaler_id=?",
        [wholesalerId],
        (err, result) => {
            if (err) {
                console.log(err);
                return res.json({ success: false, message: "Error fetching medicines" });
            }
            data.totalMedicine = result[0].totalMedicine;

            // Total Retailers
            connection.query(
                `SELECT COUNT(*) AS totalRetailers
                FROM retailer r
                JOIN medicine m
                ON r.medicine_id=m.id
                WHERE m.wholesaler_id=?`,
                [wholesalerId],
                (err, result) => {
                    if (err) {
                        console.log(err);
                        return res.json({ success: false, message: "Error fetching retailers" });
                    }
                    data.totalRetailers = result[0].totalRetailers;

                    // Medicine Categories
                    connection.query(
                        "SELECT COUNT(DISTINCT medicine_type) AS categories FROM medicine WHERE wholesaler_id=?",
                        [wholesalerId],
                        (err, result) => {
                            if (err) {
                                console.log(err);
                                return res.json({ success: false });
                            }
                            data.categories = result[0].categories;
                            res.json({ success: true, analytics: data });
                        }
                    );
                }
            );
        }
    );
});

// ==========================================
// GET MEDICINES
// ==========================================
app.get("/medicine/all", verifyToken, (req, res) => {
    const wholesalerId = req.user.id;
    connection.query(
        "SELECT * FROM medicine WHERE wholesaler_id=?",
        [wholesalerId],
        function (err, result) {
            if (err) {
                console.log(err);
                return res.json({ success: false, message: "Database error" });
            }
            res.json({ success: true, data: result });
        }
    );
});

// ==========================================
// UPDATE MEDICINE
// ==========================================
app.post("/medicine/update", verifyToken, (req, res) => {
    const { id, medicineName, medicineType } = req.body;
    if (!id || !medicineName || !medicineType) {
        return res.json({ success: false, message: "Missing fields" });
    }
    connection.query(
        "UPDATE medicine SET medicine_name=?, medicine_type=? WHERE id=?",
        [medicineName, medicineType, id],
        function (err, result) {
            if (err) {
                console.log(err);
                return res.json({ success: false, message: "Update failed" });
            }
            res.json({ success: true, message: "Medicine Updated Successfully" });
        }
    );
});

// ==========================================
// DELETE MEDICINE
// ==========================================
app.post("/medicine/delete", verifyToken, (req, res) => {
    const { id } = req.body;
    if (!id) {
        return res.json({ success: false, message: "Medicine id required" });
    }
    // first delete retailers
    connection.query("DELETE FROM retailer WHERE medicine_id=?", [id], function (err, result) {
        if (err) {
            console.log(err);
        }
        connection.query("DELETE FROM medicine WHERE id=?", [id], function (err, result) {
            if (err) {
                return res.json({ success: false, message: "Delete failed" });
            }
            res.json({ success: true, message: "Medicine Deleted Successfully" });
        });
    });
});

// ==========================================
// UPDATE RETAILER
// ==========================================
app.post("/retailer/update", verifyToken, (req, res) => {
    const { id, retailerName, phone, address, pincode, latitude, longitude } = req.body;
    if (!id || !retailerName || !phone || !address) {
        return res.json({ success: false, message: "Missing fields" });
    }
    connection.query(
        "UPDATE retailer SET retailer_name=?, phone=?, address=?, pincode=?, latitude=?, longitude=? WHERE id=?",
        [retailerName, phone, address, pincode, latitude, longitude, id],
        function (err, result) {
            if (err) {
                console.log(err);
                return res.json({ success: false, message: "Update failed" });
            }
            res.json({ success: true, message: "Retailer Updated Successfully" });
        }
    );
});

// ==========================================
// DELETE RETAILER
// ==========================================
app.post("/retailer/delete", verifyToken, (req, res) => {
    const { id } = req.body;
    if (!id) {
        return res.json({ success: false, message: "Retailer id required" });
    }
    connection.query("DELETE FROM retailer WHERE id=?", [id], function (err, result) {
        if (err) {
            console.log(err);
            return res.json({ success: false, message: "Delete failed" });
        }
        res.json({ success: true, message: "Retailer Deleted Successfully" });
    });
});

app.get("/retailer/all", verifyToken, (req, res) => {
    const wholesalerId = req.user.id;
    const query = `
        SELECT
            r.id,
            r.retailer_name,
            r.phone,
            r.address,
            r.pincode,
            r.latitude,
            r.longitude,
            GROUP_CONCAT(m.medicine_name) AS medicines
        FROM retailer r
        LEFT JOIN medicine m
        ON r.medicine_id = m.id
        WHERE r.wholesaler_id = ?
        GROUP BY r.id
    `;
    connection.query(query, [wholesalerId], (err, result) => {
        if (err) {
            console.log(err);
            return res.json({ success: false, message: "Database Error" });
        }
        const retailers = result.map((item) => ({
            ...item,
            medicines: item.medicines ? item.medicines.split(",") : []
        }));
        res.json({ success: true, data: retailers });
    });
});

app.post("/retailer/add", verifyToken, (req, res) => {
    const wholesalerId = req.user.id;
    const { retailerName, phone, address, pincode, latitude, longitude } = req.body;
    if (!retailerName || !phone || !address || !pincode) {
        return res.json({ success: false, message: "Fill required fields" });
    }
    connection.query(
        `INSERT INTO retailer
        (wholesaler_id, retailer_name, phone, address, pincode, latitude, longitude)
        VALUES(?,?,?,?,?,?,?)`,
        [wholesalerId, retailerName, phone, address, pincode, latitude, longitude],
        function (err, result) {
            if (err) {
                console.log(err);
                return res.json({ success: false, message: "Insert Failed" });
            }
            res.json({ success: true, message: "Retailer Added Successfully" });
        }
    );
});

app.listen(5000, () => {
    console.log("Server Running on Port 5000");
});