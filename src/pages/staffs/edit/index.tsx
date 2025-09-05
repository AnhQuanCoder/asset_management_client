import { editUserAPI } from "@/services/staff.service";
import { App, Form, Input, Modal, Select, type FormProps } from "antd";
import React from "react";

type TProps = App.Pages.Staffs.Edit.IProps;
type FieldType = App.Pages.Staffs.Edit.FieldType;

const optionGender = [
  { value: 'MALE', label: 'Nam' },
  { value: 'FEMALE', label: 'Nữ' },
];

const EditStaff = (props: TProps) => {
  const { openEdit, setOpenEdit, dataEdit, setDataEdit, resetTable } = props;
  const [form] = Form.useForm();
  const { message } = App.useApp();

  React.useEffect(() => {
    if (dataEdit) {
      form.setFieldsValue({
        email: dataEdit.email,
        fullName: dataEdit.fullName,
        address: dataEdit.address,
        gender: dataEdit.gender,
        phone: dataEdit.phone
      })
    }
  }, [dataEdit])

  const handleCancel = () => {
    setDataEdit(undefined);
    setOpenEdit(false);
    form.resetFields();
  }

  const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
    if (!dataEdit) return;

    const res = await editUserAPI(dataEdit._id, values);
    if (res.data) {
      message.success("Cập nhật nhân viên thành công!");
      resetTable();
      handleCancel();
    } else {
      message.error(res.message);
    }
  };

  return (
    <>
      <Modal
        title="Cập nhật nhân viên"
        open={openEdit}
        onOk={() => form.submit()}
        onCancel={handleCancel}
        okText="Cập nhật"
        cancelText="Hủy bỏ"
      >
        <Form
          name="basic"
          layout="vertical"
          initialValues={{ gender: "MALE" }}
          onFinish={onFinish}
          form={form}
        >
          <Form.Item<FieldType>
            label="Email"
            name="email"
            rules={[{ required: true, message: 'Không được bỏ trống email!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            label="Họ và tên"
            name="fullName"
            rules={[{ required: true, message: 'Không được bỏ trống họ tên!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            label="Số điện thoại"
            name="phone"
            rules={[{ required: true, message: 'Không được bỏ trống số điện thoại!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            label="Địa chỉ"
            name="address"
            rules={[{ required: true, message: 'Không được bỏ trống địa chỉ!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            label="Giới tính"
            name="gender"
          >
            <Select options={optionGender} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}


export default React.memo(EditStaff);