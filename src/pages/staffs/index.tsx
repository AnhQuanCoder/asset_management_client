import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { ProTable, type ActionType, type ProColumns } from "@ant-design/pro-components";
import { App, Button, Popconfirm, Tag } from "antd";
import React from "react";

import { fetchUsersAPI } from "@/services/staff.service";
import { dateRangeValidate } from "@/helpers";

const CreateStaff = React.lazy(() => import("pages/staffs/create"));
const EditStaff = React.lazy(() => import("pages/staffs/edit"));
const DetailStaff = React.lazy(() => import("pages/staffs/detail"));

type TSearch = App.Pages.Staffs.TSearch;

const StaffsPage = () => {
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
  const [dataEdit, setDataEdit] = React.useState<IStaff>();
  const [openDetail, setOpenDetail] = React.useState<boolean>(false);
  const [dataDetail, setDataDetail] = React.useState<IStaff>();

  const columns: ProColumns<IStaff>[] = React.useMemo(() => [
    {
      dataIndex: 'index',
      valueType: 'indexBorder',
      width: 48,
    },
    {
      title: 'Tên nhân viên',
      dataIndex: 'fullName',
      copyable: true,
      sorter: true,
      render(_dom, entity) {
        return (
          <a href="#" onClick={() => handleDetail(entity)}>{entity.fullName}</a>
        )
      }
    },
    {
      title: 'E-Mail',
      dataIndex: 'email',
      copyable: true,
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'phone',
      copyable: true,
    },
    {
      title: 'Giới tính',
      hideInSearch: true,
      render(_dom, entity) {
        return (
          <>{entity.gender === "MALE" ? <Tag color="green">Nam</Tag> : <Tag color="red">Nữ</Tag>}</>
        )
      },
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
              // onConfirm={() => handleClickDelete(entity)}
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
      if (params.phone) {
        query += `&phone=/${params.phone}/i`;
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

    const res = await fetchUsersAPI(query);
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

  const handleClickEdit = React.useCallback((data: IStaff) => {
    setOpenEdit(true);
    setDataEdit(data);
  }, [])

  const handleDetail = React.useCallback((data: IStaff) => {
    setDataDetail(data);
    setOpenDetail(true);
  }, [])

  //   const handleClickDelete = React.useCallback(async (data: ICategories) => {
  //     const res = await deleteCategoryById(data._id);
  //     if (res.data) {
  //       message.success("Xóa bản ghi thành công!");
  //       resetTable();
  //     } else {
  //       message.error("Xóa bản ghi thất bại!");
  //     }
  //   }, [])

  return (
    <>
      <ProTable<IStaff, TSearch>
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
        headerTitle="Bảng danh sách nhân viên"
        toolBarRender={() => [
          <Button
            key="button"
            icon={<PlusOutlined />}
            onClick={() => {
              setOpenCreate(true)
            }}
            type="primary"
          >
            Thêm mới nhân viên
          </Button>,
        ]}
      />

      <CreateStaff
        openCreate={openCreate}
        setOpenCreate={setOpenCreate}
        resetTable={resetTable}
      />

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
      />
    </>
  )
}

export default React.memo(StaffsPage);