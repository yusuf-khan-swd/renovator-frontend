import AboutUsContentBody from "./AboutUsContentBody";

interface IAboutUsContentProps {
  data: {
    id: string;
    title: string;
    description: string;
  }[];
}

const AboutUsContent = ({ data }: IAboutUsContentProps) => {
  return (
    <div>
      {data?.map((about) => (
        <AboutUsContentBody key={about?.id} data={about} />
      ))}
    </div>
  );
};

export default AboutUsContent;
