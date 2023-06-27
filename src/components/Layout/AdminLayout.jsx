import React from 'react'
import { Outlet } from 'react-router'
import AdminNavbar from '../Navbar/AdminNavbar'
import Aside from '../Admin/Aside'
import AdminRoute from '../Routes/AdminRoute'

function AdminLayout() {
  return (
    <div className="min-w-full min-h-[694px] ">
      <AdminNavbar/>
      <div className='box-border border-2 min-h-[600px] flex'>
      <Aside/>
      <AdminRoute>
      <Outlet/>
      </AdminRoute>
      </div>
    </div>
  )
}

export default AdminLayout
