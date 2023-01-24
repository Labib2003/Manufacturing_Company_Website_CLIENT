import { Box } from "@mui/material";
import React from "react";
import BlogCard from "../components/Blogs/BlogCard";

const BLOGS = [
  {
    id: 0,
    title: "How will you improve the performance of a React Application?",
    body: "To improve the performance of a react application, we can provide a key prop to looping children components so that react can compare the virtual dom and the actual dom to only update the components that have changed. We can also use something like react query to cache the loaded data. We can use proper dependencies for useEffect to reduce the number of re renders.",
  },
  {
    id: 1,
    title: "How does prototypical inheritance work?",
    body: "Prototypical inheritance means every object in JS has a hidden property called prototype. Using this property, it can extend properties from its parent object. In browsers, every object is an extension of the window object and can inherit methods like console, setInterval, alert etc.",
  },
  {
    id: 2,
    title: "Why you do not set the state directly in React?",
    body: "We should never set the state directly in react because if we do that, the state wont change immediately. Instead, it creates a pending state transition, and accessing it after will only return the present value. Also calling the setState function may replace the current value of the state. That is why we use the setState function to update a state.",
  },
  {
    id: 3,
    title: "What is a unit test? Why should write unit tests?",
    body: "Unit testing is a process in software development where the project is broken down into smallest possible units and tested individually to make sure they work as intended. This makes it easier to identify and debug bugs issues.",
  },
];

const Blogs = () => {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: { xs: "repeat(1, 1fr)", md: "repeat(2, 1fr)" },
        gap: 2,
      }}
    >
      {BLOGS.map((blog) => (
        <BlogCard key={blog.id} blog={blog} />
      ))}
    </Box>
  );
};

export default Blogs;
