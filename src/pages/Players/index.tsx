import ActionsCellRenderer from '@/components/ActionsCellRenderer';
import AgGrid from '@/components/AgGrid';
import { PageContainer } from '@ant-design/pro-components';
import { IconDownload, IconPlus } from '@tabler/icons-react';
import { Button, DatePicker } from 'antd';
import { Form } from '../Home';
import { data } from './data';
import { columns } from './statics';

const { RangePicker } = DatePicker;

const Players = () => {
  const addNew = () => {};
  return (
    <PageContainer
      title={'Players'}
      extra={
        <>
          <Button
            style={{ background: '#306317' }}
            type="primary"
            onClick={addNew}
          >
            <IconDownload size={20} />
            Download Excel
          </Button>
          <Button type="primary" onClick={addNew}>
            <IconPlus size={20} />
            Add player
          </Button>
        </>
      }
    >
      <div
        style={{
          display: 'flex',
          alignContent: 'center',
          margin: '14px 0 28px 0',
          gap: 16,
          background: 'rgba(108, 122, 137, 0.1)',
          padding: '20px 30px',
          borderRadius: 6,
          justifyContent: 'space-between',
        }}
      >
        <Form />
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <Button danger>Cancel</Button>
          <Button type="primary">Search</Button>
        </div>
      </div>
      <AgGrid
        height={window.innerHeight - 400}
        columns={columns}
        rowData={data}
        rowHeight={50}
        headerHeight={50}
        components={{
          actionsCellRenderer: ActionsCellRenderer,
        }}
        rowModelType="clientSide"
        columnHoverHighlight
      />
    </PageContainer>
  );
};

export default Players;
