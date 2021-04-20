import React from 'react'
import * as AiIcons from 'react-icons/ai'
import * as GiIcons from 'react-icons/gi'

export const SidebarData = [
    {
        title: 'Home',
        icon: <AiIcons.AiFillHome />,
        cName: 'nav-text',
        path: '/admin',
    },
    {
        title: 'Users',
        icon: <AiIcons.AiFillHome />,
        cName: 'nav-text',
        path: '/admin/users',
    },
    {
        title: 'Movie Selections',
        icon: <GiIcons.GiBomber />,
        cName: 'nav-text',
        path: '/admin/user/meals',
    },
    {
        title: 'Movies',
        icon: <GiIcons.GiBomber />,
        cName: 'nav-text',
        path: '/admin/movies'
    }
]