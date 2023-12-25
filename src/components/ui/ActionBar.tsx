type ActionBarProps = {
  title?: string;
  children?: React.ReactElement | React.ReactNode;
  style?: React.CSSProperties;
};

const ActionBar = ({ title, children, style }: ActionBarProps) => {
  const childrenStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    margin: "10px 0px",
  };

  const newChildrenStyle = { ...childrenStyle, ...style };

  return (
    <div>
      <h1 style={{ margin: "8px 0" }}>{title}</h1>
      <div style={newChildrenStyle}>{children}</div>
    </div>
  );
};

export default ActionBar;
