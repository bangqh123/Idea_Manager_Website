import React, { useContext, useState } from 'react'
import { Box, Button, TextareaAutosize, TextField, Grid, FormControl, NativeSelect, } from '@mui/material'
import { DepartmentContext } from '../../contexts/DepartmentContext';
import { useNavigate } from 'react-router-dom';


import Paper from '@mui/material/Paper';
import { CategoryContext } from '../../contexts/CategoryContext';


const AddNewCategory = () => {

    const { departSate: { departments }, getAllDepartments } = useContext(DepartmentContext)
    const { addNewCate } = useContext(CategoryContext)
    React.useEffect(() => getAllDepartments(), [])
    const [CateForm, setCateForm] = useState({
        name_category: '',
        name_depart: '',
        start_day: '',
        end_day: ''
    })

    const [date, changeDate] = useState(new Date());

    const navigate = useNavigate()


    //React.useEffect(() => addNewDepartment(), [])

    const { name_category, name_depart, start_day, end_day } = CateForm

    const onChangeCateForm = (event) =>
        setCateForm({ ...CateForm, [event.target.name]: event.target.value })

    const onSubmit = async (event) => {

        event.preventDefault();
        try {

            const NewCateData = await addNewCate(CateForm);
            console.log("new-data", NewCateData)
            if (NewCateData) {
                return navigate('/home/categories')
            }
        } catch (error) {
            console.log(error);
        }
    };


    return (
        <>
          <Box
            component={Paper}
            elevation={12}
            padding={2}
            sx={{ width: "70%", margin: "50px auto", textAlign: "center" }}
          >
            <Box>
              <h1>Add New Category</h1>
            </Box>
            <form onSubmit={onSubmit}>
              <Box display={"block"}>
                <Box
                  display={"flex"}
                  sx={{
                    alignItems: "center",
                  }}
                >
                  <Box sx={{ width: "15%", marginLeft: 10, textAlign: "left" }}>
                    <h3>Name Cate:</h3>
                  </Box>
                  <Box sx={{ width: "70%" }}>
                    <TextField
                      value={name_category}
                      onChange={onChangeCateForm}
                      name="name_category"
                      sx={{ background: "white" }}
                      fullWidth
                      size="small"
                      placeholder="Category Name"
                    />
                  </Box>
                </Box>
                <Box
                  display={"flex"}
                  sx={{
                    alignItems: "center",
                  }}
                >
                  <Box sx={{ width: "15%", marginLeft: 10, textAlign: "left" }}>
                    <h3>Department:</h3>
                  </Box>
                  <Box sx={{ minWidth: 120 }}>
                    <FormControl fullWidth>
                      <NativeSelect
                        onChange={onChangeCateForm}
                        value={name_depart}
                        name="name_depart"
                      >
                        <option>None</option>
                        {departments.map((data) => (
                          <option key={data._id}>{data.name_department}</option>
                        ))}
                      </NativeSelect>
                    </FormControl>
                  </Box>
                </Box>
                <Box
                  display={"flex"}
                  sx={{
                    alignItems: "center",
                  }}
                >
                  <Box display={"flex"} sx={{ width: "50%" }}>
                    <Box sx={{ width: "30%", marginLeft: 10, textAlign: "left" }}>
                      <h3>Start Day:</h3>
                    </Box>
                    <Box sx={{ minWidth: 120 }}>
                      <FormControl fullWidth>
                        <TextField
                          type="date"
                          value={start_day}
                          onChange={onChangeCateForm}
                          name="start_day"
                          placeholder="start_day"
                          style={{ fontSize: 17 }}
                        />
                      </FormControl>
                    </Box>
                  </Box>
                  <Box display={"flex"} sx={{ width: "50%" }}>
                    <Box sx={{ width: "30%", marginLeft: 10, textAlign: "left" }}>
                      <h3>End Day:</h3>
                    </Box>
                    <Box sx={{ minWidth: 120 }}>
                      <FormControl fullWidth>
                        <TextField
                          type="date"
                          value={end_day}
                          onChange={onChangeCateForm}
                          name="end_day"
                          placeholder="end_day"
                          style={{ fontSize: 17 }}
                        />
                      </FormControl>
                    </Box>
                  </Box>
                </Box>
                <Grid sx={{ textAlign: "center" }}>
                  <Box
                    display={"flex"}
                    sx={{
                      mt: 5,
                      mb: 5,
                      justifyContent: "space-between",
                    }}
                  >
                    <Box sx={{ width: "50%" }}>
                      <Button
                        variant="contained"
                        color="success"
                        sx={{
                          ml: 9,
                          height: 50,
                          width: 120,
                        }}
                        type='submit'
                      >
                        Add
                      </Button>
                    </Box>
                    <Box sx={{ width: "50%" }}>
                      <Button
                        variant="contained"
                        color="error"
                        sx={{
                          height: 50,
                          width: 120,
                        }}
                        onClick={() => navigate('/home/categories')}
                      >
                        Cancel
                      </Button>
                    </Box>
                  </Box>
                </Grid>
              </Box>
            </form>
          </Box>
        </>
      );
}

export default AddNewCategory
