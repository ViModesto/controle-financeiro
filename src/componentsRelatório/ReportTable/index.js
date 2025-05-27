// componentsRelatório/ReportTable/index.js
import React from "react";
import * as C from "./styles";

const ReportTable = ({ reportData, reportType }) => {
  const formatCurrency = (value) => {
    return value > 0 ? value.toFixed(2).replace(".", ",") : "";
  };

  return (
    <C.Container>
      <C.Header>
        <C.Title>Relatório financeiro</C.Title>
        <C.ButtonGroup>
          <C.PrintButton>Imprimir</C.PrintButton>
          <C.EditorButton>Editor de relatórios</C.EditorButton>
        </C.ButtonGroup>
      </C.Header>

      <C.ReportTitle>
        {reportType === "Planilha de despesas"
          ? "PLANILHA DE DESPESAS"
          : "PLANILHA DE RECEITAS"}
      </C.ReportTitle>

      <C.ReportInfo>
        <div>
          <strong>Período:</strong> {reportData.period}
        </div>
        <div>
          <strong>Situação:</strong> {reportData.situation}
        </div>
      </C.ReportInfo>

      <C.TableContainer>
        <C.Table>
          <C.Thead>
            <C.Tr>
              <C.Th></C.Th>
              <C.Th>Out/2020</C.Th>
              <C.Th>Nov/2020</C.Th>
              <C.Th>Dez/2020</C.Th>
              <C.Th>Total</C.Th>
            </C.Tr>
          </C.Thead>
          <C.Tbody>
            {reportData.expenses?.map((category, categoryIndex) => (
              <React.Fragment key={categoryIndex}>
                <C.CategoryTr>
                  <C.CategoryTd colSpan="5">{category.category}</C.CategoryTd>
                </C.CategoryTr>

                {category.items.map((item, itemIndex) => (
                  <C.ItemTr key={itemIndex}>
                    <C.ItemTd>{item.name}</C.ItemTd>
                    <C.ValueTd>
                      {item.oct > 0 ? formatCurrency(item.oct) : ""}
                    </C.ValueTd>
                    <C.ValueTd>
                      {item.nov > 0 ? formatCurrency(item.nov) : ""}
                    </C.ValueTd>
                    <C.ValueTd>
                      {item.dec > 0 ? formatCurrency(item.dec) : ""}
                    </C.ValueTd>
                    <C.ValueTd>
                      <strong>{formatCurrency(item.total)}</strong>
                    </C.ValueTd>
                  </C.ItemTr>
                ))}
              </React.Fragment>
            ))}

            <C.TotalTr>
              <C.TotalTd>
                <strong>Total</strong>
              </C.TotalTd>
              <C.ValueTd></C.ValueTd>
              <C.ValueTd></C.ValueTd>
              <C.ValueTd></C.ValueTd>
              <C.ValueTd>
                <strong>{formatCurrency(reportData.totalGeneral)}</strong>
              </C.ValueTd>
            </C.TotalTr>
          </C.Tbody>
        </C.Table>
      </C.TableContainer>
    </C.Container>
  );
};

export default ReportTable;
