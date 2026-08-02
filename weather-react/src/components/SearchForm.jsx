import { useContext } from "react";
import Button from "./Button";
import Input from "./Input";
import weatherContext from "../context";

const SearchForm = () => {
  const {
    searchTxt,
    setSearchTxt,
    onConfirmSearch
  } = useContext(weatherContext);

  return (
    <form className="search-form" onSubmit={onConfirmSearch}>
      <Input
      value={searchTxt}
      onInput={(e) => setSearchTxt(e.target.value)}
      className="search-input"
      placeholder="Search..."
      />
      <Button
        className="search-btn"
      >SEARCH</Button>
    </form>
  )
}

export default SearchForm;