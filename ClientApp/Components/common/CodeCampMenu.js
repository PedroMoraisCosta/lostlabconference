import React from 'react'
import { Link } from 'react-router-dom'

export default function CodeCampMenu (props) {
  //const [lastPath, setLastPath] = React.useState('/')
  const [isVisible, setIsVisible] = React.useState(false)
  const [cssProperties, setCSS] = React.useState({
    '--transform': 'translateY(-100%)'
  })

  const handleClick = e => {
    e.preventDefault()
    if (!isVisible) {
      setCSS({ '--transform': 'translateY(0%)' })
    } else {
      setCSS({ '--transform': 'translateY(-100%)' })
    }
    setIsVisible(!isVisible)
  }

  const setCssVisibility = e => {
    if (!isVisible) {
      setCSS({ '--transform': 'translateY(0%)' })
    } else {
      setCSS({ '--transform': 'translateY(-100%)' })
    }
    //  setLastPath(path);
    setIsVisible(!isVisible)
  }

  return (
    <div className='main-menu'>
      <div onClick={handleClick} className='header__open-button-mobile'>
        <a href='' className='js-open-main-menu'>
          <i className='fa fa-bars' />
        </a>
      </div>
      <ul className='header__menu-list js-menu' style={cssProperties}>
        <li className='close-button-mobile snow-bg'>
          <a onClick={setCssVisibility} className='js-close-main-menu'>
            <i className='fa fa-remove' />
          </a>
        </li>
        <li className='snow-bg'>
          <Link to='/customers' onClick={setCssVisibility}>
            Clientes
          </Link>
        </li>
        <li className='snow-bg'>
          <Link to='/services' onClick={setCssVisibility}>
            Servicos
          </Link>
        </li>

        {/* <li className="snow-bg">
          <Link to='/Home' onClick={setCssVisibility}>
            Produtos
          </Link>
        </li> */}
        <li className='snow-bg'>
          <Link to='/booking' onClick={setCssVisibility}>
            Marcacoes
          </Link>
        </li>
        <li className='snow-bg'>
          <Link to='/calendar' onClick={setCssVisibility}>
            Calendario
          </Link>
        </li>
        <li className='snow-bg'>
          <Link to='/calendarweek' onClick={setCssVisibility}>
            Visao Semanal
          </Link>
        </li>
        <li className='snow-bg'>
          <Link to='/aniversarios' onClick={setCssVisibility}>
            Parabens
            {props.birthdayTotal > 0 ? (
              <button type='button' className='icon-button'>
                <span className='icon-button__badge'>
                  {props.birthdayTotal}
                </span>
              </button>
            ) : (
              <div className='emptyList'></div>
            )}
          </Link>
        </li>
        <li className='snow-bg'>
          <Link to='/analise' onClick={setCssVisibility}>
            Analise
          </Link>
        </li>
        <li className='snow-bg'>
          <Link to='/acompanhamento' onClick={setCssVisibility}>
            Acompanhamento
          </Link>
        </li>
        <li className='snow-bg'>
          <a
            href='https://www.weoinvoice.com/admin.php'
            onClick={setCssVisibility}
          >
            Faturas
          </a>
        </li>
        <li className='social-icon snow-bg'>
          <a href='https://www.facebook.com/Margarida-Arag%C3%A3o-cabeleireirosest%C3%A9tica-100236801356384/'>
            <i className='fa fa-facebook' aria-hidden='true'></i>
          </a>
        </li>
      </ul>
    </div>
  )
}
