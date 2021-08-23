import React, { useState } from "react";
import Button from "./components/button";

function App() {
  return (
    <div>
      <header>
        <h1>React Example</h1>
      </header>
      <article>
        <p>Some content</p>
        <Button>Do some work</Button>
      </article>
      <footer>Some footer</footer>
    </div>
  );
}

export default App;
