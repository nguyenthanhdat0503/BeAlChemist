import { Input, Radio, RadioChangeEvent, Select } from "antd";
import { useState } from "react";

function NumbericCondition() {
  return (
    <div className="w-4/5 flex items-center justify-between gap-4">
      <Select
        className="w-2/4 text-center"
        defaultValue={"GREATER"}
        size="large"
        options={[
          { value: "GREATER", label: ">" },
          { value: "GREATER_OR_EQUAL", label: ">=" },
          { value: "SMALLER", label: "<" },
          { value: "SMALLER_OR_EQUAL", label: "<=" },
          { value: "EQUAL", label: "=" },
        ]}
      />
      <Input
        size="large"
        placeholder="Enter Number"
        className="grow"
        type="number"
      />
    </div>
  );
}
export default function OCRDetection() {
  const [condition, setCondition] = useState("STRING_CONDITION");

  const onChange = (e: RadioChangeEvent) => {
    console.log("radio checked", e.target.value);
    setCondition(e.target.value);
  };
  return (
    <div className="grid grid-cols-12 items-center border rounded-md py-4">
      <div className="col-span-4 ml-3 font-semibold">OCR Detection:</div>
      <div className="col-span-8">
        <Select
          size="large"
          className="w-4/5"
          options={[
            { value: "MOUSE_ACTION", label: "OCR Detection 1" },
            { value: "KEYBOARD_ACTION", label: "OCR Detection 2" },
            { value: "INPUT_TEXT", label: "OCR Detection 3" },
          ]}
        />
        <div className="w-4/5 my-3">
          <Radio.Group
            onChange={onChange}
            value={condition}
            size="large"
            className="flex items-center gap-2"
          >
            <Radio value={"STRING_CONDITION"} className="text-base">
              String Condition
            </Radio>
            <Radio value={"NUMERIC_CONDITION"} className="text-base">
              Numeric Condition
            </Radio>
          </Radio.Group>
        </div>
        {condition === "STRING_CONDITION" && (
          <Input
            className="w-4/5"
            size="large"
            placeholder="Enter String Condition"
          />
        )}
        {condition === "NUMERIC_CONDITION" && <NumbericCondition />}
      </div>
    </div>
  );
}
