import { Spinner } from '@material-tailwind/react';
function SpinnerMini() {
  return (
    <div className="relative min-h-screen w-full flex-1 bg-green-100 p-[8rem_1rem] font-sans tracking-wide dark:bg-slate-900 md:p-[8rem_6rem]">
      <div className="flex h-full w-full items-center justify-center">
        <Spinner color="blue" className="h-5 w-5" />
      </div>
    </div>
  );
}

export default SpinnerMini;
