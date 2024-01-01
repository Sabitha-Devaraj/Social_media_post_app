import React from 'react'

const Header = ({title}) => {
  return (
    <header className='Header'>
        {title}
    </header>
  )
}

Header.defaultProps = {
  title : 'Social Media App'
}

export default Header