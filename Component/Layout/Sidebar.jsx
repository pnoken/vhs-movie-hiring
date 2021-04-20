import React, {useState} from 'react'
import * as FaIcons from 'react-icons/fa'
import * as AiIcons from 'react-icons/ai'
import Link from 'next/link'
import { SidebarData } from './SidebarData'
import { IconContext } from 'react-icons';

function Sidebar() {
  const [ sidebar, setSidebar ] = useState(false)

  const showSidebar = () => setSidebar(!sidebar)
  return (
    <>
    <IconContext.Provider value={{ color: '#fff' }}>
        <div className='navbar'>
          <Link href='#'>
            <a className='menu-bars'>
            <FaIcons.FaBars onClick={showSidebar} />
            </a>
          </Link>
          <Link href="/">
          <a className="text-light">
            HomePage
          </a>
          </Link>
        </div>
        <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
          <ul className='nav-menu-items' onClick={showSidebar}>
            <li className='navbar-toggle'>
              <Link href='#'>
                <a className='menu-bars'>
                <AiIcons.AiOutlineClose />
                </a>
              </Link>
            </li>
            {SidebarData.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <Link href={item.path}>
                    <a>
                    {item.icon}
                    <span>{item.title}</span>
                    </a>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  )
}

export default Sidebar