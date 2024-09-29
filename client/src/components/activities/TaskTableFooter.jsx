import Pagination from '../../ui/Pagination';

function TaskTableFooter({ count }) {
  return (
    <footer className="flex w-full justify-center bg-green-500 px-6 py-[0.6rem]">
      <Pagination count={count} />
    </footer>
  );
}

export default TaskTableFooter;
