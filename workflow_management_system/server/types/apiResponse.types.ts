export interface ApiResponse<T = unknown> {
  status: boolean;
  statusCode: number;
  message?: string; 
  data?: T;        
  token?: string;
}