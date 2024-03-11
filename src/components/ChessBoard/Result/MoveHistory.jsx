import React from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from 'flowbite-react'

const MoveHistory = (props) => {

    const { history } = props;

    return (
        <Table striped>
            <TableHead>
                <TableHeadCell className='text-center'>
                    Turn
                </TableHeadCell>
                <TableHeadCell className='text-center'>
                    Move
                </TableHeadCell>
            </TableHead>
            <TableBody className="divide-y">
                {history.map((item, index) => (
                    <TableRow key={index} className=" bg-white dark:border-gray-700 dark:bg-gray-800">
                        <TableCell className="whitespace-nowrap text-center font-medium text-gray-900 dark:text-white">
                            {item.color}
                        </TableCell>
                        <TableCell className='text-center'>
                            {item.move}
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}

export default MoveHistory
