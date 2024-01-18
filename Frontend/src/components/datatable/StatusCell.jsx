import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils";
 
export function BadgeDemo() {
  return <Badge>Badge</Badge>
}

const StatusCell = ({ getValue, row, column, table }) => {
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
    <div>
      {value == 0? 
        <Badge className={cn("bg-gray-950 dark:bg-primary text-white px-5 py-1.5", "font-semibold")}>
          Offline
        </Badge>    :  
        <Badge className={cn("bg-primary dark:bg-teal-500 px-5 py-1.5", "font-semibold")}>
          Online
        </Badge>     
      }
    </div>
  );
};
export default StatusCell;
