import { Row } from "antd";

type ActionBarProps = {
  title?: string;
  children?: React.ReactElement | React.ReactNode;
  style?: React.CSSProperties;
};

// TODO: If margin of 10px 4px are remove there is -12px -12px margin are added inline style

const ActionBar = ({ title, children, style }: ActionBarProps) => {
  const baseChildrenStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    margin: "0px",
  };

  const childrenStyle = { ...baseChildrenStyle, ...style };

  return (
    <div>
      <h1 style={{ margin: "8px 0" }}>{title}</h1>
      <Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }} style={childrenStyle}>
        {children}
      </Row>
    </div>
  );
};

export default ActionBar;
