import Users, { IUserModel } from '@/services/Users';
import { Form, FormInstance, Input, Spin } from 'antd';
import { useEffect, useState } from 'react';

interface IProps {
  form: FormInstance<IUserModel>;
  id: string;
}

const ModalBody: React.FC<IProps> = ({ form, id }) => {
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    if (!id) return;

    try {
      setLoading(true);

      const response = await Users.get(id);
      form.setFieldsValue({
        userType: 'test',
        displayName: 'test',
        username: 'test',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Spin spinning={loading} tip="Loading...">
      <Form
        form={form}
        name="form"
        layout="vertical"
        initialValues={{ remember: true }}
        autoComplete="off"
      >
        <br />
        <Form.Item<IUserModel> label="User Type" name="userType">
          <Input size="large" />
        </Form.Item>
        <Form.Item<IUserModel> label="Display Name" name="displayName">
          <Input size="large" />
        </Form.Item>
        <Form.Item<IUserModel> label="Username" name="username">
          <Input size="large" />
        </Form.Item>
      </Form>
    </Spin>
  );
};

export default ModalBody;
