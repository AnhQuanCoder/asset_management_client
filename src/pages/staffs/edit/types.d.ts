declare namespace App.Pages.Staffs.Edit {
  interface IProps {
    openEdit: boolean | undefined;
    setOpenEdit: (v: boolean) => void;
    dataEdit: IStaff | undefined;
    setDataEdit: (v: IStaff | undefined) => void;
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