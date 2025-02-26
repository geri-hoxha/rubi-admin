import { Area, Column } from '@ant-design/plots';
import { PageContainer } from '@ant-design/pro-components';
import {
  IconCircleArrowDown,
  IconCircleArrowUp,
  IconInfoCircle,
} from '@tabler/icons-react';
import 'ag-charts-enterprise';
import { AgCharts } from 'ag-charts-react';
import {
  Button,
  Col,
  DatePicker,
  Divider,
  Row,
  Select,
  Tabs,
  Typography,
} from 'antd';
import React, { useState } from 'react';
import { mapdata } from './data';
import styles from './styles.less';
import { topology } from './topology';

const { RangePicker } = DatePicker;
const { Title } = Typography;

const App: React.FC = () => {
  return (
    <PageContainer
      header={{
        title: 'Dashboard',
      }}
    >
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
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <label style={{ marginLeft: 3 }}>Select range:</label>
            <RangePicker style={{ width: 400 }} />
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
          <br />
          <TabsMenu2 />
          <br />
          <Divider />

          <Row gutter={[12, 12]}>
            <Col span={8}>
              <DoubleCard />
            </Col>
            <Col span={8}>
              <DoubleCard down />
            </Col>
            <Col span={8}>
              <DoubleCard />
            </Col>
            <Col span={8}>
              <DoubleCard />
            </Col>
            <Col span={8}>
              <DoubleCard down />
            </Col>
            <Col span={8}>
              <DoubleCard down />
            </Col>
          </Row>
        </Col>
        <Col span={12}>
          <Tabs
            defaultActiveKey="1"
            items={[
              {
                label: `GGR and Deposit`,
                key: '1',
                children: (
                  <>
                    <Title level={5} style={{ textAlign: 'center' }}>
                      GGR and Turnover
                    </Title>
                    <LineChartParent />
                    <Title level={5} style={{ textAlign: 'center' }}>
                      Deposit
                    </Title>
                    <LineChartParent2 />
                  </>
                ),
              },
              {
                label: `Country`,
                key: '2',
                children: (
                  <>
                    <Title level={5} style={{ textAlign: 'center' }}>
                      Registration By Country
                    </Title>
                    <WorldMapChart />
                    <Title level={5} style={{ textAlign: 'center' }}>
                      Top Registration Countries
                    </Title>
                    <DemoColumn />
                  </>
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
        className={styles.border}
        style={{
          width: '100%',
          background:
            ' linear-gradient(-90deg, rgba(2, 132, 199, 0.1) 0%, rgba(2, 132, 199, 0.1 ) 90%)',
          border: '1px solid #15325b',
          borderRadius: 6,
          padding: '10px 14px',
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <span style={{ fontSize: 12, fontWeight: 500 }}>
              Total Placing Bets (Turnovers)
            </span>
            <IconInfoCircle size={20} style={{ color: 'gray' }} />
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
                fontSize: 20,
              }}
            >
              230.00 €
            </span>
            {down ? (
              <div
                style={{
                  border: '1px solid #a61d24',
                  borderRadius: '10px',
                  color: '#a61d24',
                  fontSize: 12,
                  padding: '0px 3px',
                  fontWeight: 500,
                }}
              >
                Down
              </div>
            ) : (
              <div
                style={{
                  border: '1px solid #3c8618',
                  borderRadius: '10px',
                  color: '#3c8618',
                  fontSize: 12,
                  padding: '0px 7px',
                  fontWeight: 500,
                }}
              >
                Up
              </div>
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
        className={styles.border}
        style={{
          width: '100%',
          background:
            ' linear-gradient(-90deg, rgba(2, 132, 199, 0.1) 0%, rgba(2, 132, 199, 0.1 ) 90%)',
          border: '1px solid #15325b',
          borderRadius: 6,
          padding: '10px 14px',
        }}
      >
        <div>
          <span style={{ fontSize: 12, fontWeight: 500 }}>
            Providers Profit
          </span>
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
                fontSize: 16,
              }}
            >
              - 23,043.00 €
            </span>
            <IconCircleArrowUp size={22} style={{ color: '#3c8618' }} />
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
                fontSize: 16,
              }}
            >
              - 2,230.00 €
            </span>
            <IconCircleArrowDown size={22} style={{ color: '#a61d24' }} />
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
      fill: 'linear-gradient(-90deg, rgba(2, 132, 199, 0.1) 0%, rgba(2, 132, 199, 0.8) 90%)',
    },
    axis: {
      y: { labelFormatter: '~s' },
    },
    line: {
      style: {
        stroke: '#0284c7',
        strokeWidth: 2,
      },
    },
    ...props,
  };
  return <Area {...config} height={props?.height || 260} />;
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
      fill: 'linear-gradient(-90deg, rgba(167, 139, 250, 0.1) 0%, rgba(167, 139, 250, 0.8) 90%)',
    },
    axis: {
      y: { labelFormatter: '~s' },
    },
    line: {
      style: {
        stroke: '#a78bfa',
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
          return '#a78bfa80';
        }
        return '#0ea5e980';
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
