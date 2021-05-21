export const perPage = 2;

export const handlePageChange = ({ selected: selectedPage }) => {
  return selectedPage;
};

export const getPageCount = list => {
  return Math.ceil(list.length / perPage);
};
