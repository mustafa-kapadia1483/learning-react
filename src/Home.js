import { useState, useEffect } from "react";
import BlogList from "./BlogList";

const Home = () => {
  // useState hook allows us to change the state / content of a variable inside a component
  const [blogs, setBlogs] = useState();

  const [name, setName] = useState("mario");

  // useState hook function for deleting blog on click of the button
  const handleDelete = id => {
    const newBlogs = blogs.filter(blog => blog.id !== id);
    setBlogs(newBlogs);
  };

  // useEffect runs a call back fucntion everytime the component renders the data / html inside it, even it's state changes.
  // never change state inside useEffect as it will cause a infinite loop in most cases
  // useEffect dependency array can be passed as array as 2nd parameter
  useEffect(() => {
    console.log("useEffect ran ");
    console.log(blogs);
  }, [name]);
  // [] dependency  makes sure that the useEffect hook only runs for the first render of the component and not after that

  return (
    <div className="home">
      <BlogList
        blogs={blogs}
        title="All Blogs!"
        handleDelete={handleDelete}
      ></BlogList>
      <BlogList
        blogs={blogs.filter(blog => blog.author === "mario")}
        title="Mario's Blogs"
        handleDelete={handleDelete}
      ></BlogList>
      <button onClick={() => setName("Mustafa")}>change name</button>
      <p>{name}</p>
    </div>
  );
};

export default Home;

// Passing blogs as props
// Data can be used later here
