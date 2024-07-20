import { Spinner } from '@material-tailwind/react';
function SpinnerMini() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <Spinner color="blue" className="h-5 w-5" />
    </div>
  );
}

export default SpinnerMini;
