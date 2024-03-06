import { Row } from "antd";

type ActionBarProps = {
  title?: string;
  containerStyle?: React.CSSProperties;
  titleStyle?: React.CSSProperties;
  children?: React.ReactElement | React.ReactNode;
  childStyle?: React.CSSProperties;
};

const ActionBar = ({
  title,
  containerStyle,
  titleStyle,
  children,
  childStyle,
}: ActionBarProps) => {
  const baseChildrenStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  };

  const childrenStyle = { ...baseChildrenStyle, ...childStyle };

  return (
    <div style={containerStyle ? containerStyle : { marginBottom: "15px" }}>
      <h1 style={titleStyle ? titleStyle : { margin: "8px 0" }}>{title}</h1>
      <Row style={childrenStyle}>{children}</Row>
    </div>
  );
};

export default ActionBar;
