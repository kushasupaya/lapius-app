import AWS from "aws-sdk";
const ses = new AWS.SES({
  region: process.env.NEXT_PUBLIC_AWS_COGNITO_REGION!,
});

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
                            <h1>Hi,</h1>
                            <p>Thank you for joining our waitlist!</p>
                            <img src="https://lapiusai.com/images/about.png" alt="Medical Bill" style="width:300px;height:400px;">
                            <p>Best Regards,<br>Your Team</p>
                        </body>
                        </html>
                    `,
        },
      },
    },
  };

  return ses.sendEmail(params).promise();
}
