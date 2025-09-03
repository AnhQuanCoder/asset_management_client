import { editCategoryById } from "@/services/categories.service";
import { App, Form, Input, Modal, type FormProps } from "antd";
import React from "react";

type TProps = App.Pages.Categories.Edit.IProps;
type FieldType = App.Pages.Categories.Edit.FieldType;

const EditCategory = (props: TProps) => {
  const { dataEdit, setDataEdit, openEdit, setOpenEdit, resetTable } = props;
  const [form] = Form.useForm();
  const { message } = App.useApp();

  React.useEffect(() => {
    form.setFieldsValue({
      name: dataEdit?.name,
      category_code: dataEdit?.category_code
    })
  }, [dataEdit])

  const handleCancel = () => {
    setDataEdit(undefined);
    setOpenEdit(false);
    form.resetFields();
  }

  const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
    if (!dataEdit) {
      return;
    }
    const res = await editCategoryById(dataEdit._id, values);
    if (res.data) {
      message.success("Cập nhật kiểu tài sản thành công!");
      setDataEdit(undefined);
      resetTable();
      handleCancel();
    } else {
      message.error(res.message);
    }
  };

  return (
    <>
      <Modal
        title="Cập nhật kiểu tài sản"
        open={openEdit}
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

export default React.memo(EditCategory);