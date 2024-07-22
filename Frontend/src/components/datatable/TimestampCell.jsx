import { useEffect, useState } from "react";
import moment from "moment";

const TimestampCell = ({ getValue, row, column, table }) => {
  const initialValue = getValue().toString();
  const [formattedValue, setFormattedValue] = useState(initialValue);

  const formatTimestamp = (timestamp) => {
    return moment(String(timestamp)).format('lll')
  };

  const onBlur = () => {
    table.options.meta?.updateData(row.index, column.id, formattedValue);
  };

  useEffect(() => {
    setFormattedValue(formatTimestamp(initialValue));
  }, [initialValue]);

  return <div>{formattedValue}</div>;
};

export default TimestampCell;
