/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { CloseCircleOutlined } from "@ant-design/icons";
import { Input } from "antd";
import classNames from "classnames";
import React, { memo, useCallback, useState } from "react";
import { Position } from "reactflow";
import { NODE_TYPES } from "../../../constants/node.types";
import CustomHandle from "../../CustomHandle/CustomHandle";

interface Props {
  data: any;
  selected: boolean;
}
const StopProductionNode = ({ data, selected }: Props) => {
  const [label, setLabel] = useState<string>(data?.label || "");

  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      data.label = e.target.value;
      setLabel(e.target.value);
    },
    [data]
  );

  return (
    <div
      className={classNames(`border rounded-md`, {
        "border-1 border-black": selected,
      })}
      style={{
        backgroundColor: NODE_TYPES.STOP_PRODUCTION.BACKGROUND,
      }}
    >
      <CustomHandle
        type="target"
        position={Position.Left}
        style={{
          backgroundColor: "black",
          width: 10,
          height: 10,
          left: -10,
          border: "none",
        }}
        id={`INPUT`}
        isConnectable={1}
      />
      <div className="p-4">
        <Input
          value={label}
          onChange={onChange}
          className="nodrag rounded-none w-[200px] border-none fill-gray-800"
        />
        <div className="mt-2 flex items-end justify-between">
          <strong className="text-white text-xs">Stop Production</strong>
          <CloseCircleOutlined className="text-white text-3xl" />
        </div>
      </div>
    </div>
  );
};

export default memo(StopProductionNode);
