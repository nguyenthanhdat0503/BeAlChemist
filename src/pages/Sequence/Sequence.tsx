import { Input } from "antd";
import DisplayImage from "../../components/DisplayImage/DisplayImage";
import { FlowWorkspaceWrapper2 } from "../../components/FlowWorkspace/FlowWorkspace2";
import NodeSidebar from "../../components/NodeSidebar/NodeSidebar";
import ActionSelector from "./ActionSelector";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { useMemo } from "react";
import FeatureDetectionSelector from "./FeatureDetectionSelector";
import OCRDetection from "./OCRDetection";
import DynamicObjectDetection from "./DynamicObjectDetection";

export default function Sequence() {
  const screenSize = useSelector(
    (state: RootState) => state.flowControls.screenSize
  );
  const containerHeight = useMemo(() => {
    const HEADER_HEIGHT = 50;
    if (screenSize.height === 0 || screenSize.width === 0) return 0;
    return screenSize.height - HEADER_HEIGHT;
  }, [screenSize]);
  if (screenSize.height === 0 || screenSize.width === 0) return null;
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
      <div className="col-span-5 h-full flex flex-col shadow-xl">
        <div
          style={{
            height: 500,
          }}
        >
          <DisplayImage />
        </div>
        <div className="text-xl font-semibold text-black shadow-md h-[40px] z-10 flex items-center justify-center">
          Properties
        </div>
        <div
          className="w-full overflow-y-auto py-8 px-3"
          style={{
            height: containerHeight - 500 - 40,
          }}
        >
          <div className="mt-2 flex flex-col gap-3">
            <ActionSelector />
            <div className="grid grid-cols-12 items-center">
              <div className="col-span-4 ml-3 font-semibold">
                Machine Index:
              </div>
              <div className="col-span-8">
                <Input
                  size="large"
                  className="w-4/5"
                  placeholder="Enter Machine Index"
                  type="number"
                />
              </div>
            </div>
            <div className="grid grid-cols-12 items-center">
              <div className="col-span-4 ml-3 font-semibold">Shift X:</div>
              <div className="col-span-8">
                <Input
                  size="large"
                  className="w-4/5"
                  placeholder="Enter Shift X"
                  type="number"
                />
              </div>
            </div>
            <div className="grid grid-cols-12 items-center">
              <div className="col-span-4 ml-3 font-semibold">Shift Y:</div>
              <div className="col-span-8">
                <Input
                  size="large"
                  className="w-4/5"
                  placeholder="Enter Shift Y"
                  type="number"
                />
              </div>
            </div>
            <div className="grid grid-cols-12 items-center">
              <div className="col-span-4 ml-3 font-semibold">
                Time Sleep (second):
              </div>
              <div className="col-span-8">
                <Input
                  size="large"
                  className="w-4/5"
                  placeholder="Enter Time Sleep"
                  type="number"
                />
              </div>
            </div>
            <FeatureDetectionSelector />
            <OCRDetection />
            <DynamicObjectDetection />
          </div>
        </div>
      </div>
    </div>
  );
}
