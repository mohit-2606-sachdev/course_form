import { Component } from 'react'
import {Box} from "@mui/material"
import Sidebar from './Sidebar'
import CourseSection from './CourseSection'

interface State {
  course:CourseType;
  course_themes:Theme[];
  theme:Theme;
  lesson:Lesson;
}

interface Lesson {
  title:string;
  leaderboard_points:number;
  product_type:number;
  image_url:string;
  description:string;
}

interface Theme {
  title:string;
  leaderboard_points:number;
  product_type:number;
  image_url:string;
  lessons:Lesson[];
}

interface CourseType {
  name:string;
  duration:string;
  leaderboard_points:number;
  category:number;
  level:number;
  product_type:number;
  language:number;
  certificate:number;
  description:string;
  image_url:string;
}

export default class Course extends Component<{},State> {

  constructor(props:{}){
    super(props)
    this.state = {
      course:{
        name:"",
        duration:"",
        leaderboard_points:10,
        category:0,
        level:0,
        product_type:0,
        language:0,
        certificate:0,
        description:"",
        image_url:""
      },
      course_themes:[],
      theme:{
        title:"",
        leaderboard_points:10,
        product_type:0,
        image_url:"",
        lessons:[]
      },
      lesson:{
        title:"",
        leaderboard_points:10,
        product_type:0,
        image_url:"",
        description:""
      }
    }
  }

  handleDeleteThemeClick = (id:number) =>{
    const {course_themes} = this.state
    let new_courses_themes = course_themes.filter((_,index)=>{
      return index !== id
    })
    this.setState({course_themes:[...new_courses_themes]})
  }

  handleAddThemeClick = () => {
    const {course_themes,theme} = this.state
    this.setState({course_themes:[...course_themes,theme]})
  }

  handleAddLessonClick = (id: number): void => {
    const { course_themes, lesson } = this.state;
  
    if (id >= 0 && id < course_themes.length) {
      const updatedCourseThemes = [...course_themes];
      const updatedTheme = { ...updatedCourseThemes[id] };
      updatedTheme.lessons = [...updatedTheme.lessons, lesson];
      updatedCourseThemes[id] = updatedTheme;
      this.setState({ course_themes: updatedCourseThemes });
    }
  }

  handleDeleteLessonClick = (themeId: number, lessonIndex: number): void => {
    const { course_themes } = this.state;
  
    if (themeId >= 0 && themeId < course_themes.length) {
      const updatedCourseThemes = [...course_themes];
      const updatedTheme = { ...updatedCourseThemes[themeId] };
  
      if (lessonIndex >= 0 && lessonIndex < updatedTheme.lessons.length) {
        updatedTheme.lessons.splice(lessonIndex, 1);
        updatedCourseThemes[themeId] = updatedTheme;
        this.setState({ course_themes: updatedCourseThemes });
      }
    }
  }

  render() {
    return (
      <Box sx={{
        display:"flex"
      }}>
        <Sidebar handleAddThemeClick={this.handleAddThemeClick} course_themes={this.state.course_themes}/>
        <CourseSection handleAddThemeClick={this.handleAddThemeClick} course_themes={this.state.course_themes} handleAddLessonClick={this.handleAddLessonClick} handleDeleteThemeClick={this.handleDeleteThemeClick} handleDeleteLessonClick={this.handleDeleteLessonClick} />
      </Box>
    )
  }
}
