import React, { useState } from 'react'

// Buttons
import ColumnFilter from '@/components/datatable/ColumnFilter';
import { Button } from '@/components/ui/button';

// Datatables
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

import {
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table"
import { ArrowDown, ArrowUp, ArrowUpDown } from 'lucide-react';
import { cn } from '@/lib/utils';

function DataTable({ columns, data }) {
    // Column Filters
    const [columnFilters, setColumnFilters] = useState([{
        id: "username",
        value: ""
    }]);

    // Initialize React Table
    const table = useReactTable({
        columns,
        data,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        state: {
            columnFilters,
            //   pagination: true,
            //   columnVisibility: true,
            //   columnFilters: true,
            //   rowSelection: true,
        },
    })

    return (

        <div className='container w-full'>
            <div className='flex justify-start items-center py-2'>
                <ColumnFilter columnFilters={columnFilters}
                    setColumnFilters={setColumnFilters} />
            </div>
            <div className="py-2">
                <div className="w-full rounded-md border-2 p-2">
                    {
                        <Table>
                            <TableHeader className>
                                {table.getHeaderGroups().map((headerGroup) => (
                                    <TableRow key={headerGroup.id}>
                                        {headerGroup.headers.map((header) => (
                                            <TableHead key={header.id}>
                                                <Button className={cn("px-2")}
                                                    variant="ghost"
                                                    onClick={header.column.getToggleSortingHandler()}>
                                                    {
                                                        flexRender(header.column.columnDef.header,
                                                            header.getContext())
                                                    }
                                                    {
                                                        {
                                                            asc: flexRender(<ArrowUp className="ml-2 h-4 w-4"></ArrowUp>),
                                                            desc: flexRender(flexRender(<ArrowDown className="ml-2 h-4 w-4"></ArrowDown>))
                                                        }[header.column.getIsSorted() ?? null]
                                                    }
                                                </Button>
                                            </TableHead>
                                        ))}
                                    </TableRow>
                                ))}
                            </TableHeader>
                            <TableBody>
                                {
                                    table.getRowModel().rows?.length ?
                                        table.getRowModel().rows.map((row) => (
                                            <TableRow key={row.id}
                                                className="h-12 px-2">
                                                {row.getVisibleCells().map((cell) => (
                                                    <TableCell key={cell.id} className="px-4">
                                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                                    </TableCell>
                                                ))}
                                            </TableRow>
                                        )) :
                                        <TableRow>
                                            <TableCell
                                                colSpan={columns.length}
                                                className="h-16 text-lg font-light text-center">
                                                No employee data found.
                                            </TableCell>
                                        </TableRow>
                                }
                            </TableBody>
                        </Table>
                    }
                </div>
                <div className="flex flex-col sm:flex-row flex-wrap gap-1
                                    justify-between sm:justify-end
                                    items-center sm:items-center 
                                    space-x-2 py-4">
                    <div className="flex-1 text-sm text-muted-foreground m-1">
                        {table.getFilteredRowModel().rows.length} record(s).
                    </div>
                    <div className="w-[100%] sm:w-auto
                                    space-x-0  md:space-x-2 
                                    flex flex-wrap justify-center gap-2">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => table.previousPage()}
                            disabled={!table.getCanPreviousPage()}
                            className={cn("w-[100%] min-w-[75px] max-w-[175px] sm:w-auto")}>
                            Previous
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => table.nextPage()}
                            disabled={!table.getCanNextPage()}
                            className={cn("w-[100%] min-w-[75px] max-w-[175px] sm:w-auto")}>
                            Next
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DataTable