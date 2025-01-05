import { sharedConfig } from "@/lib/utils";
import AWS from "aws-sdk";
const ses = new AWS.SES(sharedConfig);

export async function sendCustomEmail(email: string) {
  const params = {
    Source: "kushas@lapiusai.com",
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
                        <body>
                            <h1>Thank you for joining our waitlist!</h1>
                            <img src="https://waitlistimg.s3.us-east-2.amazonaws.com/waitlistemail.png" alt="Medical Bill" style="width:400px;height:500px;">
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
