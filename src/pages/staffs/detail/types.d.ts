declare namespace App.Pages.Staffs.Detail {
  interface IProps {
    openDetail: boolean;
    setOpenDetail: (v: boolean) => void;
    dataDetail: IStaff | undefined;
    setDataDetail: (v: IStaff | undefined) => void;
  }
}