import AgGrid from '@/components/AgGrid';
import { PageContainer } from '@ant-design/pro-components';
import { Form, Input } from 'antd';
import { useMemo } from 'react';

const currencyFormatter = (params) => {
  if (params.value == null) return '';
  return '$' + params.value.toLocaleString();
};

const Agents = () => {
  // Example data for casino transactions
  const rowData = [
  { agentId: 1001, agentName: "John Smith", totalDeposits: 52000, totalWithdrawals: 10000, commissionEarned: 7000, netBalance: 49000, lastActivity: "2025-06-30" },
  { agentId: 1002, agentName: "Alice Johnson", totalDeposits: 43000, totalWithdrawals: 8000, commissionEarned: 5500, netBalance: 40500, lastActivity: "2025-06-29" },
  { agentId: 1003, agentName: "Carlos Martinez", totalDeposits: 31000, totalWithdrawals: 6000, commissionEarned: 4800, netBalance: 29800, lastActivity: "2025-06-30" },
  { agentId: 1004, agentName: "Nina Patel", totalDeposits: 68000, totalWithdrawals: 12000, commissionEarned: 9000, netBalance: 65000, lastActivity: "2025-06-28" },
  { agentId: 1005, agentName: "Tom Lee", totalDeposits: 27000, totalWithdrawals: 3000, commissionEarned: 3300, netBalance: 27300, lastActivity: "2025-06-30" },
  { agentId: 1006, agentName: "Emma Davis", totalDeposits: 75000, totalWithdrawals: 18000, commissionEarned: 11000, netBalance: 68000, lastActivity: "2025-06-30" },
  { agentId: 1007, agentName: "Liam Wilson", totalDeposits: 39000, totalWithdrawals: 7000, commissionEarned: 6200, netBalance: 38200, lastActivity: "2025-06-27" },
  { agentId: 1008, agentName: "Sophia Brown", totalDeposits: 47000, totalWithdrawals: 11000, commissionEarned: 7200, netBalance: 43200, lastActivity: "2025-06-29" },
  { agentId: 1009, agentName: "Jake White", totalDeposits: 50000, totalWithdrawals: 10000, commissionEarned: 8000, netBalance: 48000, lastActivity: "2025-06-30" },
  { agentId: 1010, agentName: "Isla Green", totalDeposits: 66000, totalWithdrawals: 15000, commissionEarned: 8500, netBalance: 59500, lastActivity: "2025-06-30" },
  { agentId: 1011, agentName: "Ethan Moore", totalDeposits: 22000, totalWithdrawals: 4000, commissionEarned: 2500, netBalance: 20500, lastActivity: "2025-06-25" },
  { agentId: 1012, agentName: "Mia Adams", totalDeposits: 53000, totalWithdrawals: 13000, commissionEarned: 6900, netBalance: 46900, lastActivity: "2025-06-30" },
  { agentId: 1013, agentName: "Noah Scott", totalDeposits: 46000, totalWithdrawals: 9000, commissionEarned: 6100, netBalance: 43100, lastActivity: "2025-06-26" },
  { agentId: 1014, agentName: "Olivia Hill", totalDeposits: 32000, totalWithdrawals: 4000, commissionEarned: 3500, netBalance: 31500, lastActivity: "2025-06-30" },
  { agentId: 1015, agentName: "Ava Baker", totalDeposits: 60000, totalWithdrawals: 14000, commissionEarned: 7200, netBalance: 53200, lastActivity: "2025-06-29" },
  { agentId: 1016, agentName: "James Rivera", totalDeposits: 37000, totalWithdrawals: 6000, commissionEarned: 5000, netBalance: 36000, lastActivity: "2025-06-30" },
  { agentId: 1017, agentName: "Grace Murphy", totalDeposits: 44000, totalWithdrawals: 7000, commissionEarned: 6000, netBalance: 43000, lastActivity: "2025-06-28" },
  { agentId: 1018, agentName: "Lucas Cooper", totalDeposits: 51000, totalWithdrawals: 9000, commissionEarned: 7500, netBalance: 49500, lastActivity: "2025-06-30" },
  { agentId: 1019, agentName: "Ella Reed", totalDeposits: 29000, totalWithdrawals: 5000, commissionEarned: 3900, netBalance: 27900, lastActivity: "2025-06-27" },
  { agentId: 1020, agentName: "Benjamin Cox", totalDeposits: 48000, totalWithdrawals: 8000, commissionEarned: 6700, netBalance: 46700, lastActivity: "2025-06-30" }
];

  // Column definitions for AG Grid
  const columnDefs = useMemo(
    () => [
  { headerName: "Agent ID", field: "agentId", sortable: true, filter: true },
  { headerName: "Agent Name", field: "agentName", sortable: true, filter: true },
  { headerName: "Total Deposits", field: "totalDeposits", sortable: true, filter: "agNumberColumnFilter", valueFormatter: currencyFormatter },
  { headerName: "Total Withdrawals", field: "totalWithdrawals", sortable: true, filter: "agNumberColumnFilter", valueFormatter: currencyFormatter },
  { headerName: "Commission Earned", field: "commissionEarned", sortable: true, filter: "agNumberColumnFilter", valueFormatter: currencyFormatter },
  { headerName: "Net Balance", field: "netBalance", sortable: true, filter: "agNumberColumnFilter", valueFormatter: currencyFormatter },
  { headerName: "Last Activity", field: "lastActivity", sortable: true, filter: "agDateColumnFilter" }
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
        pagination={true}
        paginationPageSize={10}
        rowModelType="clientSide"
        getRowId={(params) => params.data.agentId}
      />
    </PageContainer>
  );
};

export default Agents;
