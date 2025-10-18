import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useDebounce } from 'use-debounce';
import { useToggle } from '../../hooks/useToggle';
import { fetchNotes } from '../../services/noteService';
import Modal from '../Modal/Modal';
import NoteForm from '../NoteForm/NoteForm';
import NoteList from '../NoteList/NoteList';
import Pagination from '../Pagination/Pagination';
import SearchBox from '../SearchBox/SearchBox';
import './App.module.css';
import css from './App.module.css';

const App = () => {
  const [params, setParams] = useState({
    page: 1,

    perPage: 12,

    search: '',
  });

  const [search, setSearch] = useState('');

  const [debouncedSearch] = useDebounce(search, 500); //

  const [isOpen, toggle] = useToggle(false);

  const queryOptions = {
    queryKey: ['notes', params.page, debouncedSearch],
    queryFn: () =>
      fetchNotes({
        ...params,
      }),
    keepPreviousData: true,
  };

  useEffect(() => {
    setParams((prev) => ({
      ...prev,
      page: 1,
      search: debouncedSearch,
    }));
  }, [debouncedSearch]);

  const { data, isSuccess } = useQuery(queryOptions);

  const { notes = [], totalPages = 1 } = data ?? {};

  const handlePageChange = ({ selected }: { selected: number }) => {
    setParams((prev) => ({
      ...prev,
      page: selected + 1,
    }));
  };

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox setSearch={setSearch} />

        {totalPages > 1 && (
          <Pagination
            currentPage={params.page}
            totalPages={totalPages}
            onChangePage={handlePageChange}
          />
        )}

        <button onClick={toggle} className={css.button}>
          Create note +
        </button>
      </header>
      {isSuccess && (
        <>
          <NoteList notes={notes} />
        </>
      )}

      {isOpen && (
        <Modal onClose={toggle}>
          <NoteForm onCancel={toggle} />
        </Modal>
      )}
    </div>
  );
};

export default App;
