import { Routes, Route } from "react-router-dom";

import Homepage from "./components/Homepage";
import SecondPage from "./components/SecondPage";

const App = () => {
  return (
    <Routes>
      <Route path='/' Component={Homepage} />
      <Route path='/secondpage' Component={SecondPage} />
    </Routes>
  );
};

export default App;
