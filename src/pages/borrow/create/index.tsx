import { App, Form, Input, InputNumber, Modal, Row, Col, type FormProps, Select } from "antd";
import React from "react";

import { createBorrowAPI } from "services/borrow.service";
import { fetchAssetsAPI } from "services/asset.service";

type TProps = App.Pages.Borrow.Create.IProps;
type FieldType = App.Pages.Borrow.Create.FieldType;

const CreateBorrow = (props: TProps) => {
  const { openCreate, setOpenCreate, resetTable } = props;
  const [form] = Form.useForm();
  const { message } = App.useApp();
  const [dataAssets, setDataAssets] = React.useState<IAsset[]>([]);

  React.useEffect(() => {
    const fetchApi = async () => {
      const res = await fetchAssetsAPI();
      if (res.data) {
        setDataAssets(res.data.result || []);
      }
    }

    fetchApi();
  }, [openCreate === true])

  const handleCancel = () => {
    setOpenCreate(false);
    form.resetFields();
  };

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    const res = await createBorrowAPI(values);
    if (res.data) {
      message.success("Thêm mới yêu cầu thành công!");
      resetTable();
      handleCancel();
    } else {
      message.error(res.message);
    }
  };

  return (
    <Modal
      title="Thêm mới yêu cầu mượn trả"
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
        <Row gutter={[10, 0]}>
          <Col span={16}>
            <Form.Item<FieldType>
              label="Tên tài sản"
              name="asset_name"
              rules={[{ required: true, message: "Không được bỏ trống mã tài sản!" }]}
            >
              <Select
                showSearch
                allowClear
                placeholder="Chọn tài sản"
                optionFilterProp="label"
                options={dataAssets.map((item) => ({
                  label: `${item.name}`,
                  value: item.name,
                }))}
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item<FieldType>
              label="Số lượng mượn"
              name="number_borrow"
              rules={[{ required: true, message: "Không được bỏ trống số lượng!" }]}
            >
              <InputNumber style={{ width: "100%" }} />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={[10, 0]}>
          <Col span={12}>
            <Form.Item<FieldType>
              label="Họ tên người mượn"
              name="fullName"
              rules={[{ required: true, message: "Không được bỏ trống tên người mượn!" }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item<FieldType>
              label="SĐT người mượn"
              name="phone"
              rules={[{ required: true, message: "Không được bỏ trống số điện thoại!" }]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={[10, 0]}>
          <Col span={12}>
            <Form.Item<FieldType>
              label="Lớp"
              name="class"
              rules={[{ required: true, message: "Không được bỏ trống lớp!" }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item<FieldType>
              label="Khoa"
              name="department"
              rules={[{ required: true, message: "Không được bỏ trống khoa!" }]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default React.memo(CreateBorrow);
