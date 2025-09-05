import { App, Col, Form, Input, InputNumber, Modal, Row, Select, type FormProps } from "antd";
import React from "react";

import { editServiceAPI } from "services/service.service";
import { fetchAssetsAPI } from "services/asset.service";

type TProps = App.Pages.Service.Edit.IProps;
type FieldType = App.Pages.Service.Edit.FieldType;

const optionsSelect = [
  { label: "Đang sửa", value: "PROCESSING" },
  { label: "Hoàn thành", value: "COMPLETING" },
];

const EditService = (props: TProps) => {
  const { openEdit, setOpenEdit, dataEdit, setDataEdit, resetTable } = props;
  const [form] = Form.useForm();
  const { message } = App.useApp();
  const [dataAssets, setDataAssets] = React.useState<IAsset[]>([]);

  React.useEffect(() => {
    const fetchApi = async () => {
      const res = await fetchAssetsAPI();
      if (res.data) {
        setDataAssets(res.data.result || []);
      }
    };
    fetchApi();
  }, []);

  React.useEffect(() => {
    if (openEdit && dataEdit) {
      form.setFieldsValue({
        asset_name: dataEdit.asset_name,
        quantity: dataEdit.quantity,
        price: dataEdit.price,
        reason_failure: dataEdit.reason_failure,
        fullName: dataEdit.fullName,
        phone: dataEdit.phone,
        address: dataEdit.address,
        status: dataEdit.status,
      });
    }
  }, [openEdit, dataEdit, form]);

  const handleCancel = () => {
    setOpenEdit(false);
    setDataEdit(undefined);
    form.resetFields();
  };

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    if (!dataEdit?._id) return;
    const res = await editServiceAPI(dataEdit._id, values);
    if (res.data) {
      message.success("Cập nhật sửa chữa thành công!");
      resetTable();
      handleCancel();
    } else {
      message.error(res.message);
    }
  };

  return (
    <>
      <Modal
        title="Chỉnh sửa sửa chữa"
        open={openEdit}
        onOk={() => form.submit()}
        onCancel={handleCancel}
        okText="Lưu thay đổi"
        cancelText="Hủy bỏ"
      >
        <Form
          name="editService"
          layout="vertical"
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

          <Form.Item<FieldType>
            label="Trạng thái"
            name="status"
            rules={[{ required: true, message: "Không được bỏ trống trạng thái!" }]}
          >
            <Select
              options={optionsSelect}
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}


export default React.memo(EditService);