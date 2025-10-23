declare namespace App.Pages.ChangePassword {
  type FieldType = {
    password: string;
    passwordNew: string;
  };

  interface IProps {
    setOpenChangePassword: (v: boolean) => void;
    openChangePassword: boolean;
  }
}