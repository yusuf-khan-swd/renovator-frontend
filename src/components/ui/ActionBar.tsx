import { Row } from "antd";

type ActionBarProps = {
  title?: string;
  children?: React.ReactElement | React.ReactNode;
  style?: React.CSSProperties;
};

const ActionBar = ({ title, children, style }: ActionBarProps) => {
  const baseChildrenStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  };

  const childrenStyle = { ...baseChildrenStyle, ...style };

  return (
    <div style={{ marginBottom: "15px" }}>
      <h1 style={{ margin: "8px 0" }}>{title}</h1>
      <Row style={childrenStyle}>{children}</Row>
    </div>
  );
};

export default ActionBar;
