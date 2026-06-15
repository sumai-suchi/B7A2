export interface Issue{
    title: string;
    description: string;
    type: string;
    
}

export interface IssueQuery {
  sort?: string;
  type?: string;
  status?: string;
}

export type User = {
  id: number;
  name: string;
  email: string;
  role: "maintainer" | "contributor";
  created_at: Date;
  updated_at: Date;
};