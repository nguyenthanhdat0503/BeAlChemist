import { Input, InputRef, Select } from "antd";
import { useEffect, useRef, useState } from "react";
type ActionType = "MOUSE_ACTION" | "KEYBOARD_ACTION" | "INPUT_TEXT";

function MouseAction() {
  return (
    <Select
      size="large"
      placeholder="Select a mouse action"
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
  );
}

function KeyboardAction() {
  const [inputValue, setInputValue] = useState("");

  return (
    <Input
      value={inputValue}
      placeholder="Press a keyboard"
      size="large"
      className="w-4/5"
      onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
        setInputValue(e.code);
        e.preventDefault();
      }}
    />
  );
}

function InputTextAction() {
  return <Input placeholder="Type something" size="large" className="w-4/5" />;
}
export default function ActionSelector() {
  const [action, setAction] = useState<ActionType>("MOUSE_ACTION");

  return (
    <div className="grid grid-cols-12">
      <div className="col-span-4">
        <Select
          value={action}
          size="large"
          className="w-4/5"
          onChange={(value) => {
            console.log(value);
            setAction(value as ActionType);
          }}
          options={[
            { value: "MOUSE_ACTION", label: "Mouse Action" },
            { value: "KEYBOARD_ACTION", label: "Keyboard Action" },
            { value: "INPUT_TEXT", label: "Input Text" },
          ]}
        />
      </div>
      <div className="col-span-8">
        {action === "MOUSE_ACTION" && <MouseAction />}
        {action === "KEYBOARD_ACTION" && <KeyboardAction />}
        {action === "INPUT_TEXT" && <InputTextAction />}
      </div>
    </div>
  );
}
