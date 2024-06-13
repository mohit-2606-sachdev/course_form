import { ExpandLess, ExpandMore } from '@mui/icons-material'
import { Box, Button, Collapse, Divider, List, ListItemButton, ListItemText, Stack } from '@mui/material'
import { Component } from 'react'
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';

interface Props {
  handleAddThemeClick: () => void; 
  course_themes: Theme[]
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

interface State {
  isShowCourse:boolean;
  themes:boolean[]
}

export default class Sidebar extends Component<Props,State> {

  constructor(props:Props){
    super(props)
    this.state = {
      isShowCourse: true,
      themes:[],
    }
  }

  componentDidUpdate(prevProps: { course_themes: Theme[] }): void {
    const { course_themes } = this.props;
  
    if (prevProps.course_themes !== course_themes) {
      let numberOfThemes = course_themes.map(() => {
        return true;
      });
  
      this.setState({ themes: [...numberOfThemes] });
    }
  }

  toggleTheme(index:number) {
    const updatedThemes = [...this.state.themes];
    updatedThemes[index] = !updatedThemes[index];
    this.setState({ themes: updatedThemes });
  }

  render() {

    const {handleAddThemeClick , course_themes} = this.props
    const {isShowCourse,themes} = this.state

    return (
      <Box sx={{
        width:"30",
        display:{
          xs:'none',
          lg:"block"
        }
        }}>
        <Box sx={{
        padding:2,
      }}>

      <List>
      <ListItemButton onClick={()=>this.setState({isShowCourse: !isShowCourse})}>
        <ListItemText primary="Course" />
        {isShowCourse ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={isShowCourse} timeout="auto" unmountOnExit>
          {
            course_themes && course_themes.map((theme,index)=>{
              return <List component="div" disablePadding>
              <ListItemButton sx={{ pl: 4 }} onClick={()=>this.toggleTheme(index)}>
                <ListItemText primary={`Theme ${index+1}`} />
                {themes[index] ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={themes[index]} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {
                theme.lessons && theme.lessons.map((lesson,lesson_index)=>{
                  return <ListItemButton sx={{ pl: 8 }}>
                  <ListItemText primary={`Lesson ${lesson_index+1}`} />
                </ListItemButton>
                })
              }
            </List>
          </Collapse>
            </List>
            })
          }
      </Collapse>
      </List>
      <Box>
      <Divider orientation="horizontal" flexItem />
      <Stack direction="row" spacing={2} marginTop={2}>
        <Button size='small' variant='outlined' startIcon={<AddCircleOutlineOutlinedIcon/>} onClick={handleAddThemeClick} >New Theme</Button>
        <Button size='small' variant='outlined' startIcon={<AddCircleOutlineOutlinedIcon/>}>New Mock Exam</Button>
        <Button size='small' variant='outlined' startIcon={<AddCircleOutlineOutlinedIcon/>} onClick={()=>console.log(course_themes)}>Console State</Button>
      </Stack>
      </Box>
      </Box>
      </Box>
    )
  }
}
