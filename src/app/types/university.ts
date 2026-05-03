export interface University {
  id: string;
  name: string;
  country: string;
  city: string;
  currency: string;
  degree: string;
  discipline: string;
  tuition: number;

  ielts_min_score: number;

  application_fee_amount: number;

  scholarship_amount: number;
  application_start_date?: string;
  application_end_date: string;
  url: string;
  score: number;
  budget: number;
  ielts: boolean;

  body: object;
  explanation: Array<string>;
  cost_of_living: number;
  logo_url: string;
  source: string;
}
