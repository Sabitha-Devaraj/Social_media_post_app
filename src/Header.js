import React, { useContext } from 'react'
import {FaMobileAlt, FaTabletAlt, FaLaptop} from 'react-icons/fa'
import DataContext from './context/DataContext'

const Header = ({title}) => {
  
  const {width} = useContext(DataContext)

  return (
    <header className='Header'>
      <h2>{title}</h2>
      {
        width <782 ? <FaMobileAlt/>
          : width <992 ? <FaTabletAlt/>
            : <FaLaptop/>
      }
    </header>
  )
}

Header.defaultProps = {
  title : 'Social Media App'
}

export default Header