import React, { useState } from "react";
import Sidebar from "../../componentsRelatório/Sidebar";
import ReportTable from "../../componentsRelatório/ReportTable";
import Header from "../../components/Header";

const RelatorioFinanceiro = () => {
  // Estados para os filtros
  const [reportType, setReportType] = useState("Manual");
  const [reportCategory, setReportCategory] = useState("Planilha de receitas");
  const [account, setAccount] = useState("Todas as contas");
  const [analysisBy, setAnalysisBy] = useState("Data do movimento");
  const [situation, setSituation] = useState("Todas");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [includeTransfers, setIncludeTransfers] = useState(false);

  // Estados para o relatório
  const [showReport, setShowReport] = useState(false);
  const [reportData, setReportData] = useState(null);

  // Dados simulados - substitua pelos seus dados reais
  const [allData] = useState([
    {
      id: 1,
      tipo: "receita",
      categoria: "Salário",
      descricao: "salário",
      valor: 1500.0,
      data: new Date(2020, 9, 15), // Out 2020
      conta: "Conta Corrente",
      situacao: "Realizadas",
    },
    {
      id: 2,
      tipo: "receita",
      categoria: "Salário",
      descricao: "salário",
      valor: 1500.0,
      data: new Date(2020, 10, 15), // Nov 2020
      conta: "Conta Corrente",
      situacao: "Realizadas",
    },
    {
      id: 3,
      tipo: "receita",
      categoria: "Freela",
      descricao: "Freela",
      valor: 500.0,
      data: new Date(2020, 11, 10), // Dez 2020
      conta: "Conta Corrente",
      situacao: "Realizadas",
    },
    {
      id: 4,
      tipo: "despesa",
      categoria: "Alimentação",
      descricao: "Supermercado",
      valor: 300.0,
      data: new Date(2020, 9, 20), // Out 2020
      conta: "Conta Corrente",
      situacao: "Realizadas",
    },
    {
      id: 5,
      tipo: "despesa",
      categoria: "Transporte",
      descricao: "Combustível",
      valor: 200.0,
      data: new Date(2020, 10, 25), // Nov 2020
      conta: "Conta Corrente",
      situacao: "Realizadas",
    },
    {
      id: 6,
      tipo: "despesa",
      categoria: "Alimentação",
      descricao: "Restaurante",
      valor: 150.0,
      data: new Date(2020, 11, 5), // Dez 2020
      conta: "Conta Corrente",
      situacao: "Realizadas",
    },
    {
      id: 7,
      tipo: "receita",
      categoria: "Freela",
      descricao: "Projeto Web",
      valor: 800.0,
      data: new Date(2021, 0, 10), // Jan 2021
      conta: "Conta Corrente",
      situacao: "Realizadas",
    },
    {
      id: 8,
      tipo: "despesa",
      categoria: "Moradia",
      descricao: "Aluguel",
      valor: 1200.0,
      data: new Date(2021, 0, 5), // Jan 2021
      conta: "Conta Corrente",
      situacao: "Realizadas",
    },
  ]);

  // Função para filtrar os dados com base nos parâmetros
  const filterData = (filterParams) => {
    let filtered = [...allData];

    // Filtro por tipo de relatório (receitas/despesas)
    if (filterParams.reportCategory === "Planilha de receitas") {
      filtered = filtered.filter((item) => item.tipo === "receita");
    } else if (filterParams.reportCategory === "Planilha de despesas") {
      filtered = filtered.filter((item) => item.tipo === "despesa");
    }

    // Filtro por conta
    if (filterParams.account !== "Todas as contas") {
      filtered = filtered.filter((item) => item.conta === filterParams.account);
    }

    // Filtro por situação
    if (filterParams.situation !== "Todas") {
      filtered = filtered.filter(
        (item) => item.situacao === filterParams.situation
      );
    }

    // Filtro por período de datas
    if (filterParams.startDate) {
      filtered = filtered.filter((item) => item.data >= filterParams.startDate);
    }

    if (filterParams.endDate) {
      const endOfDay = new Date(filterParams.endDate);
      endOfDay.setHours(23, 59, 59, 999);
      filtered = filtered.filter((item) => item.data <= endOfDay);
    }

    // Filtro para transferências
    if (!filterParams.includeTransfers) {
      filtered = filtered.filter((item) => item.categoria !== "transferencia");
    }

    return filtered;
  };

  // Função para preparar dados no formato do ReportTable
  const prepareReportData = (filteredData, filterParams) => {
    // Agrupar dados por categoria e descrição
    const grouped = {};

    filteredData.forEach((item) => {
      if (!grouped[item.categoria]) {
        grouped[item.categoria] = {};
      }

      if (!grouped[item.categoria][item.descricao]) {
        grouped[item.categoria][item.descricao] = {};
      }

      // Criar chave do mês no formato YYYY-MM
      const monthKey = `${item.data.getFullYear()}-${String(
        item.data.getMonth() + 1
      ).padStart(2, "0")}`;

      if (!grouped[item.categoria][item.descricao][monthKey]) {
        grouped[item.categoria][item.descricao][monthKey] = 0;
      }

      grouped[item.categoria][item.descricao][monthKey] += item.valor;
    });

    // Converter para formato esperado pelo ReportTable
    const expenses = Object.keys(grouped).map((categoryName) => ({
      category: categoryName,
      items: Object.keys(grouped[categoryName]).map((itemName) => {
        const itemData = { name: itemName };

        // Adicionar valores de cada mês
        Object.keys(grouped[categoryName][itemName]).forEach((monthKey) => {
          itemData[monthKey] = grouped[categoryName][itemName][monthKey];
        });

        return itemData;
      }),
    }));

    // Calcular total geral
    const totalGeneral = expenses.reduce((total, category) => {
      return (
        total +
        category.items.reduce((categoryTotal, item) => {
          return (
            categoryTotal +
            Object.keys(item)
              .filter((key) => key !== "name")
              .reduce(
                (itemTotal, monthKey) => itemTotal + (item[monthKey] || 0),
                0
              )
          );
        }, 0)
      );
    }, 0);

    // Preparar período para exibição
    let periodText = "";
    if (filterParams.startDate && filterParams.endDate) {
      periodText = `${filterParams.startDate.toLocaleDateString(
        "pt-BR"
      )} a ${filterParams.endDate.toLocaleDateString("pt-BR")}`;
    } else if (filterParams.startDate) {
      periodText = `A partir de ${filterParams.startDate.toLocaleDateString(
        "pt-BR"
      )}`;
    } else if (filterParams.endDate) {
      periodText = `Até ${filterParams.endDate.toLocaleDateString("pt-BR")}`;
    } else {
      periodText = "Todos os períodos";
    }

    return {
      expenses,
      totalGeneral,
      startDate:
        filterParams.startDate ||
        new Date(Math.min(...filteredData.map((item) => item.data))),
      endDate:
        filterParams.endDate ||
        new Date(Math.max(...filteredData.map((item) => item.data))),
      period: periodText,
      situation: filterParams.situation || "Todas",
    };
  };

  // Handler para gerar relatório
  const handleGenerateReport = (filterParams) => {
    const filtered = filterData(filterParams);

    if (filtered.length === 0) {
      setShowReport(false);
      setReportData(null);
      return;
    }

    const preparedData = prepareReportData(filtered, filterParams);
    setReportData(preparedData);
    setShowReport(true);
  };

  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      {/* Header fixo no topo */}
      <Header />

      {/* Container principal com Sidebar e conteúdo */}
      <div style={{ display: "flex", flex: 1 }}>
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

        {/* Área principal - Mostra ReportTable quando houver dados */}
        {showReport && reportData ? (
          <ReportTable reportData={reportData} reportType={reportCategory} />
        ) : (
          <div
            style={{
              flex: 1,
              padding: "20px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              color: "#666",
              backgroundColor: "#f8f9fa",
            }}
          >
            <h2 style={{ marginBottom: "10px", color: "#333" }}>
              Relatório Financeiro
            </h2>
            <p
              style={{
                textAlign: "center",
                maxWidth: "400px",
                lineHeight: "1.5",
              }}
            >
              Selecione os filtros no painel lateral e clique em "Ver relatório"
              para gerar o relatório.
            </p>

            {/* Ícone ou ilustração opcional */}
            <div
              style={{
                marginTop: "30px",
                padding: "40px",
                backgroundColor: "#fff",
                borderRadius: "8px",
                boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
              }}
            >
              <div
                style={{
                  width: "80px",
                  height: "80px",
                  backgroundColor: "#e9ecef",
                  borderRadius: "50%",
                  margin: "0 auto 20px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "32px",
                  color: "#6c757d",
                }}
              >
                📊
              </div>
              <p
                style={{
                  textAlign: "center",
                  margin: 0,
                  fontSize: "14px",
                  color: "#6c757d",
                }}
              >
                Aguardando configuração do relatório
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RelatorioFinanceiro;
