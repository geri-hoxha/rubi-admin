import {
  ColDef,
  IDateFilterParams,
  ISetFilterParams,
  SetFilterValues,
  ValueFormatterParams,
} from 'ag-grid-community';
import moment, { Moment } from 'moment';
import { toDateStandardFormat, toPercentageFormat } from './helpers';

export interface FilterModel {
  filterType: string;
  type: string | null;
  filter: any | null;
  filterTo?: number | null;
  dateFrom?: string | null;
  dateTo?: string | null;
  values?: string[] | null;
  operator?: string | null;
  condition1?: FilterModel | null;
  condition2?: FilterModel | null;
}
export interface SortModel {
  colId: string;
  sort: string;
}

export const filtersParams = {
  buttons: ['reset'],
  debounceMs: 1000,
  suppressAndOrCondition: true,
};

const configs = {
  filterParams: filtersParams,
  menuTabs: ['filterMenuTab'],
};

export const filterText = {
  filter: 'agTextColumnFilter',
  ...configs,
};

export const filterNumber = {
  filter: 'agNumberColumnFilter',
  ...configs,
};

export const filterNumberPercentage = {
  filter: 'agNumberColumnFilter',
  filterParams: {
    ...filtersParams,
    numberParser: (percentage: string) => {
      if (!percentage) return;
      return Number(Number(percentage) / 100).toFixed(2);
    },
  },
  menuTabs: ['filterMenuTab'],
  valueFormatter: (params: ValueFormatterParams) => {
    return toPercentageFormat(params.value);
  },
};

export const filterDate = {
  filter: 'agDateColumnFilter',
  menuTabs: ['filterMenuTab'],
  filterParams: {
    filterOptions: ['inRange', 'equals'],
    defaultOption: 'equals',
    ...filtersParams,
    browserDatePicker: false,
  } as IDateFilterParams,
};

export const getFilterSet = (
  valueParams?: SetFilterValues,
  valueFormatter?: ISetFilterParams['valueFormatter'],
) => {
  return {
    filter: 'agSetColumnFilter',
    filterParams: {
      values: valueParams ?? [true, false],
      defaultToNothingSelected: true,
      suppressSorting: true,
      buttons: ['reset'],
      debounceMs: 1000,
      valueFormatter,
    } as ISetFilterParams,
  };
};
interface isSystemEntityDefinitions extends ColDef {
  field: 'isSystemEntity';
}
export const system: isSystemEntityDefinitions = {
  headerName: 'System Entity',
  field: 'isSystemEntity',
  ...getFilterSet(),
  cellRenderer: 'systemCellRender',
};

export const dateStandartFormmatter = {
  ...filterDate,
  minWidth: 150,
  valueFormatter: ({ value }: any) =>
    !!value ? toDateStandardFormat(value, true) : '',
};

export const createdOn = {
  headerName: 'Created On',
  field: 'createdOnUtc',
  ...dateStandartFormmatter,
};

export const isLocal = {
  headerName: 'Citizenship',
  field: 'isLocal',
  filterParams: {
    values: [true, false],
    ...filtersParams,
  },
  cellRenderer: 'flagCellRender',
};

export const cellLinkStyle = {
  cellStyle: { color: '#005CA9', cursor: 'pointer' },
};

export const cellEditorPopup: any = {
  flex: 1,
  cellEditorPopup: true,
  cellRenderer: 'coverageCellRenderer',
  cellEditor: 'coverageCellEditor',
  minWidth: 300,
  cellEditorPopupPosition: 'under',
};

export const getDateFilterPayload: (
  dateForm: Moment,
  dateTo: Moment,
) => FilterModel = (dateForm, dateTo) => {
  return {
    dateFrom: dateForm
      .clone()
      .set({ hour: 0, minute: 0, second: 0 })
      .endOf('second')
      .format('YYYY-MM-DD HH:mm:ss'),
    dateTo: dateTo
      .clone()
      .set({ hour: 23, minute: 59, second: 59 })
      .endOf('second')
      .format('YYYY-MM-DD HH:mm:ss'),
    filterType: 'date',
    type: 'inRange', // always inRange since other types does not work
  } as FilterModel;
};

export const prepareFilterModelDates = (
  filterModel: { [key: string]: FilterModel } | undefined,
) => {
  // We need to customize filter model to send the right payload when date filter is applied
  const processedFilterModel: any = {};

  for (const property in filterModel) {
    const filterItem: FilterModel = filterModel[property];

    // If 'equals' was selected, that means user need to filter only for 1 day
    if (filterItem.filterType === 'date') {
      // Format dates
      const dateForm: Moment = moment(filterItem.dateFrom);
      const dateTo: Moment = moment(filterItem.dateTo);

      if (filterItem.type === 'inRange') {
        processedFilterModel[property] = getDateFilterPayload(dateForm, dateTo);
        continue;
      }

      if (filterItem.type === 'equals') {
        processedFilterModel[property] = getDateFilterPayload(
          dateForm,
          dateForm,
        );
        continue;
      }
    }
    processedFilterModel[property] = filterItem;
  }

  return processedFilterModel;
};

export const getLocaleText = (t: (arg: string) => string) => {
  return {
    lessThan: t('Less than'),
    greaterThan: t('Greater than'),
    lessThanOrEqual: t('Less than or equal'),
    greaterThanOrEqual: t('Greater than or equal'),
    inRange: t('In range'),
    inRangeStart: t('from'),
    inRangeEnd: t('to'),
    equals: t('Equals'),
    notEqual: t('Not equal'),
    blank: t('Blank'),
    notBlank: t('Not blank'),
    empty: t('Choose One'),
    contains: t('Contains'),
    notContains: t('Not contains'),
    startsWith: t('Starts with'),
    endsWith: t('Ends with'),
    andCondition: t('AND'),
    orCondition: t('OR'),
    applyFilter: t('Apply'),
    resetFilter: t('Reset'),
    clearFilter: t('Clear'),
    cancelFilter: t('Cancel'),
    filters: t('Filters'),
    columns: t('Columns'),
  };
};

export const sidebarStyle = {
  minWidth: 250,
  maxWidth: 250,
  width: 250,
};

export const getSidebar = () => {
  return {
    toolPanels: [
      {
        id: 'columns',
        labelDefault: 'Columns',
        labelKey: 'columns',
        toolPanel: 'agColumnsToolPanel',
        ...sidebarStyle,
        toolPanelParams: {
          suppressRowGroups: true,
          suppressValues: true,
          suppressPivots: true,
          suppressPivotMode: true,
        },
        iconKey: 'columns',
      },
 
    ],
    defaultToolPanel: 'filters',
  };
};
