// componentsRelatório/Sidebar/index.js
import React from "react";
import * as C from "./styles";

const Sidebar = ({
  reportType,
  setReportType,
  reportCategory,
  setReportCategory,
  account,
  setAccount,
  analysisBy,
  setAnalysisBy,
  situation,
  setSituation,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  includeTransfers,
  setIncludeTransfers,
  onGenerateReport,
}) => {
  return (
    <C.Container>
      <C.FilterSection>
        <C.InputContent>
          <C.Label>Tipo de Relatório</C.Label>
          <C.Select
            value={reportType}
            onChange={(e) => setReportType(e.target.value)}
          >
            <option>Manual</option>
            <option>Automático</option>
          </C.Select>
        </C.InputContent>

        <C.InputContent>
          <C.Label>Relatório</C.Label>
          <C.Select
            value={reportCategory}
            onChange={(e) => setReportCategory(e.target.value)}
          >
            <option>Planilha de despesas</option>
            <option>Planilha de receitas</option>
          </C.Select>
        </C.InputContent>

        <C.InputContent>
          <C.Label>Conta</C.Label>
          <C.Select
            value={account}
            onChange={(e) => setAccount(e.target.value)}
          >
            <option>Todas as contas</option>
            <option>Conta Corrente</option>
            <option>Poupança</option>
          </C.Select>
        </C.InputContent>

        <C.InputContent>
          <C.Label>Análise por</C.Label>
          <C.Select
            value={analysisBy}
            onChange={(e) => setAnalysisBy(e.target.value)}
          >
            <option>Data do movimento</option>
            <option>Data de vencimento</option>
          </C.Select>
        </C.InputContent>

        <C.InputContent>
          <C.Label>Situação</C.Label>
          <C.Select
            value={situation}
            onChange={(e) => setSituation(e.target.value)}
          >
            <option>Todas</option>
            <option>Em aberto</option>
            <option>Realizadas</option>
          </C.Select>
        </C.InputContent>

        <C.InputContent>
          <C.Label>Período inicial</C.Label>
          <C.Input
            type="text"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            placeholder="dd/mm/aaaa"
          />
        </C.InputContent>

        <C.InputContent>
          <C.Label>Período final</C.Label>
          <C.Input
            type="text"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            placeholder="dd/mm/aaaa"
          />
        </C.InputContent>

        <C.CheckboxContainer>
          <C.Checkbox
            type="checkbox"
            checked={includeTransfers}
            onChange={(e) => setIncludeTransfers(e.target.checked)}
          />
          <C.CheckboxLabel>Incluir transferências no relatório</C.CheckboxLabel>
        </C.CheckboxContainer>

        <C.Button onClick={onGenerateReport}>Ver relatório</C.Button>
      </C.FilterSection>
    </C.Container>
  );
};

export default Sidebar;
