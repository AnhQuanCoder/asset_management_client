import { Descriptions, Drawer, Tag } from "antd";
import React from "react";

type TProps = App.Pages.Staffs.Detail.IProps;

const DetailStaff = (props: TProps) => {
  const { dataDetail, setDataDetail, openDetail, setOpenDetail } = props;

  const onClose = React.useCallback(() => {
    setDataDetail(undefined);
    setOpenDetail(false);
  }, [])

  React.useEffect(() => {
    console.log(dataDetail);
  }, [dataDetail])

  return (
    <>
      <Drawer
        title="Thông tin nhân viên"
        onClose={onClose}
        open={openDetail}
        width={"40vw"}
      >
        <Descriptions title={dataDetail?.fullName} bordered column={2}>
          <Descriptions.Item label="Email">{dataDetail?.email}</Descriptions.Item>
          <Descriptions.Item label="SĐT">{dataDetail?.phone}</Descriptions.Item>
          <Descriptions.Item label="Giới tính" >
            {dataDetail?.gender === "male"
              ?
              <Tag color="magenta">Nam</Tag>
              :
              <Tag color="cyan">Nữ</Tag>}
          </Descriptions.Item>
          <Descriptions.Item label="Người tạo" span={2}>{dataDetail?.createdBy.email}</Descriptions.Item>
        </Descriptions>
      </Drawer>
    </>
  )
}

export default React.memo(DetailStaff);