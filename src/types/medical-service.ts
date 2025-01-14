export interface RelatedService {
  code: string;
  facilityType: string;
  description: string;
  price: number;
}

export interface MedicalService {
  code: string;
  facilityType: string;
  description: string;
  provider: string;
  listPrice: number;
  relatedServices?: RelatedService[];
}
