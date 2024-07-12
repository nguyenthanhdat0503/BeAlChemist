import { Checkbox, Input, Radio } from "antd";

export default function DynamicObjectDetection() {
  return (
    <div className="grid grid-cols-12 items-center border rounded-md py-2">
      <div className="col-span-4 ml-3 font-semibold">
        Dynamic Object Detection:
      </div>
      <div className="col-span-8">
        <div className="w-4/5 my-3 flex items-center">
          <div className="w-2/5">Time out (second):</div>
          <Input placeholder="Hello" size="large" className="w-3/5" />
        </div>
        <div className="w-4/5 my-3">
          <Radio.Group size="large" className="flex items-center gap-2">
            <Radio value={"STRING_CONDITION"} className="text-base">
              Go to sub branch
            </Radio>
            <Radio value={"NUMERIC_CONDITION"} className="text-base">
              Stop
            </Radio>
          </Radio.Group>
        </div>
        <div className="w-4/5 my-3">
          <Checkbox className="text-base">Is Invert</Checkbox>
        </div>
      </div>
    </div>
  );
}
