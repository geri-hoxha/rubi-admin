import { Result } from '@/services/request';
import { FilterOutlined, UndoOutlined } from '@ant-design/icons';
import type { GridApi, GridOptions, GridReadyEvent } from 'ag-grid-community';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine-dark.css';
import { AgGridReact } from 'ag-grid-react';
import { Button, Form, Spin } from 'antd';
import { ReactNode, useCallback, useEffect, useState } from 'react';
import CustomDateComponent from './CustomDateComponent';
import { FilterModel, getSidebar, SortModel } from './static';

interface AgGridRequest {
  startRow: number;
  endRow: number;
  sortModel: SortModel[];
  filterModel: { [key: string]: FilterModel };
}

export interface IAgGridOptions extends GridOptions {
  apiMethod?: (
    page: number,
    pageSize: number,
    queryParams?: string,
  ) => Promise<Result<any>>;
  gridRef?:
    | React.RefObject<AgGridReact>
    | React.MutableRefObject<AgGridReact | undefined>
    | any;
  height?: number | string;
  filterFields?: ReactNode;
}

const AgGrid: React.FC<IAgGridOptions> = ({
  apiMethod,
  gridRef,
  defaultColDef = {
    flex: 1,
    filter: false,
    editable: false,
    minWidth: 120,
    resizable: true,
  },
  sideBar = true,
  pagination = false,
  paginationPageSize = 100,
  rowModelType = 'serverSide',
  serverSideStoreType = 'partial',
  rowSelection = 'single',
  domLayout = 'normal',
  components,
  onGridReady,
  height,
  columnDefs,
  filterFields,
  getRowId = useCallback(({ data }: any) => {
    return data.id;
  }, []),
  ...otherProps
}) => {
  const isClientSide = rowModelType === 'clientSide';

  const [filterForm] = Form.useForm();

  const [loading, setLoading] = useState<boolean>(false);

  const [gridApi, setGridApi] = useState<GridApi>();

  useEffect(() => {
    if (!gridApi || isClientSide) return;
    setDataSource();
  }, [gridApi]);

  const getServerSideDatasource = (queryParams: string = '') => {
    return {
      getRows: async function (params: any) {
        if (!apiMethod) return;

        const { startRow, endRow }: AgGridRequest = params.request;

        // const processedFilterModel = prepareFilterModelDates(filterModel);

        try {
          const response: Result<any> = await apiMethod?.(
            endRow / 100,
            endRow - startRow,
            queryParams,
          );

          params.success({
            rowData: response.value,
            rowCount: response.filteredRows,
          });
        } catch (error: any) {
          params.success({
            rowData: [],
            rowCount: 0,
          });
        }
      },
    };
  };

  const filterHandler = async () => {
    try {
      setLoading(true);
      const filterFormValues = filterForm.getFieldsValue();

      const queryParams = Object.keys(filterFormValues)
        .filter((key) => !!filterFormValues[key])
        .map((key) => {
          return `&${key}=${filterFormValues[key]}`;
        })
        .join('');

      setDataSource(queryParams);
    } finally {
      setLoading(false);
    }
  };

  const filterCancelHandler = async () => {
    filterForm.resetFields();
    setDataSource();
  };

  const setDataSource = (queryParams: string = '') => {
    const datasource = getServerSideDatasource(queryParams);

    gridApi?.setServerSideDatasource(datasource);
  };

  return (
    <Spin spinning={loading} tip="Loading...">
      {
        <Form
          form={filterForm}
          name="filter"
          style={{
            display: 'flex',
            alignContent: 'center',
            margin: '14px 0 28px 0',
            gap: 36,
            background: '#272727',
            padding: '20px 20px 10px 20px',
            borderRadius: 6,
          }}
          layout="vertical"
          initialValues={{ remember: true }}
          autoComplete="off"
        >
          {filterFields}

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 20,
            }}
          >
            <Button size="large" danger onClick={filterCancelHandler}>
              <UndoOutlined /> Reset
            </Button>
            <Button
              size="large"
              type="primary"
              htmlType="submit"
              onClick={filterHandler}
            >
              <FilterOutlined /> Filter
            </Button>
          </div>
        </Form>
      }

      <div className={` ag-theme-alpine-dark`} style={{ height }}>
        <AgGridReact
          ref={gridRef}
          columnDefs={columnDefs}
          defaultColDef={{ ...defaultColDef, suppressMenu: true }}
          className={`ag-theme-alpine-dark`}
          pagination={rowModelType === 'serverSide' || pagination}
          rowModelType={rowModelType}
          serverSideStoreType={serverSideStoreType}
          maxBlocksInCache={paginationPageSize}
          onGridReady={
            onGridReady
              ? onGridReady
              : (params: GridReadyEvent) => setGridApi(params.api)
          }
          components={{
            ...components,
            agDateInput: CustomDateComponent,
          }}
          getRowId={getRowId}
          groupHeaderHeight={37}
          headerHeight={37}
          suppressRowClickSelection
          rowSelection={rowSelection}
          domLayout={height ? 'normal' : domLayout}
          animateRows
          tooltipShowDelay={0}
          tooltipHideDelay={20000}
          {...otherProps}
          sideBar={getSidebar()}
        />
      </div>
    </Spin>
  );
};

export default AgGrid;
