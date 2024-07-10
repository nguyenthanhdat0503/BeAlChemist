/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { UploadOutlined } from "@ant-design/icons";
import { Button, Input, Upload } from "antd";
import classNames from "classnames";
import React, { memo, useCallback, useEffect, useState } from "react";
import { Position } from "reactflow";
import { NODE_TYPES } from "../../../constants/node.types";
import CustomHandle from "../../CustomHandle/CustomHandle";

interface Props {
  data: any;
  selected: boolean;
}
const LoopNode = ({ data, selected }: Props) => {
  const [imageFile, setImageFile] = useState(null);
  const [imgURL, setImgURL] = useState<string>(data?.imgURL || "");
  const [label, setLabel] = useState<string>(data?.label || "");

  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      data.label = e.target.value;
      setLabel(e.target.value);
    },
    [data]
  );

  const handleImageChange = (info: any) => {
    // Lưu trữ file ảnh trong state khi upload thành công
    setImageFile(info.file.originFileObj);
    if ((data?.label as string).includes("New Node")) {
      data.label = info.file.originFileObj.name;
      setLabel(info.file.originFileObj.name);
    }
  };
  useEffect(() => {
    if (imageFile) {
      const url = URL.createObjectURL(imageFile);
      data.imgURL = url;
      setImgURL(url);
    }
  }, [imageFile]);

  return (
    <div
      className={classNames(`border rounded-md`, {
        "border-1 border-black": selected,
      })}
      style={{
        backgroundColor: NODE_TYPES.LOOP.BACKGROUND,
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
        <div className="flex items-center justify-center">
          {imageFile && imgURL && (
            <img
              src={imgURL}
              alt="object-image"
              className="w-[200px] max-h-[200px] object-cover"
            />
          )}
        </div>
        <div className="mt-2 flex items-end justify-between">
        <strong className="text-white text-xs">Loop</strong>
          <Upload
            type="select"
            multiple={false}
            accept="image/*"
            showUploadList={false}
            onChange={handleImageChange}
          >
            <Button icon={<UploadOutlined />}></Button>
          </Upload>
        </div>
      </div>
      <CustomHandle
        type="source"
        position={Position.Right}
        id={`PASSED`}
        style={{
          top: "calc(50% - 10px)",
          background: "green",
          width: 10,
          height: 10,
          right: -10,
          border: "none",
        }}
        isConnectable={1}
      />
      <CustomHandle
        type="source"
        position={Position.Right}
        id={`FAILED`}
        style={{
          top: "calc(50% + 10px)",
          background: "red",
          width: 10,
          height: 10,
          right: -10,
          border: "none",
        }}
        isConnectable={1}
      />
    </div>
  );
};

export default memo(LoopNode);
