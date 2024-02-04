interface IAboutUsContentBodyProps {
  data: {
    id: string;
    title: string;
    description: string;
  };
}

const AboutUsContentBody = ({ data }: IAboutUsContentBodyProps) => {
  console.log(data);

  const title = data?.title;
  const description = data?.description;

  return (
    <div style={{ marginBottom: "20px" }}>
      <h3 style={{ fontSize: "26px", marginBottom: "10px" }}>{title}</h3>
      <p style={{ lineHeight: "28px", fontSize: "16px" }}> {description}</p>
    </div>
  );
};

export default AboutUsContentBody;
