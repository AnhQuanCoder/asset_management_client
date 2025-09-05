import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { ProTable, type ActionType, type ProColumns } from "@ant-design/pro-components";
import { App, Button, Popconfirm, Tag } from "antd";

import { dateRangeValidate } from "@/helpers";
import { fetchBorrowsAPI } from "@/services/borrow.service";
import React from "react";

type TSearch = App.Pages.Borrow.TSearch;

const BorrowPage = () => {
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
  const [dataEdit, setDataEdit] = React.useState<IBorrow>();

  const columns: ProColumns<IBorrow>[] = React.useMemo(() => [
    {
      dataIndex: 'index',
      valueType: 'indexBorder',
      width: 48,
    },
    {
      title: 'Mã tài sản',
      dataIndex: 'asset_code',
      copyable: true,
    },
    {
      title: 'Số lượng mượn',
      dataIndex: 'number_borrow',
      hideInSearch: true
    },
    {
      title: 'Tên người mượn',
      dataIndex: 'fullName',
      copyable: true,
    },
    {
      title: 'Khoa',
      dataIndex: 'department',
      hideInSearch: true
    },
    {
      title: 'Lớp',
      dataIndex: 'class',
      hideInSearch: true
    },
    {
      title: 'SĐT',
      dataIndex: 'phone',
      hideInSearch: true
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      hideInSearch: true,
      render(_dom, entity) {
        return (
          <>
            {entity.status === "PAID" ?
              <Tag color="green">Đã trả</Tag>
              :
              <Tag color="red">Chưa trả</Tag>}
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
      if (params.fullName) {
        query += `&fullName=/${params.fullName}/i`;
      }
      if (params.asset_code) {
        query += `&asset_code=/${params.asset_code}/i`;
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

    const res = await fetchBorrowsAPI(query);
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

  const handleClickEdit = React.useCallback((data: IBorrow) => {
    setOpenEdit(true);
    setDataEdit(data);
  }, [])

  const handleClickDelete = React.useCallback(async (data: IBorrow) => {
    // const res = await deleteSupplierAPI(data._id);
    // if (res.data) {
    //   message.success("Xóa bản ghi thành công!");
    //   resetTable();
    // } else {
    //   message.error("Xóa bản ghi thất bại!");
    // }
  }, [])

  return (
    <>
      <ProTable<IBorrow, TSearch>
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
        headerTitle="Bảng danh sách mượn trả"
        toolBarRender={() => [
          <Button
            key="button"
            icon={<PlusOutlined />}
            onClick={() => {
              setOpenCreate(true)
            }}
            type="primary"
          >
            Thêm mới Mượn trả
          </Button>
        ]}
      />

      {/* <CreateSupplier
        openCreate={openCreate}
        setOpenCreate={setOpenCreate}
        resetTable={resetTable}
      />

      <EditSupplier
        openEdit={openEdit}
        setOpenEdit={setOpenEdit}
        dataEdit={dataEdit}
        setDataEdit={setDataEdit}
        resetTable={resetTable}
      /> */}
    </>
  )
}

export default React.memo(BorrowPage);
