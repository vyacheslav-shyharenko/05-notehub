import './SearchBox.module.css';
import css from './SearchBox.module.css';

interface SearchBoxProps {
  setSearch: (e: string) => void;
}

const SearchBox = ({ setSearch }: SearchBoxProps) => {
  return (
    <>
      <input
        onChange={(e) => setSearch(e.target.value)}
        className={css.input}
        type="text"
        placeholder="Search notes"
      />
    </>
  );
};

export default SearchBox;
