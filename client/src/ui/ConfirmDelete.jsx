import Button from './Button';

function ConfirmDelete({ resourceName, onConfirm, disabled, onCloseModal }) {
  return (
    <div className="relative overflow-hidden rounded-lg border-[1px] border-solid border-grey-100 bg-grey-0 p-[1.3rem_2rem] text-xl dark:border-slate-800 dark:bg-slate-900 md:h-[16rem] md:w-[25rem] md:p-[2.3rem_2rem]">
      <h3 className="mx-5 mb-3 items-center font-semibold text-grey-800 dark:text-grey-100 md:mx-[6rem]">
        Delete {resourceName}
      </h3>
      <p className="p-[0.8rem_1rem] text-sm tracking-wide shadow-sm dark:bg-slate-900 dark:text-grey-300">
        Are you sure you want to delete this {resourceName} permanently? This
        action cannot be undone.
      </p>

      <div className="m-auto flex items-center justify-center gap-9 p-[1rem_0]">
        <Button type="reset" disabled={disabled} onClick={onCloseModal}>
          Cancel
        </Button>
        <Button type="danger" disabled={disabled} onClick={onConfirm}>
          Delete
        </Button>
      </div>
    </div>
  );
}

export default ConfirmDelete;
