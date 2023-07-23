import { Routes, Route } from "react-router-dom";

import Homepage from "./pages/Homepage";
import SecondPage from "./pages/SecondPage";

const App = () => {
  return (
    <Routes>
      <Route path='/' Component={Homepage} />
      <Route path='/secondpage' Component={SecondPage} />
    </Routes>
  );
};

export default App;
