import { createServiceAPI } from "@/services/service.service";
import { App, Col, Form, Input, InputNumber, Modal, Row, Select, type FormProps } from "antd";
import React from "react";

import { fetchAssetsAPI } from "services/asset.service";

type TProps = App.Pages.Service.Create.IProps;
type FieldType = App.Pages.Service.Create.FieldType;

const CreateService = (props: TProps) => {
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
    const res = await createServiceAPI(values);
    if (res.data) {
      message.success("Thêm mới sửa chữa thành công!");
      resetTable();
      handleCancel();
    } else {
      message.error(res.message);
    }
  };

  return (
    <>
      <Modal
        title="Thêm mới sửa chữa"
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
            label="Tên tài sản"
            name="asset_name"
            rules={[{ required: true, message: "Không được bỏ trống tài sản!" }]}
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

          <Row gutter={[10, 0]}>
            <Col span={12}>
              <Form.Item<FieldType>
                label="Số lượng"
                name="quantity"
                rules={[{ required: true, message: "Không được bỏ trống số lượng!" }]}
              >
                <InputNumber style={{ width: "100%" }} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item<FieldType>
                label="Giá tiền"
                name="price"
                rules={[{ required: true, message: "Không được bỏ trống giá tiền!" }]}
              >
                <InputNumber<number>
                  style={{ width: "100%" }}
                  min={0}
                  formatter={(value) =>
                    value != null
                      ? `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                      : ""
                  }
                />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item<FieldType>
            label="Lý do sửa"
            name="reason_failure"
            rules={[{ required: true, message: "Không được bỏ trống lý do!" }]}
          >
            <Input />
          </Form.Item>

          <Row gutter={[10, 0]}>
            <Col span={12}>
              <Form.Item<FieldType>
                label="Tên nhân viên sửa"
                name="fullName"
                rules={[{ required: true, message: "Không được bỏ trống tên người sửa!" }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item<FieldType>
                label="SĐT người sửa"
                name="phone"
                rules={[{ required: true, message: "Không được bỏ trống số điện thoại!" }]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item<FieldType>
            label="Địa chỉ"
            name="address"
            rules={[{ required: true, message: "Không được bỏ trống địa chỉ!" }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}

export default React.memo(CreateService);