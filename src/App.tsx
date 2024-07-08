import "reactflow/dist/style.css";
import ControlsSidebar from "./components/ControlsSidebar/ControlsSidebar";
import DisplayImage from "./components/DisplayImage/DisplayImage";
import { FlowWorkspaceWrapper2 } from "./components/FlowWorkspace/FlowWorkspace2";

function App() {
  return (
    <>
      <div className="h-screen flex overflow-y-hidden">
        <div className="w-[50px]">
          <ControlsSidebar />
        </div>
        <div className="grid grid-cols-12 gap-0 ">
          <div className="col-span-8">
            {/* <FlowWorkspace isAdding={isAdding} setIsAdding={setIsAdding} /> */}
            {/* <FlowWorkspaceWrapper /> */}
            <FlowWorkspaceWrapper2 />
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
