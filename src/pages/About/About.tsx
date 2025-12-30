import { Code, Users, Target } from 'lucide-react';
import Card from '../../components/ui/Card';

const About = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            About SentryOps
          </h1>
          <p className="text-xl text-gray-600">
            A modern web application demonstrating professional development practices
            with React, TypeScript, Tailwind CSS, and React Router.
          </p>
        </div>

        {/* Tech Stack */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">Technology Stack</h2>
          <Card>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-semibold mb-3">Frontend</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>React 18 with TypeScript</li>
                  <li>Vite for build tooling</li>
                  <li>Tailwind CSS for styling</li>
                  <li>React Router v6 for navigation</li>
                  <li>Lucide React for icons</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-3">Development</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>TypeScript for type safety</li>
                  <li>ES Modules</li>
                  <li>Hot Module Replacement</li>
                  <li>Component-based architecture</li>
                  <li>Responsive design patterns</li>
                </ul>
              </div>
            </div>
          </Card>
        </div>

        {/* Values Section */}
        <div>
          <h2 className="text-3xl font-bold text-center mb-8">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <div className="text-center">
                <Code className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Clean Code</h3>
                <p className="text-gray-600">
                  Writing maintainable, scalable, and well-documented code that stands the test of time.
                </p>
              </div>
            </Card>

            <Card>
              <div className="text-center">
                <Users className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">User Focused</h3>
                <p className="text-gray-600">
                  Designing intuitive interfaces that prioritize user experience and accessibility.
                </p>
              </div>
            </Card>

            <Card>
              <div className="text-center">
                <Target className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Best Practices</h3>
                <p className="text-gray-600">
                  Following industry standards and modern development patterns for optimal results.
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
