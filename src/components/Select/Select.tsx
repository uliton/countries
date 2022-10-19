import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import classNames from 'classnames';
import selector_dm from '../../images/icons/selector_dm.svg';
import selector_lm from '../../images/icons/selector_lm.svg';

type Props = {
  countries: Country[],
  setRegion: (_: string) => void,
}

export const Select: React.FC<Props> = ({ countries, setRegion }) => {
  const [choosenRegion, setChoosenRegion] = useState<string>('');
  const [allRegions, setAllRegions] = useState<string[]>([]);
  const [openSelect, setOpenSelect] = useState<boolean>(false);
  const [icon, setIcon] = useState<string>('');
  const mode = useSelector((state: State) => state.mode);
  
  useEffect(() => {
    const regions = countries.map(
      (country: Country) => country.region,
    )

    const sortedRegions = regions.reduce((allRegions: string[], region: string) => {
      if (!allRegions.includes(region)) allRegions.push(region);
      return allRegions;
    }, []).sort((a: string, b: string) => a[0].localeCompare(b[0]));

    setAllRegions(sortedRegions);
  }, [countries]);
  
  useEffect(() => {
    if (mode === 'light') {
      setIcon(selector_lm);
    }

    if (mode === 'dark') {
      setIcon(selector_dm);
    }
  }, [mode]);

  const handlerChange = (region?: string) => {
    if (region) {
      if (region === 'All Regions') {
        setRegion('');
      } else {
        setRegion(region);
      }

      setChoosenRegion(region);
    }

    setOpenSelect(!openSelect);
  }

  return (
    <div className="select">
      <button
        type="button"
        className={classNames('select__container',
          {
            'select__container--dark': mode === 'dark',
            'select__container--light': mode === 'light',
          },
        )}
        title="Click to choose Region"
        onClick={() => {handlerChange()}}
      >
        {choosenRegion ? `Filter by ${choosenRegion}` : 'Filter by Region'}
        <img src={icon} alt="selector" className="select__icon" />
      </button>

      {openSelect && (
        <div className={classNames('select__items',
          {
            'select__items--dark': mode === 'dark',
            'select__items--light': mode === 'light',
          }
        )}
        >
          {allRegions.map((region, i) => (
            <button
              key={i}
              type="button"
              className={classNames('select__item',
                {
                  'select__item--dark': mode === 'dark',
                  'select__item--light': mode === 'light',
                }
              )}
              title="Choose Region"
              onClick={() => {handlerChange(region)}}
            >
              {region}
            </button>
          ))}
          <button
            type="button"
            className={classNames('select__item',
              {
                'select__item--dark': mode === 'dark',
                'select__item--light': mode === 'light',
              }
            )}
            onClick={() => {handlerChange('All Regions')}}
          >
            All Regions
          </button>
        </div>
      )}
    </div>
  );
};
