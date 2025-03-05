export interface RelatedService {
  code: string;
  facilityType: string;
  description: string;
  price: number;
}

export interface MedicalService {
  id: string;
  hospital_name: string;
  address: string;
  state: string;
  code: string;
  code_type: string;
  description: string;
  payer: string;
  rate: string;
  minimum: string;
  maximum: string;
  list_price: string;
  cash_rate: string;
  additional_notes: string;
  standard_charge_percentage: string;
  standard_charge_dollar: string;
  estimated_amount: string;
  rev_code: string;
  standard_charge_algorithm: string;
  plan_name: string;
  setting: string;
  relatedServices?: RelatedService[];
  methodology: string;
  zip_code: string;
}

export interface ColumnVisibility {
  hospital_name: boolean;
  address: boolean;
  state: boolean;
  code: boolean;
  code_type: boolean;
  description: boolean;
  payer: boolean;
  standard_charge_percentage: boolean;
  standard_charge_dollar: boolean;
  estimated_amount: boolean;
  rev_code: boolean;
  standard_charge_algorithm: boolean;
  // rate: boolean;
  minimum: boolean;
  maximum: boolean;
  list_price: boolean;
  cash_rate: boolean;
  additional_notes: boolean;
  setting: boolean;
  plan_name: boolean;
  methodology: boolean;
}

export interface PriceToolForm {
  procedureCode: string;
  zipCode: string;
  type: PriceToolType;
  insurance: string;
  distance: string;
  minPrice?: number | undefined;
  maxPrice?: number | undefined;
}
export enum PriceToolType {
  PROCEDURE = "procedure",
  MEDICAL_ISSUE = "medical_issue",
}

export interface MedicalCodeItem {
  code: string;
  description: string;
  status: "active" | "warning" | "error";
  title: string;
}
