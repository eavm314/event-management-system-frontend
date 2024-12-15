import React from "react";

interface Props {
  children: React.ReactNode;
}

const ModalPage = ({ children }: Props) => {
  return (
    <>
      <div
        className="fixed top-0 left-0 bottom-0 right-0 flex
    justify-center items-center bg-slate-900 bg-opacity-60 z-10"
      >
        {children}
      </div>
    </>
  );
};

export default ModalPage;
