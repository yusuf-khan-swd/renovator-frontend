"use client";

import { getErrorMessageByPropertyName } from "@/utils/schema-validator";
import { Input } from "antd";
import { Controller, useFormContext } from "react-hook-form";
interface IInput {
  name: string;
  type?: string;
  size?: "large" | "small";
  value?: string | string[] | undefined;
  id?: string;
  placeholder?: string;
  validation?: object;
  label?: string;
  required?: boolean;
  readOnly?: boolean;
  labelFlex?: boolean;
}

const FormInput = ({
  name,
  type,
  size = "large",
  value,
  id,
  placeholder,
  validation,
  label,
  required,
  readOnly = false,
  labelFlex = false,
}: IInput) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const errorMessage = getErrorMessageByPropertyName(errors, name);

  return (
    <>
      <div style={{ display: `${labelFlex ? "flex" : null}` }}>
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
          control={control}
          name={name}
          render={({ field }) =>
            type === "password" ? (
              <Input.Password
                type={type}
                size={size}
                placeholder={placeholder}
                {...field}
                value={value ? value : field.value}
              />
            ) : (
              <Input
                type={type}
                readOnly={readOnly}
                size={size}
                placeholder={placeholder}
                {...field}
                value={value ? value : field.value}
              />
            )
          }
        />
      </div>
      <small style={{ color: "red" }}>{errorMessage}</small>
    </>
  );
};

export default FormInput;
