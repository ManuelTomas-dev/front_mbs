import React from "react";

interface CardContainerProps {
  extraStyle?: string;
  children: React.ReactNode;
}

function CardContainer({ extraStyle, children }: CardContainerProps) {
  const cardNumber = React.Children.count(children);
  console.log(cardNumber);
  return (
    <div
      className={`grid grid-cols-${cardNumber} sm:grid-cols-1 md:grid-cols-2 ${`lg:grid-cols-${cardNumber}`} gap-3 mt-4 ${extraStyle}`}
    >
      {children}
    </div>
  );
}

export default CardContainer;
