export interface University {
  id: string;
  name: string;
  country: string;
  city: string;
  currency: string;
  degree: string;
  discipline: string;
  tuition: number;
  ielts_required: boolean;
  ielts_min_score: number;
  applicationFee: boolean;
  application_fee_amount: number;
  scholarships: boolean;
  scholarship_amount: number;
  application_start_date?: string;
  application_end_date: string;
  url: string;
  score: number;
  budget: number;
  ielts: boolean;
  application_fee: boolean;
  body: object;
  explanation: Array<string>;
}
