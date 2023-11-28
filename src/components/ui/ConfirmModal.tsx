import { DeleteOutlined, ExclamationCircleFilled } from "@ant-design/icons";
import { Button, Modal } from "antd";
import { ButtonType } from "antd/es/button";

const { confirm } = Modal;

interface IConfirmModelProps {
  id: string;
  handler: (id: string) => void;
  title?: string;
  content?: string;
  button?: boolean;
  buttonName?: string;
  buttonType?: ButtonType;
  disabled?: boolean;
  danger?: boolean;
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
  danger = false,
}: IConfirmModelProps) => {
  const showConfirm = () => {
    confirm({
      title: title || "Do you Want to remove this item?",
      icon: <ExclamationCircleFilled />,
      content: content || "Some descriptions",
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
          danger={danger}
        >
          {buttonName || "Cancel"}
        </Button>
      )}
    </>
  );
};

export default ConfirmModal;
