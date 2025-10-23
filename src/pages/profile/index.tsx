import { App, Col, Divider, Form, Input, Modal, Row, Select, type FormProps } from "antd";
import React from "react"
import { useSelector } from "react-redux";

import type { RootState } from "redux/store";
import { fetchUserById, updateUserById } from "services/user.service";

type FieldType = App.Pages.Profile.FieldType;
type TProps = App.Pages.Profile.IProps;

const listOptions = [
  {
    value: "MALE",
    label: "Nam"
  },
  {
    value: "FEMALE",
    label: "Nữ"
  }
]

const ProfilePage = (props: TProps) => {
  const { openProfile, setOpenProfile } = props;

  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const user = useSelector((state: RootState) => state.auth.user);
  const { message } = App.useApp();

  React.useEffect(() => {
    const fetchApi = async () => {
      if (openProfile && user) {
        const res = await fetchUserById(user._id);
        if (res.data) {
          form.setFieldsValue({
            fullName: res.data.fullName,
            email: res.data.email,
            phone: res.data.phone,
            gender: res.data.gender,
            address: res.data.address,
          })
        }
      }
    }

    fetchApi();
  }, [openProfile])

  const handleCancel = () => {
    form.resetFields();
    setOpenProfile(false);
  };

  const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
    setIsLoading(true);
    if (!user)
      return;
    const res = await updateUserById(user._id, values);
    if (res.data) {
      message.success("Cập nhật thông tin thành công!");
    } else {
      message.error(res?.message);
    }
    setIsLoading(false);
  };

  return (
    <>
      <Modal
        title="Thông tin cá nhân"
        open={openProfile}
        onOk={() => form.submit()}
        onCancel={handleCancel}
        width={"35vw"}
        okText="Cập nhật"
        cancelText="Hủy bỏ"
        okButtonProps={{ loading: isLoading }}
      >
        <Divider />
        <Form
          layout="vertical"
          onFinish={onFinish}
          form={form}
        >
          <Row gutter={[15, 15]}>
            <Col xxl={12} xl={12} lg={12} md={24} sm={24} xs={24}>
              <Form.Item<FieldType>
                label="Họ tên"
                name="fullName"
                rules={[{ required: true, message: 'Họ tên không được để trống!' }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col xxl={12} xl={12} lg={12} md={24} sm={24} xs={24}>
              <Form.Item<FieldType>
                label="Email"
                name="email"
              >
                <Input disabled />
              </Form.Item>
            </Col>
            <Col xxl={12} xl={12} lg={12} md={24} sm={24} xs={24}>
              <Form.Item<FieldType>
                label="Số điện thoại"
                name="phone"
                rules={[{ required: true, message: 'Số điện thoại không được để trống!' }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col xxl={12} xl={12} lg={12} md={24} sm={24} xs={24}>
              <Form.Item<FieldType>
                label="Giới tính"
                name="gender"
                rules={[{ required: true, message: 'Giới tính không được để trống!' }]}
              >
                <Select
                  showSearch
                  placeholder="Chọn giới tính"
                  optionFilterProp="label"
                  options={listOptions}
                />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item<FieldType>
            label="Địa chỉ"
            name="address"
            rules={[{ required: true, message: 'Địa chỉ không được để trống!' }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}

export default React.memo(ProfilePage);