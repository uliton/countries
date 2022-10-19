/// <reference types="react-scripts" />

interface State {
  countries: Country[] | [],
  mode: string,
};

interface Flags {
  png: string,
  svg: string,
}

interface Name {
  common: string,
  official: string,
  nativeName: {
    _: {
      common: string,
    }
  },
}

interface Country {
  flags: Flags,
  name: Name,
  population: number,
  region: string,
  capital: string[],
  tld: string[],
  subregion: string,
  currencies: {
    _: {
      name: string,
    }
  },
  languages: {},
  borders?: string[],
  cca3:string,
}