import { Component } from 'react'
import {Box} from "@mui/material"
import Sidebar from './Sidebar'
import CourseSection from './CourseSection'
import { SelectChangeEvent } from '@mui/material';

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
  order_in_the_course: number | null;
}

interface Theme {
  title:string;
  leaderboard_points:number;
  product_type:number;
  image_url:string;
  order_in_the_course: number | null;
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
        duration:"22H 45M",
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
        order_in_the_course: null,
        lessons:[]
      },
      lesson:{
        title:"",
        leaderboard_points:10,
        product_type:0,
        image_url:"",
        description:"",
        order_in_the_course: null
      }
    }
  }

  handleCourseDataChange = async (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<number>) =>{
    const { name , value } = e.target;
    const { course } = this.state;
    if('files' in e.target && e.target.files && e.target.files.length > 0){
      let url = await this.handleImageChange(e.target.files[0])
      this.setState({...this.state,course:{ ...course,image_url:url }})
    }else{
      this.setState({...this.state,course:{ ...course,[name]:value }})
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

  handleThemeDataChange = async (id:number, e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>  | SelectChangeEvent<number>) =>{
    const {name, value} = e.target
    const {course_themes} = this.state
    if('files' in e.target && e.target.files && e.target.files.length > 0){
      let url = await this.handleImageChange(e.target.files[0])
      course_themes[id] = {
        ...course_themes[id], image_url:url
      }
    }else{
      course_themes[id] = {
        ...course_themes[id], [name]:value
      }
    }
    this.setState({...this.state,course_themes:course_themes})
  }

  handleLessonDataChange = async (
    theme_id: number,
    lesson_id: number,
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement> | string   | SelectChangeEvent<number>
  ) => {
    const { course_themes } = this.state;
  
    if (typeof e === 'string') {
      course_themes[theme_id].lessons[lesson_id] = {
        ...course_themes[theme_id].lessons[lesson_id],
        description: e,
      };
    } else {
      let file: File | null = null;
      if (e.target instanceof HTMLInputElement && e.target.files) {
        file = e.target.files[0];
      }
  
      if (file) {
        const url = await this.handleImageChange(file);
        course_themes[theme_id].lessons[lesson_id] = {
          ...course_themes[theme_id].lessons[lesson_id],
          image_url: url,
        };
      } else {
        const { name, value } = e.target;
        course_themes[theme_id].lessons[lesson_id] = {
          ...course_themes[theme_id].lessons[lesson_id],
          [name]: value,
        };
      }
    }
  
    this.setState({ ...this.state, course_themes: course_themes });
  };

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

  handleImageChange = async (file: File) => {
    const data = new FormData();
    data.append('file', file);
    data.append('upload_preset', 'dummy_image');
  
    try {
      const response = await fetch('https://api.cloudinary.com/v1_1/dglng4syb/image/upload', {
        method: 'POST',
        body: data,
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const resData = await response.json();
      return resData.url;
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  render() {
    return (
      <Box sx={{
        display:"flex"
      }}>
        <Sidebar handleAddLessonClick={this.handleAddLessonClick} handleAddThemeClick={this.handleAddThemeClick} course_themes={this.state.course_themes}/>
        <CourseSection handleAddThemeClick={this.handleAddThemeClick} course_themes={this.state.course_themes} handleAddLessonClick={this.handleAddLessonClick} handleDeleteThemeClick={this.handleDeleteThemeClick} handleDeleteLessonClick={this.handleDeleteLessonClick} handleCourseDataChange={this.handleCourseDataChange} course_data={this.state.course} handleThemeDataChange={this.handleThemeDataChange} handleLessonDataChange={this.handleLessonDataChange}/>
      </Box>
    )
  }
}
