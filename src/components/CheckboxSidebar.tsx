import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/20/solid";
import { Box, Checkbox, FormControlLabel } from "@mui/material";
import { useState } from "react";

interface CheckboxSidebarProps {
  item: {
    department: string;
    sub_departments: string[];
  };
}

const CheckboxSidebar: React.FC<CheckboxSidebarProps> = ({ item }) => {
  const [checked, setChecked] = useState([false, false, false]);
  const [subDepartment, setSubDepartment] = useState(false);

  const handleChange1 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked([
      event.target.checked,
      event.target.checked,
      event.target.checked,
    ]);
  };

  const handleChange2 = (
    event: React.ChangeEvent<HTMLInputElement>,
    idx: number
  ) => {
    switch (idx) {
      case 0:
        setChecked([event.target.checked, checked[1], checked[2]]);
        break;
      case 1:
        setChecked([checked[0], event.target.checked, checked[2]]);
        break;
      case 2:
        setChecked([checked[0], checked[1], event.target.checked]);
        break;
    }
  };

  const toggleParent = () => {
    setSubDepartment(!subDepartment);
  };

  return (
    <div>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <FormControlLabel
          label={item.department.toUpperCase()}
          control={
            <Checkbox
              checked={
                item.sub_departments.length === 2
                  ? checked[0] && checked[1]
                  : checked[0] && checked[1] && checked[2]
              }
              indeterminate={checked[0] !== checked[1]}
              onChange={handleChange1}
            />
          }
        />
        {subDepartment ? (
          <ChevronUpIcon
            height={25}
            style={{ cursor: "pointer" }}
            onClick={toggleParent}
          />
        ) : (
          <ChevronDownIcon
            height={25}
            style={{ cursor: "pointer" }}
            onClick={toggleParent}
          />
        )}
      </Box>

      {subDepartment && (
        <Box sx={{ display: "flex", flexDirection: "column", ml: 3 }}>
          {item.sub_departments.map((sub_department, idx) => (
            <FormControlLabel
              label={sub_department.toUpperCase()}
              control={
                <Checkbox
                  checked={checked[idx]}
                  onChange={(e) => handleChange2(e, idx)}
                />
              }
            />
          ))}
        </Box>
      )}
    </div>
  );
};

export default CheckboxSidebar;
