import { ExpandLess, ExpandMore, StarBorder } from '@mui/icons-material'
import { Box, Button, Collapse, Divider, List, ListItemButton, ListItemIcon, ListItemText, Stack } from '@mui/material'
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
}

interface Theme {
  title:string;
  leaderboard_points:number;
  product_type:number;
  image_url:string;
  lessons:Lesson[];
}

export default class Sidebar extends Component<Props> {

  constructor(props:Props){
    super(props)
  }

  render() {

    const {handleAddThemeClick , course_themes} = this.props

    return (
      <Box sx={{width:"30%"}}>
        <Box sx={{
        border:1,
        padding:2
      }}>

      <List>
      <ListItemButton>
        <ListItemText primary="Course" />
        {true ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={true} timeout="auto" unmountOnExit>
          {
            course_themes && course_themes.map((theme,index)=>{
              return <List component="div" disablePadding>
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemText primary={`Theme ${index+1}`} />
                {true ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={true} timeout="auto" unmountOnExit>
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
          
        {/* <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemText primary="Theme 2" />
            {true ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={true} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 8 }}>
            <ListItemText primary="Lesson 1" />
          </ListItemButton>
          <ListItemButton sx={{ pl: 8 }}>
            <ListItemText primary="Lesson 2" />
          </ListItemButton>
          <ListItemButton sx={{ pl: 8 }}>
            <ListItemText primary="Lesson 3" />
          </ListItemButton>
          <ListItemButton sx={{ pl: 8 }}>
            <ListItemText primary="Lesson 4" />
          </ListItemButton>
          <ListItemButton sx={{ pl: 8 }}>
            <ListItemText primary="Lesson 5" />
          </ListItemButton>
        </List>
      </Collapse>
        </List> */}
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
