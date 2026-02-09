import React, { createContext, useState, ReactNode } from "react";

interface IDrawerContextType {
  isExpanded: boolean;
  setIsExpanded: (expanded: boolean) => void;
}

export const DrawerContext = createContext<IDrawerContextType | undefined>(
  undefined
);

interface IDrawerProviderProps {
  children: ReactNode;
}

export const DrawerProvider: React.FC<IDrawerProviderProps> = ({
  children,
}) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(true);

  return (
    <DrawerContext.Provider value={{ isExpanded, setIsExpanded }}>
      {children}
    </DrawerContext.Provider>
  );
};
