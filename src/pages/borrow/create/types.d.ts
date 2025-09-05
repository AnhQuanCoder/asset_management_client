declare namespace App.Pages.Borrow.Create {
  interface IProps {
    openCreate: boolean;
    setOpenCreate: (v: boolean) => void;
    resetTable: () => void;
  }

  type FieldType = {
    asset_name: string;
    number_borrow: string;
    fullName: string;
    phone: string;
    class: string;
    department: string;
  }
}