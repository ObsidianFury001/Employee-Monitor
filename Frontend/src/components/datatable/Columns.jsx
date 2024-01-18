// Cells
import Cell from '@/components/datatable/Cell';
import StatusCell from './StatusCell';
import TimestampCell from './TimestampCell';

// Icons
import { Button } from '@/components/ui/button';
import { ArrowUpDown } from 'lucide-react';

const columns = [
	{
		accessorKey: "id",
		header: "ID",
		cell: Cell,
	},
	{
		accessorKey: "name",
		header: "Name",
		cell: Cell,            
        /* header: ({ column }) => {
            return (
            <Button
                variant="ghost"
            >
                Name
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
            )
        }, */
	},
	{
		accessorKey: "username",
		header: "Username",
		cell: Cell,
	},
	{
		accessorKey: "age",
		header: "Age",
		cell: Cell,
	},
	{
		accessorKey: "status",
		header: "Status",
		cell: StatusCell,
	},
	{
		accessorKey: "last_seen",
		header: "Last Seen",
		cell: TimestampCell,
	},
];

export default columns