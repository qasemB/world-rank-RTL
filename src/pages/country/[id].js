import axios from "axios";
import { useEffect, useState } from "react";
import Layout from "../../Components/Layout/Layout";
import style from "./Country.module.css";

const getCountry = async (id) => {
  const res = await axios.get(`https://restcountries.eu/rest/v2/alpha/${id}`);
  return res.data;
};

const Country = ({ country }) => {
  const [borders, setBorders] = useState([]);

  const getBorders = async () => {
    const borders = await Promise.all(
      country.borders.map((border) => getCountry(border))
    );
    setBorders(borders);
  };

  useEffect(() => {
    getBorders();
  }, []);

  return (
    <Layout>
      <div className={style.container}>
        <div className={style.container_left}>
          <div className={style.overview_panel}>
            <img src={country.flag} alt={country.name} />

            <h1 className={style.overview_name}>{country.name}</h1>
            <div className={style.overview_region}>{country.region}</div>

            <div className={style.overview_numbers}>
              <div className={style.overview_population}>
                <div className={style.overview_value}>{country.population}</div>
                <div className={style.overview_label}>جمعیت</div>
              </div>

              <div className={style.overview_area}>
                <div className={style.overview_value}>{country.area}</div>
                <div className={style.overview_label}>مساحت</div>
              </div>
            </div>
          </div>
        </div>

        <div className={style.container_right}>
          <div className={style.details_panel}>
            <h4 className={style.details_panel_heading}>جزئیات</h4>
            <div className={style.details_panel_row}>
              <div className={style.details_panel_label}>پایتخت</div>
              <div className={style.details_panel_value}>{country.capital}</div>
            </div>

            <div className={style.details_panel_row}>
              <div className={style.details_panel_label}>زبان ها</div>
              <div className={style.details_panel_value}>
                {country.languages.map(({ name }) => name).join(",")}
              </div>
            </div>

            <div className={style.details_panel_row}>
              <div className={style.details_panel_label}>ارز ها</div>
              <div className={style.details_panel_value}>
                {country.currencies.map(({ name }) => name).join(",")}
              </div>
            </div>

            <div className={style.details_panel_row}>
              <div className={style.details_panel_label}>نام محلی</div>
              <div className={style.details_panel_value}>
                {country.nativeName}
              </div>
            </div>

            <div className={style.details_panel_row}>
              <div className={style.details_panel_label}>ضریب اقتصاد</div>
              <div className={style.details_panel_value}>{country.gini} %</div>
            </div>

            <div className={style.details_panel_borders}>
              <div className={style.details_panel_borders_label}>
                کشورهای همسایه
              </div>

              <div className={style.details_panel_borders_container}>
                {borders.map(({ flag, name }) => (
                  <div
                    className={style.details_panel_borders_country}
                    key={name}
                  >
                    <img src={flag} alt={name} />
                    <div className={style.details_panel_borders_name}>
                      {name}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
export default Country;

export const getServerSideProps = async ({ params }) => {
  const country = await getCountry(params.id);
  return {
    props: {
      country,
    },
  };
};
