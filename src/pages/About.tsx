import { CheckCircle, Code, Palette, Rocket } from "lucide-react";

export const About = () => {
  const technologies = [
    "React 18",
    "TypeScript",
    "Vite",
    "Tailwind CSS",
    "React Router",
    "Lucide React",
  ];

  const team = [
    {
      name: "John Doe",
      role: "Frontend Developer",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    },
    {
      name: "Jane Smith",
      role: "UI/UX Designer",
      image:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    },
    {
      name: "Mike Johnson",
      role: "Full Stack Developer",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 to-blue-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              About <span className="text-primary-600">ReactApp</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              We're passionate about creating modern, efficient, and beautiful
              web applications that provide exceptional user experiences.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Our Mission
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                To empower developers with modern tools and best practices that
                make building web applications faster, more reliable, and more
                enjoyable.
              </p>
              <p className="text-lg text-gray-600 mb-8">
                We believe in the power of clean code, thoughtful design, and
                continuous learning. Our goal is to help developers create
                applications that not only work well but also provide delightful
                user experiences.
              </p>
              <div className="flex flex-wrap gap-4">
                {technologies.map((tech, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-4 py-2 bg-primary-100 text-primary-800 rounded-full text-sm font-medium"
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    {tech}
                  </span>
                ))}
              </div>
            </div>
            <div className="bg-gradient-to-br from-primary-500 to-blue-600 rounded-2xl p-8 text-white">
              <div className="grid grid-cols-2 gap-8">
                <div className="text-center">
                  <div className="text-3xl font-bold mb-2">100%</div>
                  <div className="text-primary-100">TypeScript</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold mb-2">⚡</div>
                  <div className="text-primary-100">Vite Powered</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold mb-2">🎨</div>
                  <div className="text-primary-100">Tailwind CSS</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold mb-2">🚀</div>
                  <div className="text-primary-100">Modern React</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Our Values
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              The principles that guide everything we do.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mx-auto mb-4">
                <Code className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Quality Code
              </h3>
              <p className="text-gray-600">
                We write clean, maintainable code that follows industry best
                practices and is thoroughly tested.
              </p>
            </div>

            <div className="text-center">
              <div className="flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mx-auto mb-4">
                <Palette className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Beautiful Design
              </h3>
              <p className="text-gray-600">
                We create interfaces that are not only functional but also
                visually appealing and user-friendly.
              </p>
            </div>

            <div className="text-center">
              <div className="flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mx-auto mb-4">
                <Rocket className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Performance
              </h3>
              <p className="text-gray-600">
                We optimize for speed and efficiency, ensuring our applications
                load quickly and run smoothly.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Meet Our Team
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              The talented individuals behind ReactApp.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div key={index} className="text-center">
                <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {member.name}
                </h3>
                <p className="text-primary-600 font-medium">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
