import { PageContainer } from '@ant-design/pro-components';
import { Button, DatePicker } from 'antd';
import { CurrencyDropdown, UserDropdown } from '../Home';
import AgGrid from '@/components/AgGrid';


const { RangePicker } = DatePicker;

const Players = () => {
  return (
    <PageContainer title={'Players'}>
      <div
        style={{
          display: 'flex',
          alignContent: 'center',
          margin: '14px 0 28px 0',
          gap: 16,
          background: '#181D1F',
          padding: '20px 30px',
          borderRadius: 12,
          justifyContent: 'space-between',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 16,
            flexWrap: 'wrap',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <label style={{ marginLeft: 3 }}>Select range:</label>
            <RangePicker  />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <label style={{ marginLeft: 3 }}>Select range:</label>
            <UserDropdown />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <label style={{ marginLeft: 3 }}>Select range:</label>
            <CurrencyDropdown />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <label style={{ marginLeft: 3 }}>Select range:</label>
            <UserDropdown />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <label style={{ marginLeft: 3 }}>Select range:</label>
            <RangePicker />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <label style={{ marginLeft: 3 }}>Select range:</label>
            <UserDropdown />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <label style={{ marginLeft: 3 }}>Select range:</label>
            <CurrencyDropdown />
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <Button danger>Cancel</Button>
          <Button type="primary">Search</Button>
        </div>
      </div>
      <AgGrid />
    </PageContainer>
  );
};

export default Players;
