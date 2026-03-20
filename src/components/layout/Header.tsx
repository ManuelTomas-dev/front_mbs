'use client'

import { Bell, Mail, ChevronDown } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

export function Header() {
  const [showUserMenu, setShowUserMenu] = useState(false)

  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Left section - empty */}
        <div />

        {/* Right section - notifications and user */}
        <div className="flex items-center gap-6">
          {/* Notification bell */}
          <button className="relative text-gray-600 hover:text-gray-900">
            <Bell size={20} />
          </button>

          {/* Mail notification */}
          <button className="relative text-gray-600 hover:text-gray-900">
            <div className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white font-bold">
              9
            </div>
            <Mail size={20} />
          </button>

          {/* User profile dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center gap-3 rounded-lg px-3 py-2 hover:bg-gray-50"
            >
              <img
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop"
                alt="User avatar"
                className="h-8 w-8 rounded-full"
              />
              <span className="text-sm font-medium text-gray-900">João Silva</span>
              <ChevronDown size={16} className="text-gray-400" />
            </button>

            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-48 rounded-lg border border-gray-200 bg-white shadow-lg">
                <div className="p-4 border-b border-gray-200">
                  <p className="text-sm font-medium text-gray-900">João Silva</p>
                  <p className="text-xs text-gray-500">Procurement Manager</p>
                </div>
                <nav className="p-2">
                  <Link
                    href="#"
                    className="block rounded-md px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
                  >
                    Profile
                  </Link>
                  <Link
                    href="#"
                    className="block rounded-md px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
                  >
                    Settings
                  </Link>
                  <Link
                    href="#"
                    className="block rounded-md px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
                  >
                    Logout
                  </Link>
                </nav>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
