import React, { createContext, useState, useContext } from "react";

const BackgroundImageContext = createContext();

export const BackgroundImageProvider = ({ children }) => {
  const [backgroundImage, setBackgroundImage] = useState(null);

  return (
    <BackgroundImageContext.Provider value={{ backgroundImage, setBackgroundImage }}>
      {children}
    </BackgroundImageContext.Provider>
  );
};

export const useBackgroundImage = () => {
  return useContext(BackgroundImageContext);
};
