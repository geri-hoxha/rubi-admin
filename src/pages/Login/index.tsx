import { isAuthenticated } from '@/components/ProtectedRoute';
import { setTokenToLocalStorage } from '@/services/request';
import Users from '@/services/Users';
import { history } from '@umijs/max';
import type { FormProps } from 'antd';
import { Button, Checkbox, Flex, Form, Input, Spin } from 'antd';
import { useLayoutEffect, useState } from 'react';

interface ISignModel {
  username: string;
  password: string;
}

export default () => {
  const [loading, setLoading] = useState<boolean>(false);

  useLayoutEffect(() => {
    if (isAuthenticated()) {
      history.push('/');
    }
  }, []);

  const onFinish: FormProps<ISignModel>['onFinish'] = async (values) => {
    try {
      setLoading(true);

      const reponse = await Users.singIn(values);

      setTokenToLocalStorage(reponse.value.token);

      history.push('/');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        backgroundColor: '#121212',
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
            backgroundColor: '#1A1E26',
            padding: '40px 40px',
            borderRadius: 10,
            marginTop: '-40px',
          }}
        >
          <div
            style={{
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              gap: 10,
              marginBottom: 32,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <img
              style={{ width: 60, marginBottom: 32 }}
              src={
                'https://hotspins.io/external_storage/logos_mobile/U8yDdOkjqvxXwbEpscBMTEcypsKhv88ewqovSrZn.png'
              }
            />
            <h2 style={{ color: '#fff' }}>Log in to your Hotspins account!</h2>
            <span style={{ color: '#fff', fontSize: 13 }}>
              Welcome back big boss. No account?{' '}
              <Button
                style={{ marginLeft: 4 }}
                size="small"
                htmlType="submit"
                variant="filled"
                color="primary"
              >
                Sign up
              </Button>
            </span>
          </div>

          <Form
            name="form"
            initialValues={{
              username: 'erin418',
              password: 'Erin_418',
              remember: true,
            }}
            onFinish={onFinish}
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
            <Flex justify="space-between">
              <Form.Item<ISignModel>
                name="remember"
                valuePropName="checked"
                label={null}
              >
                <Checkbox>Remember me</Checkbox>
              </Form.Item>
              <Button
                size="small"
                variant="filled"
                color="primary"
                style={{ marginTop: 4 }}
              >
                Forgot password
              </Button>
            </Flex>

            <div style={{ textAlign: 'right' }}>
              <Button
                size="large"
                htmlType="submit"
                variant="solid"
                color="primary"
              >
                Log in
              </Button>
            </div>
          </Form>
        </div>
      </Spin>
    </div>
  );
};
