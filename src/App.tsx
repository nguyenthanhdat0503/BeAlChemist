import "reactflow/dist/style.css";
import ControlsSidebar from "./components/ControlsSidebar/ControlsSidebar";
import DisplayImage from "./components/DisplayImage/DisplayImage";
import { FlowWorkspaceWrapper2 } from "./components/FlowWorkspace/FlowWorkspace2";
import useRouteElements from "./routes/useRouteElements";

function App() {
  const routeElements = useRouteElements()
  return routeElements;
  return (
    <>
      <div className="h-screen flex overflow-y-hidden">
        <div className="w-[50px]">
          <ControlsSidebar />
        </div>
        <div className="grow">
          <div className="grid grid-cols-12 gap-0 ">
            <div className="col-span-7 h-screen">
              <FlowWorkspaceWrapper2 />
            </div>
            <div className="col-span-5">
              <DisplayImage />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
