import { useState, useEffect } from "react";
import axios from "axios";
import SearchBar from "./SearchBar";
import styles from "./Search.module.scss";

const Search = () => {
  const [inputValue, setInputValue] = useState("");
  const [countriesAndCities, setCountriesAndCities] = useState();
  const [searchResult, setSearchResult] = useState();

  useEffect(() => {
    axios
      .get("https://countriesnow.space/api/v0.1/countries")
      .then((response) => {
        setCountriesAndCities(response.data.data);
      });
  }, []);

  const handleOnChange = (inputValue) => {
    setInputValue(inputValue);

    if (inputValue.length > 1) {
      const citiesCopy = JSON.parse(JSON.stringify(countriesAndCities));

      for (let i = 0; i < citiesCopy.length; i++) {
        const cityArray = citiesCopy[i].cities.filter((el) =>
          el.toLowerCase().includes(inputValue.toLowerCase()),
        );
        citiesCopy[i].cities = cityArray;
      }
      const citiesResult = citiesCopy.filter(
        (country) => country.cities.length > 0,
      );
      setSearchResult(citiesResult);
    } else {
      setSearchResult();
    }
  };

  return (
    <div>
      <span className={styles.icon}>
        <i className="fa-solid fa-magnifying-glass-location"></i>
      </span>
      <input
        className={styles}
        type="search"
        placeholder="Enter a City"
        value={inputValue}
        onChange={(e) => handleOnChange(e.target.value)}
      />

      {searchResult && <SearchBar searchResult={searchResult} />}
    </div>
  );
};

export default Search;
