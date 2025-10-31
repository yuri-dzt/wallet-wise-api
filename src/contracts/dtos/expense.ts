export interface IExpenseDto {
  id: string;
  user_id: string;
  category_id: string;
  date: number;
  price: number;
  created_at: number;
  updated_at?: number;
}