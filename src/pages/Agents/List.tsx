import { Button, Flex, Form, Input, Tag } from 'antd';
import { useMemo, useState } from 'react';

import AgGrid from '@/components/AgGrid';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-components';
import { IconDownload, IconPlus } from '@tabler/icons-react';
import { ICellRendererParams } from 'ag-grid-community';

const statusColors = {
  Active: 'green',
  Inactive: 'red',
  Suspended: 'orange',
};

const agents = [
  {
    id: 1,
    name: 'John Doe',
    region: 'North',
    status: 'Active',
    level: 'Senior',
    commissionRate: 0.12,
    subAgents: [
      {
        id: 11,
        name: 'Emily Chen',
        status: 'Active',
        level: 'Associate',
        commissionRate: 0.06,
        subAgents: [
          {
            id: 111,
            name: 'Alice Wang',
            status: 'Active',
            level: 'Junior',
            commissionRate: 0.03,
          },
          {
            id: 112,
            name: 'Bob Smith',
            status: 'Inactive',
            level: 'Junior',
            commissionRate: 0.02,
          },
        ],
      },
      {
        id: 12,
        name: 'Michael Roberts',
        status: 'On Leave',
        level: 'Junior',
        commissionRate: 0.04,
        subAgents: [
          {
            id: 121,
            name: 'Charlie Davis',
            status: 'Active',
            level: 'Junior',
            commissionRate: 0.01,
          },
        ],
      },
      {
        id: 13,
        name: 'Sophia Patel',
        status: 'Active',
        level: 'Junior',
        commissionRate: 0.05,
        subAgents: [], // no sub-sub-agents
      },
    ],
  },
  {
    id: 2,
    name: 'Jane Smith',
    region: 'South',
    status: 'Active',
    level: 'Senior',
    commissionRate: 0.13,
    subAgents: [
      {
        id: 21,
        name: 'David Lee',
        status: 'Active',
        level: 'Associate',
        commissionRate: 0.07,
        subAgents: [
          {
            id: 211,
            name: 'Eva Green',
            status: 'Inactive',
            level: 'Junior',
            commissionRate: 0.02,
          },
          {
            id: 212,
            name: 'Frank Moore',
            status: 'Active',
            level: 'Junior',
            commissionRate: 0.03,
          },
        ],
      },
      {
        id: 22,
        name: 'Olivia Brown',
        status: 'Inactive',
        level: 'Junior',
        commissionRate: 0.04,
        subAgents: [],
      },
    ],
  },
  {
    id: 3,
    name: 'Robert Johnson',
    region: 'East',
    status: 'Suspended',
    level: 'Senior',
    commissionRate: 0.1,
    subAgents: [
      {
        id: 31,
        name: 'Mia Clark',
        status: 'Active',
        level: 'Associate',
        commissionRate: 0.06,
        subAgents: [
          {
            id: 311,
            name: 'Nina Taylor',
            status: 'Active',
            level: 'Junior',
            commissionRate: 0.02,
          },
        ],
      },
    ],
  },
];

