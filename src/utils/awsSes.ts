import { sharedConfig } from "@/lib/utils";
import AWS from "aws-sdk";
const ses = new AWS.SES(sharedConfig);

export async function sendCustomEmail(email: string) {
  const params = {
    Source: "info@lapiusai.com",
    Destination: {
      ToAddresses: [email],
    },
    Message: {
      Subject: {
        Data: "Welcome to LapiusAI waitlist",
      },
      Body: {
        Html: {
          Data: `
                  <html>
                      <head>
                        <style>
                          body {
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            height: 100vh; 
                            margin: 0; 
                            flex-direction: column; 
                            text-align: center; 
                          }
                          img {
                            width: 500px;
                            height: 600px;
                          }
                        </style>
                      </head>
                      <body>
                        <h1>Thank you for joining our waitlist!</h1>
                        <img
                          src="https://waitlistimg.s3.us-east-2.amazonaws.com/waitlistemail.png"
                          alt="Medical Bill"
                        />
                        <p>Best Regards,<br>Lapius Team</p>
                      </body>
                    </html>
                    `,
        },
      },
    },
  };

  return ses.sendEmail(params).promise();
}
