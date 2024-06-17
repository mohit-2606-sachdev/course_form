// import { render,screen } from "@testing-library/react"
// import CourseSection from "../CourseSection"

// const mockProps = {
//     handleAddThemeClick: jest.fn(),
//   handleDeleteThemeClick: jest.fn(),
//   course_themes: [],
//   course_data: {
//     name: "",
//   duration: "",
//   leaderboard_points: 10,
//   category: 0,
//   level:  0,
//   product_type:  0,
//   language:  0,
//   certificate:  0,
//   description: "",
//   image_url: "",
//   },
//   handleAddLessonClick: jest.fn(),
//   handleDeleteLessonClick: jest.fn(),
//   handleCourseDataChange: jest.fn(),
//   handleThemeDataChange: jest.fn(),
//   handleLessonDataChange:jest.fn()
// }


// describe("Element present in the Doc",()=>{
//     test("Element present in the Doc",()=>{
//         render(<CourseSection {...mockProps}/>)
//         const courseHeading = screen.getByText(/Course Information/)
//         const leaderboardPointsHeading = screen.getByText(/10 pts/)
//         const courseName = screen.getByRole("textbox",{name:'name'})
//         const leaderboardPoints = screen.getByRole("textbox",{name:'leaderboard_points'})
//         const category = screen.getByLabelText(/category/i)
//         const productType = screen.getByLabelText(/product_type/i)
//         const language = screen.getByLabelText(/Language/i)
//         const duration = screen.getByRole("textbox",{name:'duration'})

//         // expect(courseHeading).toBeInTheDocument()
//         // expect(leaderboardPointsHeading).toBeInTheDocument()
//         // expect(courseName).toBeInTheDocument()
//         // expect(leaderboardPoints).toBeInTheDocument()
//         // expect(category).toBeInTheDocument()
//         // expect(productType).toBeInTheDocument()
//         // expect(language).toBeInTheDocument()
//         // expect(duration).toBeInTheDocument()

//     })
// })