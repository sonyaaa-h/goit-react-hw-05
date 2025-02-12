import s from "./LoadMore.module.css";

const LoadMore = ({ onClick }) => {
  return (
    <button className={s.btn} onClick={onClick}>
      Load more
    </button>
  );
};
export default LoadMore;
