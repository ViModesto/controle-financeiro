import React from "react";
import * as C from "./style";
import ResumeItem from "../ResumeItem";
import { IoArrowUpCircleOutline } from "react-icons/io5";
import {
  FaRegArrowAltCircleDown,
  FaDollarSign,
}from "react-icons/fa";

const Resume = ({income, expense, total}) => {
  return (
  <C.Container>
    <ResumeItem title="Entradas" Icon={IoArrowUpCircleOutline} value={income}/> 
    <ResumeItem title="Saídas" Icon={FaRegArrowAltCircleDown} value={expense}/> 
    <ResumeItem title="Total" Icon={FaDollarSign} value={total}/> 
  </C.Container>
  );
};

export default Resume;
