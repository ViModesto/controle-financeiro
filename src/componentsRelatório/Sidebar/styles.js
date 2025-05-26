// componentsRelatório/Sidebar/styles.js
import styled from "styled-components";

export const Container = styled.div`
  width: 320px;
  background-color: #fff;
  box-shadow: 0px 0px 5px #ccc;
  padding: 20px;
  min-height: calc(100vh - 150px);
  margin-top: -50px;
  border-radius: 5px;
  margin-left: 20px;
`;

export const FilterSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const InputContent = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Label = styled.label`
  font-size: 14px;
  font-weight: 500;
  color: #333;
  margin-bottom: 5px;
`;

export const Select = styled.select`
  outline: none;
  border-radius: 5px;
  padding: 8px 12px;
  font-size: 14px;
  border: 1px solid #ccc;
  background-color: #fff;
  cursor: pointer;

  &:focus {
    border-color: #6041bf;
    box-shadow: 0 0 0 2px rgba(96, 65, 191, 0.1);
  }
`;

export const Input = styled.input`
  outline: none;
  border-radius: 5px;
  padding: 8px 12px;
  font-size: 14px;
  border: 1px solid #ccc;

  &:focus {
    border-color: #6041bf;
    box-shadow: 0 0 0 2px rgba(96, 65, 191, 0.1);
  }
`;

export const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding-top: 10px;
`;

export const Checkbox = styled.input`
  accent-color: #6041bf;
`;

export const CheckboxLabel = styled.label`
  font-size: 14px;
  color: #666;
  cursor: pointer;
`;

export const Button = styled.button`
  padding: 12px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  color: white;
  background-color: #6041bf;
  font-size: 14px;
  font-weight: 500;
  margin-top: 10px;

  &:hover {
    background-color: #5035a3;
  }

  &:active {
    transform: translateY(1px);
  }
`;