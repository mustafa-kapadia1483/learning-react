import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import useFetch from "./useFetch";

const BlogDetails = () => {
  const { id } = useParams();
  const { data: blog, error } = useFetch(`http://localhost:8000/blogs/${id}`);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [author, setAuthor] = useState("mario");
  const [isPending, setisPending] = useState(false);
  const [updateBlog, setupdateBlog] = useState(false);
  const history = useHistory();

  const handleSubmit = e => {
    e.preventDefault();
    const blog = { title, body, author };

    setisPending(true);

    fetch(`http://localhost:8000/blogs/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(blog),
    }).then(() => {
      console.log("new blog added");
      setisPending(false);
      history.go(0);
      // history.push("/");
    });
  };

  const handleClick = () => {
    fetch(`http://localhost:8000/blogs/${id}`, {
      method: "DELETE",
    }).then(() => {
      history.push("/");
    });
  };

  return (
    <div className="blog-details">
      {isPending && <div>Loading....</div>}
      {error && <div>{error}</div>}
      {blog && (
        <article>
          <h2>{blog.title}</h2>
          <p>Written By {blog.author}</p>
          <div>{blog.body}</div>
          <button onClick={() => setupdateBlog(true)}>Update blog</button>
          <button onClick={handleClick}>Delete</button>
        </article>
      )}
      {updateBlog && (
        <form onSubmit={e => handleSubmit(e)}>
          <label>Blog title:</label>
          <input
            type="text"
            required
            value={title}
            onChange={e => {
              setTitle(e.target.value);
            }}
          />
          <label>Blog body:</label>
          <textarea
            required
            value={body}
            onChange={e => {
              setBody(e.target.value);
            }}
          />
          <label>Blog author:</label>
          <select
            value={author}
            onChange={e => {
              setAuthor(e.target.value);
            }}
          >
            <option value="mario">Mario</option>
            <option value="mami">Mami</option>
            <option value="mustu">Mustu</option>
          </select>
          {!isPending && <button>Add Blog</button>}
          {isPending && <button disabled>Adding Blog...</button>}

          <p>{title}</p>
          <p>{body}</p>
          <p>{author}</p>
        </form>
      )}
    </div>
  );
};

export default BlogDetails;
