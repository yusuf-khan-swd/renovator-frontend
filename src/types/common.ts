export interface IMeta {
  limit: number;
  page: number;
  total: number;
}

export type ResponseSuccessType = {
  data: any;
  message?: string | null;
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

export interface IUser {
  id: string;
  name: string;
  email: string;
  role: string;
}

export interface ICategory {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
}

export interface IService {
  id: string;
  title: string;
  description: string;
  price: number;
  status: string;
  location: string;
  category?: ICategory;
  createdAt: string;
  updatedAt: string;
}

export interface IBooking {
  id: string;
  date: string;
  status: string;
  user: IUser;
  service: IService;
  createdAt: string;
  updatedAt: string;
}

export interface IReviewAndRating {
  id: string;
  review: string;
  rating: number;
  user: IUser;
  service: IService;
  createdAt: string;
  updatedAt: string;
}

export interface IBlog {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export interface IFaq {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}
