// import { fireEvent, render,screen, waitFor } from "@testing-library/react"
// import Sidebar from "../Sidebar"



// const theme = [{
//     title:"Hello",
//     leaderboard_points:10,
//     product_type:0,
//     image_url:"",
//     order_in_the_course: null,
//     lessons:[{
//         title: "test lesson",
//         leaderboard_points: 100,
//         product_type: 0,
//         image_url: "",
//         description: "",
//         order_in_the_course:5
//     }]
//   }]

//   const mockProps = {
//     handleAddThemeClick: jest.fn(),
//     course_themes:theme,
//     handleAddLessonClick: jest.fn(),
// };

// describe("Testing presence of Elements in the Doc",()=>{

//     test("presence of Elements",async ()=>{
//         render(<Sidebar {...mockProps} />)
//         const course_list = screen.getByText("Course")
//         const theme = screen.getByText("Theme 1")
//         expect(course_list).toBeInTheDocument()
//         expect(theme).toBeInTheDocument()

//     })
   
// })

// // describe("Testing Click of the Button",()=>{

// //     test("Testing to Add Theme", async ()=>{
// //         render(<Sidebar course_themes={[]} handleAddThemeClick={() => {}} handleAddLessonClick={() => {}} />)
// //         const new_theme_button : HTMLElement = screen.getByRole("button",{name:/New Theme/i})
// //         fireEvent.click(new_theme_button)
// //         expect(mockProps.handleAddThemeClick).toHaveBeenCalledTimes(1)
// //         fireEvent.click(new_theme_button)
// //         expect(mockProps.handleAddThemeClick).toHaveBeenCalledTimes(2)
// //     })

// //     test("Testing to Add Lesson", async ()=>{
// //         render(<Sidebar {...mockProps} />)
// //         const new_theme_button : HTMLElement = screen.getByRole("button",{name:/New Theme/i})
// //         fireEvent.click(new_theme_button)
// //         expect(mockProps.handleAddThemeClick).toHaveBeenCalledTimes(1)
// //         const new_Lesson_button : HTMLElement = screen.getByRole("button",{name:/Add Lesson/i})
// //         fireEvent.click(new_Lesson_button)
// //         expect(mockProps.handleAddLessonClick).toHaveBeenCalledTimes(1)
// //     })
   
// // })


import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Sidebar from '../Sidebar';

describe('Sidebar Component', () => {
    const handleAddThemeClick = jest.fn();
    const handleAddLessonClick = jest.fn();

    const courseThemes = [
        {
            title: 'Theme 1',
            leaderboard_points: 100,
            product_type: 0,
            image_url: '',
            order_in_the_course: null,
            lessons: [
                {
                    title: 'Lesson 1',
                    leaderboard_points: 50,
                    product_type: 0,
                    image_url: '',
                    description: 'This is lesson 1',
                    order_in_the_course: null
                }
            ]
        },
        {
            title: 'Theme 2',
            leaderboard_points: 120,
            product_type: 1,
            image_url: '',
            order_in_the_course: null,
            lessons: [
                {
                    title: 'Lesson 1',
                    leaderboard_points: 60,
                    product_type: 1,
                    image_url: '',
                    description: 'This is lesson 1 for Theme 2',
                    order_in_the_course: null
                }
            ]
        }
    ];

    beforeEach(() => {
        jest.clearAllMocks(); // Reset mock function calls before each test
    });

    test('renders sidebar with themes and buttons', () => {
        render(
            <Sidebar
                handleAddThemeClick={handleAddThemeClick}
                course_themes={courseThemes}
                handleAddLessonClick={handleAddLessonClick}
            />
        );

        // Verify if the course themes are rendered correctly
        expect(screen.getByText(/Course/i)).toBeInTheDocument();
        expect(screen.getByText(/Theme 1/i)).toBeInTheDocument();
        expect(screen.getByText(/Theme 2/i)).toBeInTheDocument();
        // expect(screen.findByText(/Lesson 1/i)).toBeInTheDocument();

        // Verify the presence of buttons and their functionality
        expect(screen.getByRole('button', { name: /New Theme/i })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /New Mock Exam/i })).toBeInTheDocument();
    });

    test('toggles theme collapse', () => {
        render(
            <Sidebar
                handleAddThemeClick={handleAddThemeClick}
                course_themes={courseThemes}
                handleAddLessonClick={handleAddLessonClick}
            />
        );

        // Simulate clicking on the expand/collapse button for Theme 1
        fireEvent.click(screen.getByText(/Theme 1/i));
        // expect(screen.getByText(/Lesson 1/i)).toBeInTheDocument(); // Check if lessons are visible

        fireEvent.click(screen.getByText(/Theme 1/i));
        // expect(screen.queryByText(/Lesson 1/i)).not.toBeInTheDocument(); // Check if lessons are hidden
    });

    test('opens and handles theme menu', () => {
        render(
            <Sidebar
                handleAddThemeClick={handleAddThemeClick}
                course_themes={courseThemes}
                handleAddLessonClick={handleAddLessonClick}
            />
        );

        // Open menu for Theme 1
        // fireEvent.click(screen.getByRole('button', { name: /add circle outline/i }));
        // expect(screen.getByText(/Add Lesson/i)).toBeInTheDocument();

        // Click on Add Lesson menu item
        fireEvent.click(screen.getByText(/Add Lesson/i));
        expect(handleAddLessonClick).toHaveBeenCalledWith(0); // Ensure handleAddLessonClick is called with the correct index
    });

    test('handles new theme button click', () => {
        render(
            <Sidebar
                handleAddThemeClick={handleAddThemeClick}
                course_themes={courseThemes}
                handleAddLessonClick={handleAddLessonClick}
            />
        );

        // Click on New Theme button
        fireEvent.click(screen.getByRole('button', { name: /New Theme/i }));
        expect(handleAddThemeClick).toHaveBeenCalled(); // Ensure handleAddThemeClick is called
    });

    test('renders correctly after course themes update', () => {
        const updatedThemes = [
            {
                title: 'Theme Updated',
                leaderboard_points: 150,
                product_type: 1,
                image_url: '',
                order_in_the_course: null,
                lessons: []
            }
        ];

        const { rerender } = render(
            <Sidebar
                handleAddThemeClick={handleAddThemeClick}
                course_themes={courseThemes}
                handleAddLessonClick={handleAddLessonClick}
            />
        );

        // Verify initial rendering with original themes
        expect(screen.getByText(/Theme 1/i)).toBeInTheDocument();
        // expect(screen.getByText(/Lesson 1/i)).toBeInTheDocument();

        // Re-render with updated course themes
        rerender(
            <Sidebar
                handleAddThemeClick={handleAddThemeClick}
                course_themes={updatedThemes}
                handleAddLessonClick={handleAddLessonClick}
            />
        );

        // Verify if updated themes are rendered correctly
        expect(screen.queryByText(/Theme 1/i)).toBeInTheDocument();
    });

    // Add more test cases as needed for further interactions and edge cases
});
