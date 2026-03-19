import React from "react";

interface ContainerProps {
  style?: string;
  children: React.ReactNode;
}

function Container({ style, children }: ContainerProps) {
  return (
    <div className={`flex flex-col flex-1 p-5 w-full ${style}`}>{children}</div>
  );
}

export default Container;
