import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { ProTable, type ActionType, type ProColumns } from "@ant-design/pro-components";
import { App, Button, Popconfirm } from "antd";
import React from "react";

import { dateRangeValidate } from "@/helpers";
import { fetchCategoriesAPI } from "@/services/categories.service";

type TSearch = App.Pages.Categories.TSearch;

const CategoriesPage = () => {
  const { message } = App.useApp();

  const actionRef = React.useRef<ActionType>(null!);
  const [meta, setMeta] = React.useState({
    current: 1,
    pageSize: 10,
    pages: 0,
    total: 0
  })

  const columns: ProColumns<ICategories>[] = React.useMemo(() => [
    {
      dataIndex: 'index',
      valueType: 'indexBorder',
      width: 48,
    },
    {
      title: "Id",
      dataIndex: "category_code",
      copyable: true,
    },
    {
      title: 'Tên loại tài sản',
      dataIndex: 'name',
      copyable: true,
      sorter: true,
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
            // onClick={() => handleClickEdit(entity)}
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

  const getCategoriesTableData = React.useCallback(async (
    params: any,
    sort: Record<string, any>
  ) => {
    let query = ``;

    if (params) {
      query += `&current=${params.current}&pageSize=${params.pageSize}`;
      if (params.name) {
        query += `&name=/${params.name}/i`;
      }
      if (params.category_code) {
        query += `&category_code=/${params.category_code}/i`;
      }
      const createDateRange = dateRangeValidate(params.createdAtRange);
      if (createDateRange) {
        query += `&createdAt>=${createDateRange[0]}&createdAt<=${createDateRange[1]}`;
      }
      if (params.status) {
        query += `&status=${params.status}`;
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

    const res = await fetchCategoriesAPI(query);
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

  return (
    <>
      <ProTable<ICategories, TSearch>
        columns={columns}
        actionRef={actionRef}
        cardBordered
        search={{ labelWidth: 'auto' }}
        request={async (params, sort, _filter) => getCategoriesTableData(params, sort)}
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
        headerTitle="Bảng loại tài sản"
        toolBarRender={() => [
          <Button
            key="button"
            icon={<PlusOutlined />}
            onClick={() => {
              // setOpenCreate(true)
            }}
            type="primary"
          >
            Thêm mới loại tài sản
          </Button>,
        ]}
      />

      {/* 
      <CreateBuilding
        openCreate={openCreate}
        setOpenCreate={setOpenCreate}
        resetTable={resetTable}
      />

      <EditBuilding
        openEdit={openEdit}
        setOpenEdit={setOpenEdit}
        dataEdit={dataEdit}
        setDataEdit={setDataEdit}
        resetTable={resetTable}
      /> */}
    </>
  )
}

export default React.memo(CategoriesPage);