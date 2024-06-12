import {
  Box,
  Button,
  Divider,
  FormControl,
  InputLabel,
  NativeSelect,
  Stack,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { Component } from "react";
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
import TimerOutlinedIcon from "@mui/icons-material/TimerOutlined";
import styled from "@emotion/styled";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import NoImage from "../../assets/images/no-image.png"
import Theme from "./Theme";
import Lesson from "./Lesson";
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';

interface SelectType {
  name: string;
}

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

interface Props {
  handleAddThemeClick: () => void; 
  handleDeleteThemeClick: (id:number) => void; 
  course_themes: ThemeAlias[];
  handleAddLessonClick: (id:number) => void;
  handleDeleteLessonClick: (themeId: number, lessonIndex: number) => void;
}

interface LessonAlias {
  title:string;
  leaderboard_points:number;
  product_type:number;
  image_url:string;
  description:string;
}

interface ThemeAlias {
  title:string;
  leaderboard_points:number;
  product_type:number;
  image_url:string;
  lessons:LessonAlias[];
}

export default class CourseSection extends Component<Props> {
  category: SelectType[] = [
    {
      name: "IT",
    },
    {
      name: "CS",
    },
    {
      name: "ITI",
    },
    {
      name: "Mechanical",
    },
    {
      name: "ECE",
    },
  ];

  level: SelectType[] = [
    {
      name: "Begineer",
    },
    {
      name: "Intermediate",
    },
    {
      name: "Advance",
    },
  ];

  product_type: SelectType[] = [
    {
      name: "Free",
    },
    {
      name: "Paid",
    },
  ];

  language: SelectType[] = [
    {
      name: "English",
    },
    {
      name: "Hindi",
    },
  ];

  certificate: SelectType[] = [
    {
      name: "WSET",
    },
  ];

  constructor(props:Props){
    super(props)
  }

  render() {
    const {handleAddThemeClick, handleAddLessonClick,handleDeleteThemeClick,handleDeleteLessonClick, course_themes} = this.props
    return (
      <Box
        sx={{
          width: "70%",
          padding: 4,
        }}
      >
        <Box
          sx={{
            borderRadius:3,
            border: 1,
            padding: 1,
          }}
        >
          <Stack divider={<Divider orientation="horizontal" flexItem />}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography variant="h6">Course Information</Typography>

              <Stack
                direction="row"
                spacing={2}
                alignItems="center"
                divider={<Divider orientation="vertical" flexItem />}
              >
                <Typography alignItems="center">
                  <StarBorderOutlinedIcon />
                  10 pts
                </Typography>
                <Typography>
                  <TimerOutlinedIcon />
                  24H 30M
                </Typography>
                <Typography>
                  Active
                  <Switch defaultChecked />
                </Typography>
              </Stack>
            </Box>
            <Stack
              direction="row"
              divider={<Divider orientation="vertical" flexItem />}
            >
              <Box
                sx={{
                  width: "50%",
                  padding: 2,
                }}
              >
                <Stack direction="column">
                  <TextField
                    id="filled-helperText"
                    label="Course Name"
                    variant="filled"
                  />

                  <Stack direction="row">
                    <FormControl fullWidth>
                      <InputLabel
                        variant="standard"
                        htmlFor="uncontrolled-native"
                      >
                        Duration
                      </InputLabel>
                      <NativeSelect
                        inputProps={{
                          name: "age",
                          id: "uncontrolled-native",
                        }}
                      >
                        <option></option>
                        <option value={10}>Ten</option>
                        <option value={20}>Twenty</option>
                        <option value={30}>Thirty</option>
                      </NativeSelect>
                    </FormControl>
                    <TextField
                      fullWidth
                      id="filled-helperText"
                      label="Leadership Point"
                      variant="filled"
                      type="number"
                    />
                  </Stack>
                  <Stack direction="row">
                    <FormControl fullWidth>
                      <InputLabel
                        variant="standard"
                        htmlFor="uncontrolled-native"
                      >
                        Category
                      </InputLabel>
                      <NativeSelect
                        inputProps={{
                          name: "age",
                          id: "uncontrolled-native",
                        }}
                      >
                        <option></option>
                        {this.category.map((ele: SelectType, index: number) => {
                          return (
                            <option key={index} value={index}>
                              {ele.name}
                            </option>
                          );
                        })}
                      </NativeSelect>
                    </FormControl>
                    <FormControl fullWidth>
                      <InputLabel
                        variant="standard"
                        htmlFor="uncontrolled-native"
                      >
                        Level
                      </InputLabel>
                      <NativeSelect
                        inputProps={{
                          name: "age",
                          id: "uncontrolled-native",
                        }}
                      >
                        <option></option>
                        {this.level.map((ele: SelectType, index: number) => {
                          return (
                            <option key={index} value={index}>
                              {ele.name}
                            </option>
                          );
                        })}
                      </NativeSelect>
                    </FormControl>
                  </Stack>
                  <Stack direction="row">
                    <FormControl fullWidth>
                      <InputLabel
                        variant="standard"
                        htmlFor="uncontrolled-native"
                      >
                        Product Type
                      </InputLabel>
                      <NativeSelect
                        inputProps={{
                          name: "age",
                          id: "uncontrolled-native",
                        }}
                      >
                        <option></option>
                        {this.product_type.map(
                          (ele: SelectType, index: number) => {
                            return (
                              <option key={index} value={index}>
                                {ele.name}
                              </option>
                            );
                          }
                        )}
                      </NativeSelect>
                    </FormControl>
                    <FormControl fullWidth>
                      <InputLabel
                        variant="standard"
                        htmlFor="uncontrolled-native"
                      >
                        Language
                      </InputLabel>
                      <NativeSelect
                        inputProps={{
                          name: "age",
                          id: "uncontrolled-native",
                        }}
                      >
                        <option></option>
                        {this.language.map((ele: SelectType, index: number) => {
                          return (
                            <option key={index} value={index}>
                              {ele.name}
                            </option>
                          );
                        })}
                      </NativeSelect>
                    </FormControl>
                  </Stack>

                  <FormControl fullWidth>
                    <InputLabel
                      variant="standard"
                      htmlFor="uncontrolled-native"
                    >
                      Certificate
                    </InputLabel>
                    <NativeSelect
                    variant="filled"
                      inputProps={{
                        name: "age",
                        id: "uncontrolled-native",
                      }}
                    >
                      <option></option>
                      {this.certificate.map(
                        (ele: SelectType, index: number) => {
                          return (
                            <option key={index} value={index}>
                              {ele.name}
                            </option>
                          );
                        }
                      )}
                    </NativeSelect>
                  </FormControl>
                </Stack>
              </Box>
              <Box
                sx={{
                  width: "50%",
                  padding: 2,
                }}
              >
                <Stack
                  sx={{
                    direction: "row",
                  }}
                >
                  <Box
                    sx={{
                        width: "40%",
                        }}
                  >
                    <img src={NoImage} alt="No Image" height={"100px"} width={"100px"} />
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
                      <VisuallyHiddenInput type="file" />
                    </Button>
                  </Stack>
                </Stack>
                <TextField
                  label="Description"
                    variant="filled"
                  multiline
                  rows={2}
                  maxRows={4}
                  fullWidth
                />
              </Box>
            </Stack>
          </Stack>
        </Box>

        {
          course_themes && course_themes.map((theme,theme_index)=>{
            return <Box>
              <Box >
            <Theme theme={theme} theme_index={theme_index} handleDeleteThemeClick={handleDeleteThemeClick}/>
          </Box>
          {
            theme.lessons && theme.lessons.map((lesson,lesson_index)=>{
              return <Box >
              <Lesson theme_index={theme_index} lesson={lesson} lesson_index={lesson_index} handleDeleteLessonClick={handleDeleteLessonClick}/>
            </Box>
            })
          }
            <Stack direction="row" spacing={2} marginLeft={5} marginTop={2}>
              <Button size='small' variant='outlined' startIcon={<AddCircleOutlineOutlinedIcon/>} onClick={()=>handleAddLessonClick(theme_index)}>Add Lesson</Button>
              <Button size='small' variant='outlined' startIcon={<AddCircleOutlineOutlinedIcon/>}>Add Quiz</Button>
              <Button size='small' variant='outlined' startIcon={<AddCircleOutlineOutlinedIcon/>}>Add Flash Card</Button>
            </Stack>
            </Box>
          })
        }

        <Stack direction="row" spacing={2} marginTop={2}>
        <Button size='small' variant='outlined' startIcon={<AddCircleOutlineOutlinedIcon/>} onClick={handleAddThemeClick} >New Theme</Button>
        <Button size='small' variant='outlined' startIcon={<AddCircleOutlineOutlinedIcon/>}>New Mock Exam</Button>
        <Button size='small' variant='outlined' startIcon={<AddCircleOutlineOutlinedIcon/>} onClick={()=>console.log(course_themes)}>Console State</Button>
      </Stack>
      </Box>
    );
  }
}
