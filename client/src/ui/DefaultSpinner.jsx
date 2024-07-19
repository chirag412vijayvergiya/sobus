import { ImSpinner3 } from 'react-icons/im';

function DefaultSpinner() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white dark:bg-gray-900">
      <ImSpinner3 className="h-12 w-12 animate-spin text-blue-500 delay-200" />
    </div>
  );
}

export default DefaultSpinner;
