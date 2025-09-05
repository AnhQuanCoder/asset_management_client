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

  interface IStaff {
    _id: string;
    fullName: string;
    email: string;
    phone: string;
    gender: string;
    address: string;
    role: string;
    createdBy: ICreatedBy;
    createdAt: string;
    updatedAt: string;
  }

  interface ISupplier {
    _id: string;
    name: string;
    phone: string;
    address: string;
    supplier_code: string;
    createdBy: ICreatedBy;
    createdAt: string;
    updatedAt: string;
    updatedBy: IUpdatedBy;
  }

  interface IBorrow {
    _id: string;
    asset_code: string;
    number_borrow: number;
    status: string;
    fullName: string;
    phone: string;
    class: string;
    department: string;
    createdBy: ICreatedBy;
    createdAt: string;
    updatedAt: string;
    updatedBy: IUpdatedBy;
  }
}