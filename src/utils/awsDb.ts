import { sharedConfig } from "@/lib/utils";
import { WaitListData } from "@/types/user";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { PutCommand, DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient(sharedConfig);
const docClient = DynamoDBDocumentClient.from(client);

export const addWaitlist = async (data: WaitListData) => {
  const command = new PutCommand({
    TableName: "waitlist",
    Item: {
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      phoneNumber: data.phoneNumber,
      message: data.message,
      from: data.from,
    },
  });

  const response = await docClient.send(command);
  console.log(response);
  return response;
};
