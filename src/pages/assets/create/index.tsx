import { App, Col, Form, Input, InputNumber, Modal, Row, Select, type FormProps } from "antd";
import React from "react";

import { createAssetAPI } from "services/asset.service";
import { fetchCategoriesAPI } from "services/categories.service";
import { fetchSuppliersAPI } from "services/supplier.service";

type TProps = App.Pages.Assets.Create.IProps;
type FieldType = App.Pages.Assets.Create.FieldType;

const CreateAsset = (props: TProps) => {
  const { openCreate, setOpenCreate, resetTable } = props;
  const [form] = Form.useForm();
  const { message } = App.useApp();
  const [dataCategories, setDataCategories] = React.useState<ICategories[]>([]);
  const [dataSuppliers, setDataSuppliers] = React.useState<ISupplier[]>([]);

  React.useEffect(() => {
    const fetchApi = async () => {
      const res = await fetchCategoriesAPI();
      if (res.data) {
        setDataCategories(res.data.result);
      }
    }

    fetchApi();
  }, [openCreate])

  React.useEffect(() => {
    const fetchApi = async () => {
      const res = await fetchSuppliersAPI();
      if (res.data) {
        setDataSuppliers(res.data.result);
      }
    }

    fetchApi();
  }, [openCreate])

  const handleCancel = () => {
    setOpenCreate(false);
    form.resetFields();
  }

  const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
    const res = await createAssetAPI(values);
    if (res.data) {
      message.success("Thêm mới tài sản thành công!");
      resetTable();
      handleCancel();
    } else {
      message.error(res.message);
    }
  };

  return (
    <>
      <Modal
        title="Thêm mới tài sản"
        open={openCreate}
        onOk={() => form.submit()}
        onCancel={handleCancel}
        okText="Thêm mới"
        cancelText="Hủy bỏ"
      >
        <Form
          name="basic"
          layout="vertical"
          onFinish={onFinish}
          form={form}
        >
          <Form.Item<FieldType>
            label="Tên tài sản"
            name="name"
            rules={[{ required: true, message: 'Không được bỏ trống tên tài sản!' }]}
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
                rules={[{ required: true, message: "Không được bỏ trống đơn vị!" }]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item<FieldType>
            label="Danh mục tài sản"
            name="category_code"
            rules={[{ required: true, message: 'Không được bỏ trống danh mục tài sản!' }]}
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


export default React.memo(CreateAsset);