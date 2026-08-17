import React from 'react'
import { NavLink } from 'react-router-dom'
import {
  FiHome,
  FiPlusSquare,
  FiList,
  FiMessageCircle,
  FiGrid
} from 'react-icons/fi'

const Sidebar = () => {

  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-64 cursor-pointer transition-all duration-200
    ${isActive
      ? "bg-primary/10 border-r-4 border-primary text-primary"
      : "text-primary/70 hover:bg-primary/5"
    }`

  return (
    <div className='flex flex-col border-r border-gray-200 min-h-full pt-6'>

      {/* Dashboard */}
      <NavLink end to={'/admin'} className={linkClass}>
        <FiGrid className='text-xl text-primary' />
        <p className='hidden md:inline-block text-white'>Dashboard</p>
      </NavLink>

      {/* Add Blog */}
      <NavLink to={'/admin/addBlog'} className={linkClass}>
        <FiPlusSquare className='text-xl text-primary' />
        <p className='hidden md:inline-block text-white'>Add Blogs</p>
      </NavLink>
      <NavLink to={'/admin/addCategory'} className={linkClass}>
        <FiPlusSquare className='text-xl text-primary' />
        <p className='hidden md:inline-block text-white'>Add Category</p>
      </NavLink>

      {/* List Blog */}
      <NavLink to={'/admin/listBlog'} className={linkClass}>
        <FiList className='text-xl text-primary' />
        <p className='hidden md:inline-block text-white'>List Blogs</p>
      </NavLink>

      {/* Comments */}
      <NavLink to={'/admin/comments'} className={linkClass}>
        <FiMessageCircle className='text-xl text-primary' />
        <p className='hidden md:inline-block text-white'>Comments</p>
      </NavLink>

      <NavLink to={'/'} className={linkClass}>
        <FiHome className='text-xl text-primary' />
        <p className='hidden md:inline-block text-white'>Home</p>
      </NavLink>

    </div>
  )
}

export default Sidebar