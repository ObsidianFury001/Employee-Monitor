import React, { useState } from 'react'
import columns from '../datatable/Columns'

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

function DataTable() {

	// Initialize React Table
	const table = useReactTable({
		columns,
		rows,
		getCoreRowModel: getCoreRowModel(),
	})
    console.log(table)
    // console.log(rows)
    return (
        <Table>
            <TableHeader>
                {/* <TableRow key={1}>
							{
								colDefs.map((header) => {
									return (
										<TableHead key={header.id}>
											{header.field}
										</TableHead>
									)
								})
							}
						</TableRow> */}
                {table.getHeaderGroups().map((headerGroup) => (
                    <TableRow key={headerGroup.id}>
                        {headerGroup.headers.map((header) => (
                            <TableHead key={header.id}>
                                {
                                    flexRender(header.column.columnDef.header,
                                        header.getContext())
                                }
                            </TableHead>
                        ))}
                    </TableRow>
                ))}
            </TableHeader>
            <TableBody>
                {table.getRowModel().rows.map((row) => (
                <div className="tr" key={row.id}>
                    {row.getVisibleCells().map((cell) => (
                    <div className="td" key={cell.id}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </div>
                    ))}
                </div>
                ))
                    /*
                    table.getRowModel().rows.map((row) => (
                    	
                        <TableRow key={row.id}>
                        {
                            row.cells.map((cell) => {
                                return (
                                    <TableRow key={cell.id}>
                                        <TableCell key={cell.name}>
                                            {cell.name}
                                        </TableCell>
                                        <TableCell key={cell.username}>
                                            {cell.username}
                                        </TableCell>
                                        <TableCell key={cell.age}>
                                            {cell.age}
                                        </TableCell>
                                        <TableCell key={cell.name}>
                                            {cell.status ? "Online" : "Offline"}
                                        </TableCell>
                                    </TableRow>
                                )
                            })
                        }
                        </TableRow>
                    )) 

                    rows.map((cell) => {
                        return (
                            <TableRow key={cell.id}>
                                <TableCell key={cell.name}>
                                    {cell.name}
                                </TableCell>
                                <TableCell key={cell.username}>
                                    {cell.username}
                                </TableCell>
                                <TableCell key={cell.age}>
                                    {cell.age}
                                </TableCell>
                                <TableCell key={cell.name}>
                                    {cell.status ? "Online" : "Offline"}
                                </TableCell>
                            </TableRow>
                        )
                    })  
                    */
                }
            </TableBody>
        </Table>
    )
}

export default DataTable