import React from "react";

interface CardContainerProps {
  cardNumber?: number;
  extraStyle?: string;
  children: React.ReactNode;
}

function CardContainer({
  cardNumber,
  extraStyle,
  children,
}: CardContainerProps) {
  const childrenCount = cardNumber ?? React.Children.count(children);
  return (
    <div
      className={`grid grid-cols-${cardNumber} sm:grid-cols-1 md:grid-cols-2 ${`lg:grid-cols-${childrenCount}`} gap-3 mt-4 ${extraStyle}`}
    >
      {children}
    </div>
  );
}

export default CardContainer;
