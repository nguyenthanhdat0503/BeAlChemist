import DisplayImage from "../../components/DisplayImage/DisplayImage";
import { FlowWorkspaceWrapper2 } from "../../components/FlowWorkspace/FlowWorkspace2";
import NodeSidebar from "../../components/NodeSidebar/NodeSidebar";

export default function Sequence() {
  return (
    <div className="h-full grid grid-cols-12 gap-0">
      <div className="col-span-7 h-full flex">
        <div className="w-[50px]">
          <NodeSidebar />
        </div>
        <div className="grow">
          <FlowWorkspaceWrapper2 />
        </div>
      </div>
      <div className="col-span-5">
        <DisplayImage />
      </div>
    </div>
  );
}
