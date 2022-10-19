import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import classNames from 'classnames';
import arrow_dm from '../../images/icons/arrow_dm.svg';
import arrow_lm from '../../images/icons/arrow_lm.svg';

type Props = {
  country: Country,
  setStatus: (_: boolean) => void,
  setCountryDetails: (_: Country) => void,
}

export const FullCountryInfo: React.FC<Props> = ({ country, setStatus, setCountryDetails }) => {
  const { flags, name, population, region, subregion, capital, tld, currencies, languages, borders } = country;

  const countries = useSelector((state: State) => state.countries);
  const mode = useSelector((state: State) => state.mode);
  const [borderСountries, setBorderСountries] = useState<Country[]>([]);
  const [icon, setIcon] = useState<string>('');

  const nativeNames = Object.values(name.nativeName);
  const nativeName = nativeNames[nativeNames.length - 1].common;
  const currency = Object.values(currencies)[0].name;
  const nativeLanguages = Object.values(languages).reverse().join(', ');
  const editedPopulation = String(population)
      .split('').reverse()
      .map((el, i) => {
        if (i > 0 && i % 3 === 0) {
          return `${el},`;
        }
        return el;
      })
      .reverse().join('');

  useEffect(() => {
    if (borders) {
      const filteredNeighboringСountries = countries
        .filter(country => borders.includes(country.cca3))
        .sort((a, b) => a.name.common.localeCompare(b.name.common)
      );

      setBorderСountries(filteredNeighboringСountries);
    };
  }, [country]);

  useEffect(() => {
    if (mode === 'light') {
      setIcon(arrow_lm);
    }

    if (mode === 'dark') {
      setIcon(arrow_dm);
    }
  }, [mode]);

  const handlerChange = (country: Country) => {
    setCountryDetails(country);
  };

  return (
    <div className="full-info">
      <button
        type="button"
        className={classNames('full-info__button',
          {
            'full-info__button--dark': mode === 'dark',
            'full-info__button--light': mode === 'light',
          }
        )}
        onClick={() => {setStatus(false)}}
      >
        <img src={icon} alt="back" className="full-info__button--arrow"/>
        Back
      </button>

      <div className="full-info__container info-wrapper">
        <img src={flags.svg} alt="flag" className="info-wrapper__flag"/>
        
        <div className="info-wrapper__container">
          <div className="info-wrapper__container--name">
            {name.common}
          </div>

          <div className="info-wrapper__container--sections">
            <div className="info-wrapper__container--section section">
              <div className="section__item">
                <span className="section__title">
                  Native Name:
                </span>
                {' '}
                {nativeName}
              </div>

              <div className="section__item">
                <span className="section__title">
                  Population:
                </span>
                {' '}
                {editedPopulation}
              </div>

              <div className="section__item">
                <span className="section__title">
                  Region:
                </span>
                {' '}
                {region}
              </div>

              <div className="section__item">
                <span className="section__title">
                  Sub Region:
                </span>
                {' '}
                {subregion}
              </div>

              <div className="section__item">
                <span className="section__title">
                  Capital:
                </span>
                {' '}
                {capital}
              </div>
            </div>

            <div className="info-wrapper__container--section section">
              <div className="section__item">
                <span className="section__title">
                  Top Level Domain:
                </span>
                {' '}
                {tld[0]}
              </div>

              <div className="section__item">
                <span className="section__title">
                  Currencies:
                </span>
                {' '}
                {currency}
              </div>

              <div className="section__item">
                <span className="section__title">
                  Languages:
                </span>
                {' '}
                {nativeLanguages}
              </div>
            </div>
          </div>

          <div className="info-wrapper__container--section section">
            <div className="section__item section__item--borders">
              <span className="section__title">
                Border Countries:
              </span>

              <span className="section__buttons">
                {borderСountries.length
                  ? (
                    borderСountries.map((country, index) => (
                      <button
                        key={index}
                        type="button"
                        className={classNames('section__buttons--button',
                          {
                            'section__buttons--button--dark': mode === 'dark',
                            'section__buttons--button--light': mode === 'light',
                          }
                        )}
                        title="Click to more info"
                        onClick={() => {
                          handlerChange(country);
                        }}
                      >
                        {country.name.common}
                      </button>
                    ))
                  )
                  : (
                    <div className="section__buttons--text">
                      This country has no neighbors.
                    </div>
                  )
                }
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
