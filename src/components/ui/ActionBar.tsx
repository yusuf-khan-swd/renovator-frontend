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
    margin: "10px 0px",
  };

  const childrenStyle = { ...baseChildrenStyle, ...style };

  return (
    <div>
      <h1 style={{ margin: "8px 0" }}>{title}</h1>
      <div style={childrenStyle}>{children}</div>
    </div>
  );
};

export default ActionBar;
