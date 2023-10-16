export interface IMeta {
  limit: number;
  page: number;
  total: number;
}

export type ResponseSuccessType = {
  data: any;
  meta?: IMeta;
};

export type IGenericErrorResponse = {
  statusCode: number;
  message: string;
  errorMessages: IGenericErrorMessage[];
};

export type IGenericErrorMessage = {
  path: string | number;
  message: string;
};

export interface IService {
  id: string;
  title: string;
  description: string;
  price: number;
  status: string;
  location: string;
  createdAt: string;
  updatedAt: string;
}

export interface IBooking {
  id: string;
  date: string;
  status: string;
  userId: string;
  serviceId: string;
  createdAt: string;
  updatedAt: string;
}
