declare namespace App.Pages.Borrow.Edit {
  type FieldType = {
    asset_name: string;
    number_borrow: string;
    fullName: string;
    phone: string;
    class: string;
    department: string;
    status: string;
  }

  type TProps = {
    openEdit: boolean;
    setOpenEdit: React.Dispatch<React.SetStateAction<boolean>>;
    dataEdit: IBorrow | undefined;
    setDataEdit: React.Dispatch<React.SetStateAction<IBorrow | undefined>>;
    resetTable: () => void;
  };
}