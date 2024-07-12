import { Select } from "antd";

export default function FeatureDetectionSelector() {
  return (
    <div className="grid grid-cols-12 items-center border rounded-md py-2">
      <div className="col-span-4 ml-3 font-semibold">Feature Detection:</div>
      <div className="col-span-8">
        <Select
          size="large"
          className="w-4/5"
          onChange={(value) => {
            console.log(value);
          }}
          options={[
            { value: "MOUSE_ACTION", label: "Mouse Action" },
            { value: "KEYBOARD_ACTION", label: "Keyboard Action" },
            { value: "INPUT_TEXT", label: "Input Text" },
          ]}
        />
      </div>
    </div>
  );
}
