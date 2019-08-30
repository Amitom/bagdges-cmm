import React from 'react';
import '../node_modules/milligram/dist/milligram.min.css';

import BadgesBuilder from "./components/BadgesBuilder"

function App() {
  return (
    <main className="wrapper">
      <section className="container">
        <BadgesBuilder />
      </section>
    </main>
  );
}

export default App;
