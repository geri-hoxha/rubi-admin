import AgGrid from '@/components/AgGrid';
import Users, { IUserModel } from '@/services/Users';
import {
  DeleteOutlined,
  EditOutlined,
  FilterOutlined,
  UndoOutlined,
} from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-components';
import { IconDownload, IconPlus } from '@tabler/icons-react';
import { ICellRendererParams } from 'ag-grid-community';
import { Button, Flex, Form, Input, Modal, Popconfirm, Spin } from 'antd';
import { useCallback, useEffect, useState } from 'react';
import { staticData } from './data';
import ModalBody from './Modal';

export default () => {
  const [rowData, setRowData] = useState<IUserModel[]>([]);

  const [openModal, setOpenModal] = useState<boolean>(false);

  const [selectedId, setSelectedId] = useState<string>('');

  const [loading, setLoading] = useState<boolean>(false);

  const [form] = Form.useForm<IUserModel>();

  const [filterForm] = Form.useForm();

  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    const response = await Users.getList(1, 5);
    setRowData(staticData);
  };

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

  const onDeleteHandler = async (id: string) => {
    try {
      setLoading(true);

      const response = await Users.delete(id);
    } finally {
      setLoading(false);
    }
  };

  const addNew = () => {
    setOpenModal(true);
  };

  const filterHandler = async () => {
    try {
      setLoading(true);
      const filterFormValues = filterForm.getFieldsValue();

      const queryParams = Object.keys(filterFormValues).map((key) => {
        return `&${key}=${filterFormValues[key]}`;
      });

      const response = await Users.getList(1, 5, queryParams);

      setRowData(staticData);
    } finally {
      setLoading(false);
    }
  };

  const filterCancelHandler = async () => {
    filterForm.resetFields();
    await init();
  };

  return (
    <>
      <PageContainer
        title={'Users'}
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
              Add User
            </Button>
          </>
        }
      >
        <Spin spinning={loading} tip="Loading...">
          <Form
            form={filterForm}
            name="filter"
            style={{
              display: 'flex',
              alignContent: 'center',
              margin: '14px 0 28px 0',
              gap: 36,
              background: '#1F1F1F',
              padding: '20px 20px 10px 20px',
              borderRadius: 6,
            }}
            layout="vertical"
            initialValues={{ remember: true }}
            autoComplete="off"
          >
            <Form.Item<IUserModel> label="User Type" name="userType">
              <Input size="large" placeholder="User Type" />
            </Form.Item>
            <Form.Item<IUserModel> label="Display Name" name="displayName">
              <Input size="large" placeholder="Display Name" />
            </Form.Item>
            <Form.Item<IUserModel> label="Username" name="username">
              <Input size="large" placeholder="Username" />
            </Form.Item>

            <div
              style={{
                marginLeft: 'auto',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 20,
              }}
            >
              <Button danger onClick={filterCancelHandler}>
                <UndoOutlined /> Reset
              </Button>
              <Button type="primary" htmlType="submit" onClick={filterHandler}>
                <FilterOutlined /> Filter
              </Button>
            </div>
          </Form>

          <AgGrid
            height={window.innerHeight - 400}
            columnDefs={[
              {
                headerName: 'User ID',
                field: 'userId',
                cellStyle: {
                  cursor: 'pointer',
                  color: '#1668dc',
                  fontWeight: 600,
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
                headerName: 'Display Name',
                field: 'displayName',
              },
              {
                headerName: 'Username',
                field: 'username',
              },
              {
                headerName: 'Actions',
                field: 'actions',
                cellRenderer: (params: ICellRendererParams) => {
                  const data: IUserModel = params.data;
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
                        <Button color="danger" variant="filled">
                          <DeleteOutlined /> Delete
                        </Button>
                      </Popconfirm>
                    </Flex>
                  );
                },
              },
            ]}
            rowData={rowData}
            rowHeight={50}
            headerHeight={50}
            getRowId={useCallback(({ data }: { data: IUserModel }) => {
              return data.userId;
            }, [])}
            rowModelType="clientSide"
            columnHoverHighlight
          />
        </Spin>
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
