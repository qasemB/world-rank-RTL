import axios from "axios";
import { useState } from "react";
import CountriesTable from "../Components/CountriesTable/CountriesTable";
import Layout from "../Components/Layout/Layout";
import SearchInput from "../Components/SearchInput/SearchInput";
import style from "../styles/Home.module.css";

export default function Home({ countries }) {
  const [keyword, setKeyword] = useState("");

  const filteredCountries = countries.filter(
    (country) =>
      country.name.toLowerCase().includes(keyword) ||
      country.nativeName.toLowerCase().includes(keyword) ||
      country.region.toLowerCase().includes(keyword) ||
      country.subregion.toLowerCase().includes(keyword) ||
      country.languages[0].name.toLowerCase().includes(keyword) ||
      country.languages[0].nativeName.toLowerCase().includes(keyword)
  );
  return (
    <Layout>
      <div className={style.inputContainer}>
        <div className={style.counts}>{`تعداد ${countries.length} کشور`}</div>

        <div className={style.input}>
          <SearchInput
            onChange={(e) => setKeyword(e.target.value)}
            value={keyword}
            placeholder="جست و جو بر اساس نام و منطقه"
          />
        </div>
      </div>

      <CountriesTable countries={filteredCountries} />
    </Layout>
  );
}

export const getStaticProps = async () => {
  const res = await axios.get("https://restcountries.eu/rest/v2/all");
  const countries = res.data;

  return {
    props: {
      countries,
    },
  };
};
