import "./CallOut.css";

const CallOut = () => {
  return (
    <div className="call-out">
      <h1 style={{ fontSize: "55px", color: "white", marginBottom: "10px" }}>
        Call: 1-888-000-8881
      </h1>
      <p style={{ fontSize: "18px", color: "white", marginBottom: "10px" }}>
        Saturday 9:00 AM - 8:00 PM Eastern
      </p>
      <p style={{ fontSize: "18px", color: "white" }}>
        Monday - Friday 8:00 AM - 9:00 PM Eastern
      </p>
    </div>
  );
};

export default CallOut;
