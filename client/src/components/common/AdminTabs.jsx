import React from 'react'

const AdminTabs = () => {
  return (
    <div className='container-fluid mt-2'>
        <ul class="nav justify-content-center nav-tabs">
            <li class="nav-item">
                <a className="nav-link" href={'#'}>Add Admin</a>
            </li>
            <li className="nav-item">
                <a className="nav-link" href={'#'}>Add Company</a>
            </li>
            <li className="nav-item">
                <a className="nav-link" href={'#'}>View Users</a>
            </li>
        </ul>
    </div>
  )
}

export default AdminTabs