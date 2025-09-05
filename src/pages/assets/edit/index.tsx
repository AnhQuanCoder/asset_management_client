import { App, Col, Form, Input, InputNumber, Modal, Row, Select, type FormProps } from "antd";
import React from "react";

import { editAssetById } from "services/asset.service";
import { fetchCategoriesAPI } from "services/categories.service";
import { fetchSuppliersAPI } from "services/supplier.service";

type TProps = App.Pages.Assets.Edit.IProps;
type FieldType = App.Pages.Assets.Edit.FieldType;

const EditAsset = (props: TProps) => {
  const { openEdit, setOpenEdit, dataEdit, setDataEdit, resetTable } = props;
  const [form] = Form.useForm();
  const { message } = App.useApp();
  const [dataCategories, setDataCategories] = React.useState<ICategories[]>([]);
  const [dataSuppliers, setDataSuppliers] = React.useState<ISupplier[]>([]);

  React.useEffect(() => {
    if (!openEdit) return;
    const fetchApi = async () => {
      const res = await fetchCategoriesAPI();
      if (res.data) {
        setDataCategories(res.data.result);
      }
    };
    fetchApi();
  }, [openEdit]);

  React.useEffect(() => {
    if (!openEdit) return;
    const fetchApi = async () => {
      const res = await fetchSuppliersAPI();
      if (res.data) {
        setDataSuppliers(res.data.result);
      }
    };
    fetchApi();
  }, [openEdit]);

  React.useEffect(() => {
    if (dataEdit && openEdit) {
      console.log(dataEdit);
      form.setFieldsValue({
        name: dataEdit.name,
        category_code: dataEdit.category_code,
        unit: dataEdit.unit,
        asset_code: dataEdit.asset_code,
        year_manufacture: dataEdit.year_manufacture,
        supplier_code: dataEdit.supplier_code,
        price: dataEdit.price,
        quantity: dataEdit.quantity,
      });
    }
  }, [dataEdit]);

  const handleCancel = () => {
    setOpenEdit(false);
    setDataEdit(undefined);
    form.resetFields();
  };

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    if (!dataEdit?._id) return;
    const res = await editAssetById(dataEdit._id, values);
    if (res.data) {
      message.success("Cập nhật tài sản thành công!");
      resetTable();
      handleCancel();
    } else {
      message.error(res.message || "Cập nhật thất bại!");
    }
  };

  return (
    <>
      <Modal
        title="Chỉnh sửa tài sản"
        open={openEdit}
        onOk={() => form.submit()}
        onCancel={handleCancel}
        okText="Cập nhật"
        cancelText="Hủy bỏ"
      >
        <Form
          name="edit-asset"
          layout="vertical"
          onFinish={onFinish}
          form={form}
        >
          <Form.Item<FieldType>
            label="Tên tài sản"
            name="name"
            rules={[{ required: true, message: "Không được bỏ trống tên tài sản!" }]}
          >
            <Input />
          </Form.Item>

          <Row gutter={[10, 0]}>
            <Col span={12}>
              <Form.Item<FieldType>
                label="Đơn vị"
                name="unit"
                rules={[{ required: true, message: "Không được bỏ trống đơn vị!" }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item<FieldType>
                label="Mã tài sản"
                name="asset_code"
                rules={[{ required: true, message: "Không được bỏ trống mã tài sản!" }]}
              >
                <Input disabled />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item<FieldType>
            label="Danh mục tài sản"
            name="category_code"
            rules={[{ required: true, message: "Không được bỏ trống danh mục!" }]}
          >
            <Select
              showSearch
              allowClear
              placeholder="Chọn danh mục"
              optionFilterProp="label"
              options={dataCategories.map((item) => ({
                label: `${item.name}`,
                value: item.name,
              }))}
            />
          </Form.Item>

          <Row gutter={[10, 0]}>
            <Col span={12}>
              <Form.Item<FieldType>
                label="Năm sản xuất"
                name="year_manufacture"
                rules={[{ required: true, message: "Không được bỏ trống năm sản xuất!" }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item<FieldType>
                label="Nhà cung cấp"
                name="supplier_code"
                rules={[{ required: true, message: "Không được bỏ trống nhà cung cấp!" }]}
              >
                <Select
                  showSearch
                  allowClear
                  placeholder="Chọn nhà cung cấp"
                  optionFilterProp="label"
                  options={dataSuppliers.map((item) => ({
                    label: `${item.name}`,
                    value: item.supplier_code,
                  }))}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={[10, 0]}>
            <Col span={12}>
              <Form.Item<FieldType>
                label="Giá"
                name="price"
                rules={[{ required: true, message: "Không được bỏ trống giá!" }]}
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
            <Col span={12}>
              <Form.Item<FieldType>
                label="Số lượng"
                name="quantity"
                rules={[{ required: true, message: "Không được bỏ trống số lượng!" }]}
              >
                <InputNumber style={{ width: "100%" }} />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </>
  )
}

export default React.memo(EditAsset);
