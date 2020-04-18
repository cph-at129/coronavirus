import React, { useEffect, useState, useMemo } from 'react'
import { Container, Row, Table, Pagination } from 'react-bootstrap'
import { useTable, useSortBy, usePagination } from 'react-table'
import CountUp from 'react-countup'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSort, faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons'
import { getData } from '../../api/api'

const Dashboard = () => {
    const [data, setData] = useState({
        columns: [],
        rows: []
    })
    useEffect(() => {
        const getDataWrapper = async () => {
            setData(await getData())
        }
        getDataWrapper()
    }, [])

    const rowsData = useMemo(() => data.rows, [data.rows])
    const cols = useMemo(() => data.columns, [data.columns])

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        canPreviousPage,
        canNextPage,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        state: { pageIndex },
        prepareRow,
    } = useTable({ columns: cols, data: rowsData, initialState: { pageIndex: 0 } }, useSortBy, usePagination)

    return (
        <Container className="mt-3">
            <Table className="shadow" responsive variant="dark" striped bordered hover {...getTableProps()}>
                    <thead>
                        {headerGroups.map(headerGroup => (
                            <tr {...headerGroup.getHeaderGroupProps()}>
                                {headerGroup.headers.map(column => (
                                    <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                                        <span>{column.render('Header')}</span>
                                        <span className="ml-1">{column.isSorted
                                            ? column.isSortedDesc
                                                ? <FontAwesomeIcon icon={faSortDown} />
                                                : <FontAwesomeIcon icon={faSortUp} />
                                            : <FontAwesomeIcon icon={faSort} />}
                                        </span>
                                    </th>
                                  ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody {...getTableBodyProps()}>
                        {page.map((row, index) => {
                            prepareRow(row)
                            return (
                                <tr {...row.getRowProps()}>
                                    {row.cells.map(cell => {
                                        return <td {...cell.getCellProps()}>{
                                             !isNaN(Number(cell.value)) && cell.value !== '' ? <CountUp end={Number(cell.value)} duration={1} /> : cell.render('Cell')
                                        }</td>
                                    })}
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>
            <Pagination >
                    <Pagination.First onClick={() => gotoPage(0)} disabled={!canPreviousPage} />
                    <Pagination.Prev onClick={() => previousPage()} disabled={!canPreviousPage} />
                    <Pagination.Item>{pageIndex + 1}</Pagination.Item>
                    <Pagination.Next onClick={() => nextPage()} disabled={!canNextPage} />
                    <Pagination.Last onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage} />
                </Pagination>
        </Container>
    )
}

export default Dashboard

