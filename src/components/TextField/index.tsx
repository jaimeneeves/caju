import React, { InputHTMLAttributes, ChangeEvent } from "react";
import styled from "styled-components";
import { IMaskMixin } from "react-imask";

export const Input = styled.input`
  padding: 0 8px;
  vertical-align: middle;
  border-radius: 2px;
  width: 100%;
  min-height: 36px;
  background-color: #ffffff;
  border: 1px solid rgba(36, 28, 21, 0.3);
  transition: all 0.2s ease-in-out 0s;
  font-size: 16px;
  line-height: 18px;
  font-weight: normal;
  border-radius:8px;
  :focus {
    outline: none;
    border: 1px solid #007c89;
    box-shadow: inset 0 0 0 1px #007c89;
  }
`;
type Props = {
  label?: string;
  error?: string;
  mask?: string;
  setValue?: (value: string) => void;
  value?: string;
} & InputHTMLAttributes<any>;

const InputMask = IMaskMixin(({ inputRef, ...props }: { inputRef: React.Ref<HTMLInputElement> }) => (
  <Input
    {...props}
    ref={inputRef}
  />
));

const TextField = (props: Props) => {
  const { mask, onChange } = props;

  return (
    <div>
      <label htmlFor={props.id}>{props.label}</label>
      {mask ? (
        <InputMask
          {...props}
          onAccept={(value:any) => {
            if (onChange) {
              onChange({ target: { value } } as ChangeEvent<HTMLInputElement>);
            }
          }}
        />
      ) : (
        <Input {...props} />
      )}
      <span style={{ fontSize: 12, color: 'red' }}>{props.error}</span>
    </div>
  );
};

export default TextField;
