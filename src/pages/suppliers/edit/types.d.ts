declare namespace App.Pages.Suppliers.Edit {
  interface IProps {
    openEdit: boolean;
    setOpenEdit: (v: boolean) => void;
    dataEdit: ISupplier | undefined;
    setDataEdit: (v: ISupplier | undefined) => void;
    resetTable: () => void;
  }

  type FieldType = {
    name: string;
    phone: string;
    address: string;
    supplier_code: string;
  }
}