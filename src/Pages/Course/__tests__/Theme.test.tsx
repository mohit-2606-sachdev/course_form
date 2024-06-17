import { fireEvent, render,screen } from "@testing-library/react"
import Theme from "../Theme"


describe("Theme Component",()=>{

    const theme = {
        
            title:"test 1",
            leaderboard_points:100,
            product_type:0,
            image_url:"",
            order_in_the_course: 3,
            lessons:[]
    }

    const handleDeleteThemeClick = jest.fn()
    const handleThemeDataChange = jest.fn()

    test("present in the document",()=>{
        render(<Theme theme_index={0} theme={theme} handleDeleteThemeClick={handleDeleteThemeClick} handleThemeDataChange={handleThemeDataChange}/>)

        expect(screen.getByText(/Theme 1/i)).toBeInTheDocument()
        expect(screen.getByText(/100 pts/i)).toBeInTheDocument()
        expect(screen.getByLabelText(/Title/i)).toHaveValue(theme.title)
        expect(screen.getByLabelText(/Leadership Point/)).toBeInTheDocument()
        expect(screen.getByLabelText(/Product Type/)).toBeInTheDocument()
        expect(screen.getByLabelText(/Order In The Course/)).toBeInTheDocument()
        expect(screen.getByText(/Upload file/)).toBeInTheDocument()
        expect(screen.getByText(/Delete theme/i)).toBeInTheDocument()
    })

    test("Click on the Delete Theme button",()=>{
        render(<Theme theme_index={0} theme={theme} handleDeleteThemeClick={handleDeleteThemeClick} handleThemeDataChange={handleThemeDataChange}/>)
        const deletTheme = screen.getByRole('button',{name:'Delete Theme'})
        fireEvent.click(deletTheme)
        expect(handleDeleteThemeClick).toHaveBeenCalledTimes(1)
    })

    test("Change in the order in the course",()=>{
        render(<Theme theme_index={0} theme={theme} handleDeleteThemeClick={handleDeleteThemeClick} handleThemeDataChange={handleThemeDataChange}/>)

      const orderInTheCourse = screen.getByLabelText(/Order In The Course/i)
      fireEvent.change(orderInTheCourse, {target: {value: 5}})
      expect(handleThemeDataChange).toHaveBeenCalledTimes(1)
    })

    
    test("Change in the leadership points",()=>{
        render(<Theme theme_index={0} theme={theme} handleDeleteThemeClick={handleDeleteThemeClick} handleThemeDataChange={handleThemeDataChange}/>)

      const leaderboard_points = screen.getByLabelText("Leadership Point")
      fireEvent.change(leaderboard_points, {target: {value: 200}})
      expect(handleThemeDataChange).toHaveBeenCalledTimes(1)
    })

    
    test("Change in the title",()=>{
        render(<Theme theme_index={0} theme={theme} handleDeleteThemeClick={handleDeleteThemeClick} handleThemeDataChange={handleThemeDataChange}/>)

      const title = screen.getByLabelText(/Title/i)
      fireEvent.change(title, {target: {value: "heyaa"}})
      expect(handleThemeDataChange).toHaveBeenCalledTimes(1)

    })

    test('file upload triggers handleThemeDataChange', () => {
        render(
          <Theme
            theme={theme}
            theme_index={0}
            handleDeleteThemeClick={handleDeleteThemeClick}
            handleThemeDataChange={handleThemeDataChange}
          />
        );
    
        const fileInput = screen.getByLabelText('Upload file').nextElementSibling as HTMLInputElement;
        const file = new File(['(⌐□_□)'], 'sample.png', { type: 'image/png' });
        fireEvent.change(fileInput, { target: { files: [file] } });
    
        expect(handleThemeDataChange).toHaveBeenCalledTimes(0);
      });

      test('should change product type on select change', () => {
        render(
            <Theme
                theme_index={0}
                theme={theme}
                handleDeleteThemeClick={handleDeleteThemeClick}
                handleThemeDataChange={handleThemeDataChange}
            />
        );

        const productTypeSelect = screen.getByLabelText(/Product Type/i);

        fireEvent.mouseDown(productTypeSelect);

        const paidOption = screen.getByText('Paid');
        fireEvent.click(paidOption);

        expect(handleThemeDataChange).toHaveBeenCalledTimes(1);
        expect(handleThemeDataChange).toHaveBeenCalledWith(0, expect.anything());
    });
})