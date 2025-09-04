declare namespace App.Pages.Staffs.Create {
  interface IProps {
    openCreate: boolean | undefined;
    setOpenCreate: (v: boolean) => void;
    resetTable: () => void;
  }

  type FieldType = {
    avatar?: string;
    email: string;
    password: string;
    fullName: string;
    phone: string;
    address: string;
    gender: string;
  }
}