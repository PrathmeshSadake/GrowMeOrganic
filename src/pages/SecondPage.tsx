import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import axios from "axios";
import { Checkbox, FormControlLabel } from "@mui/material";

interface Item {
  id: number;
  userId: number;
  title: string;
  body: string;
}

const SecondPage = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<Item[]>([]);

  const [checked, setChecked] = useState([false, false]);
  const [checked2, setChecked2] = useState([false, false, false]);

  const handleChange1 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked([event.target.checked, event.target.checked]);
  };

  const handleChange2 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked([event.target.checked, checked[1]]);
  };

  const handleChange3 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked([checked2[0], event.target.checked]);
  };

  const handleChange4 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked2([
      event.target.checked,
      event.target.checked,
      event.target.checked,
    ]);
  };

  const handleChange5 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked2([event.target.checked, checked2[1], checked2[2]]);
  };

  const handleChange6 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked2([checked2[0], event.target.checked, checked2[2]]);
  };
  const handleChange7 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked2([checked2[0], checked2[1], event.target.checked]);
  };

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
        <div>
          <FormControlLabel
            label={"customer service".toUpperCase()}
            control={
              <Checkbox
                checked={checked[0] && checked[1]}
                indeterminate={checked[0] !== checked[1]}
                onChange={handleChange1}
              />
            }
          />
          <Box sx={{ display: "flex", flexDirection: "column", ml: 3 }}>
            <FormControlLabel
              label={"support".toUpperCase()}
              control={
                <Checkbox checked={checked[0]} onChange={handleChange2} />
              }
            />
            <FormControlLabel
              label={"customer success".toUpperCase()}
              control={
                <Checkbox checked={checked[1]} onChange={handleChange3} />
              }
            />
          </Box>
        </div>
        <div>
          <FormControlLabel
            label={"design".toUpperCase()}
            control={
              <Checkbox
                checked={checked2[0] && checked2[1] && checked2[2]}
                indeterminate={(checked2[0] !== checked2[1]) !== checked2[2]}
                onChange={handleChange4}
              />
            }
          />
          <Box sx={{ display: "flex", flexDirection: "column", ml: 3 }}>
            <FormControlLabel
              label={"Graphic Design".toUpperCase()}
              control={
                <Checkbox checked={checked2[0]} onChange={handleChange5} />
              }
            />

            <FormControlLabel
              label={"Product Design".toUpperCase()}
              control={
                <Checkbox checked={checked2[1]} onChange={handleChange6} />
              }
            />
            <FormControlLabel
              label={"Web design".toUpperCase()}
              control={
                <Checkbox checked={checked2[2]} onChange={handleChange7} />
              }
            />
          </Box>
        </div>
      </Box>
    </div>
  );
};

export default SecondPage;
