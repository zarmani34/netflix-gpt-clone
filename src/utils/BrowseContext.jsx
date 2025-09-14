import React, { createContext, useContext, useState } from "react";

const BrowseContext = createContext();

// Create a function that takes the item passed as prop as an argument and use it to make api call based on the present item and make default item the browse page
// Create a default variable that serves as default item
export const useBrowseContext = () => useContext(BrowseContext);

export const BrowseContextProvider = ({ children }) => {
  return <BrowseContext.Provider value={""}>{children}</BrowseContext.Provider>;
};

// how to use state in link
// how to use defsult argument
// using dynamic route, what if inputed url is not available?
