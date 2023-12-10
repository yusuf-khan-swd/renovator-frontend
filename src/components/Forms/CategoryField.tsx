import { useCategoriesQuery } from "@/redux/api/categoryApi";
import CenterLoading from "../Loading/CenterLoading";
import FormSelectField, { SelectOptions } from "./FormSelectField";

type CategoryField = {
  name: string;
  label?: string;
  required?: boolean;
};

// FIXME: Check center loading

const CategoryField = ({ name, label, required }: CategoryField) => {
  const { data, isLoading } = useCategoriesQuery(undefined);
  const categoryOptions = data?.map((category: any) => {
    console.log(category?.id);
    return {
      label: category?.title,
      value: category?.id,
    };
  });

  return (
    <>
      {isLoading ? (
        <CenterLoading />
      ) : (
        <FormSelectField
          name={name}
          label={label}
          options={categoryOptions as SelectOptions[]}
          required={required}
        />
      )}
    </>
  );
};

export default CategoryField;
