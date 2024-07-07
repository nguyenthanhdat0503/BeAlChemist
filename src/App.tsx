import ControlsSidebar from "./components/ControlsSidebar/ControlsSidebar";
import DisplayImage from "./components/DisplayImage/DisplayImage";
import FlowWorkspace from "./components/FlowWorkspace/FlowWorkspace";
import "reactflow/dist/style.css";

function App() {
  return (
    <>
      <div className="h-screen flex">
        <div className="w-[50px]">
          <ControlsSidebar />
        </div>
        <div className="grid grid-cols-12 gap-0 ">
          <div className="col-span-8">
            <FlowWorkspace />
          </div>
          <div className="col-span-4">
            <DisplayImage />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
