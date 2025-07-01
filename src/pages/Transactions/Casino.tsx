import AgGrid from '@/components/AgGrid';
import { PageContainer } from '@ant-design/pro-components';
import { Form, Input, Tag } from 'antd';
import { useMemo } from 'react';

const CasinoTransactions = () => {
  // Example data for casino transactions
  const rowData = [
    { transactionId: 'TXN100001', user: 'alice_m', game: 'Roulette', betAmount: 50, winAmount: 0, status: 'Cancel', date: '2025-06-29 10:21' },
    { transactionId: 'TXN100002', user: 'johnny_rocks', game: 'Poker', betAmount: 200, winAmount: 450, status: 'Success', date: '2025-06-29 11:05' },
    { transactionId: 'TXN100003', user: 'samantha88', game: 'Slots', betAmount: 75, winAmount: 300, status: 'Success', date: '2025-06-29 11:55' },
    { transactionId: 'TXN100004', user: 'michael22', game: 'Blackjack', betAmount: 100, winAmount: 0, status: 'Cancel', date: '2025-06-29 13:32' },
    { transactionId: 'TXN100005', user: 'linda_k', game: 'Baccarat', betAmount: 150, winAmount: 0, status: 'Cancel', date: '2025-06-29 15:03' },
    { transactionId: 'TXN100006', user: 'poker_king', game: 'Poker', betAmount: 300, winAmount: 800, status: 'Success', date: '2025-06-29 16:45' },
    { transactionId: 'TXN100007', user: 'vegasgirl', game: 'Roulette', betAmount: 50, winAmount: 100, status: 'Success', date: '2025-06-29 18:10' },
    { transactionId: 'TXN100008', user: 'rick_g', game: 'Slots', betAmount: 20, winAmount: 0, status: 'Cancel', date: '2025-06-29 18:42' },
    { transactionId: 'TXN100009', user: 'zoe2025', game: 'Blackjack', betAmount: 250, winAmount: 500, status: 'Success', date: '2025-06-29 19:15' },
    { transactionId: 'TXN100010', user: 'agent007', game: 'Baccarat', betAmount: 100, winAmount: 0, status: 'Cancel', date: '2025-06-30 09:05' },
    { transactionId: 'TXN100011', user: 'daniel_j', game: 'Poker', betAmount: 500, winAmount: 0, status: 'Cancel', date: '2025-06-30 10:15' },
    { transactionId: 'TXN100012', user: 'mia_21', game: 'Slots', betAmount: 60, winAmount: 240, status: 'Success', date: '2025-06-30 11:00' },
    { transactionId: 'TXN100013', user: 'kevin92', game: 'Roulette', betAmount: 40, winAmount: 0, status: 'Cancel', date: '2025-06-30 12:25' },
    { transactionId: 'TXN100014', user: 'lucas_v', game: 'Blackjack', betAmount: 100, winAmount: 0, status: 'Pending', date: '2025-06-30 13:10' },
    { transactionId: 'TXN100015', user: 'emma_c', game: 'Baccarat', betAmount: 80, winAmount: 160, status: 'Success', date: '2025-06-30 14:45' },
    { transactionId: 'TXN100016', user: 'oliver89', game: 'Poker', betAmount: 300, winAmount: 0, status: 'Cancel', date: '2025-06-30 16:30' },
    { transactionId: 'TXN100017', user: 'grace_lee', game: 'Slots', betAmount: 30, winAmount: 0, status: 'Cancel', date: '2025-06-30 17:20' },
    { transactionId: 'TXN100018', user: 'nate_dog', game: 'Blackjack', betAmount: 200, winAmount: 400, status: 'Success', date: '2025-06-30 18:50' },
    { transactionId: 'TXN100019', user: 'julie_k', game: 'Roulette', betAmount: 60, winAmount: 0, status: 'Pending', date: '2025-06-30 19:33' },
    { transactionId: 'TXN100020', user: 'tyrone_x', game: 'Baccarat', betAmount: 120, winAmount: 0, status: 'Cancel', date: '2025-06-30 20:15' },
    { transactionId: 'TXN100021', user: 'anna_f', game: 'Slots', betAmount: 90, winAmount: 180, status: 'Success', date: '2025-07-01 09:00' },
  ];


  // Column definitions for AG Grid
  const columnDefs = useMemo(
    () => [
      {
        field: 'transactionId',
        headerName: 'Transaction ID',
        flex: 1,
        sortable: true,
      },
      {
        field: 'user',
        headerName: 'User',
        flex: 1,
        sortable: true,
        filter: true,
      },
      {
        field: 'game',
        headerName: 'Game',
        flex: 1,
        sortable: true,
        filter: true,
      },
      {
        field: 'betAmount',
        headerName: 'Bet Amount ($)',
        flex: 1,
        sortable: true,
        valueFormatter: (params) => `${params.value.toFixed(2) + ' USD'}`,
      },
      {
        field: 'winAmount',
        headerName: 'Success Amount ($)',
        flex: 1,
        sortable: true,
        valueFormatter: (params) => `${params.value.toFixed(2) + ' USD'}`,
      },
      {
        field: 'status',
        headerName: 'Status',
        flex: 1,
        cellRendererFramework: (params) => {
          let color;
          switch (params.value) {
            case 'Success':
              color = 'green';
              break;
            case 'Cancel':
              color = 'red';
              break;
            case 'Pending':
              color = 'gold';
              break;
            default:
              color = 'default';
          }
          return <Tag color={color}>{params.value}</Tag>;
        },
        sortable: true,
        filter: true,
      },
      { field: 'date', headerName: 'Date & Time', flex: 1.5, sortable: true },
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
        defaultColDef={{ resizable: true }}
        pagination={true}
        paginationPageSize={10}
        rowModelType="clientSide"
                getRowId={(params) => params.data.transactionId}

       />
    </PageContainer>
  );
};

export default CasinoTransactions;
