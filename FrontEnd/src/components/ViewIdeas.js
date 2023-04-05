import { Paper, Grid, Avatar, Divider, Box, TextareaAutosize, IconButton, Button, TextField } from '@mui/material'
import React, { useContext, useState } from 'react'

import Typography from '@mui/material/Typography';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import CommentIcon from '@mui/icons-material/Comment';
import { useNavigate } from 'react-router-dom';

import { BlogContext } from '../contexts/BlogContext';
import { CommentContext } from '../contexts/CommentContext';

const ViewIdeas = () => {

    const [valueThum_Up, setValueThumpUp] = useState(0)
    const [valueThum_Down, setValueThumpDown] = useState(0)
    const [stateThumUp, setStateThumUp] = useState(false)
    const [stateThumDown, setStateThumDown] = useState(false)
    const [openInput, setOpenInput] = useState('none')

    const [comment, setComment] = useState('')

    const navigate = useNavigate()

    const onChangeComment = (event) => {
        setComment(event.target.value)
    }

    //view all ideas
    const { BlogState: { blogs }, getAllBlogs } = useContext(BlogContext)
    React.useEffect(() => getAllBlogs(), [getAllBlogs])

    const { CommentState: { Comments }, addNewComment, getCommentByBlogId, blog_like } = useContext(CommentContext)

    const changeValueThumpUp = async (id) => {
        const response = await blog_like(id)
        console.log("like", response)
        setStateThumUp(!stateThumUp)
        getAllBlogs()

    }

    const showInputComment = (id) => {
        getCommentByBlogId(id)
        setOpenInput("initial")
    }
    const loseInputComment = () => {
        setOpenInput('none')
    }
    console.log("state up", stateThumUp, "state down", stateThumDown, "value up ", valueThum_Up, 'value down', valueThum_Down)

    const SubmitComment = async (id) => {
        const response = await addNewComment(comment, id)
        console.log('comment response', response)
        loseInputComment()
        getAllBlogs()
    }

    console.log("Data", Comments)

    return (
        <>
            {blogs.map((oneblog) => (
                <Box key={oneblog._id}>
                    <Paper elevation={8} sx={{ width: '60%', margin: "0px auto", height: 'auto', padding: 2, marginTop: 1 }}   >
                        <Grid display={'flex'}  >
                            <Avatar />
                            <Grid display={'block'}  >
                                {oneblog.anonymous ? <Typography variant='h6'> Secret User</Typography> :
                                    <Typography variant='h6'>{oneblog.creator.username}</Typography>}
                            </Grid>
                            <Grid marginLeft={'auto'} display={'flex'}>
                                <Typography variant='h6' marginRight={5} >
                                    Dep:
                                    {oneblog.department_details.name_department}
                                </Typography>
                                <Typography variant='h6' >
                                    Cate:
                                    {oneblog.category_details.name_category}
                                </Typography>
                            </Grid>
                        </Grid>
                        <Divider sx={{ mb: 1 }} />
                        <Box >
                            <TextareaAutosize
                                maxRows={2}
                                minRows={2}
                                defaultValue={oneblog.content}
                                disabled
                                style={{ width: "100%", fontSize: 20, border: 0, background: 'white', color: 'black', p: 1 }} />
                        </Box>
                        <br />
                        <Box textAlign='center'>
                            <img style={{ width: '200px', height: '200px' }} src={oneblog.image_url} />
                        </Box>
                        <Divider />
                        <Box textAlign='-webkit-center'  >
                            <Grid display={"flex"} justifyContent='space-between' marginTop={1} mb={-1}>
                                <Box display={"flex"} width={'30%'} justifyContent='space-between' >
                                    <Box alignItems={'center'} display={"flex"}>
                                        <IconButton onClick={() => changeValueThumpUp(oneblog._id)}>
                                            <ThumbUpIcon fontSize='large' />
                                        </IconButton>
                                        {valueThum_Up < 0 ? <Typography>0</Typography> : <Typography>{oneblog.likes_count}</Typography>}
                                    </Box>
                                    <Box alignItems={'center'} display={"flex"}>
                                        <CommentIcon fontSize='large' onClick={() => showInputComment(oneblog._id)} />
                                        <Typography>{oneblog.comments_count}</Typography>
                                    </Box>
                                </Box>
                            </Grid>

                        </Box>
                        {oneblog._id && Comments.map((data, index) => (
                            oneblog._id === data.blog_id ?
                                <Box display={openInput} key={data._id}>
                                    <Divider />
                                    <Box mt={1} mb={1} display='flex'>
                                        <Avatar />
                                        <Typography ml={1} variant='h5'>{data.user.username}</Typography>
                                    </Box>
                                    <Divider />
                                    <Typography ml={5} variant='h6'>Content: {data.comment}</Typography>
                                </Box> : null
                        ))}
                        <Box display={openInput} mt={1}>
                            <Divider sx={{ mb: 1 }} />
                            <Typography variant='h5'>Your comment</Typography>
                            <TextField
                                style={{ width: '100%', fontSize: 18 }}
                                // minRows={3}
                                onChange={onChangeComment}
                                value={comment}
                            />
                            <Box display={"flex"} sx={{ mt: 1 }}>
                                <Box>
                                    <Button sx={{ mr: 5 }} onClick={() => SubmitComment(oneblog._id)} variant='contained'>Submit</Button>
                                    <Button onClick={() => loseInputComment()} variant='contained'>Cancel</Button>
                                </Box>
                            </Box>
                        </Box>

                    </Paper>

                </Box >
            ))}
        </>
    )
}
export default ViewIdeas