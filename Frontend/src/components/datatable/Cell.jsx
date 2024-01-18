import { useEffect, useState } from "react";

const Cell = ({ getValue, row, column, table }) => {
  const initialValue = getValue().toString();
  const [value, setValue] = useState(initialValue);

  // When the input is blurred, we'll call our table meta's updateData function
  const onBlur = () => {
    table.options.meta?.updateData(row.index, column.id, value);
  };

  // If the initialValue is changed external, sync it up with our state
  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  return (
    <div>{value}</div>
  );
};
export default Cell;
