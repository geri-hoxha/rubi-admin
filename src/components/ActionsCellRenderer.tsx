 import { DeleteOutlined, EditOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import { RowNode } from 'ag-grid-community';
import { Popconfirm } from 'antd';
import { CSSProperties } from 'react';
import styles from './styles.less';

type Actions = {
    name: string;
    action: (data: any) => void;
    keyToCheck?: string;
    style: CSSProperties;
};

type Props = {
    edit?: boolean;
    deleted?: (data: any) => boolean;
    data: any;
    deleteHandler: (data: any, node: RowNode) => void;
    editHandler: (data: any, node: RowNode) => void;
    customActions?: Actions[];
    node: RowNode;
};

const ActionsCellRenderer: React.FC<Props> = (props) => {
    const { edit = true, deleted = () => true, data, deleteHandler, editHandler, customActions = false, node } = props;
 
    return (
        <div className={styles.d_flex}>
            {customActions &&
                customActions.map((action: Actions, index: number) => {
                    return (
                        <a
                            key={index}
                            style={data[action.keyToCheck ?? 'id'] ? { ...action.style } : { visibility: 'hidden', ...action.style }}
                            className={styles.others}
                            onClick={() => action.action(data)}
                        >
                            Custom action
                        </a>
                    );
                })}
            {edit && (
                <div
                    style={{ cursor: 'pointer' }}
                    onClick={() => {
                        editHandler(data, node);
                    }}
                >
                    <EditOutlined style={{ color: '#005CA9', paddingRight: 3 }} />
                    <a className={styles.edit}>{'Edit'}</a>
                </div>
            )}

            {deleted?.(data) && !!deleteHandler ? (
                <div style={{ cursor: 'pointer' }}>
                    <Popconfirm title={'Are you sure to delete?'} icon={<QuestionCircleOutlined style={{ color: 'red' }} />} onConfirm={() => deleteHandler(data, node)} okText={'Yes'} cancelText={'No'}>
                        <DeleteOutlined style={{ color: 'red', marginRight: '-10px', marginLeft: 10 }} />
                        <a className={styles.delete}>{'Delete'}</a>
                    </Popconfirm>
                </div>
            ) : null}
        </div>
    );
};

export default ActionsCellRenderer;
