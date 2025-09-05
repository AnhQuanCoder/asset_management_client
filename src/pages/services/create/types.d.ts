declare namespace App.Pages.Service.Create {
  interface IProps {
    openCreate: boolean;
    setOpenCreate: (v: boolean) => void;
    resetTable: () => void;
  }

  type FieldType = {
    asset_name: string;
    price: number;
    reason_failure: string;
    quantity: number;
    fullName: string;
    phone: string;
    address: string;
  }
}