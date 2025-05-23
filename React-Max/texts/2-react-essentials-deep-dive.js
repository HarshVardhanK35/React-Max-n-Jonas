// * ! REACT ESSENTIALS- DEEP DIVE:
// -----------------------------------
// *
// * - we explore...
// *      1. Behind the scenes of JSX
// *      2. Structuring Components and State
// *      3. Advanced State usages
// *      4. Patterns & Best Practices

/**
 * 
 * ! 1. working with fragments
 * -----------------------------
 * 
 * - In JS => return statement inside a function, does not return two statements at a time
 * - In react => do not return two renderable components inside a function! so, without a wrapper tag/component this is not possible
 *
 * - we need a main <div> wrapper outside of multiple renderable components
 *      - so, we may need fragments to wrap those renderable components
 *  
ex: Fragments UseCase:
--- as below code is invalid in react ---
return(
    <header>...</header>
    <p>...</p>
)
Note:
- we need at least one wrapper tag/component outside header and p
- so we use <></> Fragments
 * 
 * * FRAGMENTS: <>...</>
 * - using these fragments may eradicate the use of extra <div></div> as wrapper around the other components
 * 
 * - there are two ways to use Fragments in react!
 *
 * case-1: 
fragments are used like this with import statement...
---
import {Fragment} from 'react'

function App() {
    return (
        <fragment> 
            <header>...</header>
            <p>...</p>
        </Fragment>
    )

}

 * case-2: 
can be used like this also.. but no need of import statement in this case
---
function App() {
    return (
        <>
            <header>...</header>
            <p>...</p>
        </>
    )

}
 * 
 * - using fragments in place of <div>...</div> can avoid creating extra "div" inside final output!
 * 
 * 
 * ! 2. When we should split up the components
 * ----------------------------------------------
 * - whenever we are using state inside component and it is rendering more components (nested in it!).. 
 *      - whenever the state updates the react code re-evaluates the entire react code and all these nested components also
 * 
 * - so, in order to not disturb the other components.. inside App() or some main component function... we have to divide the components
 * 
 * * State Management & Re-rendering:
 * - When a component uses state and renders other nested components, any state update will cause React to re-evaluate that component and all its children.
 * If some nested components do not depend on that state, they will still re-render unnecessarily, which can hurt performance.
 * 
 * ? Solution: Split such components into smaller ones so that only the parts that depend on the state re-render.
 * 
 * 
 * ! 3. Splitting up components based on it's Feature and State
 * --------------------------------------------------------------
 * - so we created two files inside components folder! 
 *      - which are: CoreConcept.jsx and Examples.jsx
 * 
 * - and we split the two features that goes into these files.. from App.jsx!
 *      - which made App.jsx readable and structured the project!
 * 
 * - after splitting up the code respective to it's features and state... the final output looks like this...

App.jsx:
---
import "./App.css";
import Header from "./components/Header";
import CoreConcepts from "./components/CoreConcepts.jsx";
import Examples from "./components/Examples.jsx";

function App() {
  return (
    <div>
      <Header />
      <main>
      <CoreConcepts/>
      <Examples/>
        <h2>Time to get started!</h2>
      </main>
    </div>
  );
}
export default App;
----------------------------------------------------------------------------------

2. components/CoreConcepts.jsx and components/Examples.jsx...
---
CoreConcepts.jsx:
---
import CoreConcept from "../components/CoreConcept";
import { CORE_CONCEPTS } from "../data";

function CoreConcepts() {
  return (
    <section id="core-concepts">
      <h2>Core Concepts</h2>
      <ul>
        {CORE_CONCEPTS.map((conceptItem) => {
          console.log(conceptItem);
          return <CoreConcept key={conceptItem.title} {...conceptItem} />;
        })}
      </ul>
    </section>
  );
}
export default CoreConcepts;
--------------------------------------------------------------------------------------------------------------------------------------------------------------------
3. Examples.jsx:
---
import { useState } from "react";

import TabButton from "../components/TabButton.jsx";
import { EXAMPLES } from "../data.js";

function Examples() {
  const [selectedTopic, setSelectedTopic] = useState("");

  function handleSelect(selectedBtn) {
    setSelectedTopic(selectedBtn);
  }

  return (
    <>
      <section id="examples">
        <h2>Examples</h2>
        <menu>
          <TabButton
            onSelect={() => {
              handleSelect("components");
            }}
            isSelected={selectedTopic === "components"}
          >
            Components
          </TabButton>
          <TabButton
            onSelect={() => {
              handleSelect("jsx");
            }}
            isSelected={selectedTopic === "jsx"}
          >
            JSX
          </TabButton>
          <TabButton
            onSelect={() => {
              handleSelect("props");
            }}
            isSelected={selectedTopic === "props"}
          >
            Props
          </TabButton>
          <TabButton
            onSelect={() => {
              handleSelect("state");
            }}
            isSelected={selectedTopic === "state"}
          >
            State
          </TabButton>
        </menu>
        <div id="tab-content">
          {!selectedTopic && <p>Please Select a Topic</p>}
          {selectedTopic && (
            <div>
              <h3>{EXAMPLES[selectedTopic].title}</h3>
              <p>{EXAMPLES[selectedTopic].description}</p>
              <pre>
                <code>{EXAMPLES[selectedTopic].code}</code>
              </pre>
            </div>
          )}
        </div>
      </section>
      <h2>Time to get started!</h2>
    </>
  );
}
export default Examples;
 * 
 * 
 * ! 4. Problem: Props are not forwarded to inner Elements
 * ---------------------------------------------------------
 * - when we analyze the code inside: Examples.jsx and CoreConcepts.jsx files 
 * 
 * 1. there are common two "section" and "content" code!
 * 
A Look into it... 
---
1. CoreConcepts.jsx:
---
import CoreConcept from "../components/CoreConcept";
import { CORE_CONCEPTS } from "../data";

function CoreConcepts() {
  return (
    <section id="core-concepts">                        //? Section
      <h2>Core Concepts</h2>
      <ul>                                              //? Actual content starts here...
        {CORE_CONCEPTS.map((conceptItem) => {
          console.log(conceptItem);
          return <CoreConcept key={conceptItem.title} {...conceptItem} />;
        })}
      </ul>
    </section>
  );
}
export default CoreConcepts;

2. Examples.jsx:
---
import { useState } from "react";
import TabButton from "../components/TabButton.jsx";
import { EXAMPLES } from "../data.js";

function Examples() {
  const [selectedTopic, setSelectedTopic] = useState("");

  function handleSelect(selectedBtn) {
    setSelectedTopic(selectedBtn);
  }
  return (
    <>
        <section id="examples">                             //? Section starts here...
            <h2>Examples</h2>
            <menu>
                <TabButton
                onSelect={() => {
                    handleSelect("components");
                }}
                isSelected={selectedTopic === "components"}         //? Actual content here...
                >
                Components
                </TabButton>
            </menu>
            <div id="tab-content">
            {!selectedTopic && <p>Please Select a Topic</p>}
            {selectedTopic && (
                <div>
                <h3>{EXAMPLES[selectedTopic].title}</h3>
                <p>{EXAMPLES[selectedTopic].description}</p>
                <pre>
                    <code>{EXAMPLES[selectedTopic].code}</code>
                </pre>
                </div>
            )}
            </div>
        </section>
        <h2>Time to get started!</h2>
    </>
  );
}
export default Examples;
 * 
 * - but we can create a "Section.jsx" file to insert section and content components 
 *      - these components gets the data through "props"
 * 
 * - create another file "Section.jsx" inside "components" folder ... 
 * 

inside Section.jsx:
---
function Section({ title, children, }){         //? these title and children are then transferred from actual Examples.jsx and CoreConcepts.jsx
    return(
        <section>
            <h2>{title}</h2>            
            {children}
        </section>
    )
}
export default Section
---------------------------------------------------------------------------------
props data from Examples.jsx:
---
import Section from "./Section.jsx";
import { EXAMPLES } from "../data.js";

function Examples() {
  const [selectedTopic, setSelectedTopic] = useState("");

  function handleSelect(selectedBtn) {
    setSelectedTopic(selectedBtn);
  }

  return (
    <>
      <Section title="examples" id="examples">              //? we can transform data to props from here!
    ...
    )
}
 * 
 * - but we cannot apply the styles, in order to apply styles we have to set "id" "className" attributes and values to the props again!
 *      - so after sending the data to props.. we have to retrieve data and use it after "destructuring"
 *      - so we have to destructure every thing that we send across.. 
 * 
 * - we can send data only and if we wanted to send className for styling too.. we have to destructure everything!
 * 
 * - this may get us into problem
 *      ! .. so we have FORWARD PROPS or PROXY PROPS!
 * !                      / 
 * !                     /
 * ! 5. Forwarding Props to wrapped elements
 * -------------------------------------------- 
 * * this pattern what we discuss in this section is very important and helpful while creating "wrapper" components
 * 
 * ? Rest Pattern (JS Syntax): used to group elements together into an object or an array
 * ? Spread Pattern (JS Syn.): used to separate the elements that are packed together in an array or an object! with respective variables
 * 
use cases:
inside Section.jsx:                     //! must be at last to collect REMAINING OR REST props
---                                     /
function Section({ title, children, ...props}){         //? PACKED: '...' three dots are used to collect
    return(                         
        <section {...props}>                //? UNPACKING: '...' same three dots used to separate the collected array elements!
            <h2>{title}</h2>            
            {children}
        </section>
    )
}
export default Section
 *  
 * * what is the difference? 
 * - REST
 * ? whenever 3 dots are used inside the parameters of a function, then that is the use-case for collection
 *      ? where remaining or REST of the props that are transferred from the actual component is collected inside a given variable (var: name can be anything!)
 *      ? rest pattern has to be at last of the parameters list! 
 * 
 * - SPREAD
 * ? when the same '...' operator is used anywhere but not in the function parameters, then it is unpacking of values into variables
 *      
In Examples.jsx:
---
function Examples() {
  const [selectedTopic, setSelectedTopic] = useState("");

  function handleSelect(selectedBtn) {
    setSelectedTopic(selectedBtn);
  }

  return (
    <>
      <Section title="examples" id="examples" className="...">          //? we can send as many of props as we can.. these are sent to the collector and packed into a variable 
        <menu>
          <TabButton
            onSelect={() => {
              handleSelect("components");
            }}
            isSelected={selectedTopic === "components"}
          >
            Components
          </TabButton>
          ...
    ) 
}
 * 
 *  * Using both patterns to reform other components:
 * ---
in TabButton.jsx:
---
previously: function TabButton({ children, onSelect, isSelected }) {
refactored: function TabButton({ children, isSelected, ...props}) {

  return (
    <li>
        pre: <button className= {isSelected ? "active" : null} onClick={onSelect}> 
        ref: <button className= {isSelected ? "active" : null} {...props}>
        {children}
      </button>
    </li>
  );
}
export default TabButton;
----------------------------------------------------------------------------------------------

in Example.jsx:
---
function Examples() {
  const [selectedTopic, setSelectedTopic] = useState("");

  function handleSelect(selectedBtn) {
    setSelectedTopic(selectedBtn);
  }

  return (
    <>
      <Section title="examples" id="examples">
        <menu>
        
        //? previously:
        <TabButton
            onSelect={() => {
              handleSelect("components");
            }}
            isSelected={selectedTopic === "components"}
          >
            Components
        </TabButton>

        //? after reforming:
          <TabButton
            onClick={() => {
              handleSelect("components");
            }}
            isSelected={selectedTopic === "components"}
          >
            Components
          </TabButton>
          ...
    )
}
 * 
 * - here in above reformation, previously we are sending 'onSelect' from place where component used, 
 *      - to the place where we actually used, where "onSelect" is stored inside "onClick"
 * 
 * - but after reforming the code we send the direct prop "onClick" from the place where custom component used to the place where custom component is defined!
 * 
 * ! CHALLENGE:
 * ---
 * 
Forwarding Props
Your task is to work on the Input component such that it either returns a <textarea> element or an <input> element, depending on whether a richText prop set on Input is true or false.

I.e., if used like this:

<Input richText />
the Input component should render a <textarea>. Otherwise, it should render an <input>.

In addition, the Input component should forward all other props directly to the returned <textarea> or <input> elements.

I.e., it should be usable like this:

<Input type="text" placeholder="Your name" />
(as seen in the existing App.js file)
------------------------------------------------------------------------------------------------------------------------------------
in App.jsx:
---
import Input from './Input';

function App() {
  return (
    <div id="content">
      <Input type="text" placeholder="Your name" />
      <Input richText placeholder="Your message" />
    </div>
  );
}
export default App;
------------------------------------------------------------------------------------------------------------------------------------
in Input.jsx:
---
export default function Input({richText, ...props}) {                       //? forwarded props
  if(richText) {
      return <textarea {...props}/>                     //? condition to render
  }                                                     
  return <input {...props}/>
}
 * 
 * 
 * ! 6. Working with multiple JSX slots
 * -------------------------------------- 
 * - creating another wrapper component: "Tabs" 
 *    - where there might be a need to repeat this component for any requirement
 * 
A LOOK INTO THE CODE:


function Examples() {
  const [selectedTopic, setSelectedTopic] = useState("");

  function handleSelect(selectedBtn) {
    setSelectedTopic(selectedBtn);
  }

  return (
    <>
      <Section title="examples" id="examples">
        <menu>        //? Tabs starts from here: CLICKABLE
          <TabButton
            onClick={() => {
              handleSelect("components");
            }}
            isSelected={selectedTopic === "components"}
          >
            Components
          </TabButton>
        </menu>           //? content to display starts from here: RENDERS data 'onClick'
        <div id="tab-content">
          {!selectedTopic && <p>Please Select a Topic</p>}
          {selectedTopic && (
            <div>
              <h3>{EXAMPLES[selectedTopic].title}</h3>
              <p>{EXAMPLES[selectedTopic].description}</p>
              <pre>
                <code>{EXAMPLES[selectedTopic].code}</code>
              </pre>
            </div>
          )}
        </div>
      </Section>
      <h2>Time to get started!</h2>
    </>
  );
}
export default Examples;
 * 
 * - if there is a requirement, we can repeat the wrapper we about to create now for other components too... 
 * 
1. create a Tabs.jsx component:
---

function Tabs({ children, buttons }) {    //? this requires two props.. children and buttons
  return (
    <>
      <menu>{buttons}</menu>    //? where {buttons} sent through Attribute props
      {children}            //? this sent as the actual content!
    </>
  );
}
export default Tabs;

2. inside Examples.jsx:
---
import Tabs from "./Tabs.jsx";

function Examples() {
  const [selectedTopic, setSelectedTopic] = useState("");

  function handleSelect(selectedBtn) {
    setSelectedTopic(selectedBtn);
  }

  return (
    <>
      <Section title="examples" id="examples">
        <Tabs         //? that custom component is used here! 
          buttons={         //? Attribute Props
            <>
              <TabButton
                onClick={() => {
                  handleSelect("components");
                }}
                isSelected={selectedTopic === "components"}
              >
                Components
              </TabButton>
              <TabButton
                onClick={() => {
                  handleSelect("jsx");
                }}
                isSelected={selectedTopic === "jsx"}
              >
                JSX
              </TabButton>
              <TabButton
                onClick={() => {
                  handleSelect("props");
                }}
                isSelected={selectedTopic === "props"}
              >
                Props
              </TabButton>
              <TabButton
                onClick={() => {
                  handleSelect("state");
                }}
                isSelected={selectedTopic === "state"}
              >
                State
              </TabButton>
            </>
          }
        >
          <div id="tab-content">      //? Children Props
            {!selectedTopic && <p>Please Select a Topic</p>}
            {selectedTopic && (
              <div>
                <h3>{EXAMPLES[selectedTopic].title}</h3>
                <p>{EXAMPLES[selectedTopic].description}</p>
                <pre>
                  <code>{EXAMPLES[selectedTopic].code}</code>
                </pre>
              </div>
            )}
          </div>
        </Tabs>
      </Section>
      <h2>Time to get started!</h2>
    </>
  );
}
export default Examples;
 * 
 * 
 * ! 7. Set components type dynamically
 * --------------------------------------- 
 * 
- inside the below code... there might be a chance to use different wrappers around the "buttons"
ex:
function Tabs({ children, buttons }) {
  return (
    <>
      <menu>{buttons}</menu>    //? here! we can use different wrapper classes around the buttons
      {children}
    </>
  );
}
export default Tabs;
 * 
 * - so there is a chance to wrap "buttons" with some other wrapper class dynamically
 *    - when we use in different section! we may get another wrapper class other than "menu" around 'buttons'
 * 
 * - to set dynamically the component type or wrapper class.. we can get using 'props'
 *    - and we can send the value to that 'prop' that will wrap around the 'buttons' on requirement of dev - dynamically!
 * 
 * Note: 
 * 1. we can also send our custom props that will wrap buttons or else if it can be div/menu/h1/header etc... 
 *    - then the value must be passed like "div"/"menu"/"h1"/"header" etc...
 * 2. But for custom components the value must be wrapped in {} => {Section}/{Header} => these components that we created!
 * 
ex: 
1. props receiving component... 
---
function Tabs({ children, buttons, buttonsContainer }) {     //? props received here...
  const ButtonsContainer = buttonsContainer;                          //* importance
  return (
    <>
      <ButtonsContainer>{buttons}</ButtonsContainer>
      {children}
    </>
  );
}
export default Tabs;

2. props sending component... 
---
import Tabs from "./Tabs.jsx";      //? component is imported here...

function Examples() {
  const [selectedTopic, setSelectedTopic] = useState("");

  function handleSelect(selectedBtn) {
    setSelectedTopic(selectedBtn);
  }

  return (
    <>
      <Section title="examples" id="examples">
        <Tabs
          buttonsContainer= "menu"           //? value for props is sent here!
          buttons={
            <>
              <TabButton
                onClick={() => {
                  handleSelect("components");
                }}
                isSelected={selectedTopic === "components"}
              >
                Components
              </TabButton>
              ...
              </>
          }
        >
          <div id="tab-content">
          ...content rendered here on clicking tabs... 
          </div>
        </Tabs>
      </Section>
      <h2>Time to get started!</h2>
    </>
  );
}
export default Examples;
 * 
 * 
 * * function Tabs({ children, buttons, buttonsContainer }) {     //? props received here...
 * * const ButtonsContainer = buttonsContainer;                                 //? importance
 * 
 * ? why didn't we use 'buttonsContainer' directly? 
 * - cause react looks for built-in "buttonsContainer" cause it started with small-case - every component in HTML starts with small-case
 * - so, we used const ButtonsContainer and stored the value we received from the props
 * 
1. Direct props transferring!
---
import Tabs from "./Tabs.jsx";

function Examples() {
  const [selectedTopic, setSelectedTopic] = useState("");

  function handleSelect(selectedBtn) {
    setSelectedTopic(selectedBtn);
  }

  return (
    <>
      <Section title="examples" id="examples">
        <Tabs
          //* ButtonsContainer= "menu"    
          //? we directly sending the "ButtonsContainer" to the props
..............................................
2. receiving props:
---
function Tabs({ children, buttons, ButtonsContainer }) {
//   const ButtonsContainer = buttonsContainer;                 //? instead of using other constant and storing the value
  return (
    <>
      <ButtonsContainer>{buttons}</ButtonsContainer>        //? ButtonsContainer is used here... 
      {children}
    </>
  );
}
export default Tabs;
 * 
 * * Note: 
 * * custom components has to be sent wrapping with '{}' curly braces {}!
 * * built-in components has to be sent normally inside quotations like values ""!
 * 
 * 
 * ! 8. Setting default props value
 * ----------------------------------- 
 * - taking previous example into consideration!
 * 
1. receiving props:                                   //? we can set default values like this.. so no need to send props from the main component, where we use this custom component
---                                                             /
function Tabs({ children, buttons, ButtonsContainer= "menu" (or) Section }) {
//   const ButtonsContainer = buttonsContainer;                 
  return (
    <>
      <ButtonsContainer>{buttons}</ButtonsContainer>         
      {children}
    </>
  );
}
export default Tabs;
 * 
 * - ButtonsContainer might get a value while destructuring that can be a value wrapped in "" or {}
 *    - if wrapped inside "" will be a built-in component class or if it was wrapped inside {} is considered to be a custom component
 * 
 * Note: the custom component must be imported into file, before we use it!
 * 
 * 
 * 
 * ! Challenge
 * >------------
 * Q: 
 * Your task is to build a highly re-usable, custom Button component that can be used in all the following ways (also see the code in the App.js file):
 * 
 * Hint:
 * - To make sure the icon becomes visible (if passed correctly to the component & used in there), wrap the icon component in the button with a <span> that has the class "button-icon" on it.
 *    - Also wrap the children prop with a <span>!
 *    - You find all the styles (CSS classes) that are required to build a button that supports these different "modes" in the provided index.css file!
 *    - All buttons need a button CSS class - and then, depending on their mode, additional classes.
 *    - In addition, the custom Button component must accept all standard props that could be set on the built-in <button>. These props should be forwarded to the default <button> element that will be used in the custom Button component.
 *    - Your task therefore is to work on the Button component provided in the Button.js file. Don't add multiple custom components, instead work on that one provided component and make sure that it supports all these different modes & features. Also make sure, that if no mode is set, the "filled" mode is assumed as a default.
 * 
 * 
App.jsx:
---
import Button from './Button';
import HomeIcon from './HomeIcon';
import PlusIcon from './PlusIcon';

function App() {
  return (
     <div id="app">
      <section>
        <h2>Filled Button (Default)</h2>
        <p>
          <Button>Default</Button>
        </p>
        <p>
          <Button mode="filled">Filled (Default)</Button>
        </p>
      </section>
      <section>
        <h2>Button with Outline</h2>
        <p>
          <Button mode="outline">Outline</Button>
        </p>
      </section>
      <section>
        <h2>Text-only Button</h2>
        <p>
          <Button mode="text">Text</Button>
        </p>
      </section>
      <section>
        <h2>Button with Icon</h2>
        <p>
          <Button Icon={HomeIcon}>Home</Button>
        </p>
        <p>
          <Button Icon={PlusIcon} mode="text">
            Add
          </Button>
        </p>
      </section>
      <section>
        <h2>Buttons Should Support Any Props</h2>
        <p>
          <Button mode="filled" disabled>
            Disabled
          </Button>
        </p>
        <p>
          <Button onClick={() => console.log('Clicked!')}>Click me</Button>
        </p>
      </section>
    </div>
  );
}
export default App;
--------------------------------------------------------------------
2. Button.jsx:
---
export default function Button({children, className, mode="filled", Icon, ...props}) {
    
    let cssClasses= `button ${mode}-button`
    
    if(Icon){
        cssClasses = cssClasses + ' icon-button'
    }
    
    if(className){
        className = className + " " + className
    }
    
    return (
         <button className={cssClasses} {...props}>
      {Icon && (
        <span className="button-icon">
          <Icon />
        </span>
      )}
        <span>{children}</span>
        </button>
    )
}
export default App;
--------------------------------------------------------------------
export default function PlusIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
    </svg>
  );
}
--------------------------------------------------------------------
export default function HomeIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path
        fillRule="evenodd"
        d="M9.293 2.293a1 1 0 011.414 0l7 7A1 1 0 0117 11h-1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-3a1 1 0 00-1-1H9a1 1 0 00-1 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-6H3a1 1 0 01-.707-1.707l7-7z"
        clipRule="evenodd"
      />
    </svg>
  );
}
-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
 * 
 * ! 9. towards next project and advanced topics
 * ---------------------------------------------
 * - there is static markups inside a project ? "we can use index.html to render those markups" : ""
 *    - "inside index.html before the line of '<div id="root"></div>' "
ex:
---
<body>
  <header>
    <img src="game-logo.png" alt="Tic-Tac-Toe image!">
    <h1>Tic-Tac-Toe</h1>
  </header>
  <div id="root"></div>
  <script type="module" src="/src/index.jsx"></script>
</body>
 * 
 * - like above we can just include the components into "index.html" which does not depend on anything (state/ react's specific)!
 * 
 * Note: 
 * - we can also just refer to the image "game-logo.png" inside public folder! cause public will be served along side of index.html and no need to set up a path to get the image file
 * 
 * 
 * ! 10. Project: 1st Step Towards Tic-Tac-Toe
 * ----------------------------------------------
 * 
 * ! 11. Concept Repetition: Splitting Components and Building Re-Usable Components
 * ----------------------------------------------------------------------------------
 * 
 * ! 12. Concept Repetition: Working with state
 * ----------------------------------------------
 * 
 * ! 13. Component Instances Work in Isolation
 * ----------------------------------------------
 * 
 * ! 14. Conditional Content and Sub-optimal way of updating state
 * -----------------------------------------------------------------
 * 
 * ! 15. Best practices: Updating state based on old state correctly! 
 * -------------------------------------------------------------------
 * 
 * ! 16. User Input and Two-Way Binding
 * --------------------------------------
 * 
 * ! > Challenge
 * ----------------
 * ? Q : Two-Way-Binding
Your task is to collect the values entered into the two input controls (<textarea> and <input>) via two-way binding.
In addition, you should pass the collected values via the appropriate props to the already existing Review component.
Important: In this Udemy workspace, you must use React.useState() instead of just useState()!
The final app should allow users to enter values and then see those entered values in the Review component which is output below the input components. 

App.js
---
import React from 'react';
import Review from './Review';

function App() {
    const [enteredFeedback, setEnteredFeedback] = React.useState("")
    const [studentName, setStudentName] = React.useState("")
    function handleTextArea(e) {
        setEnteredFeedback(e.target.value)
    }
    function handleName(e) {
        setStudentName(e.target.value)
    }
  return (
    <>
      <section id="feedback">
        <h2>Please share some feedback</h2>
        <p>
          <label>Your Feedback</label>
          <textarea value={enteredFeedback} onChange={handleTextArea} />
        </p>
        <p>
          <label>Your Name</label>
          <input type="text" value={studentName} onChange={handleName}/>
        </p>
      </section>
      <section id="draft">
        <h2>Your feedback</h2>
        <Review feedback = {enteredFeedback} student = {studentName}/>
        <p>
          <button>Save</button>
        </p>
      </section>
    </>
  );
}
export default App;

Review.jsx:
---
export default function Review({ feedback, student }) {
  return (
    <figure>
      <blockquote>
        <p>{feedback}</p>
      </blockquote>
      <figcaption>{student}</figcaption>
    </figure>
  );
}
 * 
 * ! 17. 
 * --------------------------------------
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
*/
