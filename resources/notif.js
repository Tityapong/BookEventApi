const generateAcceptEmailHTML = (bookingId, userName, bookingDetails) => {
    return `
      <html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
              line-height: 1.6;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
              background-color: #f4f4f4;
              border-radius: 8px;
            }
            .header {
              text-align: center;
              padding-bottom: 20px;
            }
            .header h2 {
              color: #333;
            }
            .details {
              background-color: #fff;
              padding: 20px;
              border-radius: 8px;
              box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            }
            .details p {
              font-size: 16px;
              color: #555;
              margin: 8px 0;
            }
            .footer {
              text-align: center;
              padding: 15px;
              font-size: 14px;
              color: #777;
              background-color: #f9f9f9;
              margin-top: 20px;
              border-radius: 8px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2>Your Booking Has Been Accepted</h2>
              <p>Dear ${userName},</p>
            </div>
            <div class="details">
              <p>We are excited to inform you that your booking has been accepted by the supplier. Please find the booking details below:</p>
              <p><strong>Booking ID:</strong> ${bookingId}</p>
              <p><strong>Service Name:</strong> ${bookingDetails.serviceName}</p>
              <p><strong>Booking Date:</strong> ${bookingDetails.bookingDate}</p>
              <p><strong>Booking Time:</strong> ${bookingDetails.bookingTime}</p>
              <p><strong>Supplier:</strong> ${bookingDetails.supplierName}</p>
              <p>We look forward to providing you with an excellent service. If you have any questions or need assistance, please don't hesitate to reach out to us.</p>
            </div>
            <div class="footer">
              <p>Thank you for choosing our service!</p>
              <p>&copy; 2025 Your Company Name</p>
            </div>
          </div>
        </body>
      </html>
    `;
  };
  


  const generateRejectEmailHTML = (bookingId, rejectionMessage, userName, bookingDetails) => {
    return `
      <html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
              line-height: 1.6;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
              background-color: #f4f4f4;
              border-radius: 8px;
            }
            .header {
              text-align: center;
              padding-bottom: 20px;
            }
            .header h2 {
              color: #333;
            }
            .details {
              background-color: #fff;
              padding: 20px;
              border-radius: 8px;
              box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            }
            .details p {
              font-size: 16px;
              color: #555;
              margin: 8px 0;
            }
            .footer {
              text-align: center;
              padding: 15px;
              font-size: 14px;
              color: #777;
              background-color: #f9f9f9;
              margin-top: 20px;
              border-radius: 8px;
            }
            .reason {
              color: #e74c3c;
              font-weight: bold;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2>Your Booking Has Been Rejected</h2>
              <p>Dear ${userName},</p>
            </div>
            <div class="details">
              <p>We regret to inform you that your booking has been rejected by the supplier. Please find the booking details below:</p>
              <p><strong>Booking ID:</strong> ${bookingId}</p>
          
              <p class="reason"><strong>Reason for Rejection:</strong> ${rejectionMessage}</p>
              <p>We apologize for the inconvenience. If you have any questions or concerns, please don't hesitate to reach out to us.</p>
            </div>
            <div class="footer">
              <p>Thank you for your understanding!</p>
              <p>© 2025 Your Company Name</p>
            </div>
          </div>
        </body>
      </html>
    `;
  };
  module.exports = {
    generateAcceptEmailHTML,
    generateRejectEmailHTML
  
  };
  