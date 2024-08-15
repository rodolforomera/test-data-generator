import { Main } from "./Main";
import './App.css';
import { Outlet } from "react-router-dom";
import { Splitter, SplitterPanel } from 'primereact/splitter';

function App() {
  return (
    <div className="App">
     
      <Splitter>
          <SplitterPanel minSize={12} size={12} className="">
            <Main/>
          </SplitterPanel>
          <SplitterPanel size={88} className="">
            <Outlet />
          </SplitterPanel>
      </Splitter>

    </div>
  );

}

export default App;
