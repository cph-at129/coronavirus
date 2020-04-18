import { readString } from 'react-papaparse'
import { get } from 'axios'
import moment from 'moment'
import { FIELDS, SORT_BY, ADMIN_FIELD } from '../constants/constants'

const url = `https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports/${moment().subtract(25, 'hours').format('MM-DD-YYYY')}.csv`

export const getData = async () => {
    const { data: csv } = await get(url)
    const { data = [] } = readString(csv)
    let columns = []
    if (data.length > 0) {
        columns = data[0]
        data.shift()
    }
    return transformData({ columns, rows: data })
}

const transformData = ({ columns, rows }) => ({
    columns: columns
        .filter(column => !FIELDS.includes(column))
        .map((column, index) => ({
            Header: column === ADMIN_FIELD ? 'County' : column,
            accessor: `col${index + 1}`
        })),
    rows: rows.map((row) =>
        row.reduce((acc, rowData, index) => {
            if (!FIELDS.includes(columns[index])) {
                acc[columns[index]] = rowData
                acc[`col${acc.nextKey || 1}`] = rowData
                acc.nextKey = acc.nextKey ? acc.nextKey + 1 : 2
            }
            return acc
        }, {})).sort((a, b) => Number(a[SORT_BY]) >= Number(b[SORT_BY]) ? -1 : 1)
})