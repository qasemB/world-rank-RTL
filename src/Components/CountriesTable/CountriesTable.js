import {
  KeyboardArrowDownRounded,
  KeyboardArrowUpRounded,
} from "@material-ui/icons";
import { useState } from "react";
import style from "./CountriesTable.module.css";
import Link from "next/Link";

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const orderBy = (countries, value, directon) => {
  if (directon == "asc") {
    return [...countries].sort((a, b) => (a[value] > b[value] ? 1 : -1));
  }

  if (directon == "desc") {
    return [...countries].sort((a, b) => (a[value] > b[value] ? -1 : 1));
  }
  return countries;
};

const SortArrow = ({ direction }) => {
  if (!direction) {
    return <></>;
  }

  if (direction == "desc") {
    return (
      <div className={style.heading_arrow}>
        <KeyboardArrowDownRounded color="inherit" />
      </div>
    );
  } else {
    return (
      <div className={style.heading_arrow}>
        <KeyboardArrowUpRounded color="inherit" />
      </div>
    );
  }
};

const CountriesTable = ({ countries }) => {
  const [direction, setDirection] = useState();
  const [value, setValue] = useState();
  const orderedCountries = orderBy(countries, value, direction);

  const switchDirection = () => {
    if (!direction) {
      setDirection("desc");
    } else if (direction == "desc") {
      setDirection("asc");
    } else {
      setDirection(null);
    }
  };

  const setValueAndDirection = (value) => {
    switchDirection();
    setValue(value);
  };

  return (
    <div>
      <div className={style.heading}>
        <div className={style.heading_flag}></div>
        <button
          className={style.heading_name}
          onClick={() => setValueAndDirection("name")}
        >
          <div>نام</div>
          {value == "name" ? <SortArrow direction={direction} /> : null}
        </button>

        <button
          className={style.heading_population}
          onClick={() => setValueAndDirection("population")}
        >
          <div>جمعیت</div>
          {value == "population" ? <SortArrow direction={direction} /> : null}
        </button>

        <button
          className={style.heading_area}
          onClick={() => setValueAndDirection("area")}
        >
          <div>
            مساحت (km<sup style={{ fontsize: "0.5rem" }}>2</sup>)
          </div>
          {value == "area" ? <SortArrow direction={direction} /> : null}
        </button>

        <button
          className={style.heading_gini}
          onClick={() => setValueAndDirection("gini")}
        >
          <div>ضریب اقتصاد</div>
          {value == "gini" ? <SortArrow direction={direction} /> : null}
        </button>
      </div>
      {orderedCountries.map((country) => (
        <Link href={`/country/${country.alpha3Code}`}>
          <div className={style.row}>
            <div className={style.flag}>
              <img src={country.flag} alt={country.name} />
            </div>

            <div className={style.name}>
              {country.name}
              <div>
                <small>{country.nativeName}</small>
              </div>
            </div>
            <div className={style.population}>
              {numberWithCommas(country.population)}
            </div>
            <div className={style.area}>
              {numberWithCommas(country.population) || 0}
            </div>
            <div className={style.gini}>{country.gini || 0} %</div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default CountriesTable;
