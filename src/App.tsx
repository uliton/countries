import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import classNames from 'classnames';
import { getCountries } from './utils/api';
import { Header } from './components/Header';
import preloader_dm from './images/icons/preloader_dm.svg';
import preloader_lm from './images/icons/preloader_lm.svg';
import { Input } from './components/Input';
import { Select } from './components/Select';
import { PreViewCountry } from './components/PreViewCountry';
import { FullCountryInfo } from './components/FullCountryInfo';
import { Footer } from "./components/Footer";

export const App:React.FC = () => {
  const dispatch = useDispatch();
  const countries = useSelector((state: State) => state.countries);
  const mode = useSelector((state: State) => state.mode);
  const [query, setQuery] = useState<string>('');
  const [region, setRegion] = useState<string>('');
  const [countryDetailsStatus, setCountryDetailsStatus] = useState<boolean>(true);
  const [countryDetails, setCountryDetails] = useState<Country>();
  const [renderCountries, setRenderCountries] = useState<Country[]>([]);
  const [icon, setIcon] = useState<string>('');

  useEffect(() => {
    getCountries().then((result) => {
      const sortedResult = [...result].sort(
        (a: Country, b: Country) => a.name.common.localeCompare(b.name.common)
      );

      dispatch({
        type: 'SET_COUNTRIES',
        payload: sortedResult,
      });

      setRenderCountries(sortedResult);
    });

    const time = new Date().getHours();

    if (time > 7 && time <= 18 && !mode.length) {
      dispatch({ type: 'LIGHT' })
    } else {
      dispatch({ type: 'DARK' })
    }
  }, []);

  useEffect(() => {
    if (query.length && !region.length) {
      const filterCountries: Country[] = countries
        .filter((country: Country) => country.name.common.toLowerCase().includes(query.toLowerCase()));
  
      setRenderCountries(filterCountries);
    }
  
    if (!query.length && region.length) {
      if (region !== 'All Regions') {
        const filterCountries: Country[] = countries
          .filter((country: Country) => country.region === region);
        
        setRenderCountries(filterCountries);
      } else {
        setRenderCountries(countries);
      }
    }
  
    if (query.length && region.length) {
      const filterCountries: Country[] = countries
        .filter((country: Country) => country.region === region
          && country.name.common.toLowerCase().includes(query.toLowerCase()));
      
      setRenderCountries(filterCountries);
    }
  
    if (!query.length && !region.length) {
      setRenderCountries(countries);
    }
  }, [query,region]);

  useEffect(() => {
    if (mode === 'light') {
      setIcon(preloader_lm);
    }

    if (mode === 'dark') {
      setIcon(preloader_dm);
    }
  }, [mode]);

  return (
    <div className={classNames('app', {'app--dark': mode === 'dark', 'app--light': mode === 'light'})}>
      <div>
        <header className="app__header">
          <Header />
        </header>

        {countryDetailsStatus && countryDetails
          ? (
            <div className="container">
              <FullCountryInfo
                country={countryDetails}
                setStatus={setCountryDetailsStatus}
                setCountryDetails={setCountryDetails}
              />
            </div>
          )
          : (
            <>
              <div className="container">
                <div className="app__utils">
                  <Input
                    query={query}
                    setQuery={setQuery}
                  />
                  <Select
                    countries={countries}
                    setRegion={setRegion}
                  />
                </div>

                {countries.length
                  ? (
                    renderCountries.length 
                      ? (
                        <div className="app__countries">
                          {renderCountries.map((country: Country, index: number) => (
                            <React.Fragment key={index}>
                              <PreViewCountry
                                country={country}
                                setCountryDetails={setCountryDetails}
                                setStatus={setCountryDetailsStatus}
                                setQuery={setQuery}
                                />
                            </React.Fragment>
                          ))}
                        </div>
                      )
                      : (
                        <div className="app__service-text">Sorry. The country you are looking for does not exist.</div>
                      )
                  )
                  : (
                    <>
                      <img src={icon} alt="preloader" className="preloader"/>
                      <div className="app__service-text">Loading...</div>
                    </>
                    )
                }
              </div>
            </>
          )
        }
      </div>

      {/* <Footer /> */}
    </div>
  );
}
