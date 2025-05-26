// Pages/relatorio/styles.js
import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  min-height: calc(100vh - 150px);
  background-color: #f5f5f5;
  padding: 0;

  @media (max-width: 1200px) {
    flex-direction: column;
  }
`;
