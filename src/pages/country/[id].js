import axios from "axios";
import { useEffect, useState } from "react";
import Layout from "../../Components/Layout/Layout";
import style from "./Country.module.css";
import Link from "next/link";

const getCountry = async (id) => {
  const res = await axios.get(`https://restcountries.eu/rest/v2/alpha/${id}`);
  return res.data;
};

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const Country = ({ country }) => {
  console.log(country);
  const [borders, setBorders] = useState([]);

  const getBorders = async () => {
    const borders = await Promise.all(
      country.borders.map((border) => getCountry(border))
    );
    setBorders(borders);
  };

  useEffect(() => {
    getBorders();
  }, [country]);

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
                <div className={style.overview_value}>
                  {numberWithCommas(country.population)}
                  <span style={{ margin: "0 4px" }}>نفر</span>
                </div>
                <div className={style.overview_label}>جمعیت</div>
              </div>

              <div className={style.overview_area}>
                <div className={style.overview_value}>
                  (km<sup style={{ fontsize: "0.5rem" }}>2</sup>)
                  <span style={{ margin: "0 4px" }}>
                    {numberWithCommas(country.area)}
                  </span>
                </div>
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

            <div className={style.details_panel_row}>
              <div className={style.details_panel_label}>
                طول و عرض جغرافیایی
              </div>
              <div className={style.details_panel_value}>
                {`عرض:${country.latlng[0]} -- طول:${country.latlng[1]}`}{" "}
              </div>
            </div>

            <div className={style.details_panel_borders}>
              <div className={style.details_panel_borders_label}>
                کشورهای همسایه
              </div>

              <div className={style.details_panel_borders_container}>
                {borders.map(({ flag, name, alpha3Code }) => (
                  <Link href={`/country/${alpha3Code}`}>
                    <div
                      style={{ cursor: "pointer" }}
                      className={style.details_panel_borders_country}
                      key={name}
                    >
                      <img src={flag} alt={name} />
                      <div className={style.details_panel_borders_name}>
                        {name}
                      </div>
                    </div>
                  </Link>
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

// export const getStaticPaths = async () => {
//   const res = await axios.get("https://restcountries.eu/rest/v2/all");
//   const countries = res.data;

//   const paths = countries.map((country) => ({
//     params: { id: country.alpha3Code },
//   }));

//   return {
//     paths,
//     fallback: false,
//   };
// };

// export const getStaticProps = async ({ params }) => {
//   const country = await getCountry(params.id);
//   return {
//     props: {
//       country,
//     },
//   };
// };
