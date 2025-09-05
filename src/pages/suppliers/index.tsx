import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { ProTable, type ActionType, type ProColumns } from "@ant-design/pro-components";
import { App, Button, Popconfirm } from "antd";
import React from "react";

import { dateRangeValidate } from "@/helpers";
import { fetchSuppliersAPI } from "@/services/supplier.service";

const CreateSupplier = React.lazy(() => import("pages/suppliers/create"));

type TSearch = App.Pages.Suppliers.TSearch;

const SuppliersPage = () => {
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
  const [dataEdit, setDataEdit] = React.useState<ISupplier>();
  const [openDetail, setOpenDetail] = React.useState<boolean>(false);
  const [dataDetail, setDataDetail] = React.useState<ISupplier>();

  const columns: ProColumns<ISupplier>[] = React.useMemo(() => [
    {
      dataIndex: 'index',
      valueType: 'indexBorder',
      width: 48,
    },
    {
      title: 'Mã NCC',
      dataIndex: 'supplier_code',
      copyable: true,
      sorter: true,
    },
    {
      title: 'Tên nhà cung cấp',
      dataIndex: 'name',
      copyable: true,
      sorter: true,
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'phone',
      copyable: true,
    },
    {
      title: 'Địa chỉ',
      dataIndex: 'address',
      hideInSearch: true
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
      if (params.name) {
        query += `&name=/${params.name}/i`;
      }
      if (params.phone) {
        query += `&phone=/${params.phone}/i`;
      }
      if (params.supplier_code) {
        query += `&supplier_code=/${params.supplier_code}/i`;
      }
      const createDateRange = dateRangeValidate(params.createdAtRange);
      if (createDateRange) {
        query += `&createdAt>=${createDateRange[0]}&createdAt<=${createDateRange[1]}`;
      }
      if (params.email) {
        query += `&email=${params.email}`;
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

    const res = await fetchSuppliersAPI(query);
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

  const handleClickEdit = React.useCallback((data: ISupplier) => {
    setOpenEdit(true);
    setDataEdit(data);
  }, [])

  const handleDetail = React.useCallback((data: ISupplier) => {
    setDataDetail(data);
    setOpenDetail(true);
  }, [])

  const handleClickDelete = React.useCallback(async (data: ISupplier) => {
    // const res = await deleteUserAPI(data._id);
    // if (res.data) {
    //   message.success("Xóa bản ghi thành công!");
    //   resetTable();
    // } else {
    //   message.error("Xóa bản ghi thất bại!");
    // }
  }, [])

  return (
    <>
      <ProTable<ISupplier, TSearch>
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
        headerTitle="Bảng danh sách nhà cung cấp"
        toolBarRender={() => [
          <Button
            key="button"
            icon={<PlusOutlined />}
            onClick={() => {
              setOpenCreate(true)
            }}
            type="primary"
          >
            Thêm mới nhà cung cấp
          </Button>
        ]}
      />

      <CreateSupplier
        openCreate={openCreate}
        setOpenCreate={setOpenCreate}
        resetTable={resetTable}
      />

      {/* 

      <EditStaff
        openEdit={openEdit}
        setOpenEdit={setOpenEdit}
        dataEdit={dataEdit}
        setDataEdit={setDataEdit}
        resetTable={resetTable}
      />

      <DetailStaff
        openDetail={openDetail}
        setOpenDetail={setOpenDetail}
        dataDetail={dataDetail}
        setDataDetail={setDataDetail}
      /> */}
    </>
  )
}

export default React.memo(SuppliersPage);