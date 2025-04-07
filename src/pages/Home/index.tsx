import { Area, Column } from '@ant-design/plots';
import { PageContainer } from '@ant-design/pro-components';
import {
  IconCaretDownFilled,
  IconCaretUpFilled,
  IconInfoCircle,
} from '@tabler/icons-react';
import 'ag-charts-enterprise';
import { AgCharts } from 'ag-charts-react';
import { Button, Col, DatePicker, Form, Input, Row, Select, Tabs, Typography } from 'antd';
import React, { useState } from 'react';
import { mapdata } from './data';
import styles from './styles.less';
import { topology } from './topology';
import Card from '@/components/Card';

const { RangePicker } = DatePicker;
const { Title } = Typography;

export const FormFilter = () => {
  return (
    <Form
    name="filter"
    style={{
  
    
      background: '#1A1E26',
      display: 'flex',
      alignContent: 'center',
      margin: '14px 0 28px 0',
      gap: 36,
      border: '1px solid #58565280',
      padding: '20px 20px 10px 20px',
      borderRadius: 6,
    }}
    layout="vertical"
    initialValues={{ remember: true }}
     autoComplete="off"
  >
    <Form.Item label="User Type" name="userType">
      <RangePicker size="large"  />
    </Form.Item>
    <Form.Item label="Display Name" name="displayName">
      <Input size="large" placeholder="Display Name" />
    </Form.Item>
    <Form.Item label="Username" name="username">
      <Input size="large" placeholder="Username" />
    </Form.Item>

    <div
      style={{
 
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 20,
      }}
    >
      <Button size='large' danger>Cancel</Button>
      <Button size='large' type="primary" htmlType="submit">
        Submit
      </Button>
    </div>
  </Form>
  )
}

const App: React.FC = () => {
  return (
    <PageContainer
      header={{
        title: 'Dashboard', 
      }}
    >
      <FormFilter />

      <Tabs
        defaultActiveKey="1"
        items={[
          {
            label: `General`,
            key: '1',
            children: (
              <Row gutter={[12, 12]}>
                <Col span={4}>
                <SingleCard />
                 </Col>
                <Col span={4}>
                  <SingleCard down />
                </Col>
                <Col span={4}>
                  <SingleCard />
                </Col>
                <Col span={4}>
                  <SingleCard />
                </Col>
                <Col span={4}>
                  <SingleCard down />
                </Col>
                <Col span={4}>
                  <SingleCard down />
                </Col>
                <Col span={4}>
                  <SingleCard />
                </Col>
                <Col span={4}>
                  <SingleCard />
                </Col>
                <Col span={4}>
                  <SingleCard down />
                </Col>
              </Row>
            ),
          },
        ]}
      />

      <Row gutter={[12, 12]} style={{ margin: '30px 0' }}>
        <Col span={12}>
          <TabsMenu />
        </Col>
        <Col span={12}>
          <TabsMenu2 />
        </Col>

        <Col span={24}>
          <Row gutter={[12, 12]} style={{ marginTop: 10 }}>
            <Col span={6}>
              <DoubleCard />
            </Col>
            <Col span={6}>
              <DoubleCard down />
            </Col>
            <Col span={6}>
              <DoubleCard />
            </Col>
            <Col span={6}>
              <DoubleCard />
            </Col>
            <Col span={6}>
              <DoubleCard down />
            </Col>
            <Col span={6}>
              <DoubleCard down />
            </Col>
            <Col span={6}>
              <DoubleCard down />
            </Col>
            <Col span={6}>
              <DoubleCard down />
            </Col>
          </Row>
        </Col>

        <Col span={24}>
          <Tabs
            defaultActiveKey="1"
            items={[
              {
                label: `GGR and Deposit`,
                key: '1',
                children: (
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <div style={{ width: '100%' }}>
                      <Title level={5} style={{ textAlign: 'center' }}>
                        GGR and Turnover
                      </Title>
                      <LineChartParent />
                    </div>
                    <div style={{ width: '100%' }}>
                      <Title level={5} style={{ textAlign: 'center' }}>
                        Deposit
                      </Title>
                      <LineChartParent2 />
                    </div>
                  </div>
                ),
              },
              {
                label: `Country`,
                key: '2',
                children: (
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <div style={{ width: '70%' }}>
                      <Title level={5} style={{ textAlign: 'center' }}>
                        Registration By Country
                      </Title>
                      <WorldMapChart />
                    </div>
                    <div style={{ width: '30%' }}>
                      <Title level={5} style={{ textAlign: 'center' }}>
                        Top Registration Countries
                      </Title>
                      <DemoColumn />
                    </div>
                  </div>
                ),
              },
              {
                label: `Bonus`,
                key: '3',
                children: <></>,
              },
            ]}
          />
        </Col>
      </Row>
    </PageContainer>
  );
};

