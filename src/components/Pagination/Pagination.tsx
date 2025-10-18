import ReactPaginate from 'react-paginate';
import './Pagination.module.css';
import css from './Pagination.module.css';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onChangePage: (event: { selected: number }) => void;
}

const Pagination = ({
  currentPage,
  totalPages,
  onChangePage,
}: PaginationProps) => {
  return (
    <>
      <ReactPaginate
        pageCount={totalPages}
        pageRangeDisplayed={12}
        marginPagesDisplayed={1}
        onPageChange={onChangePage}
        forcePage={currentPage - 1}
        containerClassName={css.pagination}
        activeClassName={css.active}
        nextLabel="→"
        previousLabel="←"
      />
    </>
  );
};

export default Pagination;
