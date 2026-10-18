const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// MySQL Connection
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Arvin102007",
    database: "Flight_Reservation_System"
});

db.connect((err) => {
    if (err) {
        console.log("Database Error:", err);
    } else {
        console.log("MySQL Connected!");
    }
});


// ======================
// PASSENGERS
// ======================

app.get("/passengers", (req, res) => {
    db.query("SELECT * FROM Passengers", (err, result) => {
        if (err) return res.status(500).json(err);
        res.json(result);
    });
});

app.post("/passengers", (req, res) => {

    const {
        first_name,
        last_name,
        passport_number,
        nationality,
        phone_number,
        email
    } = req.body;

    const sql = `
    INSERT INTO Passengers
    (first_name,last_name,passport_number,nationality,phone_number,email)
    VALUES (?,?,?,?,?,?)
    `;

    db.query(
        sql,
        [
            first_name,
            last_name,
            passport_number,
            nationality,
            phone_number,
            email
        ],
        (err, result) => {
            if (err) return res.status(500).json(err);
            res.json({
                message: "Passenger Added",
                id: result.insertId
            });
        }
    );
});


// ======================
// FLIGHTS
// ======================

app.get("/flights", (req, res) => {

    db.query("SELECT * FROM Flights", (err, result) => {
        if (err) return res.status(500).json(err);
        res.json(result);
    });

});

app.delete("/flights/:id", (req, res) => {

    db.query(
        "DELETE FROM Flights WHERE flight_id=?",
        [req.params.id],
        (err, result) => {

            if (err) return res.status(500).json(err);

            res.json({
                message: "Flight Deleted"
            });

        }
    );
});


// ======================
// BOOKINGS
// ======================

app.get("/bookings", (req, res) => {

    db.query("SELECT * FROM Bookings", (err, result) => {

        if (err) return res.status(500).json(err);

        res.json(result);

    });

});

app.post("/bookings", (req, res) => {

    const {
        passenger_id,
        flight_id,
        booking_date,
        seat_number
    } = req.body;

    db.query(
        `INSERT INTO Bookings
        (passenger_id,flight_id,booking_date,seat_number)
        VALUES (?,?,?,?)`,
        [passenger_id, flight_id, booking_date, seat_number],
        (err, result) => {

            if (err) return res.status(500).json(err);

            res.json({
                message: "Booking Added"
            });

        }
    );

});


// ======================
// AIRCRAFTS
// ======================

app.get("/aircrafts", (req, res) => {

    db.query("SELECT * FROM Aircrafts", (err, result) => {

        if (err) return res.status(500).json(err);

        res.json(result);

    });

});


// ======================
// PAYMENTS
// ======================

app.get("/payments", (req, res) => {

    db.query("SELECT * FROM Payments", (err, result) => {

        if (err) return res.status(500).json(err);

        res.json(result);

    });

});


// ======================
// CREW
// ======================

app.get("/crew", (req, res) => {

    db.query("SELECT * FROM Crew", (err, result) => {

        if (err) return res.status(500).json(err);

        res.json(result);

    });

});


// ======================
// FLIGHT CREW ASSIGNMENT
// ======================

app.get("/flight_crew_assignment", (req, res) => {

    db.query(
        `SELECT *
         FROM Flight_Crew_Assignment`,
        (err, result) => {

            if (err) return res.status(500).json(err);

            res.json(result);

        }
    );

});


app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});