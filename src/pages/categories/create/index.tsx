import { App, Form, Input, Modal, type FormProps } from "antd";
import React from "react"

import { createCategoryAPI } from "services/categories.service";

type TProps = App.Pages.Categories.Create.IProps;
type FieldType = App.Pages.Categories.Create.FieldType;

const CreateCategory = (props: TProps) => {
  const { openCreate, setOpenCreate, resetTable } = props;
  const [form] = Form.useForm();
  const { message } = App.useApp();

  const handleCancel = () => {
    setOpenCreate(false);
    form.resetFields();
  }

  const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
    console.log(values);
    const res = await createCategoryAPI(values);
    if (res.data) {
      message.success("Thêm mới kiểu tài sản thành công!");
      resetTable();
      handleCancel();
    } else {
      message.error(res.message);
    }
  };

  return (
    <>
      <Modal
        title="Thêm mới kiểu tài sản"
        open={openCreate}
        onOk={() => form.submit()}
        onCancel={handleCancel}
        okText="Thêm mới"
        cancelText="Hủy bỏ"
      >
        <Form
          name="basic"
          layout="vertical"
          initialValues={{ status: "ACTIVE" }}
          onFinish={onFinish}
          form={form}
        >
          <Form.Item<FieldType>
            label="Tên kiểu tài sản"
            name="name"
            rules={[{ required: true, message: 'Không được bỏ trống tên kiểu tài sản!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            label="Mã kiểu tài sản"
            name="category_code"
            rules={[{ required: true, message: 'Không được bỏ trống mã kiểu tài sản!' }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}

export default React.memo(CreateCategory);