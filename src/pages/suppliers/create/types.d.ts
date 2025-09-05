declare namespace App.Pages.Suppliers.Create {
  interface IProps {
    openCreate: boolean;
    setOpenCreate: (v: boolean) => void;
    resetTable: () => void;
  }

  type FieldType = {
    name: string;
    phone: string;
    address: string;
    supplier_code: string;
  }
}