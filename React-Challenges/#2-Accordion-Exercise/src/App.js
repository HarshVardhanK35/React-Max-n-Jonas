// !!! this version of application opens only one accordion at a time !!!
import { useState } from "react";

const faqs = [
  {
    title: "Where are these chairs assembled?",
    text: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusantium, quaerat temporibus quas dolore provident nisi ut aliquid ratione beatae sequi aspernatur veniam repellendus.",
  },
  {
    title: "How long do I have to return my chair?",
    text: "Pariatur recusandae dignissimos fuga voluptas unde optio nesciunt commodi beatae, explicabo natus.",
  },
  {
    title: "Do you ship to countries outside the EU?",
    text: "Excepturi velit laborum, perspiciatis nemo perferendis reiciendis aliquam possimus dolor sed! Dolore laborum ducimus veritatis facere molestias!",
  },
];

function App() {
  return (
    <div>
      <Accordion data={faqs} />
    </div>
  );
}

function Accordion({ data }) {
  const [curOpen, setCurOpen] = useState(null);

  return (
    <div className="accordion">
      {data.map((el, i) => {
        return (
          <AccordionItem
            key={el.title}
            num={i}
            title={el.title}
            curOpen={curOpen}
            onCurOpen={setCurOpen}
          >
            {el.text}
          </AccordionItem>
        );
      })}
    </div>
  );
}

function AccordionItem({ num, title, children, curOpen, onCurOpen }) {
  const isOpen = num === curOpen;

  function handleOpen() {
    onCurOpen(isOpen ? null : num);
  }
  return (
    <div className={`item ${isOpen ? "open" : null}`} onClick={handleOpen}>
      <p className="number">{num < 9 ? `0${num + 1}` : num + 1}</p>
      <p className="title">{title}</p>
      <p className="icon">{isOpen ? "-" : "+"}</p>
      {isOpen && <div className="content-box">{children}</div>}
    </div>
  );
}

export default App;
