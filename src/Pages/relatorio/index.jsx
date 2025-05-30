import React, { useState } from "react";
import GlobalStyle from "../../styles/global";

// Componente Header

import { useNavigate } from "react-router-dom";

// Componente Header com menu horizontal simples
const Header = () => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        textAlign: "center",
        height: "60px",
        backgroundColor: "#6f42c1",
        color: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 20px",
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
      }}
    >
      <h1 style={{ margin: 0, fontSize: "20px" }}>Controle Financeiro</h1>

      <div style={{ display: "flex", gap: "15px" }}>
        <button
          onClick={() => navigate("/principal")}
          style={{
            backgroundColor: "transparent",
            border: "1px solid white",
            color: "white",
            padding: "6px 12px",
            borderRadius: "4px",
            cursor: "pointer",
            fontSize: "14px",
          }}
        >
          Principal
        </button>

        <button
          onClick={() => navigate("/relatorio")}
          style={{
            backgroundColor: "transparent",
            border: "1px solid white",
            color: "white",
            padding: "6px 12px",
            borderRadius: "4px",
            cursor: "pointer",
            fontSize: "14px",
          }}
        >
          Relatórios
        </button>

        <button
          onClick={() => navigate("/")}
          style={{
            backgroundColor: "#dc3545",
            border: "1px solid #dc3545",
            color: "white",
            padding: "6px 12px",
            borderRadius: "4px",
            cursor: "pointer",
            fontSize: "14px",
          }}
        >
          Sair
        </button>
      </div>
    </div>
  );
};

