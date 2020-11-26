import { createContext, useState } from "react";

export interface typeValues {
  borrowerType: string;
  setBorrowerType: (type: string) => void;
}

export const BorrowerTypeContext = createContext({} as typeValues);

interface BorrowerTypeContextProps {}

const BorrowerTypeContextProvider: React.FC<BorrowerTypeContextProps> = (
  props
) => {
  const [borrowerType, setBorrowerType] = useState<string>("");

  const borrowerTypeValues: typeValues = {
    borrowerType,
    setBorrowerType,
  };

  return (
    <BorrowerTypeContext.Provider value={borrowerTypeValues}>
      {props.children}
    </BorrowerTypeContext.Provider>
  );
};

export default BorrowerTypeContextProvider;
