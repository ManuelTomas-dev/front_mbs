import React from "react";

interface ContainerProps {
  children: React.ReactNode;
}

function Container({ children }: ContainerProps) {
  return <div className="flex flex-col flex-1 p-5">{children}</div>;
}

export default Container;
