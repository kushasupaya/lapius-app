export interface RelatedService {
  code: string;
  facilityType: string;
  description: string;
  price: number;
}

export interface MedicalService {
  hospital_name: string;
  address: string;
  state: string;
  code: string;
  code_type: string;
  description: string;
  payer: string;
  rate: number;
  minimum: number;
  maximum: number;
  list_price: number;
  cash_rate: number;
  additional_notes: string;
  standard_charge_percentage: number;
  standard_charge_dollar: number;
  estimated_amount: number;
  rev_code: string;
  standard_charge_algorithm: string;
  setting: string;
  relatedServices?: RelatedService[];
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
}

export interface PriceToolForm {
  procedureCode: string;
  zipCode: string;
  type: PriceToolType;
  insurance: string;
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
