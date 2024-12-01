import { useGetAllUsers } from '../components/profile/useGetAllUsers';

function AllUsers() {
  const { isPending, users, isError } = useGetAllUsers();
  if (isPending) {
    return (
      <div className="relative min-h-screen w-full flex-1 bg-green-100 p-[8rem_1rem] font-sans tracking-wide dark:bg-slate-900 md:p-[8rem_6rem]">
        <div className="mt-10 flex flex-col items-center">
          <h2 className="text-xl font-semibold text-gray-700">
            Loading All Users
          </h2>
          <p className="text-sm text-gray-500">
            Please wait while we fetch all users...
          </p>
          <div className="mt-5 h-10 w-10 animate-spin rounded-full border-4 border-green-500 border-t-transparent"></div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="relative min-h-screen w-full flex-1 bg-green-100 p-[8rem_1rem] font-sans tracking-wide dark:bg-slate-900 md:p-[8rem_6rem]">
        <div className="mt-10 text-center">
          <h2 className="text-xl font-semibold text-red-600">
            Error Loading Tasks
          </h2>
          <p className="text-sm text-gray-500">
            Something went wrong. Please try again later.
          </p>
        </div>
      </div>
    );
  }

  console.log(users);
  return (
    <div className="relative min-h-screen w-full flex-1 bg-green-100 p-[8rem_1rem] font-sans tracking-wide dark:bg-slate-900 md:p-[8rem_6rem]"></div>
  );
}

export default AllUsers;
