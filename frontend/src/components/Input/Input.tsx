import React from "react";

type dropdownSlotProps = {
  isOpen: boolean;
};

interface InputProps extends React.HTMLProps<HTMLDivElement> {
  InputProps?: React.InputHTMLAttributes<HTMLInputElement>;
  slots?: {
    rightEndAdornment?: React.ReactNode;
    leftAdornment?: React.ReactNode;
    dropdown?:
      | React.ReactNode
      | React.ReactNode[]
      | ((props?: dropdownSlotProps) => React.ReactNode);
  };
  slotProps?: {
    dropdown?: dropdownSlotProps;
  };
}

const Input = (props: InputProps) => {
  return (
    <div className="relative">
      <div
        className={`border border-gray-300 rounded-lg px-4 py-1 transition duration-200 focus:outline-none focus-within:border-blue-400 focus-within:shadow-sm ${props.className}`}
      >
        {props.slots?.leftAdornment}
        <input
          type="text"
          {...props.InputProps}
          className="outline-none w-full"
        />
        {props.slots?.rightEndAdornment}
      </div>
      {props.slots?.dropdown &&
        (props.slotProps?.dropdown?.isOpen ?? false) && (
          <div className="absolute overflow-y-auto lg:max-h-[700px] shadow-sm top-full z-[410] p-2 rounded-lg  border-gray-300  right-0 left-0 bg-white">
            {typeof props.slots.dropdown === "function"
              ? props.slots.dropdown()
              : props.slots.dropdown}
          </div>
        )}
    </div>
  );
};

export default Input;
