import { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const Create = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [author, setAuthor] = useState("mario");
  const [isPending, setisPending] = useState(false);
  const history = useHistory();

  const handleSubmit = e => {
    e.preventDefault();
    const blog = { title, body, author };

    setisPending(true);

    fetch("http://localhost:8000/blogs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(blog),
    }).then(() => {
      console.log("new blog added");
      setisPending(false);
      // history.go(-1);
      history.push("/");
    });
  };

  return (
    <div className="create">
      <h2>Add a New Blog</h2>
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
    </div>
  );
};

export default Create;
