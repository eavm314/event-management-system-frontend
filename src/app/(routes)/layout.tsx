import React from "react";
import PrincipalLayout from "../layouts/PrincipalLayout";
import StoreProvider from "../store/StoreProvider";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <StoreProvider>
      <PrincipalLayout>{children}</PrincipalLayout>
    </StoreProvider>
  );
};

export default layout;
