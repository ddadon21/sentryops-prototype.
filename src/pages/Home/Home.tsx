import { ArrowRight, Zap, Shield, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';

const Home = () => {
  const features = [
    {
      icon: <Zap className="w-12 h-12 text-blue-600" />,
      title: 'Fast Performance',
      description: 'Built with Vite for lightning-fast development and optimized production builds.',
    },
    {
      icon: <Shield className="w-12 h-12 text-blue-600" />,
      title: 'Type Safe',
      description: 'TypeScript integration ensures code quality and developer productivity.',
    },
    {
      icon: <Globe className="w-12 h-12 text-blue-600" />,
      title: 'Modern Stack',
      description: 'React 18, Tailwind CSS, and React Router for a cutting-edge development experience.',
    },
  ];

  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Welcome to SentryOps
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            A professional web application built with modern technologies and best practices.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/dashboard">
              <Button size="lg">
                Get Started <ArrowRight className="inline ml-2" size={20} />
              </Button>
            </Link>
            <Link to="/about">
              <Button variant="outline" size="lg">
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index}>
              <div className="flex flex-col items-center text-center">
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl mb-8">
            Explore the dashboard and see what SentryOps can do for you.
          </p>
          <Link to="/dashboard">
            <Button variant="outline" size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
              Go to Dashboard
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
