import { Box, Button, Divider, FormControl, InputLabel, MenuItem, NativeSelect, Select, Stack, Switch, TextField, Typography } from '@mui/material'
import React, { Component } from 'react'
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import NoImage from "../../assets/images/no-image.png"
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
import styled from '@emotion/styled';
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { SelectChangeEvent } from '@mui/material';

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

  interface Props {
    theme:ThemeAlias;
    theme_index:number;
    handleDeleteThemeClick: (id:number) => void;
    handleThemeDataChange: (id:number, e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement> | SelectChangeEvent<number>) => void;
  }

  interface ThemeAlias {
    title:string;
    leaderboard_points:number;
    product_type:number;
    image_url:string;
    order_in_the_course: number | null;
    lessons:LessonAlias[];
  }

  interface LessonAlias {
    title:string;
    leaderboard_points:number;
    product_type:number;
    image_url:string;
    description:string;
    order_in_the_course: number | null;
  }
  

export default class Theme extends Component<Props> {

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

  render() {
    const {theme, theme_index , handleDeleteThemeClick, handleThemeDataChange} = this.props
    return (
        <Box key={theme_index} sx={{
            borderRadius:3,
            boxShadow:1,
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
              <Typography variant="h6">Theme {theme_index + 1}</Typography>

              <Stack
                direction="row"
                spacing={2}
                alignItems="center"
                divider={<Divider orientation="vertical" flexItem />}
              >
                <Box display="flex" alignItems='center'>
                <StarBorderOutlinedIcon />
                <Typography alignItems="center">
                  {theme.leaderboard_points} pts
                </Typography>
                </Box>
                
                <Button variant='outlined' color='error'sx={{
                  borderRadius:3
                }} size='small' startIcon={<DeleteForeverOutlinedIcon/>} onClick={()=>handleDeleteThemeClick(theme_index)}>
                    Delete Theme
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
                    value={theme.title}
                    onChange={(e)=>handleThemeDataChange(theme_index,e)}
                  />

                  <Stack direction="row" spacing={2}  marginBottom={2} marginTop={2}>
                  <TextField
                      fullWidth
                      id="filled-helperText"
                      label="Leadership Point"
                      variant="outlined"
                      type="number"
                      name='leaderboard_points'
                      value={theme.leaderboard_points}
                      onChange={(e)=>handleThemeDataChange(theme_index,e)}
                    />
                    <TextField
                      fullWidth
                      id="filled-helperText"
                      label="Order In The Course"
                      variant="outlined"
                      type="number"
                      name='order_in_the_course'
                      value={theme.order_in_the_course}
                      onChange={(e)=>handleThemeDataChange(theme_index,e)}
                    />
                    
                  </Stack>
                  <FormControl fullWidth>
                      <InputLabel id="demo-select-small-label">
                      Product Type
                      </InputLabel>
                      <Select
                        labelId="demo-select-small-label"
                        id="demo-select-small"
                        onChange={(e)=>handleThemeDataChange(theme_index,e)}
                        label="Age"
                        value={theme.product_type}
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
                    <img src={theme.image_url? theme.image_url: NoImage} alt="No Image" height={"100px"} width={"100px"} />
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
                      <VisuallyHiddenInput type="file" onChange={(e)=>handleThemeDataChange(theme_index,e)} />
                    </Button>
                  </Stack>
                </Box>
              </Box>
            </Stack>
          </Stack>
        </Box>
    )
  }
}
