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

  interface ILogin {
    access_token: string;
    user: IUser;
  }

  interface IGetAccount {
    user: IUser;
  }
}