import * as React from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TableHead from '@mui/material/TableHead';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Outlet, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import { Tooltip, Typography } from '@mui/material';
import { CategoryContext } from '../../contexts/CategoryContext';

import Moment from 'react-moment';

function TablePaginationActions(props) {
    const theme = useTheme();
    const { count, page, rowsPerPage, onPageChange } = props;

    const handleFirstPageButtonClick = (event) => {
        onPageChange(event, 0);
    };

    const handleBackButtonClick = (event) => {
        onPageChange(event, page - 1);
    };

    const handleNextButtonClick = (event) => {
        onPageChange(event, page + 1);
    };

    const handleLastPageButtonClick = (event) => {
        onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };

    return (
        <Box sx={{ flexShrink: 0, ml: 2.5 }}>
            <IconButton
                onClick={handleFirstPageButtonClick}
                disabled={page === 0}
                aria-label="first page"
            >
                {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
            </IconButton>
            <IconButton
                onClick={handleBackButtonClick}
                disabled={page === 0}
                aria-label="previous page"
            >
                {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            </IconButton>
            <IconButton
                onClick={handleNextButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="next page"
            >
                {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
            </IconButton>
            <IconButton
                onClick={handleLastPageButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="last page"
            >
                {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
            </IconButton>
        </Box>
    );
}

TablePaginationActions.propTypes = {
    count: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
};


export default function Categories() {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const navigate = useNavigate()


    const { cateSate: { categories }, getAllCategories, deleteCate } = useContext(CategoryContext)
    React.useEffect(() => getAllCategories(), [])


    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - categories.length) : 0;

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    const removeCategory = async (_id, cateName) => {
        if (removeCategory) {
            alert("You delete " + cateName)
            const message = await deleteCate(_id)
            getAllCategories()
        }
        console.log("remove")
    }
    return (
        <Box>
            <Box >
                <Box>
                    <Typography variant='h4'>
                        Categories Management
                    </Typography>
                </Box>
                <Box display={'flex'} alignItems='center'>
                    <IconButton onClick={() => navigate('/home/new-category')}>
                        <Tooltip title="Add new department">
                            <AddCircleIcon fontSize='large' />
                        </Tooltip>
                    </IconButton>
                </Box>
            </Box>

            <TableContainer component={Paper} elevation={12}>
                <Table sx={{}} aria-label="custom pagination table">
                    <TableHead>
                        <TableRow>
                            <TableCell >Name</TableCell>
                            <TableCell align="right">Department</TableCell>
                            <TableCell align="right">Start Day</TableCell>
                            <TableCell align="right">End Day</TableCell>
                            <TableCell align="right">Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {(rowsPerPage > 0
                            ? categories.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            : categories
                        ).map((data) => (
                            <TableRow key={data._id}>
                                <TableCell>
                                    {data.name_category}
                                </TableCell>
                                <TableCell style={{ width: 160 }} align="right">
                                    {data.name_depart}
                                </TableCell>
                                <TableCell style={{ width: 300 }} align="right">
                                    <Moment format="YYYY/MM/DD" >{data.start_day}</Moment>
                                </TableCell>
                                <TableCell style={{ width: 300 }} align="right">

                                    <Moment format="YYYY/MM/DD" >{data.end_day}</Moment>
                                </TableCell>
                                <TableCell style={{ width: 160 }} align="right">
                                    <IconButton onClick={() => removeCategory(data._id, data.name_category)}>
                                        <DeleteIcon fontSize='large' />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                        {emptyRows > 0 && (
                            <TableRow style={{ height: 53 * emptyRows }}>
                                <TableCell colSpan={6} />
                            </TableRow>
                        )}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TablePagination
                                rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                                count={categories.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                SelectProps={{
                                    inputProps: {
                                        'aria-label': 'rows per page',
                                    },
                                    native: true,
                                }}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                                ActionsComponent={TablePaginationActions}
                            />
                        </TableRow>
                    </TableFooter>
                </Table>
            </TableContainer>
            <Outlet />
        </Box>
    );
}
