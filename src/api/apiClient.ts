import { PriceToolForm } from "@/types/medical-service";
import request from "./request";
const BASE_URL = "http://localhost:3001/api";

export const fetchPriceDetails = (payload: PriceToolForm) =>
  request("POST", `${BASE_URL}/pricing/pricing-details`, payload);
