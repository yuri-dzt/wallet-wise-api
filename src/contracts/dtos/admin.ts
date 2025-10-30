export interface IAdminDto {
  id: string;
  name: string;
  email: string;
  permission: number;
  created_at: number;
  updated_at?: number;
}