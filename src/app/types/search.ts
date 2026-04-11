export interface SearchBody {
  discipline: string | null;
  country: string | null;
  degree: string | null;

  budget: number | null;
  ielts: boolean | null;
  applicationFee: boolean | null;
  scholarships: boolean | null;
}
