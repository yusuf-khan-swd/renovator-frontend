import { Row, Spin } from "antd";

const CenterLoading = () => {
  return (
    <Row
      justify={"center"}
      align={"middle"}
      style={{ width: "100%", minHeight: "39px" }}
    >
      <Spin />
    </Row>
  );
};

export default CenterLoading;
