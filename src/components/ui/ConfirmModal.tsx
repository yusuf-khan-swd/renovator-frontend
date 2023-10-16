import { DeleteOutlined, ExclamationCircleFilled } from "@ant-design/icons";
import { Button, Modal } from "antd";

const { confirm } = Modal;

interface IConfirmModelProps {
  id: string;
  handleDelete: (id: string) => void;
  title?: string;
  content?: string;
}

const ConfirmModal = ({
  id,
  handleDelete,
  title,
  content,
}: IConfirmModelProps) => {
  const showConfirm = () => {
    confirm({
      title: title || "Do you Want to delete these items?",
      icon: <ExclamationCircleFilled />,
      content: content || "Some descriptions",
      async onOk() {
        handleDelete(id);
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  return (
    <Button onClick={showConfirm} type="primary" danger>
      <DeleteOutlined />
    </Button>
  );
};

export default ConfirmModal;
