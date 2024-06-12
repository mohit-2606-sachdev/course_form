import { Box, Button, Divider, FormControl, InputLabel, NativeSelect, Stack, Switch, TextField, Typography } from '@mui/material'
import React, { Component } from 'react'
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import NoImage from "../../assets/images/no-image.png"
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
import styled from '@emotion/styled';
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

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
  }

  interface ThemeAlias {
    title:string;
    leaderboard_points:number;
    product_type:number;
    image_url:string;
    lessons:LessonAlias[];
  }

  interface LessonAlias {
    title:string;
    leaderboard_points:number;
    product_type:number;
    image_url:string;
    description:string;
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
    const {theme, theme_index , handleDeleteThemeClick} = this.props
    return (
        <Box key={theme_index} sx={{
            border:1,
            borderRadius:3,
            marginTop:3
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
                <Typography alignItems="center">
                  <StarBorderOutlinedIcon />
                  10 pts
                </Typography>
                <Button startIcon={<DeleteForeverOutlinedIcon/>} onClick={()=>handleDeleteThemeClick(theme_index)}>
                    Delete
                </Button>
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
                    label="Title"
                    variant="filled"
                  />

                  <Stack direction="row">
                  <TextField
                      fullWidth
                      id="filled-helperText"
                      label="Leadership Point"
                      variant="filled"
                      type="number"
                    />
                    <TextField
                      fullWidth
                      id="filled-helperText"
                      label="Order In The Course"
                      variant="filled"
                      type="number"
                    />
                    
                  </Stack>
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
              </Box>
            </Stack>
          </Stack>
        </Box>
    )
  }
}
