import { Link } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import { useState } from 'react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const navigationSections = {
    command: [
      { to: '/command/dashboard', label: 'Dashboard' },
      { to: '/command/personnel', label: 'Personnel Overview' },
      { to: '/command/orgchart', label: 'Org Chart' },
      { to: '/command/approvals', label: 'Approvals' },
      { to: '/command/budget', label: 'Budget & Resources' },
      { to: '/command/reports', label: 'Reports & Analytics' },
      { to: '/command/alerts', label: 'Alerts' },
      { to: '/command/settings', label: 'Settings' },
    ],
    jail: [
      { to: '/jail/dashboard', label: 'Jail Operations' },
      { to: '/jail/inmates', label: 'Inmate Management' },
      { to: '/jail/booking', label: 'Booking & Processing' },
      { to: '/jail/incidents', label: 'Incident Reports' },
      { to: '/jail/medical', label: 'Medical Management' },
    ],
    patrol: [
      { to: '/patrol/cad', label: 'CAD Dispatch' },
      { to: '/patrol/units', label: 'Unit Management' },
    ],
    criminalInvestigations: [
      { to: '/investigations/cases', label: 'Active Cases Dashboard' },
    ],
    hr: [
      { to: '/hr/dashboard', label: 'Dashboard' },
      { to: '/hr/pipeline', label: 'Hiring Pipeline' },
      { to: '/hr/jobs', label: 'Job Postings' },
      { to: '/hr/pipeline', label: 'Hiring Pipeline' },
      { to: '/hr/onboarding', label: 'New Hire Onboarding' },
      { to: '/hr/records', label: 'Employee Records' },
      { to: '/hr/timeoff', label: 'Time Off Management' },
      { to: '/hr/reviews', label: 'Performance Reviews' },
      { to: '/hr/training', label: 'Training & Certifications' },
      { to: '/hr/compliance', label: 'Compliance Management' },
      { to: '/hr/reports', label: 'Reports' },
      { to: '/hr/settings', label: 'Settings' },
    ],
    backgroundInvestigations: [
      { to: '/investigations/dashboard', label: 'Investigations Command Overview' },
      { to: '/investigations/active', label: 'Open Investigations' },
      { to: '/investigations/cases', label: 'Investigation Case Files' },
      { to: '/investigations/timeline', label: 'Case Activity & Audit Log' },
      { to: '/investigations/subjects', label: 'Applicant Records' },
      { to: '/investigations/interviews', label: 'Interview Coordination' },
      { to: '/investigations/evidence', label: 'Documentation & Evidence' },
      { to: '/investigations/references', label: 'Reference Verification' },
      { to: '/investigations/employment', label: 'Employment Confirmation' },
      { to: '/investigations/criminal', label: 'Criminal Record Adjudication' },
      { to: '/investigations/financial', label: 'Financial Risk Review' },
      { to: '/investigations/social', label: 'Digital Footprint Review' },
      { to: '/investigations/reports', label: 'Adjudication Reports' },
      { to: '/investigations/closure', label: 'Final Determinations' },
    ],
  };

  const handleDropdownToggle = (section: string) => {
    setOpenDropdown(openDropdown === section ? null : section);
  };

  return (
    <header className="bg-white shadow-sm">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold text-blue-600">
            SentryOps
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            <Link
              to="/"
              className="px-4 py-2 text-gray-700 hover:text-blue-600 transition-colors"
            >
              Home
            </Link>

            {/* Command Dropdown */}
            <div className="relative group">
              <button className="px-4 py-2 text-gray-700 hover:text-blue-600 transition-colors flex items-center">
                Command <ChevronDown size={16} className="ml-1" />
              </button>
              <div className="absolute left-0 mt-2 w-56 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="py-2">
                  {navigationSections.command.map((link) => (
                    <Link
                      key={link.to}
                      to={link.to}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Jail Operations Dropdown */}
            <div className="relative group">
              <button className="px-4 py-2 text-gray-700 hover:text-blue-600 transition-colors flex items-center">
                Jail Operations <ChevronDown size={16} className="ml-1" />
              </button>
              <div className="absolute left-0 mt-2 w-56 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="py-2">
                  {navigationSections.jail.map((link) => (
                    <Link
                      key={link.to}
                      to={link.to}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Patrol Operations Dropdown */}
            <div className="relative group">
              <button className="px-4 py-2 text-gray-700 hover:text-blue-600 transition-colors flex items-center">
                Patrol <ChevronDown size={16} className="ml-1" />
              </button>
              <div className="absolute left-0 mt-2 w-56 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="py-2">
                  {navigationSections.patrol.map((link) => (
                    <Link
                      key={link.to}
                      to={link.to}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Criminal Investigations Dropdown */}
            <div className="relative group">
              <button className="px-4 py-2 text-gray-700 hover:text-blue-600 transition-colors flex items-center">
                Criminal Invest. <ChevronDown size={16} className="ml-1" />
              </button>
              <div className="absolute left-0 mt-2 w-56 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="py-2">
                  {navigationSections.criminalInvestigations.map((link) => (
                    <Link
                      key={link.to}
                      to={link.to}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* HR Dropdown */}
            <div className="relative group">
              <button className="px-4 py-2 text-gray-700 hover:text-blue-600 transition-colors flex items-center">
                HR <ChevronDown size={16} className="ml-1" />
              </button>
              <div className="absolute left-0 mt-2 w-56 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="py-2">
                  {navigationSections.hr.map((link) => (
                    <Link
                      key={link.to}
                      to={link.to}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Background Investigations Dropdown */}
            <div className="relative group">
              <button className="px-4 py-2 text-gray-700 hover:text-blue-600 transition-colors flex items-center">
                Background Invest. <ChevronDown size={16} className="ml-1" />
              </button>
              <div className="absolute left-0 mt-2 w-64 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="py-2">
                  {navigationSections.backgroundInvestigations.map((link) => (
                    <Link
                      key={link.to}
                      to={link.to}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <Link
              to="/about"
              className="px-4 py-2 text-gray-700 hover:text-blue-600 transition-colors"
            >
              About
            </Link>

            <Link
              to="/signin"
              className="ml-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Sign In
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden mt-4 space-y-2">
            <Link
              to="/"
              className="block py-2 text-gray-700 hover:text-blue-600 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>

            {/* Mobile Command Section */}
            <div>
              <button
                onClick={() => handleDropdownToggle('command')}
                className="w-full flex items-center justify-between py-2 text-gray-700 hover:text-blue-600 transition-colors"
              >
                Command
                <ChevronDown
                  size={16}
                  className={`transform transition-transform ${
                    openDropdown === 'command' ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {openDropdown === 'command' && (
                <div className="pl-4 space-y-2 mt-2">
                  {navigationSections.command.map((link) => (
                    <Link
                      key={link.to}
                      to={link.to}
                      className="block py-2 text-sm text-gray-600 hover:text-blue-600"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Mobile Jail Operations Section */}
            <div>
              <button
                onClick={() => handleDropdownToggle('jail')}
                className="w-full flex items-center justify-between py-2 text-gray-700 hover:text-blue-600 transition-colors"
              >
                Jail Operations
                <ChevronDown
                  size={16}
                  className={`transform transition-transform ${
                    openDropdown === 'jail' ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {openDropdown === 'jail' && (
                <div className="pl-4 space-y-2 mt-2">
                  {navigationSections.jail.map((link) => (
                    <Link
                      key={link.to}
                      to={link.to}
                      className="block py-2 text-sm text-gray-600 hover:text-blue-600"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Mobile Patrol Operations Section */}
            <div>
              <button
                onClick={() => handleDropdownToggle('patrol')}
                className="w-full flex items-center justify-between py-2 text-gray-700 hover:text-blue-600 transition-colors"
              >
                Patrol Operations
                <ChevronDown
                  size={16}
                  className={`transform transition-transform ${
                    openDropdown === 'patrol' ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {openDropdown === 'patrol' && (
                <div className="pl-4 space-y-2 mt-2">
                  {navigationSections.patrol.map((link) => (
                    <Link
                      key={link.to}
                      to={link.to}
                      className="block py-2 text-sm text-gray-600 hover:text-blue-600"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Mobile Criminal Investigations Section */}
            <div>
              <button
                onClick={() => handleDropdownToggle('criminalInvestigations')}
                className="w-full flex items-center justify-between py-2 text-gray-700 hover:text-blue-600 transition-colors"
              >
                Criminal Investigations
                <ChevronDown
                  size={16}
                  className={`transform transition-transform ${
                    openDropdown === 'criminalInvestigations' ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {openDropdown === 'criminalInvestigations' && (
                <div className="pl-4 space-y-2 mt-2">
                  {navigationSections.criminalInvestigations.map((link) => (
                    <Link
                      key={link.to}
                      to={link.to}
                      className="block py-2 text-sm text-gray-600 hover:text-blue-600"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Mobile HR Section */}
            <div>
              <button
                onClick={() => handleDropdownToggle('hr')}
                className="w-full flex items-center justify-between py-2 text-gray-700 hover:text-blue-600 transition-colors"
              >
                HR
                <ChevronDown
                  size={16}
                  className={`transform transition-transform ${
                    openDropdown === 'hr' ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {openDropdown === 'hr' && (
                <div className="pl-4 space-y-2 mt-2">
                  {navigationSections.hr.map((link) => (
                    <Link
                      key={link.to}
                      to={link.to}
                      className="block py-2 text-sm text-gray-600 hover:text-blue-600"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Mobile Background Investigations Section */}
            <div>
              <button
                onClick={() => handleDropdownToggle('backgroundInvestigations')}
                className="w-full flex items-center justify-between py-2 text-gray-700 hover:text-blue-600 transition-colors"
              >
                Background Investigations
                <ChevronDown
                  size={16}
                  className={`transform transition-transform ${
                    openDropdown === 'backgroundInvestigations' ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {openDropdown === 'backgroundInvestigations' && (
                <div className="pl-4 space-y-2 mt-2">
                  {navigationSections.backgroundInvestigations.map((link) => (
                    <Link
                      key={link.to}
                      to={link.to}
                      className="block py-2 text-sm text-gray-600 hover:text-blue-600"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              to="/about"
              className="block py-2 text-gray-700 hover:text-blue-600 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>

            <Link
              to="/signin"
              className="block py-2 text-blue-600 font-semibold hover:text-blue-700 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Sign In
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
