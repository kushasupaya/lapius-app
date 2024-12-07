import { cognitoClient, calculateSecretHash } from "@/lib/utils";
import {
  AdminCreateUserCommand,
  InitiateAuthCommand,
  AuthFlowType,
  RespondToAuthChallengeCommand,
  ChallengeNameType,
  DeliveryMediumType,
} from "@aws-sdk/client-cognito-identity-provider";

const userPoolId = process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID!;
const cognitoClientId = process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID!;

export const signUpUser = async (
  firstName: string,
  lastName: string,
  email: string,
  phoneNumber: string,
  message: string
) => {
  try {
    const params = {
      UserPoolId: userPoolId,
      Username: email,
      UserAttributes: [
        { Name: "given_name", Value: firstName },
        { Name: "family_name", Value: lastName },
        { Name: "email", Value: email },
        { Name: "phone_number", Value: phoneNumber },
        { Name: "custom:message", Value: message },
      ],
      DesiredDeliveryMediums: [DeliveryMediumType.EMAIL],
    };
    const command = new AdminCreateUserCommand(params);
    const response = await cognitoClient.send(command);

    if (response) {
      const signInResponse = await signInUser(email);
      return signInResponse;
    } else {
      return response;
    }
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
};

export const waitlistUser = async (email: string) => {
  try {
    const params = {
      UserPoolId: process.env.NEXT_PUBLIC_COGNITO_WAITLIST_USER_POOL_ID!,
      Username: email,
      UserAttributes: [{ Name: "email", Value: email }],
      DesiredDeliveryMediums: [DeliveryMediumType.EMAIL],
    };
    const command = new AdminCreateUserCommand(params);
    const response = await cognitoClient.send(command);

    if (response) {
      const signInResponse = await signInUser(email);
      return signInResponse;
    } else {
      return response;
    }
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
};

export const signInUser = async (email: string) => {
  const secretHash = calculateSecretHash(
    email,
    process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID!,
    process.env.NEXT_PUBLIC_CLIENT_SECRET_HASH!
  );

  try {
    const params = {
      AuthFlow: AuthFlowType.USER_AUTH,
      ClientId: cognitoClientId,
      AuthParameters: {
        USERNAME: email,
        SECRET_HASH: secretHash,
      },
    };
    const command = new InitiateAuthCommand(params);
    const response = await cognitoClient.send(command);
    console.log(response);
    return response;
  } catch (error) {
    console.error("Error signing in user:", error);
    throw error;
  }
};

export const verifySignInOtp = async (
  email: string,
  otp: string,
  session: string
) => {
  console.log(email, otp, session);
  try {
    const secretHash = calculateSecretHash(
      email,
      process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID!,
      process.env.NEXT_PUBLIC_CLIENT_SECRET_HASH!
    );
    const params = {
      ChallengeName: ChallengeNameType.EMAIL_OTP,
      ClientId: process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID!,
      ChallengeResponses: {
        USERNAME: email,
        EMAIL_OTP_CODE: otp,
        SECRET_HASH: secretHash,
      },
      Session: session,
    };

    console.log(params);

    const command = new RespondToAuthChallengeCommand(params);
    const response = await cognitoClient.send(command);

    console.log("Sign-in successful:", response);
    return response;
  } catch (error) {
    console.error("Error verifying OTP:", error);
    throw error;
  }
};
