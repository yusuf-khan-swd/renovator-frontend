interface IAboutUsContentProps {
  data: {
    id: string;
    title: string;
    description: string;
  }[];
}

const AboutUsContent = ({ data }: IAboutUsContentProps) => {
  console.log(data);

  return (
    <div>
      {data?.map(
        (about: { id: string; title: string; description: string }) => (
          <div key={about?.id} style={{ marginBottom: "20px" }}>
            <h3 style={{ fontSize: "26px", marginBottom: "10px" }}>
              {about?.title}
            </h3>
            <div style={{ lineHeight: "28px", fontSize: "16px" }}>
              {" "}
              {about?.description}
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default AboutUsContent;
