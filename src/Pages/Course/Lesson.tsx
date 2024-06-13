import { Box, Button, Divider, FormControl, InputLabel, MenuItem, NativeSelect, Select, Stack, Switch, TextField, Typography } from '@mui/material'
import { Component } from 'react'
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import NoImage from "../../assets/images/no-image.png"
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
import styled from '@emotion/styled';
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import MUIRichTextEditor from 'mui-rte'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { stateToHTML } from "draft-js-export-html"
import { SelectChangeEvent } from "@mui/material";

const myTheme = createTheme({
})

const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });

  interface SelectType {
    name: string;
  }

  interface LessonAlias {
    title:string;
    leaderboard_points:number;
    product_type:number;
    image_url:string;
    description:string;
    order_in_the_course: number | null;
  }

  interface Props {
    theme_index:number;
    lesson_index:number;
    lesson:LessonAlias;
    handleDeleteLessonClick: (themeId: number, lessonIndex: number) => void;
    handleLessonDataChange: (theme_id:number, lesson_id:number, e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement> | string   | SelectChangeEvent<number>) => void;
  }
  

export default class Lesson extends Component<Props> {

    product_type: SelectType[] = [
        {
          name: "Free",
        },
        {
          name: "Paid",
        },
      ];

      constructor(props:Props){
        super(props)
      }

      handleChange = (state:any) =>{
        console.log(stateToHTML(state.getCurrentContent()))
      }

  render() {
    const {lesson,lesson_index,handleDeleteLessonClick,handleLessonDataChange,theme_index} = this.props
    return (
        <Box key={lesson_index} sx={{
          marginLeft:{
            xs:0,
            md:5
          },
            boxShadow:1,
            borderRadius:3,
            marginTop:3,
            padding:1,
            bgcolor:"white"
        }}>
            <Stack divider={<Divider orientation="horizontal" flexItem />}>
            <Box
              sx={{
                margin:1,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography variant="h6">Lesson {lesson_index + 1}</Typography>

              <Stack
                direction="row"
                spacing={2}
                alignItems="center"
                divider={<Divider orientation="vertical" flexItem />}
              >
                <Box display={'flex'} alignItems={'center'}>
                <StarBorderOutlinedIcon />
                <Typography>
                 {lesson.leaderboard_points} pts
                </Typography>
                </Box>
                
                <Button variant='outlined' color='error'sx={{
                  borderRadius:3
                }} size='small' startIcon={<DeleteForeverOutlinedIcon/>} onClick={()=>handleDeleteLessonClick(theme_index,lesson_index)}>
                    Delete Lesson
                </Button>
              </Stack>
            </Box>
            <Stack
              sx={{
                flexDirection:{
                  md:"row",
                  xs:"column"
                }
              }}
              divider={<Divider orientation="vertical" flexItem />}
            >
              <Box
                sx={{
                  width:{
                    md:"50%",
                    xs:"100%"
                  },
                  padding:{
                    md:2,
                    xs:0
                  },
                  paddingTop:{
                    xs:2
                  }
                }}
              >
                <Stack direction="column">
                  <TextField
                    id="filled-helperText"
                    label="Title"
                    variant="outlined"
                    name='title'
                    value={lesson.title}
                    onChange={(e)=>handleLessonDataChange(theme_index,lesson_index,e)}
                  />

                  <Stack direction="row" marginTop={2} marginBottom={2} spacing={2}>
                  <TextField
                      fullWidth
                      id="filled-helperText"
                      label="Leadership Point"
                      variant="outlined"
                      type="number"
                      name='leaderboard_points'
                    value={lesson.leaderboard_points}
                    onChange={(e)=>handleLessonDataChange(theme_index,lesson_index,e)}
                    />
                    <TextField
                      fullWidth
                      id="filled-helperText"
                      label="Order In The Course"
                      variant="outlined"
                      type="number"
                      name='order_in_the_course'
                    value={lesson.order_in_the_course}
                    onChange={(e)=>handleLessonDataChange(theme_index,lesson_index,e)}
                    />
                    
                  </Stack>
                  <FormControl fullWidth>
                      <InputLabel id="demo-select-small-label">
                      Product Type
                      </InputLabel>
                      <Select
                        labelId="demo-select-small-label"
                        id="demo-select-small"
                        onChange={(e)=>handleLessonDataChange(theme_index,lesson_index,e)}
                        label="Age"
                        value={lesson.product_type}
                        name="product_type"
                      >
                        <MenuItem value="">None</MenuItem>
                        {this.product_type.map((ele: SelectType, index: number) => {
                          return (
                            <MenuItem key={index} value={index}>
                              {ele.name}
                            </MenuItem>
                          );
                        })}
                      </Select>
                    </FormControl>
                    <Box
                  sx={{
                    display: "flex",
                    marginTop:2
                  }}
                >
                  <Box
                    sx={{
                        width: "40%",
                        }}
                  >
                    <img src={lesson.image_url?lesson.image_url: NoImage} alt="No Image" height={"100px"} width={"100px"} />
                  </Box>

                  <Stack
                    sx={{
                      width: "60%",
                    }}
                    direction="column"
                  >
                    <Typography>Overview Picture</Typography>
                    <Typography>Minimal Picture: 343x193 px</Typography>
                    <Typography>Maximum size: 5 mb</Typography>
                    <Button
                      component="label"
                      role={undefined}
                      variant="contained"
                      tabIndex={-1}
                      startIcon={<CloudUploadIcon />}
                    >
                      Upload file
                      <VisuallyHiddenInput type="file" onChange={(e)=>handleLessonDataChange(theme_index,lesson_index,e)} />
                    </Button>
                  </Stack>
                </Box>
                </Stack>
              </Box>
              <Box
                sx={{
                  width:{
                    md:"50%",
                    xs:"100%"
                  },
                  paddingTop:{
                    xs:2
                  },
                  padding:{
                    md:0,
                    xs:1
                  },
                  border:1,
                  borderRadius:3,
                  margin:{
                    xs:0,
                    md:3
                  },
                  marginTop:{
                    md:0,
                    xs:3
                  }
                }}
              >
                <ThemeProvider theme={myTheme}>
                    <MUIRichTextEditor 
                        label="Lesson Content"
                        onChange={(state)=>handleLessonDataChange(theme_index,lesson_index,stateToHTML(state.getCurrentContent()))}
                    />
                </ThemeProvider>  
              </Box>
             
            </Stack>
          </Stack>

        </Box>
    )
  }
}
