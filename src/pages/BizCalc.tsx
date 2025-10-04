import { useState } from "react";
import { Calculator, DollarSign, Target, CheckCircle } from "lucide-react";

interface BusinessInputs {
  businessName: string;
  businessDescription: string;
  sellingPrice: number;
  productCost: number;
  variableCosts: number;
  monthlySales: number;
  duration: number; // in months
  marketingCost: number; // monthly marketing cost
  staffRentCost: number; // monthly staff/rent cost
  otherFixedCosts: number; // other monthly fixed costs
  initialInvestment: number; // optional
  taxRate: number; // optional
  discountRate: number; // optional
}

interface BusinessResults {
  totalRevenue: number;
  totalCost: number;
  profit: number;
  profitMargin: number;
  roi: number;
  breakevenUnits: number;
  breakevenDays: number;
}

export const BizCalc = () => {
  const [currentStep, setCurrentStep] = useState(1);

  const [inputs, setInputs] = useState<BusinessInputs>({
    businessName: "",
    businessDescription: "",
    sellingPrice: 0,
    productCost: 0,
    variableCosts: 0,
    monthlySales: 0,
    duration: 12,
    marketingCost: 0,
    staffRentCost: 0,
    otherFixedCosts: 0,
    initialInvestment: 0,
    taxRate: 0,
    discountRate: 0,
  });

  const [results, setResults] = useState<BusinessResults | null>(null);
  const [showResults, setShowResults] = useState(false);

  const calculateBusinessMetrics = (
    inputs: BusinessInputs
  ): BusinessResults => {
    // Calculate total units over the duration
    const totalUnits = inputs.monthlySales * inputs.duration;

    // Apply discount if any
    const discountedSellingPrice =
      inputs.sellingPrice * (1 - inputs.discountRate / 100);

    // Revenue calculation
    const totalRevenue = discountedSellingPrice * totalUnits;

    // Cost calculations
    const totalProductCost = inputs.productCost * totalUnits;
    const totalVariableCost = inputs.variableCosts * totalUnits;

    // Fixed costs over the duration
    const totalMarketingCost = inputs.marketingCost * inputs.duration;
    const totalStaffRentCost = inputs.staffRentCost * inputs.duration;
    const totalOtherFixedCosts = inputs.otherFixedCosts * inputs.duration;
    const totalFixedCosts =
      totalMarketingCost + totalStaffRentCost + totalOtherFixedCosts;

    // Total cost
    const totalCost =
      totalProductCost +
      totalVariableCost +
      totalFixedCosts +
      inputs.initialInvestment;

    // Apply tax if any
    const taxAmount =
      inputs.taxRate > 0 ? totalRevenue * (inputs.taxRate / 100) : 0;
    const finalRevenue = totalRevenue - taxAmount;

    // Profit calculation
    const profit = finalRevenue - totalCost;
    const profitMargin = finalRevenue > 0 ? (profit / finalRevenue) * 100 : 0;

    // ROI calculation (based on total investment)
    const totalInvestment = totalFixedCosts + inputs.initialInvestment;
    const roi = totalInvestment > 0 ? (profit / totalInvestment) * 100 : 0;

    // Breakeven calculation
    const contributionMarginPerUnit =
      discountedSellingPrice - inputs.productCost - inputs.variableCosts;
    const monthlyFixedCosts =
      inputs.marketingCost + inputs.staffRentCost + inputs.otherFixedCosts;

    let breakevenUnits = 0;
    let breakevenDays = 0;

    if (contributionMarginPerUnit > 0) {
      breakevenUnits = monthlyFixedCosts / contributionMarginPerUnit;
      breakevenDays =
        inputs.monthlySales > 0 ? breakevenUnits / inputs.monthlySales : 0;
    }

    return {
      totalRevenue: finalRevenue,
      totalCost,
      profit,
      profitMargin,
      roi,
      breakevenUnits,
      breakevenDays,
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

  const handleCalculate = () => {
    const calculatedResults = calculateBusinessMetrics(inputs);
    setResults(calculatedResults);
    setShowResults(true);
  };

  const handleReset = () => {
    setCurrentStep(1);
    setInputs({
      businessName: "",
      businessDescription: "",
      sellingPrice: 0,
      productCost: 0,
      variableCosts: 0,
      monthlySales: 0,
      duration: 12,
      marketingCost: 0,
      staffRentCost: 0,
      otherFixedCosts: 0,
      initialInvestment: 0,
      taxRate: 0,
      discountRate: 0,
    });
    setResults(null);
    setShowResults(false);
  };

  const renderStep = () => {
    // Always show the form directly
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="w-full max-w-4xl">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="h-16 w-16 bg-gradient-to-r from-indigo-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Calculator className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-white dark:text-gray-100 font-poppins mb-4">
              Tell us about your business 💼
            </h1>
            <p className="text-lg text-white/80 dark:text-gray-300 font-inter">
              We'll help you calculate the potential of your business idea
            </p>
          </div>

          {/* Form Sections */}
          <div className="space-y-8">
            {/* SECTION 1: Basic Info */}
            <div className="glass-card rounded-2xl p-8 shadow-2xl">
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center mr-4">
                  <span className="text-blue-400 text-lg font-bold">🧾</span>
                </div>
                <h2 className="text-2xl font-semibold text-white dark:text-gray-100 font-poppins">
                  Basic Info
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Business Name */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-white dark:text-gray-200 font-inter">
                    What's your business or product name?
                  </label>
                  <input
                    type="text"
                    value={inputs.businessName}
                    onChange={(e) =>
                      handleInputChange("businessName", e.target.value)
                    }
                    className="w-full px-4 py-3 border border-white/20 dark:border-gray-600/50 rounded-lg focus:ring-2 focus:ring-blue-500/50 focus:border-transparent bg-white/10 dark:bg-gray-800/50 backdrop-blur-sm text-white dark:text-gray-100 placeholder-white/60 dark:placeholder-gray-400 transition-all duration-300"
                    placeholder="e.g., Handmade Candles, Coffee Shop, T-Shirt Brand"
                  />
                </div>

                {/* Business Description */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-white dark:text-gray-200 font-inter">
                    What are you selling? (short description)
                  </label>
                  <input
                    type="text"
                    value={inputs.businessDescription}
                    onChange={(e) =>
                      handleInputChange("businessDescription", e.target.value)
                    }
                    className="w-full px-4 py-3 border border-white/20 dark:border-gray-600/50 rounded-lg focus:ring-2 focus:ring-blue-500/50 focus:border-transparent bg-white/10 dark:bg-gray-800/50 backdrop-blur-sm text-white dark:text-gray-100 placeholder-white/60 dark:placeholder-gray-400 transition-all duration-300"
                    placeholder="e.g., Scented candles in glass jars"
                  />
                </div>
              </div>
            </div>

            {/* SECTION 2: Pricing & Production */}
            <div className="glass-card rounded-2xl p-8 shadow-2xl">
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center mr-4">
                  <span className="text-green-400 text-lg font-bold">💰</span>
                </div>
                <h2 className="text-2xl font-semibold text-white dark:text-gray-100 font-poppins">
                  Pricing & Production
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Selling Price */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-white dark:text-gray-200 font-inter">
                    How much do you plan to sell each item for? (₹)
                  </label>
                  <input
                    type="number"
                    value={inputs.sellingPrice}
                    onChange={(e) =>
                      handleInputChange(
                        "sellingPrice",
                        parseFloat(e.target.value) || 0
                      )
                    }
                    className="w-full px-4 py-3 border border-white/20 dark:border-gray-600/50 rounded-lg focus:ring-2 focus:ring-green-500/50 focus:border-transparent bg-white/10 dark:bg-gray-800/50 backdrop-blur-sm text-white dark:text-gray-100 placeholder-white/60 dark:placeholder-gray-400 transition-all duration-300"
                    placeholder="e.g., 499"
                  />
                  <p className="text-xs text-white/60 dark:text-gray-400">
                    Selling price per unit
                  </p>
                </div>

                {/* Production Cost */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-white dark:text-gray-200 font-inter">
                    What's your cost to make or buy one item? (₹)
                  </label>
                  <input
                    type="number"
                    value={inputs.productCost}
                    onChange={(e) =>
                      handleInputChange(
                        "productCost",
                        parseFloat(e.target.value) || 0
                      )
                    }
                    className="w-full px-4 py-3 border border-white/20 dark:border-gray-600/50 rounded-lg focus:ring-2 focus:ring-green-500/50 focus:border-transparent bg-white/10 dark:bg-gray-800/50 backdrop-blur-sm text-white dark:text-gray-100 placeholder-white/60 dark:placeholder-gray-400 transition-all duration-300"
                    placeholder="e.g., 250"
                  />
                  <p className="text-xs text-white/60 dark:text-gray-400">
                    Production/purchase cost per unit
                  </p>
                </div>

                {/* Variable Costs */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-white dark:text-gray-200 font-inter">
                    Variable costs per unit (₹)
                  </label>
                  <input
                    type="number"
                    value={inputs.variableCosts}
                    onChange={(e) =>
                      handleInputChange(
                        "variableCosts",
                        parseFloat(e.target.value) || 0
                      )
                    }
                    className="w-full px-4 py-3 border border-white/20 dark:border-gray-600/50 rounded-lg focus:ring-2 focus:ring-green-500/50 focus:border-transparent bg-white/10 dark:bg-gray-800/50 backdrop-blur-sm text-white dark:text-gray-100 placeholder-white/60 dark:placeholder-gray-400 transition-all duration-300"
                    placeholder="e.g., 30"
                  />
                  <p className="text-xs text-white/60 dark:text-gray-400">
                    Packaging, delivery, transaction fee, etc.
                  </p>
                </div>
              </div>
            </div>

            {/* SECTION 3: Sales & Duration */}
            <div className="glass-card rounded-2xl p-8 shadow-2xl">
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center mr-4">
                  <span className="text-purple-400 text-lg font-bold">📈</span>
                </div>
                <h2 className="text-2xl font-semibold text-white dark:text-gray-100 font-poppins">
                  Sales & Duration
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Monthly Sales */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-white dark:text-gray-200 font-inter">
                    How many items do you expect to sell each month?
                  </label>
                  <input
                    type="number"
                    value={inputs.monthlySales}
                    onChange={(e) =>
                      handleInputChange(
                        "monthlySales",
                        parseInt(e.target.value) || 0
                      )
                    }
                    className="w-full px-4 py-3 border border-white/20 dark:border-gray-600/50 rounded-lg focus:ring-2 focus:ring-purple-500/50 focus:border-transparent bg-white/10 dark:bg-gray-800/50 backdrop-blur-sm text-white dark:text-gray-100 placeholder-white/60 dark:placeholder-gray-400 transition-all duration-300"
                    placeholder="e.g., 500"
                  />
                  <p className="text-xs text-white/60 dark:text-gray-400">
                    Expected monthly sales in units
                  </p>
                </div>

                {/* Duration */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-white dark:text-gray-200 font-inter">
                    For how long do you want to calculate results? (months)
                  </label>
                  <input
                    type="number"
                    value={inputs.duration}
                    onChange={(e) =>
                      handleInputChange(
                        "duration",
                        parseInt(e.target.value) || 0
                      )
                    }
                    className="w-full px-4 py-3 border border-white/20 dark:border-gray-600/50 rounded-lg focus:ring-2 focus:ring-purple-500/50 focus:border-transparent bg-white/10 dark:bg-gray-800/50 backdrop-blur-sm text-white dark:text-gray-100 placeholder-white/60 dark:placeholder-gray-400 transition-all duration-300"
                    placeholder="e.g., 6"
                  />
                  <p className="text-xs text-white/60 dark:text-gray-400">
                    Business duration in months
                  </p>
                </div>
              </div>
            </div>

            {/* SECTION 4: Monthly Expenses */}
            <div className="glass-card rounded-2xl p-8 shadow-2xl">
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 bg-pink-500/20 rounded-lg flex items-center justify-center mr-4">
                  <span className="text-pink-400 text-lg font-bold">🧾</span>
                </div>
                <h2 className="text-2xl font-semibold text-white dark:text-gray-100 font-poppins">
                  Monthly Expenses
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Marketing Cost */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-white dark:text-gray-200 font-inter">
                    Marketing / Advertising Cost (monthly) (₹)
                  </label>
                  <input
                    type="number"
                    value={inputs.marketingCost}
                    onChange={(e) =>
                      handleInputChange(
                        "marketingCost",
                        parseFloat(e.target.value) || 0
                      )
                    }
                    className="w-full px-4 py-3 border border-white/20 dark:border-gray-600/50 rounded-lg focus:ring-2 focus:ring-pink-500/50 focus:border-transparent bg-white/10 dark:bg-gray-800/50 backdrop-blur-sm text-white dark:text-gray-100 placeholder-white/60 dark:placeholder-gray-400 transition-all duration-300"
                    placeholder="e.g., 3000"
                  />
                </div>

                {/* Staff/Rent Cost */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-white dark:text-gray-200 font-inter">
                    Staff / Rent Cost (monthly) (₹)
                  </label>
                  <input
                    type="number"
                    value={inputs.staffRentCost}
                    onChange={(e) =>
                      handleInputChange(
                        "staffRentCost",
                        parseFloat(e.target.value) || 0
                      )
                    }
                    className="w-full px-4 py-3 border border-white/20 dark:border-gray-600/50 rounded-lg focus:ring-2 focus:ring-pink-500/50 focus:border-transparent bg-white/10 dark:bg-gray-800/50 backdrop-blur-sm text-white dark:text-gray-100 placeholder-white/60 dark:placeholder-gray-400 transition-all duration-300"
                    placeholder="e.g., 12000"
                  />
                </div>

                {/* Other Fixed Costs */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-white dark:text-gray-200 font-inter">
                    Other Fixed Costs (monthly) (₹)
                  </label>
                  <input
                    type="number"
                    value={inputs.otherFixedCosts}
                    onChange={(e) =>
                      handleInputChange(
                        "otherFixedCosts",
                        parseFloat(e.target.value) || 0
                      )
                    }
                    className="w-full px-4 py-3 border border-white/20 dark:border-gray-600/50 rounded-lg focus:ring-2 focus:ring-pink-500/50 focus:border-transparent bg-white/10 dark:bg-gray-800/50 backdrop-blur-sm text-white dark:text-gray-100 placeholder-white/60 dark:placeholder-gray-400 transition-all duration-300"
                    placeholder="e.g., 2000"
                  />
                  <p className="text-xs text-white/60 dark:text-gray-400">
                    Internet, electricity, software subscriptions
                  </p>
                </div>
              </div>
            </div>

            {/* SECTION 5: Optional Advanced Metrics */}
            <div className="glass-card rounded-2xl p-8 shadow-2xl">
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 bg-orange-500/20 rounded-lg flex items-center justify-center mr-4">
                  <span className="text-orange-400 text-lg font-bold">💡</span>
                </div>
                <h2 className="text-2xl font-semibold text-white dark:text-gray-100 font-poppins">
                  Optional (Advanced Metrics)
                </h2>
                <span className="ml-2 text-sm text-white/60 dark:text-gray-400">
                  Leave blank if not applicable
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Initial Investment */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-white dark:text-gray-200 font-inter">
                    Initial Investment / Setup Cost (₹)
                  </label>
                  <input
                    type="number"
                    value={inputs.initialInvestment}
                    onChange={(e) =>
                      handleInputChange(
                        "initialInvestment",
                        parseFloat(e.target.value) || 0
                      )
                    }
                    className="w-full px-4 py-3 border border-white/20 dark:border-gray-600/50 rounded-lg focus:ring-2 focus:ring-orange-500/50 focus:border-transparent bg-white/10 dark:bg-gray-800/50 backdrop-blur-sm text-white dark:text-gray-100 placeholder-white/60 dark:placeholder-gray-400 transition-all duration-300"
                    placeholder="e.g., 50000"
                  />
                  <p className="text-xs text-white/60 dark:text-gray-400">
                    Equipment, shop setup, licenses, etc.
                  </p>
                </div>

                {/* Tax Rate */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-white dark:text-gray-200 font-inter">
                    Tax Rate (%)
                  </label>
                  <input
                    type="number"
                    value={inputs.taxRate}
                    onChange={(e) =>
                      handleInputChange(
                        "taxRate",
                        parseFloat(e.target.value) || 0
                      )
                    }
                    className="w-full px-4 py-3 border border-white/20 dark:border-gray-600/50 rounded-lg focus:ring-2 focus:ring-orange-500/50 focus:border-transparent bg-white/10 dark:bg-gray-800/50 backdrop-blur-sm text-white dark:text-gray-100 placeholder-white/60 dark:placeholder-gray-400 transition-all duration-300"
                    placeholder="e.g., 18"
                  />
                  <p className="text-xs text-white/60 dark:text-gray-400">
                    If you want to include tax in calculations
                  </p>
                </div>

                {/* Discount Rate */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-white dark:text-gray-200 font-inter">
                    Discount or Offer (%)
                  </label>
                  <input
                    type="number"
                    value={inputs.discountRate}
                    onChange={(e) =>
                      handleInputChange(
                        "discountRate",
                        parseFloat(e.target.value) || 0
                      )
                    }
                    className="w-full px-4 py-3 border border-white/20 dark:border-gray-600/50 rounded-lg focus:ring-2 focus:ring-orange-500/50 focus:border-transparent bg-white/10 dark:bg-gray-800/50 backdrop-blur-sm text-white dark:text-gray-100 placeholder-white/60 dark:placeholder-gray-400 transition-all duration-300"
                    placeholder="e.g., 10"
                  />
                  <p className="text-xs text-white/60 dark:text-gray-400">
                    If you plan to run discounts or sales
                  </p>
                </div>
              </div>
            </div><br />

            {/* Calculate Button */}
            <div className="text-center">
              <button
                onClick={handleCalculate}
                className="bg-gradient-to-r from-green-600 to-blue-600 dark:from-green-500 dark:to-green-400 text-white py-4 px-12 rounded-xl font-semibold font-poppins text-xl hover:from-green-700 hover:to-blue-700 dark:hover:from-green-600 dark:hover:to-green-500 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl dark:shadow-green-500/20 hover:shadow-green-500/30 flex items-center justify-center gap-3 mx-auto"
              >
                <Calculator className="h-6 w-6" />
                <span>Calculate My Business 💰</span>
              </button>
            </div>
          </div><br />

          {/* Results Section */}
          {showResults && results && (
            <div className="glass-card rounded-2xl p-8 mt-8 shadow-2xl">
              <h2 className="text-2xl font-semibold text-white dark:text-gray-100 font-poppins mb-8 text-center">
                Your Business Summary 📊
              </h2>
              <div className="space-y-6">
                {/* Key Metrics */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-xl border border-green-200 dark:border-green-800/30">
                    <div className="flex items-center mb-3">
                      <DollarSign className="h-6 w-6 text-green-600 dark:text-green-400 mr-3" />
                      <span className="text-lg font-medium text-green-800 dark:text-green-200">
                        Revenue
                      </span>
                    </div>
                    <p className="text-3xl font-bold text-green-900 dark:text-green-100">
                      ₹{results?.totalRevenue.toLocaleString()}
                    </p>
                  </div>

                  <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-xl border border-blue-200 dark:border-blue-800/30">
                    <div className="flex items-center mb-3">
                      <Target className="h-6 w-6 text-blue-600 dark:text-blue-400 mr-3" />
                      <span className="text-lg font-medium text-blue-800 dark:text-blue-200">
                        Profit
                      </span>
                    </div>
                    <p
                      className={`text-3xl font-bold ${
                        results?.profit && results.profit >= 0
                          ? "text-blue-900 dark:text-blue-100"
                          : "text-red-900 dark:text-red-100"
                      }`}
                    >
                      ₹{results?.profit.toLocaleString()}
                    </p>
                  </div>
                </div>

                {/* Business Summary */}
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/30 dark:to-purple-900/30 p-8 rounded-xl border border-white/20 dark:border-gray-700/30">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 text-center">
                    Business Summary
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 text-center leading-relaxed">
                    {inputs.businessName && `"${inputs.businessName}"`} is
                    projected to generate{" "}
                    <span className="font-bold text-green-600 dark:text-green-400">
                      ₹{results?.totalRevenue.toLocaleString()}
                    </span>{" "}
                    in revenue over{" "}
                    <span className="font-bold text-blue-600 dark:text-blue-400">
                      {inputs.duration} months
                    </span>
                    , with a{" "}
                    <span className="font-bold text-purple-600 dark:text-purple-400">
                      {results?.profitMargin.toFixed(1)}%
                    </span>{" "}
                    profit margin and{" "}
                    <span className="font-bold text-orange-600 dark:text-orange-400">
                      {results?.roi.toFixed(1)}%
                    </span>{" "}
                    ROI.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen">
      {/* Progress Bar */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            {[1, 2, 3, 4].map((step) => (
              <div key={step} className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 ${
                    currentStep >= step
                      ? "bg-white/20 dark:bg-green-500/20 backdrop-blur-sm text-white dark:text-green-400 border border-white/30 dark:border-green-400/30 shadow-lg dark:shadow-green-500/20"
                      : "bg-white/10 dark:bg-gray-800/30 text-white/60 dark:text-gray-400 border border-white/20 dark:border-gray-600/30"
                  }`}
                >
                  {currentStep > step ? (
                    <CheckCircle className="h-5 w-5" />
                  ) : (
                    step
                  )}
                </div>
                {step < 4 && (
                  <div
                    className={`w-16 h-1 mx-2 rounded-full transition-all duration-300 ${
                      currentStep > step
                        ? "bg-white/40 dark:bg-green-400/60"
                        : "bg-white/20 dark:bg-gray-600/40"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
          <button
            onClick={handleReset}
            className="px-4 py-2 text-white/80 dark:text-gray-300 hover:text-white dark:hover:text-gray-100 hover:bg-white/10 dark:hover:bg-gray-800/30 rounded-lg transition-colors"
          >
            Reset
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderStep()}
      </div>
    </div>
  );
};
