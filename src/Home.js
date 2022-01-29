const Home = () => {
  const handleClick = () => {
    console.log("Hello Ninjas");
  };
  const handleClickAgain = name => {
    console.log("hello" + name);
  };
  return (
    <div className="home">
      <h1>Homepage</h1>
      <button onClick={handleClick}>Click me</button>
      <button onClick={() => handleClickAgain("mustafa")}>Click me</button>
    </div>
  );
};

export default Home;
