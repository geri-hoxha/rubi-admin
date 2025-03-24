import { isAuthenticated } from '@/components/ProtectedRoute';
import Users from '@/services/Users';
import { history } from '@umijs/max';
import type { FormProps } from 'antd';
import { Button, Checkbox, Form, Input, Spin } from 'antd';
import { useEffect, useState } from 'react';

interface ISignModel {
  username: string;
  password: string;
}

export default () => {
  const [loading, setLoading] = useState<boolean>(false);

//   useEffect(() => {
//     if (isAuthenticated()) {
//       history.push('/');
//     }
//   }, []);

  const onFinish: FormProps<ISignModel>['onFinish'] = async (values) => {
    try {
      setLoading(true);
      const reponse = await Users.singIn(values);

      history.push('./users');
    } finally {
      setLoading(false);
    }
  };

  const onFinishFailed: FormProps<ISignModel>['onFinishFailed'] = (
    errorInfo,
  ) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <div
      style={{
        backgroundColor: '#000',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
      }}
    >
      <Spin spinning={loading}>
        <div
          style={{
            width: 460,
            backgroundColor: '#141414',
            padding: '40px 40px',
            borderRadius: 10,
            marginTop: '-40px',
          }}
        >
          <img
            style={{ width: 260, marginBottom: 20 }}
            src={
              'https://hotspins.io/external_storage/logos/ifehZ28WwYgoGHuVeVb5npoOx62jT2hO02A7s7uD.png'
            }
          />
          <Form
            name="form"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            layout="vertical"
          >
            <Form.Item<ISignModel>
              label="Username"
              name="username"
              rules={[
                { required: true, message: 'Please input your username!' },
              ]}
            >
              <Input size="large" />
            </Form.Item>

            <Form.Item<ISignModel>
              label="Password"
              name="password"
              rules={[
                { required: true, message: 'Please input your password!' },
              ]}
            >
              <Input.Password size="large" />
            </Form.Item>

            <Form.Item<ISignModel>
              name="remember"
              valuePropName="checked"
              label={null}
            >
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <div style={{ textAlign: 'right' }}>
              <Button size="large" type="primary" htmlType="submit">
                Sign in
              </Button>
            </div>
          </Form>
        </div>
      </Spin>
    </div>
  );
};
