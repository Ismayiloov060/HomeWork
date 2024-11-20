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
      <div style="font-family: 'Arial', sans-serif; background-color: #f9f9f9; padding: 20px; color: #333;">
        <div style="max-width: 650px; margin: auto; background: #ffffff; border-radius: 10px; box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);">
          
          <!-- Header -->
          <div style="background: linear-gradient(135deg, #1d5c87, #3b7db3); padding: 20px; text-align: center; color: #ffffff; border-radius: 10px 10px 0 0;">
            <h1 style="margin: 0; font-size: 28px;">Train Ticket Confirmation</h1>
            <p style="margin: 5px 0 0;">Thank you for traveling with us!</p>
          </div>

          <!-- Body -->
          <div style="padding: 20px;">
            <h2 style="text-align: center; color: #1d5c87;">Ticket Details</h2>
            <table style="width: 100%; border-collapse: collapse; margin-top: 20px; background-color: #f4f4f9; border-radius: 5px; overflow: hidden;">
              <tr>
                <td style="padding: 10px; font-weight: bold; background-color: #3b7db3; color: #ffffff;">Full Name:</td>
                <td style="padding: 10px; color: #333;">${fullname}</td>
              </tr>
              <tr>
                <td style="padding: 10px; font-weight: bold; background-color: #3b7db3; color: #ffffff;">Phone Number:</td>
                <td style="padding: 10px; color: #333;">${phone}</td>
              </tr>
              <tr>
                <td style="padding: 10px; font-weight: bold; background-color: #3b7db3; color: #ffffff;">From:</td>
                <td style="padding: 10px; color: #333;">${trip.from}</td>
              </tr>
              <tr>
                <td style="padding: 10px; font-weight: bold; background-color: #3b7db3; color: #ffffff;">To:</td>
                <td style="padding: 10px; color: #333;">${trip.to}</td>
              </tr>
              <tr>
                <td style="padding: 10px; font-weight: bold; background-color: #3b7db3; color: #ffffff;">Date:</td>
                <td style="padding: 10px; color: #333;">${trip.date}</td>
              </tr>
              <tr>
                <td style="padding: 10px; font-weight: bold; background-color: #3b7db3; color: #ffffff;">Time:</td>
                <td style="padding: 10px; color: #333;">${trip.time}</td>
              </tr>
              <tr>
                <td style="padding: 10px; font-weight: bold; background-color: #3b7db3; color: #ffffff;">Seats:</td>
                <td style="padding: 10px; color: #333;">${seats}</td>
              </tr>
              <tr>
                <td style="padding: 10px; font-weight: bold; background-color: #3b7db3; color: #ffffff;">Total Price:</td>
                <td style="padding: 10px; color: #333;">$${totalPrice}</td>
              </tr>
            </table>

            <!-- Payment Success Message -->
            <div style="text-align: center; margin-top: 20px;">
              <h3 style="font-size: 18px; color: #28a745;">Payment Successful! ✅</h3>
              <p style="font-size: 14px; color: #555;">Your payment has been successfully processed. Your ticket is confirmed!</p>
            </div>

            <!-- Support and Good Luck Message -->
            <div style="text-align: center; margin-top: 30px;">
              <p style="font-size: 16px; color: #555;">For any questions, feel free to reach out to our support team.</p>
              <p style="font-size: 16px; color: #555;">We wish you a pleasant journey! 🚆</p>
              <p style="font-size: 14px; color: #555;">Contact us at <a href="mailto:alievrufat380@gmail.com" style="color: #1d5c87; text-decoration: underline;">alievrufat380@gmail.com</a></p>
            </div>
          </div>

          <!-- Footer -->
          <div style="background: #1d5c87; color: white; text-align: center; padding: 10px; border-radius: 0 0 10px 10px;">
            <p style="margin: 0;">Thank you for choosing us!</p>
          </div>
        </div>
      </div>
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
