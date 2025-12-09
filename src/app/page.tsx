"use client";

import Link from 'next/link'
import { useSession } from 'next-auth/react';

export default function Home() {
  const { data: session } = useSession();

  const createTestUsers = async () => {
    try {
      await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: 'admin@example.com',
          password: 'password',
          name: 'Admin User',
          role: 'admin'
        })
      });

      await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: 'client@example.com',
          password: 'password',
          name: 'Client User',
          role: 'client'
        })
      });

      alert('Test users created!');
    } catch (error) {
      alert('Error creating users');
    }
  };

  if (!session) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl font-bold mb-8">Recruiter Dashboard</h1>
          <p className="text-gray-600 mb-8">Please sign in to access the application.</p>
          <button
            onClick={createTestUsers}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md mr-4"
          >
            Create Test Users
          </button>
        </div>
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
