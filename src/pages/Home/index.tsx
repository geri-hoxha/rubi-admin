import { PageContainer } from '@ant-design/pro-components';
import { Badge, Card, Col, Row } from 'antd';
import React from 'react';
import { Tiny } from '@ant-design/plots';

const App: React.FC = () => {
  return (
    <PageContainer
      header={{
        title: 'Dashboard',
      }}
    >
      <Row gutter={[12, 12]}>
        <Col span={3}>
          <SingleCard />
        </Col>
        <Col span={3}>
          <SingleCard />
        </Col>
        <Col span={3}>
          <SingleCard />
        </Col>
        <Col span={3}>
          <SingleCard />
        </Col>
        
      </Row>
    </PageContainer>
  );
};

export default App;

const SingleCard = () => {
  return (
    <div style={{position: 'relative'}}>
      <Card style={{ width: '100%', borderLeft: '2px solid #52c41a', borderLeft                 }}>
        <div>
          <span style={{ fontSize: 14, fontWeight: 500 }}>
            Total Placing Bets (Turnovers)
          </span>
        <div style={{display: 'flex', alignItems: 'center'}}>
        <span
            style={{
              fontWeight: 700,
              display: 'block',
              fontSize: 20,
              marginTop: 6,
            }}
          >
            230 € 
          </span>
          <DemoArea />
        </div>
        </div>
      </Card>
       
    </div>
  );
};

const DemoArea = () => {
  const data = [
    100, 150, 120, 192,
  ].map((value, index) => ({ value, index }));
  const config = {
    data,
    width: 40,
    height: 20,
     shapeField: 'smooth',
    xField: 'index',
    yField: 'value',
    style: {
      fill: '#52c41a',
      fillOpacity: 0.6,
    },
  };
  return <Tiny.Area {...config} />;
};
