import React, { useContext, useState, useEffect } from 'react';
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
import { Avatar, Tooltip, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { confirmAlert } from 'react-confirm-alert';

//context 
import { AuthContext } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';



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

export default function ManagementUser() {
    const { authState: { Users }, getAllUser, deleteUser } = useContext(AuthContext)
    useEffect(() => getAllUser(), [])

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - Users.length) : 0;

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    const navigate = useNavigate()

    const Delete = async (id) => {
        confirmAlert({
            title: 'Warning',
            message: 'Are you sure to do this.',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => DeleteConfirm(id)
                },
                {
                    label: 'No',
                    onClick: () => getAllUser()
                }
            ]
        });
    }
    const DeleteConfirm = async (id) => {
        const response = await deleteUser(id)
        console.log("mes: ", response)
        getAllUser()
    }
    return (
        <Box>
            <Box >
                <Box>
                    <Typography variant='h4'>
                        Users Management
                    </Typography>
                </Box>
                <Box display={'flex'} alignItems='center'>
                    <IconButton onClick={() => navigate('/home/register-user')}>
                        <Tooltip title="Add new user">
                            <AddCircleIcon fontSize='large' />
                        </Tooltip>
                    </IconButton>
                </Box>
            </Box>

            <TableContainer component={Paper} elevation={12}>
                <Table sx={{}} aria-label="custom pagination table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="left">Email</TableCell>
                            <TableCell align="left">UserName</TableCell>
                            <TableCell align="center">Role</TableCell>
                            <TableCell align="center">Status</TableCell>
                            <TableCell align="center">Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {(rowsPerPage > 0
                            ? Users.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            : Users
                        ).map((data) => (
                            <TableRow key={data._id}>
                                <TableCell align="left">
                                    {data.email}
                                </TableCell>
                                <TableCell align="left">
                                    {data.username}
                                </TableCell>
                                <TableCell align='center' >
                                    {data.role}
                                </TableCell>
                                <TableCell align="center">
                                    {data.status === 0 ? <Typography sx={{ color: 'red' }}>Not Active</Typography> : <Typography color={{ color: 'green' }}>Active</Typography>}
                                </TableCell>
                                <TableCell align="center">
                                    <IconButton onClick={() => Delete(data._id)} >
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
                                count={Users.length}
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
        </Box>
    );
}
