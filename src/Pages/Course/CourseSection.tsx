import {
  Box,
  Button,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
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
import NoImage from "../../assets/images/no-image.png";
import Theme from "./Theme";
import Lesson from "./Lesson";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import { SelectChangeEvent } from "@mui/material";

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

interface CourseType {
  name: string;
  duration: string;
  leaderboard_points: number;
  category: number;
  level: number;
  product_type: number;
  language: number;
  certificate: number;
  description: string;
  image_url: string;
}

interface Props {
  handleAddThemeClick: () => void;
  handleDeleteThemeClick: (id: number) => void;
  course_themes: ThemeAlias[];
  course_data: CourseType;
  handleAddLessonClick: (id: number) => void;
  handleDeleteLessonClick: (themeId: number, lessonIndex: number) => void;
  handleCourseDataChange: (
    e:
      | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | SelectChangeEvent<number>
  ) => void;
  handleThemeDataChange: (
    id: number,
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >  | SelectChangeEvent<number>
  ) => void;
  handleLessonDataChange: (
    theme_id: number,
    lesson_id: number,
    e:
      | React.ChangeEvent<
          HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
        >
      | string   | SelectChangeEvent<number>
  ) => void;
}

interface LessonAlias {
  title: string;
  leaderboard_points: number;
  product_type: number;
  image_url: string;
  description: string;
  order_in_the_course: number | null;
}

interface ThemeAlias {
  title: string;
  leaderboard_points: number;
  product_type: number;
  image_url: string;
  lessons: LessonAlias[];
  order_in_the_course: number | null;
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

  constructor(props: Props) {
    super(props);
  }

  render() {
    const {
      handleAddThemeClick,
      handleAddLessonClick,
      handleDeleteThemeClick,
      handleDeleteLessonClick,
      handleCourseDataChange,
      handleThemeDataChange,
      handleLessonDataChange,
      course_themes,
      course_data,
    } = this.props;
    return (
      <Box
        sx={{
          width:{
            lg: "70%",
            xs:"100%"
          },
          padding: 2,
          bgcolor: "#f2f2f2",
        }}
      >
        <Box
          sx={{
            borderRadius: 3,
            boxShadow:1,
            padding: 1,
            bgcolor: "white",
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
                <Box display="flex" alignItems="center">
                  <StarBorderOutlinedIcon />
                  <Typography>{course_data.leaderboard_points} pts</Typography>
                </Box>
                <Box display="flex" alignItems="center">
                <TimerOutlinedIcon />
                  <Typography>{course_data.duration}</Typography>
                </Box>
                <Box display="flex" alignItems="center">
                <Typography>Active</Typography>
                <Switch defaultChecked />
                </Box>
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
                    label="Course Name"
                    variant="outlined"
                    value={course_data.name}
                    name="name"
                    onChange={handleCourseDataChange}
                    sx={{
                      marginBottom: 2,
                    }}
                  />

                  <Stack direction="row" marginBottom={2} spacing={2}>
                    <TextField
                      id="filled-helperText"
                      label="Duration"
                      variant="outlined"
                      value={course_data.duration}
                      name="duration"
                      fullWidth
                      onChange={handleCourseDataChange}
                    />
                    <TextField
                      fullWidth
                      id="filled-helperText"
                      label="Leadership Point"
                      value={course_data.leaderboard_points}
                      name="leaderboard_points"
                      onChange={handleCourseDataChange}
                      variant="outlined"
                      type="number"
                    />
                  </Stack>
                  <Stack direction="row" marginBottom={2} spacing={2}>
                    <FormControl fullWidth>
                      <InputLabel id="demo-select-small-label">
                        Category
                      </InputLabel>
                      <Select
                        labelId="demo-select-small-label"
                        id="demo-select-small"
                        value={course_data.category}
                        label="category"
                        onChange={handleCourseDataChange}
                        name="category"
                      >
                        <MenuItem value="">None</MenuItem>
                        {this.category.map((ele: SelectType, index: number) => {
                          return (
                            <MenuItem key={index} value={index}>
                              {ele.name}
                            </MenuItem>
                          );
                        })}
                      </Select>
                    </FormControl>
                    <FormControl fullWidth>
                      <InputLabel id="demo-select-small-label">
                        Level
                      </InputLabel>
                      <Select
                        labelId="demo-select-small-label"
                        id="demo-select-small"
                        value={course_data.level}
                        label="level"
                        onChange={handleCourseDataChange}
                        name="level"
                      >
                        <MenuItem value="">None</MenuItem>
                        {this.level.map((ele: SelectType, index: number) => {
                          return (
                            <MenuItem key={index} value={index}>
                              {ele.name}
                            </MenuItem>
                          );
                        })}
                      </Select>
                    </FormControl>
                  </Stack>
                  <Stack direction="row" marginBottom={2} spacing={2}>
                    <FormControl fullWidth>
                      <InputLabel id="demo-select-small-label">
                        Product Type
                      </InputLabel>
                      <Select
                        labelId="demo-select-small-label"
                        id="demo-select-small"
                        value={course_data.product_type}
                        label="product_type"
                        onChange={handleCourseDataChange}
                        name="product_type"
                      >
                        <MenuItem value="">None</MenuItem>
                        {this.product_type.map(
                          (ele: SelectType, index: number) => {
                            return (
                              <MenuItem key={index} value={index}>
                                {ele.name}
                              </MenuItem>
                            );
                          }
                        )}
                      </Select>
                    </FormControl>

                    <FormControl fullWidth>
                      <InputLabel id="demo-select-small-label">
                        Language
                      </InputLabel>
                      <Select
                        labelId="demo-select-small-label"
                        id="demo-select-small"
                        value={course_data.language}
                        label="language"
                        onChange={handleCourseDataChange}
                        name="language"
                      >
                        <MenuItem value="">None</MenuItem>
                        {this.language.map((ele: SelectType, index: number) => {
                          return (
                            <MenuItem key={index} value={index}>
                              {ele.name}
                            </MenuItem>
                          );
                        })}
                      </Select>
                    </FormControl>
                  </Stack>

                  <FormControl fullWidth>
                    <InputLabel id="demo-select-small-label">
                      Certificate
                    </InputLabel>
                    <Select
                      labelId="demo-select-small-label"
                      id="demo-select-small"
                      value={course_data.certificate}
                      label="certificate"
                      onChange={handleCourseDataChange}
                      name="certificate"
                    >
                      <MenuItem value="">None</MenuItem>
                      {this.certificate.map(
                        (ele: SelectType, index: number) => {
                          return (
                            <MenuItem key={index} value={index}>
                              {ele.name}
                            </MenuItem>
                          );
                        }
                      )}
                    </Select>
                  </FormControl>
                </Stack>
              </Box>
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
                <Box
                  sx={{
                    display: "flex",
                  }}
                >
                  <Box
                    sx={{
                      width: "40%",
                    }}
                  >
                    <img
                      src={
                        course_data.image_url ? course_data.image_url : NoImage
                      }
                      alt="Image"
                      height={"100px"}
                      width={"100px"}
                    />
                  </Box>

                  <Stack
                    sx={{
                      width: "60%",
                    }}
                    direction="column"
                  >
                    <Typography fontWeight="bold">Overview Picture</Typography>
                    <Typography color={'gray'} variant="caption" display="block">
                    Minimal Picture: 343x193 px
                    </Typography>
                    <Typography color={'gray'} variant="caption" display="block">
                    Maximum size: 5 mb
                    </Typography>
                    <Button
                      component="label"
                      role={undefined}
                      variant="contained"
            sx={{
              color:"black",
              bgcolor:"white",
              borderRadius:'20px'
            }}
                      tabIndex={-1}
                      startIcon={<CloudUploadIcon />}
                    >
                      Upload file
                      <VisuallyHiddenInput
                        type="file"
                        onChange={handleCourseDataChange}
                      />
                    </Button>
                  </Stack>
                </Box>
                <TextField
                  label="Description"
                  value={course_data.description}
                  name="description"
                  onChange={handleCourseDataChange}
                  variant="outlined"
                  multiline
                  rows={2}
                  maxRows={4}
                  fullWidth
                  sx={{
                    marginTop:2
                  }}
                />
              </Box>
            </Stack>
          </Stack>
        </Box>

        {course_themes &&
          course_themes.map((theme, theme_index) => {
            return (
              <Box>
                <Box>
                  <Theme
                    theme={theme}
                    theme_index={theme_index}
                    handleDeleteThemeClick={handleDeleteThemeClick}
                    handleThemeDataChange={handleThemeDataChange}
                  />
                </Box>
                {theme.lessons &&
                  theme.lessons.map((lesson, lesson_index) => {
                    return (
                      <Box>
                        <Lesson
                          theme_index={theme_index}
                          lesson={lesson}
                          lesson_index={lesson_index}
                          handleDeleteLessonClick={handleDeleteLessonClick}
                          handleLessonDataChange={handleLessonDataChange}
                        />
                      </Box>
                    );
                  })}
                <Stack direction="row" sx={{
                    marginLeft:{
                      md:5,
                      xs:0
                    },
                    gap:{
                      lg:2,
                      md:1,
                    }
                }}  marginTop={2}>
                  <Button
                    size="small"
                    variant="contained"
            sx={{
              color:"black",
              bgcolor:"white",
              borderRadius:'20px'
            }}
                    startIcon={<AddCircleOutlineOutlinedIcon />}
                    onClick={() => handleAddLessonClick(theme_index)}
                  >
                    Add Lesson
                  </Button>
                  <Button
                    size="small"
                    variant="contained"
            sx={{
              color:"black",
              bgcolor:"white",
              borderRadius:'20px'
            }}
                    startIcon={<AddCircleOutlineOutlinedIcon />}
                  >
                    Add Quiz
                  </Button>
                  <Button
                    size="small"
                    variant="contained"
            sx={{
              color:"black",
              bgcolor:"white",
              borderRadius:'20px'
            }}
                    startIcon={<AddCircleOutlineOutlinedIcon />}
                  >
                    Add Flash Card
                  </Button>
                </Stack>
              </Box>
            );
          })}

        <Stack direction="row" spacing={2} marginTop={2}>
          <Button
            size="small"
            variant="contained"
            sx={{
              color:"black",
              bgcolor:"white",
              borderRadius:'20px'
            }}
            startIcon={<AddCircleOutlineOutlinedIcon />}
            onClick={handleAddThemeClick}
          >
            New Theme
          </Button>
          <Button
            size="small"
            variant="contained"
            sx={{
              color:"black",
              bgcolor:"white",
              borderRadius:'20px'
            }}
            startIcon={<AddCircleOutlineOutlinedIcon />}
          >
            New Mock Exam
          </Button>
          {/* <Button
            size="small"
            variant="contained"
            sx={{
              color:"black",
              bgcolor:"white",
              borderRadius:'20px',
            }}
            startIcon={<AddCircleOutlineOutlinedIcon />}
          >
            Console State
          </Button> */}
        </Stack>
      </Box>
    );
  }
}
