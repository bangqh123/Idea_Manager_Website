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
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Outlet, useNavigate } from 'react-router-dom';


import { DepartmentContext } from '../../contexts/DepartmentContext'
import { useContext } from 'react';

import { Tooltip, Typography, Alert } from '@mui/material';
import 'react-confirm-alert/src/react-confirm-alert.css';


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

export default function Department() {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const navigate = useNavigate()

    //context
    const { departSate: { departments, departmentsLoading, }, getAllDepartments, deleteDepart } = useContext(DepartmentContext)
    React.useEffect(() => getAllDepartments(), [])



    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - departments.length) : 0;

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const removeDepartment = async (_id, nameDepart) => {
        if (removeDepartment) {
            alert("Detele deparment " + nameDepart)
            const message = await deleteDepart(_id)
            getAllDepartments()
        }
    }
    return (
        <Box>
            <Box >
                <Box>
                    <Typography variant='h4'>
                        Department Management
                    </Typography>
                </Box>
                <Box display={'flex'} alignItems='center'>
                    <IconButton onClick={() => navigate('/home/new-department')}>
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
                            <TableCell >Name Department</TableCell>
                            <TableCell align="center">Owner</TableCell>
                            <TableCell align="left">Description</TableCell>
                            <TableCell align="center">Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {(rowsPerPage > 0
                            ? departments.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            : departments
                        ).map((data) => (
                            <TableRow key={data._id}>
                                <TableCell >{data.name_department}</TableCell>
                                <TableCell align="center">{data.email}</TableCell>
                                <TableCell align="left">{data.description}</TableCell>
                                <TableCell align='center'>
                                    <IconButton onClick={() => removeDepartment(data._id, data.name_department)}>
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
                                count={departments.length}
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
