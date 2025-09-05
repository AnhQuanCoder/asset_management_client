import { App, Form, Input, Modal, type FormProps } from "antd";
import React from "react";

import { editSupplierAPI } from "@/services/supplier.service";

type TProps = App.Pages.Suppliers.Edit.IProps;
type FieldType = App.Pages.Suppliers.Edit.FieldType;

const EditSupplier = (props: TProps) => {
  const { openEdit, setOpenEdit, dataEdit, setDataEdit, resetTable } = props;
  const [form] = Form.useForm();
  const { message } = App.useApp();

  React.useEffect(() => {
    if (dataEdit) {
      form.setFieldsValue({
        name: dataEdit.name,
        phone: dataEdit.phone,
        address: dataEdit.address,
        supplier_code: dataEdit.supplier_code
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
    const res = await editSupplierAPI(dataEdit._id, values);
    if (res.data) {
      message.success("Cập nhật nhà cung cấp thành công!");
      resetTable();
      handleCancel();
    } else {
      message.error(res.message);
    }
  };

  return (
    <>
      <Modal
        title="Cập nhật nhà cung cấp"
        open={openEdit}
        onOk={() => form.submit()}
        onCancel={handleCancel}
        okText="Cập nhật"
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

export default React.memo(EditSupplier);