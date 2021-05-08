export interface BaseResponse<T> {
  statusCode: number;
  isDeleted?: boolean;
  message?: string;
  items?: any[];
  item?: any;
  totalItems?: number;
}
