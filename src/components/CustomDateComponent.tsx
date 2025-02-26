import { IDateParams } from 'ag-grid-community';
import { DatePicker } from 'antd';
import moment, { Moment } from 'moment';
import { ReactNode, forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import styles from './styles.less';


 export const dateFormatList = ['DD/MM/YYYY', 'D/M/YYYY', 'DD-MM-YYYY', 'D-M-YYYY', 'DD.MM.YYYY', 'D.M.YYYY'];

export const DatepickerHeading: React.FC<{ originPanel: ReactNode }> = ({ originPanel }) => {
 
  return (
    <div className={styles.datepickerContainer}>
      <div className={styles.message}>{"To save the date press 'Enter'"}</div>
      {originPanel}
    </div>
  );
};

export default forwardRef((props: IDateParams, ref) => {
  const [value, setValue] = useState<Moment | null>(null);
  const [date, setDate] = useState<Moment | null>(null);

  useEffect(() => {
    if (!date) {
      setValue(null);
      return;
    }
    setValue(moment(date));
  }, [date]);

  useImperativeHandle(ref, () => ({
    getDate() {
      //ag-grid will call us here when in need to check what the current date value is hold by this component.
      // @ts-ignore
      return value ? new Date(value) : null;
    },

    setDate(date: Moment) {
      //ag-grid will call us here when it needs this component to update the date that it holds.
      setValue(!!date ? moment(date) : null);
      setDate(date);
    },
  }));

  const onDateChanged = (selectedDates: Moment | null) => {
    setDate(selectedDates);
    if (selectedDates) {
      setValue(moment(selectedDates));
    } else {
      setValue(null);
    }
    props.onDateChanged();
  };

  return <DatePicker size="small" placeholder={props.filterParams.colDef.headerName} value={value} onChange={onDateChanged} format={dateFormatList} style={{ width: '100%' }} panelRender={(originPanel: React.ReactNode) => <DatepickerHeading originPanel={originPanel} />} />;
});
