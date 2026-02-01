
// index.js
const express = require('express');
const app = express();

// Parse URL-encoded and JSON bodies
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Optional: test route for browser
app.get("/", (req, res) => {
    res.send("USSD backend running");
});

// Main USSD route
app.post("/ussd", (req, res) => {
    const { text, phoneNumber, sessionId } = req.body;

    let response = "";

    // First menu
    if (text === "") {
        response = "CON Welcome to B&L Microfinance\n1. Apply Loan\n2. Repay Loan\n3. Check Balance";
    }
    // User selects Apply Loan
    else if (text === "1") {
        response = "END Loan request received";
    }
    // User selects Repay Loan
    else if (text === "2") {
        response = "END Please pay via Mpesa";
    }
    // User selects Check Balance
    else if (text === "3") {
        response = "END Balance will be sent via SMS";
    }
    // Invalid choice
    else {
        response = "END Invalid choice";
    }

    // Respond with correct content type
    res.set("Content-Type", "text/plain");
    res.send(response);
});

// Listen on the port provided by Render
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
