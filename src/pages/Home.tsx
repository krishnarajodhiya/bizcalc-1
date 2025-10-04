import { Link } from "react-router-dom";
import { ArrowRight, Calculator, TrendingUp, DollarSign } from "lucide-react";
import { motion } from "framer-motion";
import CountUp from "react-countup";

export const Home = () => {
  const features = [
    {
      icon: Calculator,
      title: "BizCalc",
      description:
        "Calculate profit, revenue, ROI, and breakeven points for any business idea with our intelligent calculator.",
    },
    {
      icon: TrendingUp,
      title: "Financial Analysis",
      description:
        "Get detailed insights into your business metrics with visual charts and comprehensive reports.",
    },
    {
      icon: DollarSign,
      title: "Smart Calculations",
      description:
        "Advanced algorithms calculate profit margins, ROI, and breakeven analysis automatically.",
    },
  ];

  const stats = [
    { label: "Business Ideas", value: 1000, suffix: "+" },
    { label: "Calculations", value: 10000, suffix: "+" },
    { label: "Users", value: 500, suffix: "+" },
    { label: "Success Rate", value: 95, suffix: "%" },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1
              className="text-4xl md:text-6xl font-bold text-white dark:text-gray-100 font-poppins mb-6"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              Welcome to{" "}
              <span className="text-yellow-300 dark:text-yellow-400 animate-glow">
                BizCalc
              </span>
            </motion.h1>
            <motion.p
              className="text-xl text-white/90 dark:text-gray-200 mb-8 max-w-3xl mx-auto font-inter"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              The ultimate Business Idea Calculator. Calculate profit, revenue,
              ROI, and breakeven points for any business idea with intelligent
              financial analysis and visual insights.
            </motion.p>
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Link
                to="/bizcalc"
                className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-white/20 backdrop-blur-sm hover:bg-white/30 btn-glow transition-all duration-300"
              >
                Start Calculating
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                to="/about"
                className="inline-flex items-center px-8 py-3 border border-white/30 text-base font-medium rounded-lg text-white bg-transparent hover:bg-white/10 btn-glow transition-all duration-300"
              >
                Learn More
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="text-center glass-card p-6 rounded-xl shadow-lg animate-float"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <motion.div
                  className="text-4xl font-bold mb-2 text-white dark:text-gray-100 font-poppins"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
                  viewport={{ once: true }}
                >
                  <CountUp
                    end={stat.value}
                    duration={2}
                    delay={index * 0.1}
                    suffix={stat.suffix}
                  />
                </motion.div>
                <div className="text-lg font-medium text-white/80 dark:text-gray-300 font-inter">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-white dark:text-gray-100 font-poppins mb-4">
              Why Choose BizCalc?
            </h2>
            <p className="text-xl text-white/80 dark:text-gray-300 max-w-2xl mx-auto font-inter">
              Make data-driven business decisions with our intelligent
              calculator that provides comprehensive financial analysis and
              insights.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  className="glass-card p-8 rounded-xl shadow-lg hover:scale-105 transition-all duration-300"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                >
                  <div className="flex items-center justify-center w-12 h-12 bg-yellow-300/20 dark:bg-yellow-400/20 rounded-lg mb-4">
                    <Icon className="h-6 w-6 text-yellow-300 dark:text-yellow-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-white dark:text-gray-100 font-poppins mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-white/80 dark:text-gray-300 font-inter">
                    {feature.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-white dark:text-gray-100 font-poppins mb-4">
              Ready to calculate your business success?
            </h2>
            <p className="text-xl text-white/80 dark:text-gray-300 mb-8 max-w-2xl mx-auto font-inter">
              Join hundreds of entrepreneurs who are already making smarter
              business decisions with BizCalc's intelligent financial analysis.
            </p>
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Link
                to="/bizcalc"
                className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-lg text-blue-600 bg-white hover:bg-gray-50 btn-glow transition-all duration-300"
              >
                Start Calculating
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                to="/about"
                className="inline-flex items-center px-8 py-3 border border-white/30 text-base font-medium rounded-lg text-white bg-transparent hover:bg-white/10 btn-glow transition-all duration-300"
              >
                Learn More
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};
