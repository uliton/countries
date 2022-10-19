import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import classNames from 'classnames';
import moon_dm from '../../images/icons/moon_dm.svg'
import moon_lm from '../../images/icons/moon_lm.svg'

export const Header = () => {
  const dispatch = useDispatch();
  const [icon, setIcon] = useState<string>('');
  const mode = useSelector((state: State) => state.mode);

  useEffect(() => {
    if (mode === 'light') {
      setIcon(moon_lm);
    }

    if (mode === 'dark') {
      setIcon(moon_dm);
    }
  }, [mode]);

  const handeChangeMode = () => {
    if (mode === 'light') {
      dispatch({ type: 'DARK'});
    }

    if (mode === 'dark') {
      dispatch({ type: 'LIGHT'});
    }
  }

  return (
    <div className={classNames('header', {'header--dark': mode === 'dark', 'header--light': mode === 'light'})}>
      <div className="container">
        <div className="header__container">
          <div className="header__text">
            Where in the world?
          </div>

          <button
            type="button"
            className={classNames('header__mode', 'mode', {'mode--dark': mode === 'dark', 'mode--light': mode === 'light'})}
            title="Click to change Mode"
            onClick={handeChangeMode}
          >
            <img src={icon} alt="moon" className="mode__image"/>
            <p>Dark Mode</p>
          </button>
        </div>
      </div>
    </div>
  );
};
