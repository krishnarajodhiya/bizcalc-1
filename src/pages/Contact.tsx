import { useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  CheckCircle,
  MessageSquare,
  User,
  Mail as MailIcon,
} from "lucide-react";

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitted(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
    }, 1000);
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      value: "hello@reactapp.com",
      description: "Send us an email anytime",
    },
    {
      icon: Phone,
      title: "Phone",
      value: "+1 (555) 123-4567",
      description: "Mon-Fri from 8am to 5pm",
    },
    {
      icon: MapPin,
      title: "Office",
      value: "123 Tech Street",
      description: "San Francisco, CA 94105",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="h-16 w-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <MessageSquare className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white dark:text-gray-100 font-poppins mb-6">
              Get in{" "}
              <span className="text-yellow-300 dark:text-yellow-400">
                Touch
              </span>
            </h1>
            <p className="text-xl text-white/90 dark:text-gray-200 mb-8 max-w-3xl mx-auto font-inter">
              Have a question or want to work together? We'd love to hear from
              you. Send us a message and we'll respond as soon as possible.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-20">
        <div className="flex justify-center items-center min-h-[60vh]">
          <div className="w-full max-w-2xl">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="h-16 w-16 bg-gradient-to-r from-indigo-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Send className="h-8 w-8 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-white dark:text-gray-100 font-poppins mb-4">
                Send us a message
              </h2>
              <p className="text-lg text-white/80 dark:text-gray-300 font-inter mb-8">
                We're here to help and answer any question you might have.
              </p>
            </div>

            {/* Centered Card with Contact Form */}
            <div className="glass-card rounded-2xl p-8 shadow-2xl">
              <h3 className="text-2xl font-semibold text-white dark:text-gray-100 font-poppins mb-8 text-center">
                Contact Details
              </h3>

              {isSubmitted ? (
                <div className="text-center">
                  <div className="h-16 w-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="h-8 w-8 text-green-400" />
                  </div>
                  <h3 className="text-2xl font-semibold text-white dark:text-gray-100 mb-4">
                    Message sent successfully!
                  </h3>
                  <p className="text-white/80 dark:text-gray-300 text-lg">
                    We'll get back to you as soon as possible.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Name Field */}
                  <div className="flex items-center space-x-4 p-4 bg-white/5 dark:bg-black/20 rounded-xl border border-white/10 dark:border-gray-700/30">
                    <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center">
                      <User className="h-4 w-4 text-blue-400" />
                    </div>
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-white dark:text-gray-200 mb-2 font-inter">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-white/20 dark:border-gray-600/50 rounded-lg focus:ring-2 focus:ring-blue-500/50 focus:border-transparent bg-white/10 dark:bg-gray-800/50 backdrop-blur-sm text-white dark:text-gray-100 placeholder-white/60 dark:placeholder-gray-400 transition-all duration-300"
                        placeholder="Enter your full name"
                      />
                    </div>
                  </div>

                  {/* Email Field */}
                  <div className="flex items-center space-x-4 p-4 bg-white/5 dark:bg-black/20 rounded-xl border border-white/10 dark:border-gray-700/30">
                    <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center">
                      <MailIcon className="h-4 w-4 text-green-400" />
                    </div>
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-white dark:text-gray-200 mb-2 font-inter">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-white/20 dark:border-gray-600/50 rounded-lg focus:ring-2 focus:ring-green-500/50 focus:border-transparent bg-white/10 dark:bg-gray-800/50 backdrop-blur-sm text-white dark:text-gray-100 placeholder-white/60 dark:placeholder-gray-400 transition-all duration-300"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  {/* Subject Field */}
                  <div className="flex items-center space-x-4 p-4 bg-white/5 dark:bg-black/20 rounded-xl border border-white/10 dark:border-gray-700/30">
                    <div className="w-8 h-8 bg-orange-500/20 rounded-lg flex items-center justify-center">
                      <span className="text-orange-400 text-sm font-bold">
                        📝
                      </span>
                    </div>
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-white dark:text-gray-200 mb-2 font-inter">
                        Subject *
                      </label>
                      <input
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-white/20 dark:border-gray-600/50 rounded-lg focus:ring-2 focus:ring-orange-500/50 focus:border-transparent bg-white/10 dark:bg-gray-800/50 backdrop-blur-sm text-white dark:text-gray-100 placeholder-white/60 dark:placeholder-gray-400 transition-all duration-300"
                        placeholder="What's this about?"
                      />
                    </div>
                  </div>

                  {/* Message Field */}
                  <div className="flex items-start space-x-4 p-4 bg-white/5 dark:bg-black/20 rounded-xl border border-white/10 dark:border-gray-700/30">
                    <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center mt-2">
                      <MessageSquare className="h-4 w-4 text-purple-400" />
                    </div>
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-white dark:text-gray-200 mb-2 font-inter">
                        Your Message *
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={6}
                        className="w-full px-4 py-3 border border-white/20 dark:border-gray-600/50 rounded-lg focus:ring-2 focus:ring-purple-500/50 focus:border-transparent bg-white/10 dark:bg-gray-800/50 backdrop-blur-sm text-white dark:text-gray-100 placeholder-white/60 dark:placeholder-gray-400 transition-all duration-300 resize-none"
                        placeholder="Tell us more about your project or question..."
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-6">
                    <button
                      type="submit"
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 dark:from-green-500 dark:to-green-400 text-white py-4 px-8 rounded-xl font-semibold font-poppins text-lg hover:from-blue-700 hover:to-purple-700 dark:hover:from-green-600 dark:hover:to-green-500 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl dark:shadow-green-500/20 hover:shadow-green-500/30 flex items-center justify-center gap-3"
                    >
                      <Send className="h-5 w-5" />
                      <span>Send Message</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Information Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white dark:text-gray-100 font-poppins mb-4">
              Contact Information
            </h2>
            <p className="text-xl text-white/80 dark:text-gray-300 max-w-2xl mx-auto font-inter">
              Here are some common questions we receive.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {contactInfo.map((info, index) => {
              const Icon = info.icon;
              const colors = [
                {
                  bg: "bg-blue-500/20",
                  text: "text-blue-400",
                  border: "border-blue-200 dark:border-blue-800/30",
                },
                {
                  bg: "bg-green-500/20",
                  text: "text-green-400",
                  border: "border-green-200 dark:border-green-800/30",
                },
                {
                  bg: "bg-purple-500/20",
                  text: "text-purple-400",
                  border: "border-purple-200 dark:border-purple-800/30",
                },
              ];
              const color = colors[index % colors.length];

              return (
                <div
                  key={index}
                  className="glass-card rounded-2xl p-8 text-center hover:scale-105 transition-all duration-300"
                >
                  <div
                    className={`w-16 h-16 ${color.bg} rounded-full flex items-center justify-center mx-auto mb-6`}
                  >
                    <Icon className={`h-8 w-8 ${color.text}`} />
                  </div>
                  <h3 className="text-xl font-semibold text-white dark:text-gray-100 font-poppins mb-3">
                    {info.title}
                  </h3>
                  <p className="text-lg font-medium text-white/80 dark:text-gray-300 mb-2">
                    {info.value}
                  </p>
                  <p className="text-white/60 dark:text-gray-400">
                    {info.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white dark:text-gray-100 font-poppins mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-white/80 dark:text-gray-300 max-w-2xl mx-auto font-inter">
              Here are some common questions we receive.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="glass-card rounded-2xl p-8 hover:scale-105 transition-all duration-300">
              <h3 className="text-xl font-semibold text-white dark:text-gray-100 font-poppins mb-4">
                How quickly can you respond?
              </h3>
              <p className="text-white/80 dark:text-gray-300 font-inter">
                We typically respond to all inquiries within 24 hours during
                business days.
              </p>
            </div>

            <div className="glass-card rounded-2xl p-8 hover:scale-105 transition-all duration-300">
              <h3 className="text-xl font-semibold text-white dark:text-gray-100 font-poppins mb-4">
                Do you offer custom development?
              </h3>
              <p className="text-white/80 dark:text-gray-300 font-inter">
                Yes! We specialize in custom React applications tailored to your
                specific needs.
              </p>
            </div>

            <div className="glass-card rounded-2xl p-8 hover:scale-105 transition-all duration-300">
              <h3 className="text-xl font-semibold text-white dark:text-gray-100 font-poppins mb-4">
                What technologies do you use?
              </h3>
              <p className="text-white/80 dark:text-gray-300 font-inter">
                We use modern technologies including React, TypeScript, and
                cutting-edge web technologies.
              </p>
            </div>

            <div className="glass-card rounded-2xl p-8 hover:scale-105 transition-all duration-300">
              <h3 className="text-xl font-semibold text-white dark:text-gray-100 font-poppins mb-4">
                Do you provide ongoing support?
              </h3>
              <p className="text-white/80 dark:text-gray-300 font-inter">
                Absolutely! We offer comprehensive support and maintenance
                services for all our projects.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
