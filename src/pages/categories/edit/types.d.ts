declare namespace App.Pages.Categories.Edit {
  interface IProps {
    openEdit: boolean | undefined;
    setOpenEdit: (v: boolean) => void;
    dataEdit: ICategories | undefined;
    setDataEdit: (v: ICategories | undefined) => void;
    resetTable: () => void;
  }

  type FieldType = {
    name: string;
    category_code: string;
  }
}