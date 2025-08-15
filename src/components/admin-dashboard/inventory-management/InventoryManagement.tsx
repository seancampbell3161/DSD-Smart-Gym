import { useEffect, useMemo, useState } from "react";
import ApiHandler from "../../../utils/ApiHandler";
import { format } from "date-fns";
import { AgGridReact } from "ag-grid-react";
import {
  _getHeaderCheckbox,
  AllCommunityModule,
  themeAlpine,
  ModuleRegistry,
  type ColDef,
  type GridOptions,
  type SizeColumnsToFitGridStrategy,
} from "ag-grid-community";
ModuleRegistry.registerModules([AllCommunityModule]);
import "../../../styles/InventoryManagement.css";

interface InventoryItem {
  _id: string;
  item_name: string;
  price: string;
  quantity: number;
  createdAt: string;
  updatedAt: string;
}

const InventoryManagement: React.FC = () => {
  const [items, setItems] = useState<InventoryItem[]>([]);
  const [colDefs, setColDefs] = useState<ColDef[]>([
    { field: "_id", headerName: "ID", colId: "ID" },
    { field: "item_name", headerName: "Item Name" },
    {
      field: "price",
      headerName: "Price",
      valueFormatter: (p) =>
        p.value.toLocaleString("en-US", { style: "currency", currency: "USD" }),
      colId: "Price",
    },
    { field: "quantity", headerName: "Quantity", colId: "Quantity" },
    {
      field: "createdAt",
      headerName: "Date Added (YYYY-MM-DD)",
      valueFormatter: (p) => format(p.value, "yyyy-MM-dd HH:mm:ss"),
    },
    {
      field: "updatedAt",
      headerName: "Last Updated (YYYY-MM-DD)",
      valueFormatter: (p) => format(p.value, "yyyy-MM-dd HH:mm:ss"),
    },
  ]);

  const rowSelection: GridOptions["rowSelection"] = useMemo(() => {
    return { mode: "multiRow", _getHeaderCheckbox };
  }, []);

  const autoSizeStrategy: SizeColumnsToFitGridStrategy = useMemo(() => {
    return {
      type: "fitGridWidth",
      columnLimits: [
        {
          colId: "ID",
          minWidth: 300,
        },
        {
          colId: "Price",
          maxWidth: 180,
        },
        {
          colId: "Quantity",
          maxWidth: 180,
        },
      ],
    };
  }, []);

  const myTheme = themeAlpine.withParams({
    selectedRowBackgroundColor: "#11ff7029",
  });

  const fetchAllInventory = async () => {
    try {
      const { data } = await ApiHandler.get("/cafe-inventory/");

      setItems(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchAllInventory();
  }, []);
  return (
    <div className="inventory-management-container">
      <div className="inventory-list-wrapper">
        <div style={{ width: "1500px" }}>
          <AgGridReact
            rowData={items}
            columnDefs={colDefs}
            rowSelection={rowSelection}
            autoSizeStrategy={autoSizeStrategy}
            theme={myTheme}
            domLayout="autoHeight"
          />
        </div>
      </div>
    </div>
  );
};
export default InventoryManagement;
