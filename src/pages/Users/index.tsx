import AgGrid from '@/components/AgGrid';
import { toCurrencyStandardFormatCurrency } from '@/components/helpers';
import Users, { IUserModel } from '@/services/Users';
import {
  CheckOutlined,
  CloseOutlined,
  DeleteOutlined,
  EditOutlined,
  LockOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-components';
import { IconDownload, IconPlus } from '@tabler/icons-react';
import { ICellRendererParams } from 'ag-grid-community';
import {
  Button,
  Flex,
  Form,
  Input,
  InputRef,
  Modal,
  Popconfirm,
  Spin,
  Tag,
} from 'antd';
import { TweenOneGroup } from 'rc-tween-one';
import { useCallback, useEffect, useRef, useState } from 'react';
import ModalBody from './Modal';
import { fakeData } from './static';

export default () => {
  const [openModal, setOpenModal] = useState<boolean>(false);

  const [selectedId, setSelectedId] = useState<string>('');

  const [form] = Form.useForm<IUserModel>();

  const onModalCancel = () => {
    setOpenModal(false);
    setSelectedId('');
  };

  const onModalOk = async () => {
    const formValues = await form.validateFields();
    console.log(formValues);
    if (selectedId) {
      await Users.update(selectedId, formValues);
    } else {
      await Users.create(formValues);
    }

    onModalCancel();
  };

  const addNew = () => {
    setOpenModal(true);
  };

  return (
    <>
      <PageContainer
        title={'Users'}
        extra={
          <>
            <Button color="green" variant="filled" onClick={addNew}>
              <IconDownload size={20} />
              Download Excel
            </Button>
            <Button variant="outlined" color="primary" onClick={addNew}>
              <IconPlus size={20} />
              Add User
            </Button>
          </>
        }
      >
        <AgGrid
          filterFields={
            <>
              <Form.Item<IUserModel> label="User Type" name="userType">
                <Input size="large" placeholder="User Type" />
              </Form.Item>
              <Form.Item<IUserModel> label="Display Name" name="displayName">
                <Input size="large" placeholder="Display Name" />
              </Form.Item>
              <Form.Item<IUserModel> label="Username" name="username">
                <Input size="large" placeholder="Username" />
              </Form.Item>
            </>
          }
          height={window.innerHeight - 400}
          columnDefs={[
            {
              headerName: 'User ID',
              field: 'userId',
              cellStyle: {
                cursor: 'pointer',
                color: 'rgb(0 113 255)',
              },
              onCellClicked: ({ value }) => {
                setOpenModal(true);
                setSelectedId(value);
              },
            },
            {
              headerName: 'User Type',
              field: 'userType',
            },
            {
              headerName: 'More actions',
              field: 'more',
              minWidth: 250,
              cellRenderer: ({ data }: { data: IUserModel }) => {
                return (
                  <Flex gap={20}>
                    <Roles userId={data.userId} />
                    <Password userId={data.userId} />
                  </Flex>
                );
              },
            },
            {
              headerName: 'Display Name',
              field: 'displayName',
            },
            {
              headerName: 'Username',
              field: 'username',
            },
            {
              headerName: 'Email',
              field: 'email',
            },
            {
              headerName: 'Active',
              field: 'isActive',
              maxWidth: 100,
              cellRenderer: ({ value }) => {
                if (value) {
                  return <CheckOutlined style={{ color: '#49aa19' }} />;
                }
                return <CloseOutlined style={{ color: '#dc4446' }} />;
              },
            },
            {
              headerName: 'Registration Date',
              field: 'registrationDate',
            },
            {
                            maxWidth: 100,
              headerName: 'Country',
              field: 'country',
              cellRenderer: ({ value }) => {
                return <img src={`https://flagsapi.com/${value}/shiny/32.png`} />;
              },
            },
            {
              headerName: 'Account Balance',
              field: 'accountBalance',
              cellRenderer: ({ value }) => {
                return (
                  <span>{toCurrencyStandardFormatCurrency(value, 'EUR')}</span>
                );
              },
            },
            {
              headerName: 'Actions',
              field: 'actions',
              minWidth: 200,
              cellRenderer: (params: ICellRendererParams) => {
                const [loading, setLoading] = useState<boolean>(false);

                const data: IUserModel = params.data;

                const onDeleteHandler = async (id: string) => {
                  try {
                    setLoading(true);

                    const response = await Users.delete(id);
                  } finally {
                    setLoading(false);
                  }
                };

                return (
                  <Flex gap={10} justify="center" style={{ marginTop: 8 }}>
                    <Button
                      color="primary"
                      variant="filled"
                      onClick={() => {
                        setOpenModal(true);
                        setSelectedId(data.userId);
                      }}
                    >
                      <EditOutlined /> Edit
                    </Button>

                    <Popconfirm
                      title="Delete the user"
                      description="Are you sure to delete this user?"
                      onConfirm={() => onDeleteHandler(data.userId)}
                      okText="Yes"
                      cancelText="No"
                    >
                      <Button color="danger" variant="filled" loading={loading}>
                        <DeleteOutlined /> Delete
                      </Button>
                    </Popconfirm>
                  </Flex>
                );
              },
            },
          ]}
          rowData={fakeData}
          rowHeight={50}
          headerHeight={50}
          getRowId={useCallback(({ data }: { data: IUserModel }) => {
            return data.userId;
          }, [])}
          columnHoverHighlight
          rowModelType="clientSide"
        />
      </PageContainer>

      <Modal
        centered
        destroyOnClose
        title="Add or Edit User"
        open={openModal}
        onOk={onModalOk}
        onCancel={onModalCancel}
      >
        <ModalBody form={form} id={selectedId} />
      </Modal>
    </>
  );
};

const Roles: React.FC<{
  userId: string;
}> = ({ userId }) => {
  const [modal, setModal] = useState<boolean>(false);

  const [roles, setRoles] = useState<string[]>([]);

  const [loading, setLoading] = useState<boolean>(false);

  const [inputVisible, setInputVisible] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef<InputRef>(null);

  useEffect(() => {
    if (inputVisible) {
      inputRef.current?.focus();
    }
  }, [inputVisible]);

  const handleClose = (removeRole: string) => {
    const newRoles = roles.filter((role) => role !== removeRole);
    setRoles(newRoles);
  };

  const showInput = () => {
    setInputVisible(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleInputConfirm = () => {
    if (inputValue && roles.indexOf(inputValue) === -1) {
      setRoles([...roles, inputValue]);
    }
    setInputVisible(false);
    setInputValue('');
  };

  const forMap = (role: string) => (
    <span key={role} style={{ display: 'inline-block' }}>
      <Tag
        style={{
          height: 30,
          display: 'flex',
          alignItems: 'center',
        }}
        closable
        onClose={(e) => {
          e.preventDefault();
          handleClose(role);
        }}
      >
        {role}
      </Tag>
    </span>
  );

  const tagChild = roles.map(forMap);

  const init = async () => {
    try {
      setLoading(true);

      setModal(true);

      const response = await Users.getAllRoles(userId);

      setRoles(response.value);
    } finally {
      setLoading(false);
    }
  };

  const onModalOk = async () => {
    try {
      setLoading(true);
    } finally {
      setLoading(false);
    }
  };

  const onModalCancel = () => {
    setLoading(false);

    setModal(false);
  };

  return (
    <>
      <Flex>
        <Button
          onClick={init}
          color="blue"
          variant="filled"
          size="small"
          style={{ marginTop: 10 }}
        >
          Add Role
        </Button>
      </Flex>

      <Modal
        centered
        destroyOnClose
        title="Roles list"
        open={modal}
        onOk={onModalOk}
        onCancel={onModalCancel}
      >
        <Spin spinning={loading} tip="Loading...">
          <>
            <div style={{ marginBottom: 16 }}>
              <TweenOneGroup
                appear={false}
                enter={{ scale: 0.8, opacity: 0, type: 'from', duration: 100 }}
                leave={{ opacity: 0, width: 0, scale: 0, duration: 200 }}
                onEnd={(e) => {
                  if (e.type === 'appear' || e.type === 'enter') {
                    (e.target as any).style = 'display: inline-block';
                  }
                }}
              >
                {tagChild}
              </TweenOneGroup>
            </div>
            {inputVisible ? (
              <Input
                ref={inputRef}
                type="text"
                style={{ width: 78 }}
                value={inputValue}
                onChange={handleInputChange}
                onBlur={handleInputConfirm}
                onPressEnter={handleInputConfirm}
              />
            ) : (
              <Tag
                onClick={showInput}
                style={{
                  borderStyle: 'dashed',
                }}
              >
                <PlusOutlined /> New Role
              </Tag>
            )}
          </>
        </Spin>
      </Modal>
    </>
  );
};

const Password: React.FC<{
  userId: string;
}> = ({ userId }) => {
  const [form] = Form.useForm();

  const [modal, setModal] = useState<boolean>(false);

  const [loading, setLoading] = useState<boolean>(false);

  const onModalOk = async () => {
    try {
      setLoading(true);

      const values = await form.validateFields();

      const response = await Users.updatePassword(userId, values);

      onModalCancel();
    } finally {
      setLoading(false);
    }
  };

  const onModalCancel = () => {
    setLoading(false);
    form.resetFields();
    setModal(false);
  };

  return (
    <>
      <Flex>
        <Button
          onClick={() => {
            setModal(true);
          }}
          color="cyan"
          variant="filled"
          size="small"
          style={{ marginTop: 10 }}
        >
          <LockOutlined /> Update password
        </Button>
      </Flex>

      <Modal
        centered
        destroyOnClose
        title="Update user password"
        open={modal}
        onOk={onModalOk}
        onCancel={onModalCancel}
      >
        <Spin spinning={loading} tip="Loading...">
          <Form
            form={form}
            name="form"
            style={{ marginTop: 20 }}
            layout="vertical"
            initialValues={{
              oldPassword: '',
              newPassword: '',
              verifyNewPassword: '',
            }}
          >
            <Form.Item
              name="oldPassword"
              label="Old Password"
              rules={[
                {
                  required: true,
                  message: 'Please input your old password!',
                },
              ]}
            >
              <Input.Password
                size="large"
                prefix={<LockOutlined />}
                placeholder="Old Password"
                type="password"
              />
            </Form.Item>

            <Form.Item
              name="newPassword"
              label="New Password"
              rules={[
                {
                  required: true,
                  message: 'Please input your new password!',
                },
              ]}
            >
              <Input.Password
                size="large"
                prefix={<LockOutlined />}
                placeholder="New Password"
                type="password"
              />
            </Form.Item>

            <Form.Item
              name="verifyNewPassword"
              label="Verify New Password"
              dependencies={['newPassword']}
              rules={[
                {
                  required: true,
                  message: 'Please confirm your new password!',
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('newPassword') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error(
                        'The two passwords that you entered do not match!',
                      ),
                    );
                  },
                }),
              ]}
            >
              <Input.Password
                size="large"
                prefix={<LockOutlined />}
                placeholder="Confirm New Password"
                type="password"
              />
            </Form.Item>
          </Form>
        </Spin>
      </Modal>
    </>
  );
};
