declare namespace App.Pages.Assets.Edit {
  interface IProps {
    openEdit: boolean;
    setOpenEdit: React.Dispatch<React.SetStateAction<boolean>>;
    dataEdit?: IAsset;
    setDataEdit: React.Dispatch<React.SetStateAction<IAsset | undefined>>;
    resetTable: () => void;
  }

  type FieldType = {
    name: string;
    category_code: string;
    unit: string;
    asset_code: string;
    year_manufacture: string;
    supplier_code: string;
    price: number;
    quantity: number;
  }
}