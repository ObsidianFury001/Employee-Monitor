import Cell from '@/components/datatable/Cell';
import { Button } from '@/components/ui/button';
import { ArrowUpDown } from 'lucide-react';
import StatusCell from './StatusCell';

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
];

export default columns