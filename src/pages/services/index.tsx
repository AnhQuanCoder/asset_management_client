import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { ProTable, type ActionType, type ProColumns } from "@ant-design/pro-components";
import { App, Button, Popconfirm, Tag } from "antd";
import React from "react";

import { dateRangeValidate, formatCurrency } from "@/helpers";
import { deleteServiceAPI, fetchServicesAPI } from "services/service.service";

const CreateService = React.lazy(() => import("pages/services/create"));
const EditService = React.lazy(() => import("pages/services/edit"));

type TSearch = App.Pages.Service.TSearch;

const ServicesPage = () => {
  const { message } = App.useApp();

  const actionRef = React.useRef<ActionType>(null!);
  const [meta, setMeta] = React.useState({
    current: 1,
    pageSize: 10,
    pages: 0,
    total: 0
  })
  const [openCreate, setOpenCreate] = React.useState<boolean>(false);
  const [openEdit, setOpenEdit] = React.useState<boolean>(false);
  const [dataEdit, setDataEdit] = React.useState<IService>();

  const columns: ProColumns<IService>[] = React.useMemo(() => [
    {
      dataIndex: 'index',
      valueType: 'indexBorder',
      width: 48,
    },
    {
      title: 'Tên tài sản',
      dataIndex: 'asset_name',
      copyable: true,
      ellipsis: true
    },
    {
      title: 'Số lượng',
      dataIndex: 'quantity',
      hideInSearch: true
    },
    {
      title: 'Giá tiền',
      dataIndex: 'price',
      hideInSearch: true,
      sorter: true,
      render: (_, entity) => {
        return <p>{formatCurrency(entity.price)}</p>;
      },
    },
    {
      title: 'Lý do',
      dataIndex: 'reason_failure',
      hideInSearch: true,
      ellipsis: true
    },
    {
      title: 'Tên người sửa',
      dataIndex: 'fullName',
      hideInSearch: true,
      ellipsis: true
    },
    {
      title: 'SĐT',
      dataIndex: 'phone',
      hideInSearch: true,
      ellipsis: true
    },
    {
      title: 'Địa chỉ',
      dataIndex: 'address',
      hideInSearch: true,
      ellipsis: true
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      valueType: "select",
      valueEnum: {
        PROCESSING: { text: "Đang sửa", status: "Error" },
        COMPLETING: { text: "Hoàn thành", status: "Success" }
      },
      render(_dom, entity) {
        return (
          <>
            {entity.status === "PROCESSING" ?
              <Tag color="red">Đang sửa</Tag>
              :
              <Tag color="green">Hoàn thành</Tag>}
          </>
        )
      }
    },
    {
      title: 'Người tạo',
      hideInSearch: true,
      render(_dom, entity) {
        return (
          <>{entity.createdBy?.email ? <p>{entity.createdBy.email}</p> : <p>-</p>}</>
        )
      },
    },
    {
      title: 'Thời gian tạo',
      dataIndex: 'createdAt',
      valueType: 'date',
      sorter: true,
      hideInSearch: true,
    },
    {
      title: 'Thời gian tạo',
      dataIndex: 'createdAtRange',
      valueType: 'dateRange',
      hideInTable: true,
    },
    {
      title: "Hành động",
      hideInSearch: true,
      render(_dom, entity, _index, _action, _schema) {
        return (
          <>
            <EditOutlined
              style={{ cursor: "pointer", marginRight: "15px", color: "#f57800" }}
              onClick={() => handleClickEdit(entity)}
            />

            <Popconfirm
              title="Bạn có chắc chắn muốn xóa bản ghi này không?"
              onConfirm={() => handleClickDelete(entity)}
              okText="Xóa"
              cancelText="Hủy"
            >
              <DeleteOutlined
                style={{ cursor: "pointer", marginRight: "15px", color: "#ff4d4f" }}
              />
            </Popconfirm>
          </>
        )
      },
    }
  ], [])

  const getTableData = React.useCallback(async (
    params: any,
    sort: Record<string, any>
  ) => {
    let query = ``;

    if (params) {
      query += `&current=${params.current}&pageSize=${params.pageSize}`;
      if (params.asset_name) {
        query += `&asset_name=/${params.asset_name}/i`;
      }
      if (params.status) {
        query += `&status=${params.status}`;
      }
      const createDateRange = dateRangeValidate(params.createdAtRange);
      if (createDateRange) {
        query += `&createdAt>=${createDateRange[0]}&createdAt<=${createDateRange[1]}`;
      }
    }

    if (sort && Object.keys(sort).length > 0) {
      const sortFields: string[] = [];
      Object.entries(sort).forEach(([field, order]) => {
        if (order) {
          sortFields.push(order === "ascend" ? field : `-${field}`);
        }
      });
      query += `&sort=${sortFields.join(",")}`;
    } else {
      query += `&sort=-createdAt`;
    }

    const res = await fetchServicesAPI(query);
    if (res.data) {
      setMeta(res.data.meta);
    }

    return {
      data: res.data?.result || [],
      page: params.current || 1,
      success: true,
      total: res.data?.meta.total || 0,
    };
  }, [])

  const resetTable = React.useCallback(() => {
    actionRef.current?.reload();
  }, [])

  const handleClickEdit = React.useCallback((data: IService) => {
    setOpenEdit(true);
    setDataEdit(data);
  }, [])

  const handleClickDelete = React.useCallback(async (data: IService) => {
    const res = await deleteServiceAPI(data._id);
    if (res.data) {
      message.success("Xóa bản ghi thành công!");
      resetTable();
    } else {
      message.error("Xóa bản ghi thất bại!");
    }
  }, [])

  return (
    <>
      <ProTable<IService, TSearch>
        columns={columns}
        actionRef={actionRef}
        cardBordered
        search={{ labelWidth: 'auto' }}
        request={async (params, sort, _filter) => getTableData(params, sort)}
        rowKey="_id"
        pagination={{
          current: meta.current,
          pageSize: meta.pageSize,
          showSizeChanger: true,
          total: meta.total,
          showTotal: (total, range) => {
            return (
              <div>
                {range[0]}-{range[1]} trên {total} rows
              </div>
            )
          }
        }}
        headerTitle="Bảng danh sách sửa chữa"
        toolBarRender={() => [
          <Button
            key="button"
            icon={<PlusOutlined />}
            onClick={() => {
              setOpenCreate(true)
            }}
            type="primary"
          >
            Thêm mới sửa chữa
          </Button>
        ]}
      />

      <CreateService
        openCreate={openCreate}
        setOpenCreate={setOpenCreate}
        resetTable={resetTable}
      />

      <EditService
        openEdit={openEdit}
        setOpenEdit={setOpenEdit}
        dataEdit={dataEdit}
        setDataEdit={setDataEdit}
        resetTable={resetTable}
      />
    </>
  )
}


export default React.memo(ServicesPage);