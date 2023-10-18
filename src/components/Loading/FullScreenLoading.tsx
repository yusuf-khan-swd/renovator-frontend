import { Row, Spin } from "antd";

const FullScreenLoading = () => {
  return (
    <Row justify="center" align="middle" style={{ minHeight: "90vh" }}>
      <Spin tip="loading" size="large" />
    </Row>
  );
};

export default FullScreenLoading;
