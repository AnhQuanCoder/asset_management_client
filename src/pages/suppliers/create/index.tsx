import { createSupplierAPI } from "@/services/supplier.service";
import { App, Form, Input, Modal, type FormProps } from "antd";
import React from "react";

type TProps = App.Pages.Suppliers.Create.IProps;
type FieldType = App.Pages.Suppliers.Create.FieldType;

const CreateSupplier = (props: TProps) => {
  const { openCreate, resetTable, setOpenCreate } = props;
  const [form] = Form.useForm();
  const { message } = App.useApp();

  const handleCancel = () => {
    setOpenCreate(false);
    form.resetFields();
  }

  const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
    const res = await createSupplierAPI(values);
    if (res.data) {
      message.success("Thêm mới nhà cung cấp thành công!");
      resetTable();
      handleCancel();
    } else {
      message.error(res.message);
    }
  };

  return (
    <>
      <Modal
        title="Thêm mới nhà cung cấp"
        open={openCreate}
        onOk={() => form.submit()}
        onCancel={handleCancel}
        okText="Thêm mới"
        cancelText="Hủy bỏ"
      >
        <Form
          name="basic"
          layout="vertical"
          onFinish={onFinish}
          form={form}
        >
          <Form.Item<FieldType>
            label="Mã nhà cung cấp"
            name="supplier_code"
            rules={[{ required: true, message: 'Không được bỏ trống mã nhà cung cấp!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            label="Tên nhà cung cấp"
            name="name"
            rules={[{ required: true, message: 'Không được bỏ trống tên nhà cung cấp!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            label="Số điện thoại"
            name="phone"
            rules={[{ required: true, message: 'Không được bỏ trống số điện thoại nhà cung cấp!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            label="Địa chỉ"
            name="address"
            rules={[{ required: true, message: 'Không được bỏ trống địa chỉ nhà cung cấp!' }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}

export default React.memo(CreateSupplier);