import React from "react";
import { Input } from "antd";
import { IvoryCustomInputProps } from "../types";

/**
 * Form Input component
 * @param {String} label
 * @param {String} type i.e "text","email"
 * @param {String} placeholder
 * @param {Boolean} hasValue i.e indicates in
 * @param {Function} onChange. {args:value}
 * @param {String} name
 * @returns react component
 **/

const CustomInput = ({
  type,
  placeholder = "",
  onChange,
  value,
  className = "",
  max,
  disabled = false,
  suffix,
  name,
  prefix,
  bordered,
  onBlur,
  addOn,
}: IvoryCustomInputProps) => {
  return (
    <div>
      <Input
        value={value ?? value}
        prefix={prefix ?? prefix}
        type={type ?? type}
        addonBefore={addOn ?? addOn}
        className={`ivry-input ivry ${className} `}
        placeholder={placeholder}
        onChange={onChange ?? onChange}
        maxLength={max}
        bordered={bordered}
        name={name}
        onBlur={onBlur ?? onBlur}
        disabled={disabled}
        suffix={suffix}
      />
    </div>
  );
};

export default CustomInput;
