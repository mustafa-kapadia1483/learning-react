import BlogList from "./BlogList";
import useFetch from "./useFetch";

const Home = () => {
  // calling the custom hook
  const {
    data: blogs,
    isPending,
    error,
  } = useFetch("http://localhost:8000/blogs");
  // useState hook allows us to change the state / content of a variable inside a component

  // useState hook function for deleting blog on click of the button
  // const handleDelete = id => {
  //   const newBlogs = blogs.filter(blog => blog.id !== id);
  //   setBlogs(newBlogs);
  // };

  // useEffect runs a call back fucntion everytime the component renders the data / html inside it, even it's state changes.
  // never change state inside useEffect without a dependency as it will cause a infinite loop in most cases
  // useEffect dependency array can be passed as array as 2nd parameter
  // useEffect(() => {
  //   setTimeout(() => {
  //     fetch("http://localhost:8000/blogs")
  //       .then(res => {
  //         if (!res.ok) {
  //           throw Error("Could not fetch that resource");
  //         }
  //         return res.json();
  //       })
  //       .then(data => {
  //         setBlogs(data);
  //         setIsPending(false);
  //         setError(null);
  //       })
  //       .catch(err => {
  //         setError(err.message);
  //         setIsPending(false);
  //       });
  //   }, 1000);
  // }, []);
  // [] dependency  makes sure that the useEffect hook only runs for the first render of the component and not after that

  return (
    <div className="home">
      {error && <div>{error}</div>}
      {isPending && <div>Loading...</div>}
      {/* && first checks the left side if the left is false then it won't bother with the right side, so in this case it will only render the right side if the blogs variable is not null */}
      {blogs && <BlogList blogs={blogs} title="All Blogs!"></BlogList>}
    </div>
  );
};

export default Home;

// Passing blogs as props
// Data can be used later here
