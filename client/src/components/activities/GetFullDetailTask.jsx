import Button from '../../ui/Button';

function GetFullDetailTask({ disabled, onCloseModal, defaultTaskValues }) {
  console.log('bfdkjs : ', defaultTaskValues);
  return (
    <div className="relative flex w-[290px] flex-col overflow-hidden rounded-lg border-[1px] border-solid border-grey-100 bg-grey-100 bg-cover bg-center p-[1rem_2rem] text-xl dark:border-slate-800 dark:bg-slate-950 dark:bg-opacity-80 dark:bg-blend-overlay md:w-[850px] md:p-[1rem_2rem]">
      <h5 className="mx-1 items-center text-base font-semibold tracking-wider text-grey-800 dark:text-grey-100 md:mx-auto md:mb-3 md:text-xl">
        Task Details
      </h5>

      <div className="m-auto flex items-center justify-center gap-9 p-[1rem_0]">
        <Button type="reset" disabled={disabled} onClick={onCloseModal}>
          Reject
        </Button>
        <Button type="danger" disabled={disabled} onClick={onCloseModal}>
          Accept
        </Button>
      </div>
    </div>
  );
}

export default GetFullDetailTask;
