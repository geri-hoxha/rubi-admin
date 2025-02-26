import { history } from '@umijs/max';
import type {
  ColDef,
  ColGroupDef,
  FilterChangedEvent,
  GridApi,
  GridOptions,
  GridReadyEvent,
} from 'ag-grid-community';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine-dark.css';
import { AgGridReact } from 'ag-grid-react';
import { useCallback, useEffect, useState } from 'react';
import CustomDateComponent from './CustomDateComponent';
import { getQueryUrl } from './helpers';
import { FilterModel, getSidebar, prepareFilterModelDates, SortModel } from './static';

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
  columns: (ColGroupDef | ColDef)[] | null | undefined;
  apiMethod?: (
    params: AgGridRequest,
    id?: string,
  ) => Promise<Result<any>> | Promise<void>;
  gridRef?:
    | React.RefObject<AgGridReact>
    | React.MutableRefObject<AgGridReact | undefined>
    | any;
  refresh?: number;
  height?: number | string;
  disableFiltersUrl?: boolean;
}
 

const AgGrid: React.FC<IAgGridOptions> = ({
  columns,
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
  refresh,
  pagination = false,
  paginationPageSize = 100,
  rowModelType = 'serverSide',
  serverSideStoreType = 'partial',
  rowSelection = 'single',
  domLayout = 'normal',
  components,
  onGridReady,
  disableFiltersUrl = false,
  animateRows = true,
  height,
  withFilters = false,
  getRowId = useCallback(({ data }) => {
    return data.id;
  }, []),
  ...otherProps
}) => {
  const [gridApi, setGridApi] = useState<GridApi>();

  useEffect(() => {
    if (!gridApi || isClientSide()) return;
    populateTable();
    populateFilters(gridApi);
  }, [gridApi]);

  useEffect(() => {
    if (refresh) populateTable();
  }, [refresh]);

  const populateFilters = useCallback(
    (gridApi: GridApi) => {
      const { search } = history.location;
      const id = getQueryUrl();
      // Return for this case
      // - no search string
      // - if clientside
      // - if id is the first query parameter on url, a modal was open first
      // - id is at the end
      if (
        !search ||
        isClientSide() ||
        search.includes('?id=') ||
        (id && search.endsWith(id))
      )
        return;
      const filtersUrl: string = search.replace(`&id=${id}`, '');
      const filtersObject: string = JSON.parse(decodeURI(filtersUrl).slice(1));
      gridApi.setFilterModel(filtersObject);
      const filterPanel: any = gridApi?.getToolPanelInstance('filters');
      filterPanel.expandFilters(Object.keys(filtersObject));
    },
    [history.location.search],
  );

  const onFilterChanged = ({ api }: FilterChangedEvent) => {
    if (isClientSide() || disableFiltersUrl) return;
    const filters: string = JSON.stringify(api.getFilterModel());
    const noFilters = filters === '{}';
    const id: string = getQueryUrl();
    history.push(
      `${history.location.pathname}${noFilters ? '' : `?${filters}`}${
        id ? (noFilters ? `?id=${id}` : `&id=${id}`) : ''
      }`,
    );
  };

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
        columnDefs={columns}
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
        onFilterChanged={onFilterChanged}
        groupHeaderHeight={37}
        headerHeight={37}
        suppressRowClickSelection
        rowSelection={rowSelection}
        domLayout={height ? 'normal' : domLayout}
        animateRows={animateRows}
        tooltipShowDelay={0}
        tooltipHideDelay={20000}
        {...otherProps}
        sideBar={getSidebar()}
      />
    </div>
  );
};

export default AgGrid;
