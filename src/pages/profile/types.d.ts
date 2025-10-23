declare namespace App.Pages.Profile {
  type FieldType = {
    fullName: string;
    email: string;
    phone: string;
    gender: string;
    address: string;
  };

  interface IProps {
    setOpenProfile: (v: boolean) => void;
    openProfile: boolean;
  }
}