#instruction

Can test the application by running the same application on localhost by ```npm start``` command

Let's go through the step-by-step working of the application based on the provided requirements.

#Step 1: Setting up the Project

Create a new React project using a tool like Create React App.
Install the necessary dependencies such as Chart.js, react-table, Formik, and Redux.

#Step 2: Data Handling

Import the provided data into the application.
Store the data globally using Redux, creating a user reducer to manage the user data.
Create Redux actions and reducers to add, edit, and view user data.

#Step 3: Chart Page

Create a Chart page component that will render the charts.
Use a popular charting library like Chart.js to create the required charts.
Filter the user data based on age and gender to generate the first chart.
Calculate the count of users for each country to generate the second chart.

#Step 4: Tables Page

Create a Tables page component that will render the tables.
Use a popular table library like react-table or Material-UI Table to create the tables.
Fetch the user data from the Redux store and display it in the table.
Add an action column with edit and view buttons.
Handle the click event of the edit button to open a modal with the pre-filled user data.
Handle the click event of the view button to route the user to a new page displaying the user's details.

#Step 5: Forms Page

Create a Forms page component that will render the form.
Use a popular form library like Formik or react-hook-form to create the form.
Add fields for the user's name, age, gender, and email address.
Implement validation to ensure all fields are filled out before submission.
Disable the submit button until all fields are filled.
Handle form submission and dispatch the addUser action to add the data to the Redux store.

#Step 6: Rendering Stored Data

Create a Card component that will render the stored data.
Fetch the user data from the Redux store and display it in the Card component.
Style the Card component to present the user's details in an appealing way.
