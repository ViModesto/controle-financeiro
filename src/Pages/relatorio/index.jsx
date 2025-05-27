// Pages/relatorio/index.jsx
import React, { useEffect, useState } from "react";
import Header from "../../componentsRelatório/Header";
import Sidebar from "../../componentsRelatório/Sidebar";
import ReportTable from "../../componentsRelatório/ReportTable";
import GlobalStyle from "../../styles/global";
import * as C from "./styles";

const Relatorio = () => {
  // Estados dos filtros
  const [reportType, setReportType] = useState("Manual");
  const [reportCategory, setReportCategory] = useState("Planilha de despesas");
  const [account, setAccount] = useState("Todas as contas");
  const [analysisBy, setAnalysisBy] = useState("Data do movimento");
  const [situation, setSituation] = useState("Todas");
  const [startDate, setStartDate] = useState("15/10/2020");
  const [endDate, setEndDate] = useState("23/12/2020");
  const [includeTransfers, setIncludeTransfers] = useState(false);

  // Dados das transações
  const data = JSON.parse(localStorage.getItem("transactions") || "[]");
  const [transactionsList] = useState(data);

  // Dados do relatório processados
  const [reportData, setReportData] = useState({
    period: "15/10/2020 a 23/12/2020",
    situation: "Em aberto e realizadas",
    expenses: [],
    totalGeneral: 0,
  });

  // Função para processar os dados das transações
  const processTransactionData = () => {
    if (!transactionsList.length) {
      // Dados de exemplo se não houver transações
      return {
        period: `${startDate} a ${endDate}`,
        situation: situation === "Todas" ? "Em aberto e realizadas" : situation,
        expenses: [
          {
            category: "Infra-estrutura",
            items: [
              { name: "Aluguel", oct: 0, nov: 0, dec: 2000.0, total: 2000.0 },
              { name: "Telefone", oct: 0, nov: 0, dec: 170.0, total: 170.0 },
            ],
          },
          {
            category: "Impostos",
            items: [{ name: "IPTU", oct: 0, nov: 0, dec: 0, total: 0 }],
          },
        ],
        totalGeneral: 2170.0,
      };
    }

    // Processar transações reais
    const filteredTransactions = transactionsList.filter((transaction) => {
      if (reportCategory === "Planilha de despesas") {
        return transaction.expense; // Apenas despesas
      } else {
        return !transaction.expense; // Apenas receitas
      }
    });

    // Agrupar por categoria (usando desc como categoria temporariamente)
    const groupedData = {};
    filteredTransactions.forEach((transaction) => {
      const category = transaction.desc; // Você pode criar uma lógica mais sofisticada aqui
      if (!groupedData[category]) {
        groupedData[category] = [];
      }
      groupedData[category].push(transaction);
    });

    // Converter para formato do relatório
    const expenses = Object.keys(groupedData).map((category) => ({
      category,
      items: [
        {
          name: category,
          oct: 0, // Você pode implementar lógica de datas aqui
          nov: 0,
          dec: groupedData[category].reduce(
            (sum, t) => sum + Number(t.amount),
            0
          ),
          total: groupedData[category].reduce(
            (sum, t) => sum + Number(t.amount),
            0
          ),
        },
      ],
    }));

    const totalGeneral = expenses.reduce(
      (sum, category) =>
        sum + category.items.reduce((catSum, item) => catSum + item.total, 0),
      0
    );

    return {
      period: `${startDate} a ${endDate}`,
      situation: situation === "Todas" ? "Em aberto e realizadas" : situation,
      expenses,
      totalGeneral,
    };
  };

  // Gerar relatório
  const handleGenerateReport = () => {
    const processedData = processTransactionData();
    setReportData(processedData);
  };

  // Carregar dados iniciais
  useEffect(() => {
    handleGenerateReport();
  }, []);

  return (
    <>
      <Header />
      <C.Container>
        <Sidebar
          reportType={reportType}
          setReportType={setReportType}
          reportCategory={reportCategory}
          setReportCategory={setReportCategory}
          account={account}
          setAccount={setAccount}
          analysisBy={analysisBy}
          setAnalysisBy={setAnalysisBy}
          situation={situation}
          setSituation={setSituation}
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          setEndDate={setEndDate}
          includeTransfers={includeTransfers}
          setIncludeTransfers={setIncludeTransfers}
          onGenerateReport={handleGenerateReport}
        />
        <ReportTable reportData={reportData} reportType={reportCategory} />
      </C.Container>
      <GlobalStyle />
    </>
  );
};

export default Relatorio;
