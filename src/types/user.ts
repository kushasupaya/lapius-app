export interface WaitListData {
  firstName?: string;
  lastName?: string;
  email: string;
  phoneNumber?: string;
  message?: string;
  from: WaitListType;
}

export enum WaitListType {
  SIGNUP = "SIGNUP",
  WAITLIST = "WAITLIST",
}
