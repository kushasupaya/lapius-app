import { PriceToolForm } from "@/types/medical-service";
import request from "./request";
import { SignupFormData } from "@/components/forms/signup-dialog-form";
import { LoginFormData } from "@/components/forms/login-dialog-form";
const BASE_URL = "http://localhost:3001/api";
// const BASE_URL = "https://api.lapiusai.com/api";

export const fetchPriceDetails = (payload: PriceToolForm) =>
  request("POST", `${BASE_URL}/pricing/pricing-details`, payload);

export const userSignup = (payload: SignupFormData) =>
  request("POST", `${BASE_URL}/user/create-user`, payload);

export const userLogin = (payload: LoginFormData) =>
  request("POST", `${BASE_URL}/user/login`, payload);

export const fetchLoginCode = (email: string) =>
  request("POST", `${BASE_URL}/user/fetch-code`, { email });

export const fetchProcedureCode = (query: string) => {
  const params = new URLSearchParams({
    q: query,
  });
  const encodedQuery = encodeURIComponent(query.trim()); // Fix special characters
  return request("GET", `${BASE_URL}/pricing/search?${params.toString()}`);
};
