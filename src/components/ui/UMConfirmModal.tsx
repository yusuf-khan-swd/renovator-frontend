import { DeleteOutlined, ExclamationCircleFilled } from "@ant-design/icons";
import { Button, Modal } from "antd";

const { confirm } = Modal;

interface IConfirmModelProps {
  id: string;
  handleDelete: (id: string) => void;
}

const UMConfirmModal = ({ id, handleDelete }: IConfirmModelProps) => {
  const showConfirm = () => {
    confirm({
      title: "Do you Want to delete these items?",
      icon: <ExclamationCircleFilled />,
      content: "Some descriptions",
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

export default UMConfirmModal;
