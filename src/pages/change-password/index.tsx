import { App, Divider, Form, Input, Modal, type FormProps } from "antd";
import React from "react";
import { useSelector } from "react-redux";

import { changePasswordAPI } from "services/user.service";
import type { RootState } from "redux/store";

type FieldType = App.Pages.ChangePassword.FieldType;
type TProps = App.Pages.ChangePassword.IProps;

const ChangePassword = (props: TProps) => {
  const { openChangePassword, setOpenChangePassword } = props;

  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const [form] = Form.useForm();
  const { message } = App.useApp();
  const user = useSelector((state: RootState) => state.auth.user);

  const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
    setIsLoading(true);
    if (!user)
      return;

    const dataSubmit = {
      _id: user._id,
      ...values
    }
    const res = await changePasswordAPI(dataSubmit);
    if (res.data) {
      message.success("Thay đổi mật khẩu thành công!");
      handleCancel();
    } else {
      message.error(res?.message);
    }
    setIsLoading(false);
  };

  const handleCancel = () => {
    form.resetFields();
    setOpenChangePassword(false);
  };

  return (
    <>
      <Modal
        title="Thay đổi mật khẩu"
        open={openChangePassword}
        onOk={() => form.submit()}
        onCancel={handleCancel}
        okText="Thay đổi"
        cancelText="Hủy bỏ"
        okButtonProps={{ loading: isLoading }}
      >
        <Divider />
        <Form
          layout="vertical"
          onFinish={onFinish}
          form={form}
        >
          <Form.Item<FieldType>
            label="Mật khẩu hiện tại"
            name="password"
            rules={[{ required: true, message: 'Mật khẩu hiện tại không được để trống!' }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item<FieldType>
            label="Mật khẩu mới"
            name="passwordNew"
            rules={[{ required: true, message: 'Mật khẩu mới không được để trống!' }]}
          >
            <Input.Password />
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}

export default React.memo(ChangePassword);