const AgentGrid = () => {
  const [rowData] = useState(agents);

  // Column definitions for main grid
  const columnDefs = useMemo(
    () => [
      {
        field: 'name',
        headerName: 'Agent Name',
        flex: 1,
        cellRenderer: 'agGroupCellRenderer',
      },
      { field: 'level', headerName: 'Level', width: 120 },
      {
        field: 'status',
        headerName: 'Status',
        width: 120,
        cellRendererFramework: (params) => (
          <Tag color={statusColors[params.value] || 'default'}>
            {params.value}
          </Tag>
        ),
      },
      {
        field: 'commissionRate',
        headerName: 'Commission Rate',
        width: 150,
        valueFormatter: (params) => `${(params.value * 100).toFixed(1)}%`,
      },
      {
        headerName: 'Actions',
        field: 'actions',
        minWidth: 200,
        cellRenderer: (params: ICellRendererParams) => {
          return (
            <Flex gap={10} justify="center" style={{ marginTop: 8 }}>
              <Button color="primary" variant="filled">
                <EditOutlined /> Edit
              </Button>

              <Button color="danger" variant="filled">
                <DeleteOutlined /> Delete
              </Button>
            </Flex>
          );
        },
      },
    ],
    [],
  );

  const detailCellRendererParams = useMemo(
    () => ({
      detailGridOptions: {
        columnDefs: [
          {
            field: 'name',
            headerName: 'Sub-Agent Name',
            flex: 1,
            cellRenderer: 'agGroupCellRenderer',
            minWidth: 200,
          },
          { field: 'level', headerName: 'Level', width: 120 },
          {
            field: 'status',
            headerName: 'Status',
            width: 120,
            cellRendererFramework: (params) => (
              <Tag color={statusColors[params.value] || 'default'}>
                {params.value}
              </Tag>
            ),
          },
          {
            field: 'commissionRate',
            headerName: 'Commission Rate',
            width: 150,
            valueFormatter: (params) => `${(params.value * 100).toFixed(1)}%`,
          },

          {
            headerName: 'Actions',
            field: 'actions',
            minWidth: 200,
            cellRenderer: (params: ICellRendererParams) => {
              return (
                <Flex gap={10} justify="center" style={{ marginTop: 8 }}>
                  <Button color="primary" variant="filled">
                    <EditOutlined /> Edit
                  </Button>

                  <Button color="danger" variant="filled">
                    <DeleteOutlined /> Delete
                  </Button>
                </Flex>
              );
            },
          },
        ],
        defaultColDef: {
          flex: 1,
          resizable: true,
          sortable: true,
          minWidth: 100,
        },
        masterDetail: true, // Enable nested master-detail in detail grid
        detailCellRendererParams: {
          detailGridOptions: {
            // Same columns for sub-sub-agents (can reuse or customize)
            columnDefs: [
              { field: 'name', headerName: 'Sub-Sub-Agent Name', flex: 1 },
              { field: 'level', headerName: 'Level', width: 120 },
              {
                field: 'status',
                headerName: 'Status',
                width: 120,
                cellRendererFramework: (params) => (
                  <Tag color={statusColors[params.value] || 'default'}>
                    {params.value}
                  </Tag>
                ),
              },
              {
                field: 'commissionRate',
                headerName: 'Commission Rate',
                width: 150,
                valueFormatter: (params) =>
                  `${(params.value * 100).toFixed(1)}%`,
              },
              {
                headerName: 'Actions',
                field: 'actions',
                cellRenderer: (params: ICellRendererParams) => {
                  return (
                    <Flex gap={10} justify="center" style={{ marginTop: 8 }}>
                      <Button color="primary" variant="filled">
                        <EditOutlined /> Edit
                      </Button>

                      <Button color="danger" variant="filled">
                        <DeleteOutlined /> Delete
                      </Button>
                    </Flex>
                  );
                },
              },
            ],
            defaultColDef: { flex: 1, resizable: true, sortable: true, minWidth: 150 },
            // For sub-sub-agents, no further nesting, so no masterDetail here (or can add)
            masterDetail: false,
          },
          getDetailRowData: (params) => {
            params.successCallback(params.data.subAgents || []);
          },
        },
        getRowId: (params) => params.data.id,
      },
      getDetailRowData: (params) => {
        params.successCallback(params.data.subAgents || []);
      },
      getRowId: (params) => params.data.id,
    }),
    [],
  );

  const defaultColDef = useMemo(
    () => ({
      flex: 1,
      sortable: true,
      filter: true,
      resizable: true,
      minWidth: 150,
    }),
    [],
  );

  return (
    <PageContainer
      title={'Users'}
      extra={
        <>
          <Button color="green" variant="filled">
            <IconDownload size={20} />
            Download Excel
          </Button>
          <Button variant="outlined" color="primary">
            <IconPlus size={20} />
            Add User
          </Button>
        </>
      }
    >
      <AgGrid
        filterFields={
          <>
            <Form.Item label="User Type" name="userType">
              <Input size="large" placeholder="User Type" />
            </Form.Item>
            <Form.Item label="Display Name" name="displayName">
              <Input size="large" placeholder="Display Name" />
            </Form.Item>
            <Form.Item label="Username" name="username">
              <Input size="large" placeholder="Username" />
            </Form.Item>
          </>
        }
        rowData={rowData}
        rowModelType="clientSide"
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
        animateRows={true}
        masterDetail={true}
        detailCellRendererParams={detailCellRendererParams}
        getRowId={(params) => params.data.id}
        height={window.innerHeight - 400}
        detailRowAutoHeight
      />
    </PageContainer>
  );
};

export default AgentGrid;