// Componente Sidebar
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
  const applyDateMask = (value) => {
    const numbers = value.replace(/\D/g, "");
    if (numbers.length <= 2) {
      return numbers;
    } else if (numbers.length <= 4) {
      return `${numbers.slice(0, 2)}/${numbers.slice(2)}`;
    } else {
      return `${numbers.slice(0, 2)}/${numbers.slice(2, 4)}/${numbers.slice(
        4,
        8
      )}`;
    }
  };

  const isValidDateFormat = (dateString) => {
    const regex = /^\d{2}\/\d{2}\/\d{4}$/;
    return regex.test(dateString);
  };

  const parseDate = (dateString) => {
    if (!isValidDateFormat(dateString)) return null;
    const [day, month, year] = dateString.split("/");
    const date = new Date(year, month - 1, day);
    if (
      date.getDate() != day ||
      date.getMonth() != month - 1 ||
      date.getFullYear() != year
    ) {
      return null;
    }
    return date;
  };

  const validateDateRange = () => {
    if (!startDate || !endDate) return true;
    const startDateObj = parseDate(startDate);
    const endDateObj = parseDate(endDate);
    if (!startDateObj || !endDateObj) return true;
    return startDateObj <= endDateObj;
  };

  const handleStartDateChange = (e) => {
    const maskedValue = applyDateMask(e.target.value);
    setStartDate(maskedValue);
  };

  const handleEndDateChange = (e) => {
    const maskedValue = applyDateMask(e.target.value);
    setEndDate(maskedValue);
  };

  const handleGenerateReport = () => {
    if (startDate && !isValidDateFormat(startDate)) {
      alert("Formato de data inicial inválido. Use dd/mm/aaaa");
      return;
    }
    if (endDate && !isValidDateFormat(endDate)) {
      alert("Formato de data final inválido. Use dd/mm/aaaa");
      return;
    }
    if (!validateDateRange()) {
      alert("A data inicial deve ser menor ou igual à data final");
      return;
    }

    const filterParams = {
      reportType,
      reportCategory,
      account,
      analysisBy,
      situation,
      startDate: startDate ? parseDate(startDate) : null,
      endDate: endDate ? parseDate(endDate) : null,
      includeTransfers,
    };

    onGenerateReport(filterParams);
  };

  const getInputStyle = (dateValue) => {
    if (!dateValue) return {};
    const isValid = isValidDateFormat(dateValue) && parseDate(dateValue);
    return {
      borderColor: isValid ? "#ccc" : "#ff4444",
      backgroundColor: isValid ? "white" : "#fff5f5",
    };
  };

  const inputStyle = {
    width: "100%",
    padding: "8px 12px",
    border: "1px solid #ddd",
    borderRadius: "4px",
    fontSize: "14px",
    marginBottom: "4px",
  };

  const selectStyle = {
    ...inputStyle,
    backgroundColor: "white",
  };

  const labelStyle = {
    display: "block",
    marginBottom: "6px",
    fontSize: "14px",
    fontWeight: "500",
    color: "#333",
  };

  const buttonStyle = {
    width: "100%",
    padding: "12px",
    backgroundColor: "#6f42c1",
    color: "white",
    border: "none",
    borderRadius: "4px",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
    marginTop: "20px",
  };

  return (
    <div
      style={{
        width: "280px",
        backgroundColor: "#f8f9fa",
        padding: "20px",
        borderRight: "1px solid #dee2e6",
        height: "calc(100vh - 60px)",
        overflowY: "auto",
      }}
    >
      <div style={{ marginBottom: "16px" }}>
        <label style={labelStyle}>Tipo de Relatório</label>
        <select
          style={selectStyle}
          value={reportType}
          onChange={(e) => setReportType(e.target.value)}
        >
          <option value="Manual">Manual</option>
          <option value="Automático">Automático</option>
        </select>
      </div>

      <div style={{ marginBottom: "16px" }}>
        <label style={labelStyle}>Relatório</label>
        <select
          style={selectStyle}
          value={reportCategory}
          onChange={(e) => setReportCategory(e.target.value)}
        >
          <option value="Planilha de despesas">Planilha de despesas</option>
          <option value="Planilha de receitas">Planilha de receitas</option>
        </select>
      </div>

      <div style={{ marginBottom: "16px" }}>
        <label style={labelStyle}>Conta</label>
        <select
          style={selectStyle}
          value={account}
          onChange={(e) => setAccount(e.target.value)}
        >
          <option value="Todas as contas">Todas as contas</option>
          <option value="Conta Corrente">Conta Corrente</option>
          <option value="Poupança">Poupança</option>
        </select>
      </div>

      <div style={{ marginBottom: "16px" }}>
        <label style={labelStyle}>Análise por</label>
        <select
          style={selectStyle}
          value={analysisBy}
          onChange={(e) => setAnalysisBy(e.target.value)}
        >
          <option value="Data do movimento">Data do movimento</option>
          <option value="Data de vencimento">Data de vencimento</option>
        </select>
      </div>

      <div style={{ marginBottom: "16px" }}>
        <label style={labelStyle}>Situação</label>
        <select
          style={selectStyle}
          value={situation}
          onChange={(e) => setSituation(e.target.value)}
        >
          <option value="Todas">Todas</option>
          <option value="Em aberto">Em aberto</option>
          <option value="Realizadas">Realizadas</option>
        </select>
      </div>

      <div style={{ marginBottom: "16px" }}>
        <label style={labelStyle}>Período inicial</label>
        <input
          type="text"
          style={{ ...inputStyle, ...getInputStyle(startDate) }}
          value={startDate}
          onChange={handleStartDateChange}
          placeholder="dd/mm/aaaa"
          maxLength="10"
        />
        {startDate && !isValidDateFormat(startDate) && (
          <div style={{ color: "#ff4444", fontSize: "12px" }}>
            Formato inválido
          </div>
        )}
      </div>

      <div style={{ marginBottom: "16px" }}>
        <label style={labelStyle}>Período final</label>
        <input
          type="text"
          style={{ ...inputStyle, ...getInputStyle(endDate) }}
          value={endDate}
          onChange={handleEndDateChange}
          placeholder="dd/mm/aaaa"
          maxLength="10"
        />
        {endDate && !isValidDateFormat(endDate) && (
          <div style={{ color: "#ff4444", fontSize: "12px" }}>
            Formato inválido
          </div>
        )}
        {startDate && endDate && !validateDateRange() && (
          <div style={{ color: "#ff4444", fontSize: "12px" }}>
            Data final deve ser maior que a inicial
          </div>
        )}
      </div>

      <div
        style={{ marginBottom: "16px", display: "flex", alignItems: "center" }}
      >
        <input
          type="checkbox"
          checked={includeTransfers}
          onChange={(e) => setIncludeTransfers(e.target.checked)}
          style={{ marginRight: "8px" }}
        />
        <label style={{ fontSize: "14px", margin: 0 }}>
          Incluir transferências no relatório
        </label>
      </div>

      <button style={buttonStyle} onClick={handleGenerateReport}>
        Ver relatório
      </button>
    </div>
  );
};

