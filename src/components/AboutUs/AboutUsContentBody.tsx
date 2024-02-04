interface IAboutUsContentBodyProps {
  data: {
    id: string;
    title: string;
    description: string;
  };
}

const AboutUsContentBody = ({ data }: IAboutUsContentBodyProps) => {
  const title = data?.title;
  const description = data?.description;

  const newLineRegEx = /\r\n|\r|\n/g;

  const splitDescription = description.split(newLineRegEx);

  const mapEveryElementToPTag = splitDescription.map((value, index) => (
    <p key={index}>{value}</p>
  ));

  const isCurrentDescriptionHaveNewLine =
    description.includes("\n") || description.includes("\r");

  return (
    <div style={{ marginBottom: "20px" }}>
      <h3 style={{ fontSize: "26px", marginBottom: "10px" }}>{title}</h3>
      <div style={{ lineHeight: "28px", fontSize: "16px" }}>
        {isCurrentDescriptionHaveNewLine ? mapEveryElementToPTag : description}
      </div>
    </div>
  );
};

export default AboutUsContentBody;
