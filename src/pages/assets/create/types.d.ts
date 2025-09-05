declare namespace App.Pages.Assets.Create {
  interface IProps {
    openCreate: boolean;
    setOpenCreate: (v: boolean) => void;
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