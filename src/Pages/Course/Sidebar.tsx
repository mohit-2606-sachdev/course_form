import { ExpandLess, ExpandMore } from '@mui/icons-material'
import { Box, Button, Collapse, Divider, IconButton, List, ListItem, ListItemButton, ListItemText, Menu, MenuItem, Stack } from '@mui/material'
import { Component } from 'react'
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';

interface Props {
  handleAddThemeClick: () => void; 
  course_themes: Theme[]
  handleAddLessonClick: (id: number) => void;
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
  themes:boolean[]
  themes_menu:boolean[]
  anchorEl: Array<null | HTMLElement>
}

export default class Sidebar extends Component<Props,State> {

  constructor(props:Props){
    super(props)
    this.state = {
      themes:[],
      themes_menu:[],
      anchorEl:[]
    }
  }

  componentDidUpdate(prevProps: { course_themes: Theme[] }): void {
    const { course_themes } = this.props;
  
    if (prevProps.course_themes !== course_themes) {
      let numberOfThemes = course_themes.map(() => {
        return true;
      });
  
      this.setState({ themes: [...numberOfThemes], themes_menu: [...numberOfThemes], anchorEl: Array(course_themes.length).fill(null)  });
    }
  }

  toggleTheme(index:number) {
    const updatedThemes = [...this.state.themes];
    updatedThemes[index] = !updatedThemes[index];
    this.setState({ themes: updatedThemes });
  }

  handleClick(event: React.MouseEvent<HTMLButtonElement>, index: number): void {
    const newAnchorEl = [...this.state.anchorEl];
    newAnchorEl[index] = event.currentTarget;
    this.setState({ anchorEl: newAnchorEl });
  }

  handleClose(index: number, addType: string = ""): void {
    if (addType === "lesson"){
      const {handleAddLessonClick} = this.props
      handleAddLessonClick(index)
    }
    const newAnchorEl = [...this.state.anchorEl];
    newAnchorEl[index] = null;
    this.setState({ anchorEl: newAnchorEl });
  }

  render() {

    const {handleAddThemeClick , course_themes} = this.props
    const {themes, anchorEl} = this.state

    return (
      <Box sx={{
        width:"30%",
        display:{
          xs:'none',
          lg:"block"
        }
        }}>
        <Box sx={{
        padding:2,
      }}>

      <List>
      <ListItem>
        <ListItemText primary="Course" />
      </ListItem>
      <Collapse in={true} timeout="auto" unmountOnExit>
          {
            course_themes && course_themes.map((theme,index)=>{
              return <List component="div"  disablePadding>
              <Box sx={{
                display:'flex',
                justifyContent:"space-between"
              }}>
              <ListItemButton sx={{ pl: 4 }} onClick={()=>this.toggleTheme(index)}>
                {themes[index] ? <ExpandLess /> : <ExpandMore />}
                <ListItemText sx={{
                  marginLeft:2,
                }} primary={`Theme ${index+1}`} />
              </ListItemButton>
              <Box>
                  <IconButton size="small" onClick={(event) => this.handleClick(event, index)}>
                    <AddCircleOutlineOutlinedIcon />
                  </IconButton>
                  <Menu
                    id={`theme-menu-${index}`}
                    anchorEl={anchorEl[index]}
                    open={Boolean(anchorEl[index])}
                    onClose={() => this.handleClose(index)}
                    MenuListProps={{ 'aria-labelledby': 'basic-button' }}
                  >
                    <MenuItem onClick={() => this.handleClose(index,"lesson")}>Add Lesson</MenuItem>
                    <MenuItem onClick={() => this.handleClose(index ,"quiz")}>Add Quiz</MenuItem>
                    <MenuItem onClick={() => this.handleClose(index ,"flashcard")}>Add Flashcard</MenuItem>
                  </Menu>
                </Box>
              </Box>
              <Collapse in={themes[index]} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {
                theme.lessons && theme.lessons.map((lesson,lesson_index)=>{
                  return <ListItemButton sx={{ ml: 10 }}>
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
        <Button size='small' variant="contained"
            sx={{
              color:"black",
              bgcolor:"white",
              borderRadius:'20px'
            }} startIcon={<AddCircleOutlineOutlinedIcon/>} onClick={handleAddThemeClick} >New Theme</Button>
        <Button size='small' variant="contained"
            sx={{
              color:"black",
              bgcolor:"white",
              borderRadius:'20px'
            }} startIcon={<AddCircleOutlineOutlinedIcon/>}>New Mock Exam</Button>
      </Stack>
      </Box>
      </Box>
      </Box>
    )
  }
}
