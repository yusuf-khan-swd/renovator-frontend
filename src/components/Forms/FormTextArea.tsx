import { getErrorMessageByPropertyName } from "@/utils/schema-validator";
import { Input } from "antd";
import { Controller, useFormContext } from "react-hook-form";

type TextAreaProps = {
  name: string;
  label?: string;
  rows?: number;
  value?: string;
  placeholder?: string;
  required?: boolean;
  readOnly?: boolean;
};

const FormTextArea = ({
  name,
  label,
  rows,
  value,
  placeholder,
  required,
  readOnly = false,
}: TextAreaProps) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  const errorMessage = getErrorMessageByPropertyName(errors, name);

  return (
    <div className={`flex flex-col  w-full`}>
      <p style={{ marginBottom: "4px" }}>
        {required ? (
          <span
            style={{
              color: "red",
              paddingRight: "2px",
            }}
          >
            *
          </span>
        ) : null}

        {label ? label : null}
      </p>

      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Input.TextArea
            rows={rows}
            placeholder={placeholder}
            {...field}
            defaultValue={value}
            readOnly={readOnly}
          />
        )}
      />

      <small style={{ color: "red" }}>{errorMessage}</small>
    </div>
  );
};

export default FormTextArea;
