"use client";

import Link from 'next/link'
import { useSession } from 'next-auth/react';

export default function Home() {
  const { data: session } = useSession();

  const createTestUsers = async () => {
    try {
      // Run the seed script
      const response = await fetch('/api/seed', {
        method: 'POST',
      });

      if (response.ok) {
        alert('Test users created successfully! You can now sign in with:\n\nAdmin: admin@example.com / password\nEmployer: client@example.com / password\nJob Seeker: seeker@example.com / password');
      } else {
        alert('Error creating test users');
      }
    } catch (error) {
      alert('Error creating users');
    }
  };

  if (!session) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Experience A Better Way to Hire
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Looking to hire high-performing employees and exceptional leaders? With over 20 years of experience, our recruitment firm specializes in quickly headhunting, evaluating, and placing top-tier talent for you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/auth/signin?role=employer"
                className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                I'm an Employer
              </Link>
              <Link
                href="/auth/signin?role=seeker"
                className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
              >
                I'm a Job Seeker
              </Link>
              <button
                onClick={createTestUsers}
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
              >
                Create Test Users
              </button>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12">Our Services</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center p-6 border rounded-lg hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-semibold mb-4">Executive Search</h3>
                <p className="text-gray-600 mb-4">Headhunt top-tier leaders and executives capable of propelling your organization forward.</p>
                <Link href="/contracts/new" className="text-blue-600 hover:text-blue-800">Begin Hiring →</Link>
              </div>
              <div className="text-center p-6 border rounded-lg hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-semibold mb-4">Direct Hire</h3>
                <p className="text-gray-600 mb-4">Access entry-level and mid-management professionals who are the best at what they do.</p>
                <Link href="/contracts/new" className="text-blue-600 hover:text-blue-800">Begin Hiring →</Link>
              </div>
              <div className="text-center p-6 border rounded-lg hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-semibold mb-4">Recruitment Process Outsourcing</h3>
                <p className="text-gray-600 mb-4">Outsource full-cycle, project-based, or hybrid hiring to our expert recruiters for fast, flexible talent solutions.</p>
                <Link href="/contracts/new" className="text-blue-600 hover:text-blue-800">Begin Hiring →</Link>
              </div>
            </div>
          </div>
        </section>

        {/* Recruitment Areas */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12">Recruitment Areas of Expertise</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                'Human Resources',
                'Accounting',
                'Sales & Business Development',
                'Operations & Manufacturing',
                'IT',
                'Supply Chain & Logistics',
                'Marketing',
                'Engineering',
                'Finance'
              ].map((area) => (
                <div key={area} className="text-center p-4 border rounded-lg hover:shadow-md transition-shadow">
                  <h3 className="font-semibold">{area}</h3>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Partnership Benefits */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12">Partnership Benefits</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                'Salary Analysis - We\'ll analyze the cost of a new hire, at the skill-level you require.',
                'Job Descriptions - Access professionally written job descriptions to attract the best candidates.',
                'Sourcing - Our expert recruiters source for you, recruiting and headhunting to find the perfect fit.',
                'Resume Vetting - Benefit from expert resume vetting to ensure top-tier talent.',
                'Selection Consulting - Choosing who to hire is stressful, we help our customers hire with confidence.'
              ].map((benefit, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex-shrink-0 mt-1"></div>
                  <p className="text-gray-700">{benefit}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-800 text-white py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p>&copy; 2025 Recruiter App. All rights reserved.</p>
          </div>
        </footer>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Recruiter Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Link
            href="/contracts/new"
            className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow"
          >
            <h2 className="text-xl font-semibold mb-2">Post New Job</h2>
            <p className="text-gray-600">Create a new job posting for candidates</p>
          </Link>

          <Link
            href="/contracts"
            className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow"
          >
            <h2 className="text-xl font-semibold mb-2">View All Jobs</h2>
            <p className="text-gray-600">Manage job postings and applications</p>
          </Link>

          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-2">Statistics</h2>
            <p className="text-gray-600">View hiring statistics and metrics</p>
          </div>
        </div>
      </div>
    </div>
  )
}
