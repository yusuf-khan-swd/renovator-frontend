import { Row } from "antd";

type ActionBarProps = {
  title?: string;
  children?: React.ReactElement | React.ReactNode;
  childStyle?: React.CSSProperties;
};

const ActionBar = ({ title, children, childStyle }: ActionBarProps) => {
  const baseChildrenStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  };

  const childrenStyle = { ...baseChildrenStyle, ...childStyle };

  return (
    <div style={{ marginBottom: "15px" }}>
      <h1 style={{ margin: "8px 0" }}>{title}</h1>
      <Row style={childrenStyle}>{children}</Row>
    </div>
  );
};

export default ActionBar;
