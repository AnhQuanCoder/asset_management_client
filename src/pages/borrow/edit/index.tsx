import { App, Form, Input, InputNumber, Modal, Row, Col, type FormProps, Select } from "antd";
import React from "react";

import { editBorrowAPI } from "services/borrow.service";
import { fetchAssetsAPI } from "services/asset.service";

type FieldType = App.Pages.Borrow.Edit.FieldType;
type TProps = App.Pages.Borrow.Edit.TProps;

const EditBorrow = (props: TProps) => {
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

  // khi mở modal edit thì set lại dữ liệu vào form
  React.useEffect(() => {
    if (openEdit && dataEdit) {
      form.setFieldsValue({
        asset_name: dataEdit.asset_name,
        number_borrow: dataEdit.number_borrow,
        fullName: dataEdit.fullName,
        phone: dataEdit.phone,
        class: dataEdit.class,
        department: dataEdit.department,
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
    const res = await editBorrowAPI(dataEdit._id, values);
    if (res.data) {
      message.success("Cập nhật yêu cầu thành công!");
      resetTable();
      handleCancel();
    } else {
      message.error(res.message || "Cập nhật thất bại!");
    }
  };

  return (
    <Modal
      title="Chỉnh sửa yêu cầu mượn trả"
      open={openEdit}
      onOk={() => form.submit()}
      onCancel={handleCancel}
      okText="Cập nhật"
      cancelText="Hủy bỏ"
    >
      <Form
        name="editBorrow"
        layout="vertical"
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

        <Form.Item<FieldType>
          label="Trạng thái"
          name="status"
          rules={[{ required: true, message: "Không được bỏ trống trạng thái!" }]}
        >
          <Select
            options={[
              { label: "Chưa trả", value: "UNPAID" },
              { label: "Đã trả", value: "PAID" },
            ]}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default React.memo(EditBorrow);
