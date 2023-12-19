import { DeleteOutlined, ExclamationCircleFilled } from "@ant-design/icons";
import { Button, Modal } from "antd";
import { ButtonType } from "antd/es/button";
import React from "react";

const { confirm } = Modal;

interface IConfirmModelProps {
  id: string;
  handler: (id: string) => void;
  title?: React.ReactNode;
  content?: React.ReactNode;
  button?: boolean;
  buttonName?: string;
  buttonType?: ButtonType;
  disabled?: boolean;
}

const ConfirmModal = ({
  id,
  handler,
  title,
  content,
  button = false,
  buttonName,
  buttonType,
  disabled = false,
}: IConfirmModelProps) => {
  const showConfirm = () => {
    confirm({
      title: title || "Do you Want to remove this item?",
      icon: <ExclamationCircleFilled />,
      content: content || "Some descriptions",
      okText: "Confirm",
      async onOk() {
        handler(id);
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  return (
    <>
      {!button ? (
        <Button
          onClick={showConfirm}
          type="primary"
          danger
          style={{ margin: "2px" }}
        >
          <DeleteOutlined />
        </Button>
      ) : (
        <Button
          onClick={showConfirm}
          style={{ margin: "2px" }}
          type={`${buttonType || "default"}`}
          disabled={disabled}
        >
          {buttonName || "Cancel"}
        </Button>
      )}
    </>
  );
};

export default ConfirmModal;
