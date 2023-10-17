import { useCategoriesQuery } from "@/redux/api/categoryApi";
import FormSelectField, { SelectOptions } from "./FormSelectField";

type ACDepartmentFieldProps = {
  name: string;
  label?: string;
};

const ACDepartmentField = ({ name, label }: ACDepartmentFieldProps) => {
  const { data, isLoading } = useCategoriesQuery(undefined);
  const categoryOptions = data?.map((category: any) => {
    console.log(category?.id);
    return {
      label: category?.title,
      value: category?.id,
    };
  });

  return (
    <FormSelectField
      name={name}
      label={label}
      options={categoryOptions as SelectOptions[]}
    />
  );
};

export default ACDepartmentField;