export default App;

const SingleCard = ({ down = false }) => {
  return (
    <div style={{ position: 'relative', cursor: 'pointer' }}>
      <div
        className={`${styles.border} card_bg`}
        style={{
          width: '100%',
           borderRadius: 6,
          padding: '10px 14px',
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <span style={{ fontSize: 12, fontWeight: 400 }}>
              Total Placing Bets (Turnovers)
            </span>
            <IconInfoCircle size={20} style={{ color: 'gray' }} />
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              marginTop: 6,
              gap: 6,
            }}
          >
            <span
              style={{
                fontWeight: 500,
                display: 'block',
                fontSize: 20,
              }}
            >
              230.00 €
            </span>
            {down ? (
              <IconCaretDownFilled style={{ color: '#a61d24' }} />
            ) : (
              <IconCaretUpFilled style={{ color: '#3c8618' }} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const DoubleCard = ({ down = false }) => {
  return (
    <div style={{ position: 'relative', cursor: 'pointer' }}>
      <div
        className={`${styles.border} card_bg`}
        style={{
          width: '100%',
 
          borderRadius: 6,
          padding: '10px 14px',
        }}
      >
        <div>
          <span style={{ fontSize: 16, fontWeight: 500 }}>
            Providers Profit
          </span>

          <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                marginTop: 16,
                gap: 6,
              }}
            >
              <span
                style={{
                  fontWeight: 600,
                  display: 'block',
                  fontSize: 19,
                }}
              >
                23,043.00 €
              </span>
              <IconCaretUpFilled style={{ color: '#3c8618' }} />
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                marginTop: 16,
                gap: 6,
              }}
            >
              <span
                style={{
                  fontWeight: 600,
                  display: 'block',
                  fontSize: 19,
                }}
              >
                2,230.00 €
              </span>
              <IconCaretDownFilled style={{ color: '#a61d24' }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const UserDropdown: React.FC = ({}) => (
  <Select
    showSearch
    style={{ width: 200 }}
    placeholder="Select user"
    optionFilterProp="label"
    filterSort={(optionA, optionB) =>
      (optionA?.label ?? '')
        .toLowerCase()
        .localeCompare((optionB?.label ?? '').toLowerCase())
    }
    options={[
      {
        value: '1',
        label: 'Elon Musk',
      },
      {
        value: '2',
        label: 'John Smith',
      },
      {
        value: '3',
        label: 'Bill  Gates',
      },
      {
        value: '4',
        label: 'Elon Musk',
      },
      {
        value: '5',
        label: 'John Smith',
      },
      {
        value: '6',
        label: 'Bill  Gates',
      },
    ]}
  />
);

export const CurrencyDropdown: React.FC = ({}) => (
  <Select
    showSearch
    style={{ width: 200 }}
    placeholder="Select currency"
    optionFilterProp="label"
    filterSort={(optionA, optionB) =>
      (optionA?.label ?? '')
        .toLowerCase()
        .localeCompare((optionB?.label ?? '').toLowerCase())
    }
    options={[
      {
        value: '1',
        label: 'EUR',
      },
      {
        value: '2',
        label: 'USD',
      },
      {
        value: '3',
        label: 'LEK',
      },
      {
        value: '4',
        label: 'DINAR',
      },
    ]}
  />
);

const TabsMenu = () => {
  return (
    <div>
      <Tabs
        defaultActiveKey="1"
        items={[
          {
            label: `Total`,
            key: '1',
            children: <TabContent prop={'1'} />,
          },
          {
            label: `Agent`,
            key: '2',
            children: <TabContent prop={'2'} />,
          },
          {
            label: `Affilate`,
            key: '3',
            children: <TabContent prop={'3'} />,
          },

          {
            label: `Bonus`,
            key: '4',
            children: <TabContent prop={'4'} />,
          },
        ]}
      />
    </div>
  );
};

const TabsMenu2 = () => {
  return (
    <div>
      <Tabs
        defaultActiveKey="1"
        items={[
          {
            label: `Casino`,
            key: '1',
            children: <TabContent prop={'2'} />,
          },
          {
            label: `Sportbook`,
            key: '2',
            children: <TabContent prop={'3'} />,
          },
        ]}
      />
    </div>
  );
};

const TabContent = ({ prop = '' }) => {
  return (
    <Row gutter={[12, 12]}>
      {prop === '2' || prop === '3' ? (
        <>
          <Col span={8}>
            <SingleCard />
          </Col>
          <Col span={8}>
            <SingleCard down />
          </Col>
          <Col span={8}>
            <SingleCard />
          </Col>
        </>
      ) : (
        <>
          <Col span={8}>
            <SingleCard />
          </Col>
          <Col span={8}>
            <SingleCard down />
          </Col>
          <Col span={8}>
            <SingleCard />
          </Col>
          <Col span={8}>
            <SingleCard />
          </Col>
          <Col span={8}>
            <SingleCard down />
          </Col>
          <Col span={8}>
            <SingleCard down />
          </Col>
        </>
      )}
    </Row>
  );
};

export const LineChartParent = (props) => {
  const config = {
    theme: 'classicDark',
    data: {
      type: 'fetch',
      value: 'https://assets.antv.antgroup.com/g2/stocks.json',
      transform: [{ type: 'filter', callback: (d) => d.symbol === 'GOOG' }],
    },
    xField: (d) => new Date(d.date),
    yField: 'price',
    style: {
      fill: 'none',
    },
    axis: {
      y: { labelFormatter: '~s' },
    },
    line: {
      style: {
        stroke: '#1554ad',
 
      },
    },
    ...props,
  };
  return <Area   {...config} height={props?.height || 260} />;
};

export const LineChartParent2 = (props) => {
  const config = {
    theme: 'classicDark',
    data: {
      type: 'fetch',
      value: 'https://assets.antv.antgroup.com/g2/stocks.json',
      transform: [{ type: 'filter', callback: (d) => d.symbol === 'GOOG' }],
    },
    xField: (d) => new Date(d.date),
    yField: 'price',
    style: {
      fill: 'none',
    },
    axis: {
      y: { labelFormatter: '~s' },
    },
    line: {
      style: {
        stroke: '#854eca',
        strokeWidth: 2,
      },
    },
    ...props,
  };
  return <Area {...config} height={props?.height || 260} />;
};

export const data = [
  ['Country', 'Popularity'],
  ['Germany', 200],
  ['United States', 300],
  ['Brazil', 400],
  ['Canada', 500],
  ['France', 600],
  ['RU', 700],
];

const WorldMapChart = () => {
  const [options, setOptions] = useState({
    data: mapdata,
    topology,
    series: [
      {
        type: 'map-shape-background',
      },
      {
        type: 'map-shape',
        title: 'Access to Clean Fuels',
        idKey: 'name',
        colorKey: 'value',
        colorName: '% of population',
      },
    ],
    theme: 'ag-polychroma-dark',
    background: {
      fill: 'transparent',
    },
    height: 400,
    gradientLegend: {
      enabled: true,
      position: 'right',
      gradient: {
        preferredLength: 200,
        thickness: 2,
      },

      scale: {
        label: {
          fontSize: 10,
          formatter: (p) => p.value + '%',
        },
      },
    },
  });

  return <AgCharts options={options} />;
};

const DemoColumn = () => {
  const config = {
    data: [
      { type: 'Albania', value: 200 },
      { type: 'USA', value: 530 },
      { type: 'Germany', value: 300 },
      { type: 'Japan', value: 100 },
      { type: 'Russia', value: 200 },
      { type: 'Slovenia', value: 50 },
      { type: 'Kosovo', value: 100 },
      { type: 'Greece', value: 150 },
      { type: 'Egypt', value: 10 },
      { type: 'England', value: 600 },
      { type: 'Spain', value: 200 },
      { type: 'Portugal', value: 200 },
      { type: 'France', value: 200 },
    ],
    xField: 'type',
    yField: 'value',
    theme: 'classicDark',
    style: {
      width: 20,
      fill: ({ type }) => {
        if (type === 'Albania' || type === 'Kosovo') {
          return '#a02669';
        }
        return '#146262';
      },
    },
    height: 300,
    label: {
      text: (originData) => {
        const val = parseFloat(originData.value);
        if (val < 0.05) {
          return (val * 100).toFixed(1) + '%';
        }
        return '';
      },
    },
    legend: false,
  };
  return <Column {...config} />;
};
