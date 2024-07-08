import { SwapOutlined } from "@ant-design/icons";
import { Button, Select } from "antd";
import { useLocation, useNavigate } from "react-router-dom";

export default function HeaderRight() {
  const location = useLocation();
  const navigate = useNavigate();
  const isErrorTab = location.pathname.includes("/errorTab");
  const onChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  const onSearch = (value: string) => {
    console.log("search:", value);
  };

  return (
    <div className="col-span-5 bg-slate-500 flex gap-2 items-center justify-between">
      <div className="flex gap-2">
        <Select
          showSearch
          className="w-[200px]"
          placeholder="Select a workspace"
          optionFilterProp="label"
          onChange={onChange}
          onSearch={onSearch}
          options={[
            {
              value: "Workspace 1",
              label: "Workspace 1",
            },
            {
              value: "Workspace 2",
              label: "Workspace 2",
            },
            {
              value: "Workspace 3",
              label: "Workspace 3",
            },
          ]}
        />
        <Select
          showSearch
          className="w-[200px]"
          placeholder="Select a model"
          optionFilterProp="label"
          options={[
            {
              value: "Model 1",
              label: "Model 1",
            },
            {
              value: "Model 2",
              label: "Model 2",
            },
            {
              value: "Model 3",
              label: "Model 3",
            },
          ]}
        />
      </div>
      <div className="mr-5">
        {isErrorTab && (
          <Button
            icon={<SwapOutlined />}
            onClick={() => {
              navigate("/");
            }}
          >
            Switch to Model Tab
          </Button>
        )}
        {!isErrorTab && (
          <Button
            icon={<SwapOutlined />}
            onClick={() => {
              navigate("/errorTab");
            }}
          >
            Switch to Error Tab
          </Button>
        )}
      </div>
    </div>
  );
}
