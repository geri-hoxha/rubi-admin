import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine-dark.css';
import { AgGridReact } from 'ag-grid-react'; // React Data Grid Component
import { useState } from 'react';
interface IProps {}

const AgGrid: React.FC<IProps> = () => {
  const [rowData, setRowData] = useState([
    { make: 'Tesla', model: 'Model Y', price: 64950, electric: true },
    { make: 'Ford', model: 'F-Series', price: 33850, electric: false },
    { make: 'Toyota', model: 'Corolla', price: 29600, electric: false },
  ]);

  // Column Definitions: Defines the columns to be displayed.
  const [colDefs, setColDefs] = useState([
    { field: 'make' },
    { field: 'model' },
    { field: 'price' },
    { field: 'electric' },
  ]);

  return (
    <div style={{ height: 1000 }}>
      <AgGridReact
        className={`ag-theme-alpine-dark`}
        rowData={rowData}
        columnDefs={colDefs}
      />
    </div>
  );
};

export default AgGrid;
