import { App, Form, Input, Modal, Select, type FormProps } from "antd";
import React from "react";

import { createUserAPI } from "services/staff.service";

type TProps = App.Pages.Staffs.Create.IProps;
type FieldType = App.Pages.Staffs.Create.FieldType;

const optionGender = [
  { value: 'MALE', label: 'Nam' },
  { value: 'FEMALE', label: 'Nữ' },
];

const CreateStaff = (props: TProps) => {
  const { openCreate, resetTable, setOpenCreate } = props;
  const [form] = Form.useForm();
  const { message } = App.useApp();

  const handleCancel = () => {
    setOpenCreate(false);
    form.resetFields();
  }

  const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
    const res = await createUserAPI(values);
    if (res.data) {
      message.success("Thêm mới nhân viên thành công!");
      resetTable();
      handleCancel();
    } else {
      message.error(res.message);
    }
  };

  return (
    <>
      <Modal
        title="Thêm mới nhân viên"
        open={openCreate}
        onOk={() => form.submit()}
        onCancel={handleCancel}
        okText="Thêm mới"
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
            label="Mật khẩu"
            name="password"
            rules={[{ required: true, message: 'Không được bỏ trống mật khẩu!' }]}
          >
            <Input.Password />
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

export default React.memo(CreateStaff);
