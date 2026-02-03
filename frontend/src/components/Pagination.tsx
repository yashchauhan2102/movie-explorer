import { LIMIT_ARRAY } from "../constants/movie";

interface IPaginationProps {
  isLoading: boolean;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  limit: number;
  setLimit: React.Dispatch<React.SetStateAction<number>>;
  totalPages: number;
}

export const Pagination = ({
  isLoading,
  page,
  setPage,
  limit,
  setLimit,
  totalPages,
}: IPaginationProps) => {
  return (
    <div>
      <button
        disabled={page === 1 || isLoading}
        onClick={() => setPage((prev) => prev - 1)}
      >
        Prev
      </button>
      <span>
        {page} of {totalPages} pages
      </span>
      <button
        disabled={page >= totalPages || isLoading}
        onClick={() => setPage((prev) => prev + 1)}
      >
        Next
      </button>

      <select value={limit} onChange={(e) => setLimit(Number(e.target.value))}>
        {LIMIT_ARRAY.map((limit) => (
          <option value={limit} key={limit}>
            {limit}
          </option>
        ))}
      </select>
    </div>
  );
};
