import type { GridApi, GridOptions, GridReadyEvent } from 'ag-grid-community';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine-dark.css';
import { AgGridReact } from 'ag-grid-react';
import { useCallback, useEffect, useState } from 'react';
import CustomDateComponent from './CustomDateComponent';
import {
  FilterModel,
  getSidebar,
  prepareFilterModelDates,
  SortModel,
} from './static';

interface Message {
  key: string;
  content: string;
}

interface AgGridRequest {
  startRow: number;
  endRow: number;
  sortModel: SortModel[];
  filterModel: { [key: string]: FilterModel };
}

enum ResultStatus {
  OK = 'OK',
  Created = 'Created',
  Accepted = 'Accepted',
  NoContent = 'NoContent',
  BadRequest = 'BadRequest',
  Unauthorized = 'Unauthorized',
  Forbidden = 'Forbidden',
  NotFound = 'NotFound',
  MethodNotAllowed = 'MethodNotAllowed',
  InternalServerError = 'InternalServerError',
  NotImplemented = 'NotImplemented',
  ServiceUnavailable = 'ServiceUnavailable',
}

export interface Result<T> {
  status: ResultStatus;
  description: string;
  data: T | null;
  metadata: Message[];
  errors: Message[];
}

export interface IAgGridOptions extends GridOptions {
  apiMethod?: (
    params: AgGridRequest,
    id?: string,
  ) => Promise<Result<any>> | Promise<void>;
  gridRef?:
    | React.RefObject<AgGridReact>
    | React.MutableRefObject<AgGridReact | undefined>
    | any;
  height?: number | string;
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
  getRowId = useCallback(({ data }: any) => {
    return data.id;
  }, []),
  ...otherProps
}) => {
  const [gridApi, setGridApi] = useState<GridApi>();

  useEffect(() => {
    if (!gridApi || isClientSide()) return;
    populateTable();
  }, [gridApi]);

  const isClientSide = useCallback(() => {
    return rowModelType === 'clientSide';
  }, [rowModelType]);

  const getServerSideDatasource = () => {
    return {
      getRows: async function (params: any) {
        const { startRow, endRow, filterModel, sortModel }: AgGridRequest =
          params.request;

        const processedFilterModel = prepareFilterModelDates(filterModel);

        try {
          const response: any = await apiMethod?.({
            startRow,
            endRow,
            filterModel: processedFilterModel,
            sortModel,
          });
          const totalFilteredItems = response.metadata.find(
            (meta: { key: string; content: string }) =>
              meta.key === 'TotalFilteredItems',
          );
          const rowCount =
            Number(totalFilteredItems?.content) || response.data.length;

          params.success({
            rowData: response.data,
            rowCount: rowCount,
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

  const populateTable = () => {
    if (isClientSide()) return;
    const datasource = getServerSideDatasource();
    gridApi?.setServerSideDatasource(datasource);
  };

  return (
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
  );
};

export default AgGrid;
