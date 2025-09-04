export { };
declare global {
  interface IBackendRes<T> {
    error?: string | string[];
    message: string;
    statusCode: number | string;
    data?: T;
  }

  interface IModelPaginate<T> {
    meta: {
      current: number;
      pageSize: number;
      pages: number;
      total: number;
    },
    result: T[]
  }

  interface IUser {
    _id: string;
    email: string;
    fullName: string;
    role: string;
  }

  interface ICreatedBy {
    _id: string;
    email: string;
  }

  interface IUpdatedBy {
    _id: string;
    email: string;
  }

  interface ILogin {
    access_token: string;
    user: IUser;
  }

  interface IGetAccount {
    user: IUser;
  }

  interface ICategories {
    _id: string;
    name: string;
    category_code: string;
    createdAt: string;
    updatedAt: string;
    createdBy: ICreatedBy;
    updatedBy: IUpdatedBy;
  }

  interface IAsset {
    _id: string;
    name: string;
    category_code: string;
    unit: string;
    asset_code: string;
    quantity: number;
    status: string;
    year_manufacture: string;
    supplier_code: string;
    price: number;
    createdAt: string;
    updatedAt: string;
    createdBy: ICreatedBy;
    updatedBy: IUpdatedBy;
  }
}