import styles from "./Search.module.scss";

const SearchResult = ({ searchResult }) => {
  return (
    <ul className={styles.cityList}>
      {searchResult.map((country) =>
        country.cities.map((city, index) => (
          <li key={index}>
            {country.iso3} {city}
          </li>
        )),
      )}
    </ul>
  );
};
export default SearchResult;
