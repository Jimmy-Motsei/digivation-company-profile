const nodemailer = require("nodemailer");
const fs = require("fs");
const path = require("path");

exports.handler = async (event, context) => {
  // Only allow POST requests
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
      },
      body: JSON.stringify({ error: "Method not allowed" }),
    };
  }

  // Handle CORS preflight
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
      },
      body: "",
    };
  }

  try {
    const { email, message } = JSON.parse(event.body);

    // Validate email
    if (!email || !email.includes("@")) {
      return {
        statusCode: 400,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ error: "Valid email address is required" }),
      };
    }

    // Configure email transporter
    const transporter = nodemailer.createTransporter({
      service: "gmail", // You can change this to your preferred email service
      auth: {
        user: process.env.EMAIL_USER, // Set this in Netlify environment variables
        pass: process.env.EMAIL_PASS, // Set this in Netlify environment variables
      },
    });

    // Read the PDF file
    const pdfPath = path.join(process.cwd(), "Digivation-Company-Profile.pdf");
    const pdfBuffer = fs.readFileSync(pdfPath);

    // Email content
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Digivation Company Profile - Requested Document",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #8caf27;">Thank you for your interest in Digivation!</h2>
          
          <p>Dear Valued Partner,</p>
          
          <p>Thank you for requesting our company profile. Please find attached the complete Digivation Company Profile document.</p>
          
          <div style="background-color: #f4f4f4; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #0f2230; margin-top: 0;">What's included in this profile:</h3>
            <ul>
              <li>Company overview and B-BBEE Level 1 credentials</li>
              <li>Telecommunications infrastructure services</li>
              <li>IoT Solutions & Digital Transformation capabilities</li>
              <li>Project portfolio and success stories</li>
              <li>Client testimonials and industry expertise</li>
            </ul>
          </div>
          
          <p>We look forward to the opportunity to partner with you and support your telecommunications infrastructure needs.</p>
          
          <p>Best regards,<br>
          <strong>Digivation (Pty) Ltd</strong><br>
          Strategic Turnkey Operations Partner</p>
          
          <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 30px 0;">
          <p style="font-size: 12px; color: #666;">
            Digivation (Pty) Ltd | 2 Payne Rd, Cnr Main Office Park, Bryanston, 2191, Johannesburg<br>
            Email: info@digivation.global | Website: www.digivation.global
          </p>
        </div>
      `,
      attachments: [
        {
          filename: "Digivation-Company-Profile.pdf",
          content: pdfBuffer,
          contentType: "application/pdf",
        },
      ],
    };

    // Send email
    await transporter.sendMail(mailOptions);

    // Also send a copy to Digivation
    const internalMailOptions = {
      from: process.env.EMAIL_USER,
      to: "info@digivation.global",
      subject: "New Company Profile Request",
      html: `
        <h3>New Company Profile Request</h3>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong> ${
          message || "No additional message provided"
        }</p>
        <p><strong>Date:</strong> ${new Date().toLocaleString()}</p>
      `,
    };

    await transporter.sendMail(internalMailOptions);

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        success: true,
        message: "Company profile sent successfully to your email address!",
      }),
    };
  } catch (error) {
    console.error("Error sending email:", error);

    return {
      statusCode: 500,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        error: "Failed to send email. Please try again or contact us directly.",
      }),
    };
  }
};
