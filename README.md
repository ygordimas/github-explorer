# Github Explorer
---
>Status: Completed
---
>Authors: Ygor Dimas and Rocketseat
---
>Contact: [Linkedin](https://www.linkedin.com/in/ygor-dimas/)
---
>Click [here](https://ygordimas.github.io/github-explorer/) to access the project's **GitHub Page**
---

# Overview

The project consists of a web application capable of reaching Github's API, then retrieving and displaying a list of public repositories from either a Git User or Organization. It was initially developed with the guidance of [Rocketseat](https://github.com/Rocketseat)'s Ignite bootcamp as part of the ReactJS course.

After finishing the course, I had a basic aplication that could fetch the list from Github's API but only through editing the code. There was no input component available for the user to decide from which Git User or Organization would it be retrieving from. This is how it looked like:
![Overview of the project's initial stage](https://github.com/ygordimas/github-explorer/blob/main/public/images/BaseProject.png?raw=true)

From this stage I added a Header component for colecting information that will be processed by the aplication. It consists of a couple of radio buttons and an input field. The radio buttons are responsible for setting what kind of search the user will be doing - if through a Git User's repositories catalogue or if through a Git Organization. They are retrivied by different URL structures so the code changes depending on the user's choice. The input field takes in the desired Git User or Organization name. The app displays a feedback message for the user if the Git User or Organization doesn't exist or if it exists but has no public repositories to be displayed.

## Objectives

My main objective for this project was to keep making progress with my React studies and put into practice the fundamental React concepts learned in the bootcamp course while building new functionalities for the app.

## Frontend Topics and Technologies

- Reusable components with React
- Props and State
- Fetching information through useEffect and handling errors with trycatch
- Typescript and .tsx
- Styling in React with styled-components
- Loading animation through conditional rendering and states

## Results

![Github Explorer application](https://github.com/ygordimas/github-explorer/blob/main/public/images/ygordimas.github.io_github-explorer_(Nest%20Hub%20Max)%20(1).png)
![Github Explorer application showing list of user's repositories](https://github.com/ygordimas/github-explorer/blob/main/public/images/ygordimas.github.io_github-explorer_(Nest%20Hub%20Max).png)
![Github Explorer application displaying message for when User or Organization has no repositories](https://github.com/ygordimas/github-explorer/blob/main/public/images/localhost_8080_(Nest%20Hub%20Max).png)
![Github Explorer application displaying warning for when User or Organization doesn't exist](https://github.com/ygordimas/github-explorer/blob/main/public/images/ygordimas.github.io_github-explorer_(Nest%20Hub%20Max)%20(3).png)
