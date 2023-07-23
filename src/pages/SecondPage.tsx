import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import CheckboxSidebar from "../components/CheckboxSidebar";

const checkboxData = [
  {
    department: "customer_service",
    sub_departments: ["support", "customer_success"],
  },
  {
    department: "design",
    sub_departments: ["graphic_design", "product_design", "web_design"],
  },
];

interface Item {
  id: number;
  userId: number;
  title: string;
  body: string;
}

const SecondPage = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<Item[]>([]);

  const fetchData = async () => {
    const { data } = await axios.get(
      "https://jsonplaceholder.typicode.com/posts"
    );
    setData(data);
  };

  useEffect(() => {
    const localItems = JSON.parse(localStorage.getItem("items")!);
    if (!localItems) navigate("/");
    fetchData();
  }, [navigate]);

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "userId", headerName: "User ID", width: 90 },
    {
      field: "title",
      headerName: "Title",
      sortable: false,
      minWidth: 200,
    },
    {
      field: "body",
      headerName: "Body",
      sortable: false,
      resizable: true,
      width: 300,
      maxWidth: 500,
    },
  ];

  return (
    <div>
      {data && (
        <Box sx={{ height: "100%", width: "100%" }}>
          <DataGrid
            rows={data}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 10,
                },
              },
            }}
            pageSizeOptions={[10]}
            disableRowSelectionOnClick
          />
        </Box>
      )}
      <Box sx={{ height: "100%", width: "100%" }}>
        {checkboxData.map((item) => (
          <CheckboxSidebar item={item} />
        ))}
      </Box>
    </div>
  );
};

export default SecondPage;
