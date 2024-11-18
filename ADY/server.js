import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import nodemailer from "nodemailer";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const PORT = process.env.PORT || 5000;


app.use(cors());
app.use(bodyParser.json());

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "rufataliyev006@gmail.com",
    pass: "ofrt sngm uscj lzzi",
  },
});


app.post("/send-email", async (req, res) => {
  const { fullname, email, phone, trip, totalPrice } = req.body;

  const seats = trip.seats.join(", ") || "No seats selected";

  const mailOptions = {
    from: "rufataliyev006@gmail.com",
    to: email,
    subject: "Your Ticket Information",
    html: `
      <h2>Ticket Details</h2>
      <p><strong>Full Name:</strong> ${fullname}</p>
      <p><strong>Phone Number:</strong> ${phone}</p>
      <p><strong>From:</strong> ${trip.from}</p>
      <p><strong>To:</strong> ${trip.to}</p>
      <p><strong>Date:</strong> ${trip.date}</p>
      <p><strong>Time:</strong> ${trip.time}</p>
      <p><strong>Selected Seats:</strong> ${seats}</p>
      <p><strong>Total Price:</strong> $${totalPrice}</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).send("Email sent successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Failed to send email");
  }
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const buildPath = path.join(__dirname, "dist");

app.use(express.static(buildPath));


app.get("*", (req, res) => {
  res.sendFile(path.join(buildPath, "index.html"));
});


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
