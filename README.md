# BizCalc AI - Business Idea Calculator

A modern, intelligent business calculator that helps entrepreneurs quickly calculate and visualize the financial outcome of any business idea based on key assumptions.

## 🚀 Features

### Core Functionality

- **Smart Financial Calculations**: Automatically calculate revenue, costs, profit, ROI, and breakeven points
- **Interactive Input Form**: Easy-to-use form with all essential business parameters
- **Real-time Results**: Instant calculations with detailed financial metrics
- **Visual Analytics**: Beautiful charts and graphs for data visualization
- **Export & Share**: Download reports and share results

### Key Metrics Calculated

- **Total Revenue** = Selling Price × Units Sold × Duration
- **Total Cost** = (Product Cost + Variable Costs) × Units + Fixed Costs
- **Profit** = Revenue - Total Cost
- **Profit Margin** = (Profit / Revenue) × 100
- **ROI** = (Profit / Investment) × 100
- **Breakeven Analysis** = When costs equal revenue

### Visual Analytics

- **Monthly Performance Chart**: Line chart showing revenue, cost, and profit trends
- **Cost Breakdown Pie Chart**: Visual representation of cost distribution
- **Revenue vs Cost Bar Chart**: Comparative analysis of financial metrics
- **Interactive Tooltips**: Detailed information on hover

## 🛠️ Tech Stack

- **Frontend**: React 19 + TypeScript
- **Styling**: Custom CSS with utility classes
- **Charts**: Recharts for data visualization
- **Icons**: Lucide React
- **Routing**: React Router DOM
- **Build Tool**: Vite
- **Package Manager**: npm

## 📦 Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd my-react-app
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start development server**

   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

## 🎯 Usage

### Basic Business Calculation

1. **Navigate to BizCalc AI** from the main menu
2. **Fill in the business details**:

   - Business name
   - Product cost per unit
   - Selling price per unit
   - Units sold per day
   - Business duration (months)
   - Fixed costs (rent, salaries, etc.)
   - Variable costs per unit

3. **Click "Calculate Business Metrics"**
4. **View comprehensive results**:

   - Key financial metrics
   - Visual charts and graphs
   - Breakeven analysis
   - ROI calculations

5. **Export or share** your results

### Input Parameters

| Parameter      | Description                 | Example       |
| -------------- | --------------------------- | ------------- |
| Business Name  | Name of your business idea  | "Coffee Shop" |
| Product Cost   | Cost to produce one unit    | $2.50         |
| Selling Price  | Price you sell one unit for | $4.50         |
| Units Per Day  | Expected daily sales        | 100           |
| Duration       | Business timeline in months | 12            |
| Fixed Costs    | Monthly overhead costs      | $3,000        |
| Variable Costs | Per-unit variable expenses  | $0.50         |

### Output Metrics

| Metric          | Description                | Formula                                         |
| --------------- | -------------------------- | ----------------------------------------------- |
| Total Revenue   | Total income over period   | Price × Units × Duration                        |
| Total Cost      | All expenses combined      | (Product + Variable) × Units + Fixed            |
| Profit          | Net income                 | Revenue - Total Cost                            |
| Profit Margin   | Profit as % of revenue     | (Profit / Revenue) × 100                        |
| ROI             | Return on investment       | (Profit / Fixed Costs) × 100                    |
| Breakeven Units | Units needed to break even | Fixed Costs / (Price - Product Cost - Variable) |

## 📊 Chart Types

### 1. Monthly Performance Line Chart

- Shows revenue, cost, and profit trends over time
- Helps identify growth patterns and seasonal trends
- Interactive tooltips with exact values

### 2. Cost Breakdown Pie Chart

- Visual distribution of different cost types
- Product costs, fixed costs, and profit margins
- Color-coded for easy understanding

### 3. Revenue vs Cost Bar Chart

- Direct comparison of revenue, total cost, and profit
- Quick visual assessment of business viability
- Clear profit/loss indication

## 🎨 Design Features

### Modern UI/UX

- **Clean Dashboard Design**: Professional, minimal interface
- **Responsive Layout**: Works on desktop, tablet, and mobile
- **Smooth Animations**: Fade-in, slide-in, and hover effects
- **Color-coded Metrics**: Green for profit, red for costs, blue for revenue
- **Interactive Elements**: Hover effects and smooth transitions

### Accessibility

- **Keyboard Navigation**: Full keyboard support
- **Screen Reader Friendly**: Proper ARIA labels and semantic HTML
- **High Contrast**: Clear visual hierarchy and readable text
- **Mobile Optimized**: Touch-friendly interface

## 🔧 Customization

### Adding New Metrics

```typescript
// Add to BusinessResults interface
interface BusinessResults {
  // ... existing metrics
  newMetric: number;
}

// Update calculation function
const calculateBusinessMetrics = (inputs: BusinessInputs): BusinessResults => {
  // ... existing calculations
  const newMetric = /* your calculation */;

  return {
    // ... existing results
    newMetric,
  };
};
```

### Custom Chart Types

```typescript
// Add new chart component
import { AreaChart, Area } from "recharts";

// Use in component
<AreaChart data={chartData}>
  <Area dataKey="value" fill="#8884d8" />
</AreaChart>;
```

## 🚀 Deployment

### Vercel (Recommended)

1. Connect your GitHub repository to Vercel
2. Deploy automatically on every push
3. Custom domain support

### Netlify

1. Build the project: `npm run build`
2. Deploy the `dist` folder to Netlify
3. Configure redirects for SPA routing

### Traditional Hosting

1. Run `npm run build`
2. Upload the `dist` folder to your web server
3. Configure server for SPA routing

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit changes: `git commit -am 'Add new feature'`
4. Push to branch: `git push origin feature/new-feature`
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support, email support@bizcalc-ai.com or create an issue in the repository.

## 🔮 Future Enhancements

### Planned Features

- **AI Suggestions**: Machine learning recommendations for improving profitability
- **Multiple Business Comparison**: Side-by-side analysis of different ideas
- **Industry Templates**: Pre-configured templates for common business types
- **Predictive Analysis**: What-if scenarios and sensitivity analysis
- **Team Collaboration**: Share and collaborate on business plans
- **Advanced Reporting**: PDF reports with detailed analysis
- **Mobile App**: Native iOS and Android applications

### Advanced Analytics

- **Scenario Planning**: Multiple what-if scenarios
- **Sensitivity Analysis**: Impact of changing key variables
- **Market Research Integration**: Real market data integration
- **Competitive Analysis**: Compare with industry benchmarks

---

**Built with ❤️ for entrepreneurs and business enthusiasts**
