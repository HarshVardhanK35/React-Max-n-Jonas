function Header() {
  const style = { color: "red", fontSize: "40PX", textTransform: "uppercase" };
  return (
    <header className="header ">
      <h1 style={style}>Fast React Pizza Co.</h1>
    </header>
  );
}

export default Header;
