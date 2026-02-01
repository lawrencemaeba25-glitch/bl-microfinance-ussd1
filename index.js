const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Test route to check server
app.get("/", (req, res) => {
  res.send("USSD backend running");
});

// USSD endpoint
app.post("/ussd", (req, res) => {
  const text = req.body.text || "";
  let response = "";

  if (text === "") {
    response = `CON Welcome to B&L Microfinance
1. Apply Loan
2. Repay Loan
3. Check Balance`;
  } else if (text === "1") {
    response = "END Loan request received";
  } else if (text === "2") {
    response = "END Please pay via Mpesa";
  } else if (text === "3") {
    response = "END Balance will be sent via SMS";
  } else {
    response = "END Invalid option";
  }

  res.set("Content-Type", "text/plain");
  res.send(response);
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
