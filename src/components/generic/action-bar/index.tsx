import React from "react";

interface ActionBarProps {
  children: React.ReactNode;
}

function ActionBar({ children }: ActionBarProps) {
  return (
    <div className="flex items-center justify-between mt-6">{children}</div>
  );
}

export default ActionBar;
