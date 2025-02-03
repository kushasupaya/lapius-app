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
  rate: boolean;
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
