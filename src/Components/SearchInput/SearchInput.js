import { SearchRounded } from "@material-ui/icons";
import style from "./SearchInput.module.css";

const SearchInput = ({ ...rest }) => {
  return (
    <div className={style.wrapper}>
      <SearchRounded color="inherit" />
      <input className={style.input} {...rest} />
    </div>
  );
};

export default SearchInput;
