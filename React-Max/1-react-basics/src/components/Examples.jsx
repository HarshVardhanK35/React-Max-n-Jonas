import { useState } from "react";

import TabButton from "../components/TabButton.jsx";
import Section from "./Section.jsx";
import { EXAMPLES } from "../data.js";
import Tabs from "./Tabs.jsx";

function Examples() {
  const [selectedTopic, setSelectedTopic] = useState("");

  function handleSelect(selectedBtn) {
    setSelectedTopic(selectedBtn);
  }

  return (
    <>
      <Section title="Examples" id="examples">
        <Tabs
          ButtonsContainer= "menu"
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
        </Tabs>
      </Section>
      <h2>Time to get started!</h2>
    </>
  );
}
export default Examples;