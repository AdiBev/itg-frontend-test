import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const BaseStyles = createGlobalStyle`
${reset}
* {
    box-sizing: border-box;
}
`;

export default BaseStyles;
