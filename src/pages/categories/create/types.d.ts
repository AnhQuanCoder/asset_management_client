declare namespace App.Pages.Categories.Create {
  interface IProps {
    openCreate: boolean | undefined;
    setOpenCreate: (v: boolean) => void;
    resetTable: () => void;
  }

  type FieldType = {
    name: string;
    category_code: string;
  }
}