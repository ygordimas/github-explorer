import { createGlobalStyle } from "styled-components";

export const rootColors = {
  primary: "#e6e6fa",
  secondary: "#faebd7",
};

export default createGlobalStyle`
 :root {
   --primary: ${rootColors.primary};
   --secondary: ${rootColors.secondary};
 }
 
 * {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: "Inconsolata", monospace;
  background-color: #f5f5f5;
}
`;
