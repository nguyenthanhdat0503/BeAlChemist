/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  CheckOutlined,
  CloseOutlined,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { Button, Form, Input, Modal, Popconfirm } from "antd";
import { useForm } from "antd/es/form/Form";
import classNames from "classnames";
import { useState } from "react";

const initErrorNames = [
  "Error 01",
  "Error 02",
  "Error 03",
  "Error 04",
  "Error 05",
];
function ErrorItem() {
  const [name, setName] = useState("Error");
  const [form] = useForm();
  const [isEditing, setIsEditing] = useState(false);
  const [EditHasError, setEditHasError] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <div>
      <Modal
        title="Delete Error"
        open={isModalOpen}
        onOk={handleOk}
        okButtonProps={{ danger: true }}
        okText="Delete"
        onCancel={handleCancel}
      >
        <p>Are you sure you want to delete <strong>{name}</strong></p>
      </Modal>
      <div className="flex items-center justify-between px-4 py-1 rounded-md text-red-600 font-bold w-full text-left hover:bg-slate-100">
        <div
          className={classNames({
            hidden: isEditing,
          })}
        >
          {name}
        </div>
        <div
          className={classNames("w-full", {
            hidden: !isEditing,
          })}
        >
          <Form form={form}>
            <Form.Item
              name="errorName"
              rules={[
                ({ getFieldValue }) => ({
                  validator() {
                    const errorName = getFieldValue("errorName");
                    if (
                      initErrorNames
                        .filter((errName) => errName !== name)
                        .includes(errorName)
                    ) {
                      setEditHasError(true);
                      return Promise.reject(
                        new Error("Error name can not be duplicated!")
                      );
                    }
                    if (errorName === "") {
                      setEditHasError(true);
                      return Promise.reject(
                        new Error("Error name can not be empty!")
                      );
                    }
                    setEditHasError(false);
                    return Promise.resolve();
                  },
                }),
              ]}
            >
              <Input defaultValue={name} size="large" className="w-full" />
            </Form.Item>
          </Form>
        </div>
        <div className="ml-2 flex gap-2 self-start">
          <button
            type="reset"
            className={classNames(
              "rounded-full px-2 py-1 text-red-500 border border-red-500 transition-all hover:bg-red-500 hover:text-white",
              {
                hidden: !isEditing,
              }
            )}
            onClick={() => {
              form.resetFields();
              setIsEditing(!isEditing);
            }}
          >
            <CloseOutlined />
          </button>
          <button
            className={classNames(
              "rounded-full px-2 py-1 text-green-500 border border-green-500 transition-all hover:bg-green-500 hover:text-white",
              {
                hidden: !isEditing,
                "cursor-not-allowed text-gray-400 border-gray-400 hover:text-gray-400 hover:bg-transparent":
                  EditHasError,
              }
            )}
            onClick={() => {
              if (!EditHasError) {
                setName((form.getFieldValue("errorName") as string) || name);
                setIsEditing(!isEditing);
              }
            }}
          >
            <CheckOutlined />
          </button>

          {/* EDIT */}
          <Button
            type="primary"
            icon={<EditOutlined />}
            shape="circle"
            onClick={() => {
              setIsEditing(!isEditing);
            }}
            className={classNames({
              hidden: isEditing,
            })}
          />

          {/* DELETE */}
          <Button
            type="primary"
            danger
            icon={<DeleteOutlined />}
            shape="circle"
            onClick={showModal}
            className={classNames({
              hidden: isEditing,
            })}
          />
        </div>
      </div>
      <button className="px-8 py-1 rounded-md w-full text-left hover:bg-slate-100">
        Error 01
      </button>
      <button className="px-8 py-1 rounded-md w-full text-left hover:bg-slate-100">
        Error 02
      </button>
      <button className="px-8 py-1 rounded-md w-full text-left hover:bg-slate-100">
        Error 03
      </button>
      <button className="px-8 py-1 rounded-md w-full text-left hover:bg-slate-100">
        Error 04
      </button>
      <button className="px-8 py-1 rounded-md w-full text-left hover:bg-slate-100">
        Error 05
      </button>
    </div>
  );
}
export default function ErrorList() {
  return (
    <div className="px-4">
      <ErrorItem />
      <ErrorItem />
      <ErrorItem />
      <ErrorItem />
      <ErrorItem />
      <ErrorItem />
      <ErrorItem />
      <ErrorItem />
      <ErrorItem />
    </div>
  );
}