const ReportTable = ({ reportData, reportType }) => {
  const formatCurrency = (value) => {
    return value > 0 ? value.toFixed(2).replace(".", ",") : "";
  };

  const generateColumns = () => {
    const startDate = new Date(reportData.startDate);
    const endDate = new Date(reportData.endDate);
    const columns = [];

    const current = new Date(startDate.getFullYear(), startDate.getMonth(), 1);
    const end = new Date(endDate.getFullYear(), endDate.getMonth(), 1);

    while (current <= end) {
      const monthNames = [
        "Jan",
        "Fev",
        "Mar",
        "Abr",
        "Mai",
        "Jun",
        "Jul",
        "Ago",
        "Set",
        "Out",
        "Nov",
        "Dez",
      ];

      const monthKey = `${current.getFullYear()}-${String(
        current.getMonth() + 1
      ).padStart(2, "0")}`;
      const monthLabel = `${
        monthNames[current.getMonth()]
      }/${current.getFullYear()}`;

      columns.push({
        key: monthKey,
        label: monthLabel,
      });

      current.setMonth(current.getMonth() + 1);
    }

    return columns;
  };

  const calculateRowTotal = (item, columns) => {
    return columns.reduce((total, column) => {
      return total + (item[column.key] || 0);
    }, 0);
  };

  const calculateColumnTotal = (expenses, columnKey) => {
    return expenses.reduce((total, category) => {
      return (
        total +
        category.items.reduce((categoryTotal, item) => {
          return categoryTotal + (item[columnKey] || 0);
        }, 0)
      );
    }, 0);
  };

  const columns = generateColumns();

  return (
    <div
      style={{
        flex: 1,
        backgroundColor: "white",
        padding: "20px",
        height: "calc(100vh - 60px)",
        overflowY: "auto",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
          paddingBottom: "15px",
          borderBottom: "1px solid #dee2e6",
        }}
      >
        <h2 style={{ margin: 0, color: "#333" }}>Relatório financeiro</h2>
        <button
          style={{
            padding: "8px 16px",
            backgroundColor: "#6f42c1",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Imprimir
        </button>
      </div>

      <h3
        style={{
          textAlign: "center",
          margin: "20px 0",
          fontSize: "18px",
          fontWeight: "bold",
        }}
      >
        {reportType === "Planilha de despesas"
          ? "PLANILHA DE DESPESAS"
          : "PLANILHA DE RECEITAS"}
      </h3>

      <div
        style={{
          display: "flex",
          gap: "30px",
          marginBottom: "20px",
          fontSize: "14px",
        }}
      >
        <div>
          <strong>Período:</strong> {reportData.period}
        </div>
        <div>
          <strong>Situação:</strong> {reportData.situation}
        </div>
      </div>

      <div style={{ overflowX: "auto" }}>
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            border: "1px solid #dee2e6",
          }}
        >
          <thead>
            <tr style={{ backgroundColor: "#f8f9fa" }}>
              <th
                style={{
                  padding: "12px 8px",
                  textAlign: "left",
                  border: "1px solid #dee2e6",
                  fontWeight: "600",
                }}
              ></th>
              {columns.map((column) => (
                <th
                  key={column.key}
                  style={{
                    padding: "12px 8px",
                    textAlign: "center",
                    border: "1px solid #dee2e6",
                    fontWeight: "600",
                  }}
                >
                  {column.label}
                </th>
              ))}
              <th
                style={{
                  padding: "12px 8px",
                  textAlign: "center",
                  border: "1px solid #dee2e6",
                  fontWeight: "600",
                }}
              >
                Total
              </th>
            </tr>
          </thead>

          <tbody>
            {reportData.expenses?.map((category, categoryIndex) => (
              <React.Fragment key={categoryIndex}>
                <tr style={{ backgroundColor: "#e9ecef" }}>
                  <td
                    style={{
                      padding: "10px 8px",
                      fontWeight: "600",
                      border: "1px solid #dee2e6",
                    }}
                    colSpan={columns.length + 2}
                  >
                    {category.category}
                  </td>
                </tr>

                {category.items.map((item, itemIndex) => (
                  <tr key={itemIndex}>
                    <td
                      style={{
                        padding: "8px",
                        border: "1px solid #dee2e6",
                        paddingLeft: "20px",
                      }}
                    >
                      {item.name}
                    </td>
                    {columns.map((column) => (
                      <td
                        key={column.key}
                        style={{
                          padding: "8px",
                          textAlign: "right",
                          border: "1px solid #dee2e6",
                        }}
                      >
                        {item[column.key] > 0
                          ? formatCurrency(item[column.key])
                          : ""}
                      </td>
                    ))}
                    <td
                      style={{
                        padding: "8px",
                        textAlign: "right",
                        border: "1px solid #dee2e6",
                        fontWeight: "600",
                      }}
                    >
                      {formatCurrency(calculateRowTotal(item, columns))}
                    </td>
                  </tr>
                ))}
              </React.Fragment>
            ))}

            <tr style={{ backgroundColor: "#f8f9fa", fontWeight: "600" }}>
              <td
                style={{
                  padding: "12px 8px",
                  border: "1px solid #dee2e6",
                }}
              >
                <strong>Total</strong>
              </td>
              {columns.map((column) => (
                <td
                  key={column.key}
                  style={{
                    padding: "12px 8px",
                    textAlign: "right",
                    border: "1px solid #dee2e6",
                  }}
                >
                  {formatCurrency(
                    calculateColumnTotal(reportData.expenses || [], column.key)
                  )}
                </td>
              ))}
              <td
                style={{
                  padding: "12px 8px",
                  textAlign: "right",
                  border: "1px solid #dee2e6",
                }}
              >
                <strong>{formatCurrency(reportData.totalGeneral)}</strong>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

const RelatorioFinanceiro = () => {
  const [reportType, setReportType] = useState("Manual");
  const [reportCategory, setReportCategory] = useState("Planilha de receitas");
  const [account, setAccount] = useState("Todas as contas");
  const [analysisBy, setAnalysisBy] = useState("Data do movimento");
  const [situation, setSituation] = useState("Todas");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [includeTransfers, setIncludeTransfers] = useState(false);
  const [showReport, setShowReport] = useState(false);
  const [reportData, setReportData] = useState(null);

  const [allData] = useState([
    {
      id: 1,
      tipo: "receita",
      categoria: "Salário",
      descricao: "salário",
      valor: 1500.0,
      data: new Date(2020, 9, 15),
      conta: "Conta Corrente",
      situacao: "Realizadas",
    },
    {
      id: 2,
      tipo: "receita",
      categoria: "Salário",
      descricao: "salário",
      valor: 1500.0,
      data: new Date(2020, 10, 15),
      conta: "Conta Corrente",
      situacao: "Realizadas",
    },
    {
      id: 3,
      tipo: "receita",
      categoria: "Freela",
      descricao: "Freela",
      valor: 500.0,
      data: new Date(2020, 11, 10),
      conta: "Conta Corrente",
      situacao: "Realizadas",
    },
    {
      id: 4,
      tipo: "despesa",
      categoria: "Alimentação",
      descricao: "Supermercado",
      valor: 300.0,
      data: new Date(2020, 9, 20),
      conta: "Conta Corrente",
      situacao: "Realizadas",
    },
    {
      id: 5,
      tipo: "despesa",
      categoria: "Transporte",
      descricao: "Combustível",
      valor: 200.0,
      data: new Date(2020, 10, 25),
      conta: "Conta Corrente",
      situacao: "Realizadas",
    },
    {
      id: 6,
      tipo: "despesa",
      categoria: "Alimentação",
      descricao: "Restaurante",
      valor: 150.0,
      data: new Date(2020, 11, 5),
      conta: "Conta Corrente",
      situacao: "Realizadas",
    },
    {
      id: 7,
      tipo: "receita",
      categoria: "Freela",
      descricao: "Projeto Web",
      valor: 800.0,
      data: new Date(2021, 0, 10),
      conta: "Conta Corrente",
      situacao: "Realizadas",
    },
    {
      id: 8,
      tipo: "despesa",
      categoria: "Moradia",
      descricao: "Aluguel",
      valor: 1200.0,
      data: new Date(2021, 0, 5),
      conta: "Conta Corrente",
      situacao: "Realizadas",
    },
  ]);

  const filterData = (filterParams) => {
    let filtered = [...allData];

    if (filterParams.reportCategory === "Planilha de receitas") {
      filtered = filtered.filter((item) => item.tipo === "receita");
    } else if (filterParams.reportCategory === "Planilha de despesas") {
      filtered = filtered.filter((item) => item.tipo === "despesa");
    }

    if (filterParams.account !== "Todas as contas") {
      filtered = filtered.filter((item) => item.conta === filterParams.account);
    }

    if (filterParams.situation !== "Todas") {
      filtered = filtered.filter(
        (item) => item.situacao === filterParams.situation
      );
    }

    if (filterParams.startDate) {
      filtered = filtered.filter((item) => item.data >= filterParams.startDate);
    }

    if (filterParams.endDate) {
      const endOfDay = new Date(filterParams.endDate);
      endOfDay.setHours(23, 59, 59, 999);
      filtered = filtered.filter((item) => item.data <= endOfDay);
    }

    if (!filterParams.includeTransfers) {
      filtered = filtered.filter((item) => item.categoria !== "transferencia");
    }

    return filtered;
  };

  const prepareReportData = (filteredData, filterParams) => {
    const grouped = {};

    filteredData.forEach((item) => {
      if (!grouped[item.categoria]) {
        grouped[item.categoria] = {};
      }

      if (!grouped[item.categoria][item.descricao]) {
        grouped[item.categoria][item.descricao] = {};
      }

      const monthKey = `${item.data.getFullYear()}-${String(
        item.data.getMonth() + 1
      ).padStart(2, "0")}`;

      if (!grouped[item.categoria][item.descricao][monthKey]) {
        grouped[item.categoria][item.descricao][monthKey] = 0;
      }

      grouped[item.categoria][item.descricao][monthKey] += item.valor;
    });

    const expenses = Object.keys(grouped).map((categoryName) => ({
      category: categoryName,
      items: Object.keys(grouped[categoryName]).map((itemName) => {
        const itemData = { name: itemName };
        Object.keys(grouped[categoryName][itemName]).forEach((monthKey) => {
          itemData[monthKey] = grouped[categoryName][itemName][monthKey];
        });
        return itemData;
      }),
    }));

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
    <div style={{ height: "100vh", backgroundColor: "#f8f9fa" }}>
      <Header />
      <GlobalStyle />
      <div
        style={{
          display: "flex",
          marginTop: "60px",
          height: "calc(100vh - 60px)",
        }}
      >
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
              backgroundColor: "white",
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

            <div
              style={{
                marginTop: "30px",
                padding: "40px",
                backgroundColor: "#f8f9fa",
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
