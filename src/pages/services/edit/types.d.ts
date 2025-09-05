declare namespace App.Pages.Service.Edit {
  interface IProps {
    openEdit: boolean;
    setOpenEdit: (v: boolean) => void;
    dataEdit: IService | undefined;
    setDataEdit: (v: IService | undefined) => void;
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
    status: string;
  }
}