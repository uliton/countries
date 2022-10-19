import React from "react";
import { useSelector } from "react-redux";
import classNames from 'classnames';

type Props = {
  country: Country,
  setCountryDetails: (_: Country) => void,
  setStatus: (_: boolean) => void,
  setQuery: (_: string) => void,
}

export const PreViewCountry: React.FC<Props> = ({ country, setCountryDetails, setStatus, setQuery }) => {
  const { flags, name, population, region, capital } = country;
  const mode = useSelector((state: State) => state.mode);

  const editedPopulation = String(population)
  .split('').reverse()
  .map((el, i) => {
    if (i > 0 && i % 3 === 0) {
      return `${el},`;
    }
    return el;
  })
  .reverse().join('');

  const handlerChange = () => {
    setCountryDetails(country);
    setStatus(true);
    setQuery('');
  }

  return (
    <div className="preview">
      <button
        type="button"
        className={classNames('preview__container',
          {
            'preview__container--dark': mode === 'dark',
            'preview__container--light': mode === 'light',
          }
        )}
        title="Click to more info"
        onClick={handlerChange}
      >
        <img
          src={flags.svg}
          alt="flag"
          className={classNames('preview__flag',
            {
              'preview__flag--dark': mode === 'dark',
              'preview__flag--light': mode === 'light',
            }
          )}
        />

        <div className="preview__info info">
          <p className="info__name">
            {name.common}
          </p>

          <span className="info__other-info">
            <div>
              <span className="info__other-info--title">
                Population:
              </span>
              {' '}
              {editedPopulation}
            </div>
            <div>
              <span className="info__other-info--title">
                Region:
              </span>
              {' '}
              {region}
            </div>
            <div>
              <span className="info__other-info--title">
                Capital: 
              </span>
              {' '}
              {capital}
            </div>
          </span>
        </div>
      </button>
    </div>
  );
};
