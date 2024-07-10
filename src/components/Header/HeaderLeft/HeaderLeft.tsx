import {
  DeleteOutlined,
  FolderAddOutlined,
  ImportOutlined,
  MehOutlined,
  PlusSquareOutlined,
  SaveOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Button, Dropdown, MenuProps } from "antd";
import { useMemo } from "react";
import { useLocation } from "react-router-dom";
import { startSavingFlow } from "../../../features/flow-controls/flow-controls.slice";
import { useDispatch } from "react-redux";

export default function HeaderLeft() {
  const location = useLocation();
  const isErrorTab = useMemo(
    () => location.pathname.includes("/errorTab"),
    [location.pathname]
  );

  const dispatch = useDispatch();

  const onSave = () => {
    dispatch(startSavingFlow());
  };

  const items: MenuProps["items"] = [
    {
      key: "IMPORT_ERRORS",
      label: (
        <button className="flex items-center gap-2 my-1">
          <ImportOutlined />
          <p>Import Errors</p>
        </button>
      ),
    },
    {
      key: "SAVE_ERRORS",
      label: (
        <button className="flex items-center gap-2 my-1">
          <SaveOutlined />
          <p>Save Errors</p>
        </button>
      ),
    },
  ];
  return (
    <div className="col-span-7 bg-slate-500 flex">
      <p className="w-40 flex items-center justify-center text-xl text-white font-semibold">
        BeAlChemist
      </p>
      <div className="flex items-center gap-2">
        <Button icon={<SaveOutlined />} onClick={onSave}>Save</Button>
        <Button icon={<FolderAddOutlined />}>New Model</Button>
        <Button icon={<PlusSquareOutlined />}>Clone Workspace</Button>
        <Button icon={<PlusSquareOutlined />}>Clone Model</Button>
        <Button icon={<SearchOutlined />}>Inspect</Button>
        <Button danger icon={<DeleteOutlined />}>
          Delete Model
        </Button>
        {isErrorTab && (
          <Dropdown menu={{ items }}>
            <Button icon={<MehOutlined />}>Error</Button>
          </Dropdown>
        )}
      </div>
    </div>
  );
}
