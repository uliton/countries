import React from "react";
import { useSelector } from "react-redux";
import classNames from 'classnames';

export const Footer = () => {
  const mode = useSelector((state: State) => state.mode);

  return (
    <footer className={classNames('footer', {
      'footer--dark': mode === 'dark',
      'footer--light': mode === 'light'}
    )}>
      Created by Uliton&copy;
    </footer>
  );
};
