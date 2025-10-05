import { useState, useEffect } from "react";
import {
  Download,
  Calculator,
  TrendingUp,
  DollarSign,
  Target,
  Scale,
} from "lucide-react";
import jsPDF from "jspdf";
import "./BizCalc.css";
import {
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface BusinessInputs {
  businessName: string;
  productCost: number;
  sellingPrice: number;
  unitsPerDay: number;
  duration: number;
  fixedCosts: number;
  variableCosts: number;
}

interface BusinessResults {
  totalRevenue: number;
  totalCost: number;
  profit: number;
  profitMargin: number;
  roi: number;
  breakevenUnits: number;
}

export const BizCalc = () => {
  const [inputs, setInputs] = useState<BusinessInputs>({
    businessName: "",
    productCost: 0,
    sellingPrice: 0,
    unitsPerDay: 0,
    duration: 12,
    fixedCosts: 0,
    variableCosts: 0,
  });

  // Helper function to format input values for display
  const getInputValue = (value: number) => {
    return value === 0 ? "" : value.toString();
  };

  const [results, setResults] = useState<BusinessResults | null>(null);

  // Load saved inputs from localStorage
  useEffect(() => {
    const savedInputs = localStorage.getItem("bizcalc-inputs");
    if (savedInputs) {
      setInputs(JSON.parse(savedInputs));
    }
  }, []);

  // Save inputs to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("bizcalc-inputs", JSON.stringify(inputs));
  }, [inputs]);

  // Handle cursor tracking for grid effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const container = document.querySelector(
        ".bizcalc-container"
      ) as HTMLElement;
      if (container) {
        const rect = container.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;

        container.style.setProperty("--mouse-x", `${x}%`);
        container.style.setProperty("--mouse-y", `${y}%`);
      }
    };

    document.addEventListener("mousemove", handleMouseMove);
    return () => document.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Calculate results in real-time
  useEffect(() => {
    if (inputs.sellingPrice > 0 && inputs.unitsPerDay > 0) {
      const calculatedResults = calculateBusinessMetrics(inputs);
      setResults(calculatedResults);
    }
  }, [inputs]);

  const calculateBusinessMetrics = (
    inputs: BusinessInputs
  ): BusinessResults => {
    const totalUnits = inputs.unitsPerDay * 30 * inputs.duration; // Convert daily to monthly
    const totalRevenue = inputs.sellingPrice * totalUnits;

    const totalProductCost = inputs.productCost * totalUnits;
    const totalVariableCost = inputs.variableCosts * totalUnits;
    const totalFixedCosts = inputs.fixedCosts * inputs.duration;
    const totalCost = totalProductCost + totalVariableCost + totalFixedCosts;

    const profit = totalRevenue - totalCost;
    const profitMargin = totalRevenue > 0 ? (profit / totalRevenue) * 100 : 0;
    const roi =
      inputs.fixedCosts > 0
        ? (profit / (inputs.fixedCosts * inputs.duration)) * 100
        : 0;

    const contributionMargin =
      inputs.sellingPrice - inputs.productCost - inputs.variableCosts;
    const breakevenUnits =
      contributionMargin > 0
        ? (inputs.fixedCosts * inputs.duration) / contributionMargin
        : 0;

    return {
      totalRevenue,
      totalCost,
      profit,
      profitMargin,
      roi,
      breakevenUnits,
    };
  };

  const handleInputChange = (
    field: keyof BusinessInputs,
    value: string | number
  ) => {
    setInputs((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const generatePDFReport = () => {
    if (!results) return;

    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    let yPosition = 20;

    // Helper function to add text with styling
    const addText = (
      text: string,
      x: number,
      y: number,
      fontSize: number = 12,
      isBold: boolean = false
    ) => {
      doc.setFontSize(fontSize);
      doc.setFont("helvetica", isBold ? "bold" : "normal");
      doc.text(text, x, y);
    };

    // Helper function to add line
    const addLine = (y: number) => {
      doc.setLineWidth(0.5);
      doc.line(20, y, pageWidth - 20, y);
    };

    // Header
    addText("BizCalc AI - Business Report", pageWidth / 2, yPosition, 20, true);
    doc.text(
      "Generated on: " + new Date().toLocaleDateString(),
      pageWidth / 2,
      yPosition + 10,
      { align: "center" }
    );
    yPosition += 30;

    // Business Information
    addText("Business Information", 20, yPosition, 16, true);
    yPosition += 10;
    addLine(yPosition);
    yPosition += 10;

    addText(
      `Business Name: ${inputs.businessName || "Not specified"}`,
      20,
      yPosition
    );
    yPosition += 8;
    addText(
      `Product Cost per Unit: ₹${inputs.productCost.toLocaleString()}`,
      20,
      yPosition
    );
    yPosition += 8;
    addText(
      `Selling Price per Unit: ₹${inputs.sellingPrice.toLocaleString()}`,
      20,
      yPosition
    );
    yPosition += 8;
    addText(`Units Sold per Day: ${inputs.unitsPerDay}`, 20, yPosition);
    yPosition += 8;
    addText(`Business Duration: ${inputs.duration} months`, 20, yPosition);
    yPosition += 8;
    addText(
      `Fixed Costs (Monthly): ₹${inputs.fixedCosts.toLocaleString()}`,
      20,
      yPosition
    );
    yPosition += 8;
    addText(
      `Variable Costs per Unit: ₹${inputs.variableCosts.toLocaleString()}`,
      20,
      yPosition
    );
    yPosition += 20;

    // Financial Results
    addText("Financial Results", 20, yPosition, 16, true);
    yPosition += 10;
    addLine(yPosition);
    yPosition += 10;

    addText(
      `Total Revenue: ₹${results.totalRevenue.toLocaleString()}`,
      20,
      yPosition
    );
    yPosition += 8;
    addText(
      `Total Cost: ₹${results.totalCost.toLocaleString()}`,
      20,
      yPosition
    );
    yPosition += 8;

    // Profit with color indication
    const profitColor = results.profit >= 0 ? [0, 150, 0] : [200, 0, 0];
    doc.setTextColor(profitColor[0], profitColor[1], profitColor[2]);
    addText(`Profit: ₹${results.profit.toLocaleString()}`, 20, yPosition);
    doc.setTextColor(0, 0, 0); // Reset to black
    yPosition += 8;

    addText(
      `Profit Margin: ${results.profitMargin.toFixed(2)}%`,
      20,
      yPosition
    );
    yPosition += 8;
    addText(`ROI: ${results.roi.toFixed(2)}%`, 20, yPosition);
    yPosition += 8;
    addText(
      `Breakeven Units: ${Math.ceil(results.breakevenUnits).toLocaleString()}`,
      20,
      yPosition
    );
    yPosition += 20;

    // Business Analysis
    addText("Business Analysis", 20, yPosition, 16, true);
    yPosition += 10;
    addLine(yPosition);
    yPosition += 10;

    const monthlyRevenue = results.totalRevenue / inputs.duration;
    const monthlyProfit = results.profit / inputs.duration;

    addText(
      `Monthly Revenue: ₹${monthlyRevenue.toLocaleString()}`,
      20,
      yPosition
    );
    yPosition += 8;
    addText(
      `Monthly Profit: ₹${monthlyProfit.toLocaleString()}`,
      20,
      yPosition
    );
    yPosition += 8;
    addText(
      `Daily Revenue: ₹${(monthlyRevenue / 30).toLocaleString()}`,
      20,
      yPosition
    );
    yPosition += 8;
    addText(
      `Daily Profit: ₹${(monthlyProfit / 30).toLocaleString()}`,
      20,
      yPosition
    );
    yPosition += 20;

    // Recommendations
    addText("Recommendations", 20, yPosition, 16, true);
    yPosition += 10;
    addLine(yPosition);
    yPosition += 10;

    if (results.profit < 0) {
      addText("⚠️ Your business is currently unprofitable.", 20, yPosition);
      yPosition += 8;
      addText("Consider:", 20, yPosition);
      yPosition += 6;
      addText("• Increasing selling price", 25, yPosition);
      yPosition += 6;
      addText("• Reducing costs", 25, yPosition);
      yPosition += 6;
      addText("• Increasing sales volume", 25, yPosition);
    } else if (results.profitMargin < 10) {
      addText(
        "⚠️ Low profit margin. Consider optimizing costs or increasing prices.",
        20,
        yPosition
      );
      yPosition += 8;
    } else if (results.profitMargin > 30) {
      addText(
        "✅ Excellent profit margin! Your business model is very healthy.",
        20,
        yPosition
      );
      yPosition += 8;
    } else {
      addText(
        "✅ Good profit margin. Your business is profitable.",
        20,
        yPosition
      );
      yPosition += 8;
    }

    yPosition += 20;

    // Footer
    addLine(yPosition);
    yPosition += 10;
    addText("Generated by BizCalc AI", pageWidth / 2, yPosition, 10);
    doc.text("Built with ❤️ by Krishna Jii", pageWidth / 2, yPosition + 8, {
      align: "center",
    });

    // Download the PDF
    const fileName = `BizCalc_Report_${
      inputs.businessName.replace(/\s+/g, "_") || "Business"
    }_${new Date().toISOString().split("T")[0]}.pdf`;
    doc.save(fileName);
  };

  // Chart data
  const monthlyData = Array.from({ length: inputs.duration }, (_, i) => {
    const month = i + 1;
    const monthlyUnits = inputs.unitsPerDay * 30;
    const monthlyRevenue = inputs.sellingPrice * monthlyUnits;
    const monthlyProductCost = inputs.productCost * monthlyUnits;
    const monthlyVariableCost = inputs.variableCosts * monthlyUnits;
    const monthlyFixedCost = inputs.fixedCosts;
    const monthlyTotalCost =
      monthlyProductCost + monthlyVariableCost + monthlyFixedCost;
    const monthlyProfit = monthlyRevenue - monthlyTotalCost;

    return {
      month: `Month ${month}`,
      revenue: monthlyRevenue,
      cost: monthlyTotalCost,
      profit: monthlyProfit,
    };
  });

  const costBreakdownData = results
    ? [
        {
          name: "Product Cost",
          value: Math.max(
            inputs.productCost * inputs.unitsPerDay * 30 * inputs.duration,
            0
          ),
          color: "#3B82F6",
        },
        {
          name: "Variable Cost",
          value: Math.max(
            inputs.variableCosts * inputs.unitsPerDay * 30 * inputs.duration,
            0
          ),
          color: "#8B5CF6",
        },
        {
          name: "Fixed Cost",
          value: Math.max(inputs.fixedCosts * inputs.duration, 0),
          color: "#F59E0B",
        },
      ]
    : [];

  const revenueVsCostData = results
    ? [
        { name: "Revenue", value: results.totalRevenue, color: "#10B981" },
        { name: "Total Cost", value: results.totalCost, color: "#EF4444" },
        {
          name: "Profit",
          value: results.profit,
          color: results.profit >= 0 ? "#10B981" : "#EF4444",
        },
      ]
    : [];

  return (
    <div className="bizcalc-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            Calculate Your Business Idea Smartly 💡
          </h1>
          <p className="hero-subtitle">
            Get instant financial insights for your business venture
          </p>
        </div>
      </section>

      {/* Main Content */}
      <main className="main-content">
        <div className="dashboard-layout">
          {/* Business Parameters Section */}
          <div className="parameters-section">
            <div className="parameters-card">
              <h2 className="parameters-title">
                <Calculator className="parameters-icon" />
                Business Parameters
              </h2>
              <div className="input-grid">
                <div className="input-group">
                  <label>Business Name</label>
                  <input
                    type="text"
                    value={inputs.businessName}
                    onChange={(e) =>
                      handleInputChange("businessName", e.target.value)
                    }
                    placeholder="e.g., Coffee Shop, Online Store"
                  />
                </div>

                <div className="input-group">
                  <label>Product Cost per Unit (₹)</label>
                  <input
                    type="number"
                    value={getInputValue(inputs.productCost)}
                    onChange={(e) =>
                      handleInputChange(
                        "productCost",
                        parseFloat(e.target.value) || 0
                      )
                    }
                    placeholder="e.g., 50"
                  />
                </div>

                <div className="input-group">
                  <label>Selling Price per Unit (₹)</label>
                  <input
                    type="number"
                    value={getInputValue(inputs.sellingPrice)}
                    onChange={(e) =>
                      handleInputChange(
                        "sellingPrice",
                        parseFloat(e.target.value) || 0
                      )
                    }
                    placeholder="e.g., 150"
                  />
                </div>

                <div className="input-group">
                  <label>Units Sold per Day</label>
                  <input
                    type="number"
                    value={getInputValue(inputs.unitsPerDay)}
                    onChange={(e) =>
                      handleInputChange(
                        "unitsPerDay",
                        parseInt(e.target.value) || 0
                      )
                    }
                    placeholder="e.g., 20"
                  />
                </div>

                <div className="input-group">
                  <label>Business Duration (months)</label>
                  <input
                    type="number"
                    value={
                      inputs.duration === 12 ? "" : inputs.duration.toString()
                    }
                    onChange={(e) =>
                      handleInputChange(
                        "duration",
                        parseInt(e.target.value) || 12
                      )
                    }
                    placeholder="e.g., 12"
                  />
                </div>

                <div className="input-group">
                  <label>Fixed Costs (₹/month)</label>
                  <input
                    type="number"
                    value={getInputValue(inputs.fixedCosts)}
                    onChange={(e) =>
                      handleInputChange(
                        "fixedCosts",
                        parseFloat(e.target.value) || 0
                      )
                    }
                    placeholder="e.g., 5000"
                  />
                </div>

                <div className="input-group">
                  <label>Variable Costs per Unit (₹)</label>
                  <input
                    type="number"
                    value={getInputValue(inputs.variableCosts)}
                    onChange={(e) =>
                      handleInputChange(
                        "variableCosts",
                        parseFloat(e.target.value) || 0
                      )
                    }
                    placeholder="e.g., 10"
                  />
                </div>
              </div>
              <button className="calculate-btn">
                <Calculator className="calculate-icon" />
                Calculate Metrics
              </button>
            </div>
          </div>

          {/* Results Dashboard */}
          {results && (
            <div className="results-dashboard">
              <h2 className="dashboard-title">
                <TrendingUp className="dashboard-icon" />
                Financial Metrics
              </h2>
              <div className="metrics-grid">
                <div className="metric-card revenue">
                  <div className="metric-icon">
                    <DollarSign className="metric-icon-svg" />
                  </div>
                  <div className="metric-content">
                    <h3>Total Revenue</h3>
                    <p className="metric-value">
                      ₹{results.totalRevenue.toLocaleString()}
                    </p>
                  </div>
                </div>

                <div className="metric-card cost">
                  <div className="metric-icon">💸</div>
                  <div className="metric-content">
                    <h3>Total Cost</h3>
                    <p className="metric-value">
                      ₹{results.totalCost.toLocaleString()}
                    </p>
                  </div>
                </div>

                <div
                  className={`metric-card ${
                    results.profit >= 0 ? "profit" : "loss"
                  }`}
                >
                  <div className="metric-icon">
                    {results.profit >= 0 ? "📈" : "📉"}
                  </div>
                  <div className="metric-content">
                    <h3>Profit</h3>
                    <p className="metric-value">
                      ₹{results.profit.toLocaleString()}
                    </p>
                  </div>
                </div>

                <div className="metric-card margin">
                  <div className="metric-icon">📊</div>
                  <div className="metric-content">
                    <h3>Profit Margin</h3>
                    <p className="metric-value">
                      {results.profitMargin.toFixed(1)}%
                    </p>
                  </div>
                </div>

                <div className="metric-card roi">
                  <div className="metric-icon">🎯</div>
                  <div className="metric-content">
                    <h3>ROI</h3>
                    <p className="metric-value">{results.roi.toFixed(1)}%</p>
                  </div>
                </div>

                <div className="metric-card breakeven">
                  <div className="metric-icon">⚖️</div>
                  <div className="metric-content">
                    <h3>Breakeven Units</h3>
                    <p className="metric-value">
                      {Math.ceil(results.breakevenUnits).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Charts Section */}
          {results && (
            <div className="charts-section">
              <div className="chart-card">
                <h3>Monthly Performance</h3>
                <div className="chart-container">
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={monthlyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip
                        formatter={(value) => [
                          `₹${value.toLocaleString()}`,
                          "",
                        ]}
                      />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="revenue"
                        stroke="#10B981"
                        strokeWidth={3}
                        name="Revenue"
                      />
                      <Line
                        type="monotone"
                        dataKey="cost"
                        stroke="#EF4444"
                        strokeWidth={3}
                        name="Cost"
                      />
                      <Line
                        type="monotone"
                        dataKey="profit"
                        stroke="#3B82F6"
                        strokeWidth={3}
                        name="Profit"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="chart-card">
                <h3>Cost Breakdown</h3>
                <div className="chart-container">
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={costBreakdownData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }: any) =>
                          `${name} ${((percent || 0) * 100).toFixed(0)}%`
                        }
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {costBreakdownData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip
                        formatter={(value) => [
                          `₹${value.toLocaleString()}`,
                          "",
                        ]}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="chart-card">
                <h3>Revenue vs Cost</h3>
                <div className="chart-container">
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={revenueVsCostData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip
                        formatter={(value) => [
                          `₹${value.toLocaleString()}`,
                          "",
                        ]}
                      />
                      <Bar dataKey="value" fill="#8884d8" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          )}
        </div>
        <br />
        <br />

        {/* Download Report Button */}
        {results && (
          <div className="download-section">
            <button className="download-btn" onClick={generatePDFReport}>
              <Download className="download-icon" />
              Download Report
            </button>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="footer">
        <p>Built with ❤️ by Krishna Jii</p>
      </footer>
    </div>
  );
};
