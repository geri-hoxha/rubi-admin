import AgGrid from '@/components/AgGrid';
import { PageContainer } from '@ant-design/pro-components';
import { Form, Input } from 'antd';
import { useMemo } from 'react';

const currencyFormatter = (params) => {
  if (params.value == null) return '';
  return '$' + params.value.toLocaleString();
};

const Users = () => {
  // Example data for casino transactions
  const rowData = [
    {
      userId: 5001,
      username: 'playerX1',
      agentId: 1001,
      totalBets: 12000,
      totalWins: 8000,
      totalDeposits: 2500,
      totalWithdrawals: 500,
      currentBalance: 2000,
      status: 'Active',
    },
    {
      userId: 5002,
      username: 'luckyAce22',
      agentId: 1001,
      totalBets: 8000,
      totalWins: 9000,
      totalDeposits: 2000,
      totalWithdrawals: 1500,
      currentBalance: 3000,
      status: 'Active',
    },
    {
      userId: 5003,
      username: 'spinMaster',
      agentId: 1002,
      totalBets: 6000,
      totalWins: 4000,
      totalDeposits: 3000,
      totalWithdrawals: 1000,
      currentBalance: 2000,
      status: 'Active',
    },
    {
      userId: 5004,
      username: 'blackjackKing',
      agentId: 1003,
      totalBets: 15000,
      totalWins: 12000,
      totalDeposits: 5000,
      totalWithdrawals: 2000,
      currentBalance: 3000,
      status: 'Active',
    },
    {
      userId: 5005,
      username: 'rouletteQueen',
      agentId: 1003,
      totalBets: 3000,
      totalWins: 3500,
      totalDeposits: 1000,
      totalWithdrawals: 500,
      currentBalance: 1000,
      status: 'Active',
    },
    {
      userId: 5006,
      username: 'slotsGuru',
      agentId: 1004,
      totalBets: 25000,
      totalWins: 18000,
      totalDeposits: 10000,
      totalWithdrawals: 4000,
      currentBalance: 6000,
      status: 'Active',
    },
    {
      userId: 5007,
      username: 'bigWinner77',
      agentId: 1004,
      totalBets: 9000,
      totalWins: 10000,
      totalDeposits: 3500,
      totalWithdrawals: 3000,
      currentBalance: 1500,
      status: 'Active',
    },
    {
      userId: 5008,
      username: 'casin0Fan',
      agentId: 1005,
      totalBets: 5000,
      totalWins: 5000,
      totalDeposits: 2000,
      totalWithdrawals: 1000,
      currentBalance: 1000,
      status: 'Active',
    },
    {
      userId: 5009,
      username: 'l33tplayer',
      agentId: 1006,
      totalBets: 22000,
      totalWins: 21000,
      totalDeposits: 8000,
      totalWithdrawals: 5000,
      currentBalance: 3000,
      status: 'Active',
    },
    {
      userId: 5010,
      username: 'cardshark',
      agentId: 1007,
      totalBets: 18000,
      totalWins: 19000,
      totalDeposits: 6000,
      totalWithdrawals: 2000,
      currentBalance: 4000,
      status: 'Active',
    },
    {
      userId: 5011,
      username: 'bettingBeast',
      agentId: 1008,
      totalBets: 14000,
      totalWins: 11000,
      totalDeposits: 4500,
      totalWithdrawals: 1000,
      currentBalance: 3500,
      status: 'Active',
    },
  ];

  // Column definitions for AG Grid
  const columnDefs = useMemo(
    () => [
      { headerName: 'User ID', field: 'userId', sortable: true, filter: true },
      {
        headerName: 'Username',
        field: 'username',
        sortable: true,
        filter: true,
      },
      {
        headerName: 'Agent ID',
        field: 'agentId',
        sortable: true,
        filter: true,
      },
      {
        headerName: 'Total Bets',
        field: 'totalBets',
        sortable: true,
        filter: 'agNumberColumnFilter',
        valueFormatter: currencyFormatter,
      },
      {
        headerName: 'Total Wins',
        field: 'totalWins',
        sortable: true,
        filter: 'agNumberColumnFilter',
        valueFormatter: currencyFormatter,
      },
      {
        headerName: 'Total Deposits',
        field: 'totalDeposits',
        sortable: true,
        filter: 'agNumberColumnFilter',
        valueFormatter: currencyFormatter,
      },
      {
        headerName: 'Total Withdrawals',
        field: 'totalWithdrawals',
        sortable: true,
        filter: 'agNumberColumnFilter',
        valueFormatter: currencyFormatter,
      },
      {
        headerName: 'Current Balance',
        field: 'currentBalance',
        sortable: true,
        filter: 'agNumberColumnFilter',
        valueFormatter: currencyFormatter,
      },
      { headerName: 'Status', field: 'status', sortable: true, filter: true },
    ],
    [],
  );

  return (
    <PageContainer>
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
        height={window.innerHeight - 400}
        rowData={rowData}
        columnDefs={columnDefs}
        defaultColDef={{ resizable: true, flex: 1 }}
        pagination={true}
        paginationPageSize={10}
        rowModelType="clientSide"
        getRowId={(params) => params.data.userId}
      />
    </PageContainer>
  );
};

export default Users;
