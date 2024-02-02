interface IFormHeadingProps {
  title: string;
}

const FormHeading = ({ title }: IFormHeadingProps) => {
  return <h3 style={{ fontSize: "26px" }}>{title}</h3>;
};

export default FormHeading;
