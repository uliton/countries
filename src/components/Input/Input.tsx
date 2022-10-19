import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import classNames from 'classnames';
import { DebounceInput } from 'react-debounce-input';
import search_dm from '../../images/icons/search_dm.svg';
import search_lm from '../../images/icons/search_lm.svg';

type Props = {
  query: string,
  setQuery: (_: string) => void,
}

export const Input: React.FC<Props> = ({ query, setQuery}) => {
  const [icon, setIcon] = useState<string>('');
  const mode = useSelector((state: State) => state.mode);

  useEffect(() => {
    if (mode === 'light') {
      setIcon(search_lm);
    }

    if (mode === 'dark') {
      setIcon(search_dm);
    }
  }, [mode]);

  return (
    <div className={classNames('input', {'input--dark': mode === 'dark', 'input--light': mode === 'light'})}>
      <label htmlFor="input" className="input__lable">
        <img src={icon} alt="search" className="input__image"/>
      </label>
        <DebounceInput
          id="input"
          type="text"
          placeholder="Search for a country..."
          autoComplete="off"
          className={classNames('input__input', {'input__input--dark': mode === 'dark', 'input__input--light': mode === 'light'})}
          value={query}
          debounceTimeout={1000}
          onChange={(event) => {
            setQuery(event.target.value);
          }}
        />
        
    </div>
  );
};
