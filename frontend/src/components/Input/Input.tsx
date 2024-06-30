import { AnimatePresence, motion } from "framer-motion";
import React from "react";

type dropdownSlotProps = {
  isOpen: boolean;
  children: React.ReactNode;
};

interface InputProps extends React.HTMLProps<HTMLDivElement> {
  InputProps?: React.InputHTMLAttributes<HTMLInputElement>;
  slots?: {
    rightEndAdornment?: React.ReactNode;
    leftAdornment?: React.ReactNode;
  };
}

const Input = (props: InputProps) => {
  return (
    <div className="relative">
      <div
        className={`border border-gray-300 rounded-lg px-4 py-1 transition duration-200 focus:outline-none focus-within:border-3 focus-within:shadow-sm flex ${props.className}`}
      >
        {props.slots?.leftAdornment}
        <input
          type="text"
          {...props.InputProps}
          className="outline-none w-full bg-transparent placeholder:text-white text-white"
        />
        {props.slots?.rightEndAdornment}
      </div>
      {props.children}
    </div>
  );
};

Input.DropDown = (props: dropdownSlotProps) => {
  return (
    <AnimatePresence>
      {props.isOpen && (
        <motion.div
          key="dropdown"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute overflow-y-auto lg:max-h-[700px] shadow-sm top-full z-[410] p-2 rounded-lg  border-gray-300  right-0 left-0 bg-white"
        >
          {props.children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Input;
