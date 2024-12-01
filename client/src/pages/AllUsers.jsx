import { useState, useEffect } from 'react';
import { GrUserAdmin, GrFilter } from 'react-icons/gr';
import { FaUserCircle } from 'react-icons/fa';
import { FaAngleRight } from 'react-icons/fa';
import { FaAngleLeft } from 'react-icons/fa6';
import { FaUserGroup } from 'react-icons/fa6';
import { useGetAllUsers } from '../components/profile/useGetAllUsers';

function AllUsers() {
  const { isPending, users, isError } = useGetAllUsers();
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10; // Max records per page

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

  const handleMakeAdmin = (userId) => {
    alert(`User with ID ${userId} is now an admin!`);
    // Here you can replace the alert with actual logic to make the user an admin
  };

  // Filter users based on the search term
  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  // Pagination logic
  const totalPages = Math.ceil(filteredUsers.length / recordsPerPage);
  const startIndex = (currentPage - 1) * recordsPerPage;
  const currentRecords = filteredUsers.slice(
    startIndex,
    startIndex + recordsPerPage,
  );

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="relative min-h-screen w-full flex-1 bg-green-100 p-[8rem_1rem] font-sans tracking-wide dark:bg-slate-900 md:p-[8rem_6rem]">
      <div className="container mx-auto">
        <div className="text-center">
          <h1
            className="font-mono text-2xl font-semibold tracking-wider text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 hover:dark:text-indigo-300"
            style={{ textUnderlineOffset: '4px' }}
          >
            ALL USERS
          </h1>
        </div>
        <div className="mb-6 flex items-center justify-between">
          <div className="flex w-full max-w-[270px] items-center rounded-lg border bg-white px-4 py-2 shadow-md">
            <GrFilter className="mr-2 text-gray-500" />
            <input
              type="text"
              placeholder="Search by username or email"
              className="w-full border-none text-gray-700 placeholder-gray-500 outline-none focus:placeholder-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center font-semibold text-gray-600">
            {/* Add the FaUserGroup icon here before the user count */}
            <FaUserGroup className="mr-2 text-gray-600" />
            <span>{filteredUsers.length}</span> / <span>{users.length}</span>{' '}
            <span className="ml-2">users</span>
          </div>
        </div>

        <div className="overflow-x-auto rounded-lg bg-white shadow-lg">
          <table className="w-full table-auto border-collapse overflow-hidden rounded-lg shadow-md">
            <thead className="bg-gradient-to-r from-green-400 to-green-500 text-sm uppercase text-white">
              <tr>
                <th className="px-6 py-3 text-center font-semibold">
                  Username
                </th>
                <th className="px-6 py-3 text-center font-semibold">
                  Email Address
                </th>
                <th className="px-6 py-3 text-center font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {currentRecords.map((user) => (
                <tr
                  key={user.id}
                  className="transition duration-300 hover:bg-green-50 hover:shadow-md"
                >
                  <td className="flex items-center space-x-4 px-6 py-4">
                    {user.photo ? (
                      <img
                        src={user.photo}
                        alt={user.name}
                        className="h-10 w-10 rounded-full shadow"
                      />
                    ) : (
                      <FaUserCircle className="h-10 w-10 text-gray-400" />
                    )}
                    <span className="font-medium text-gray-800">
                      {user.name}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center text-gray-700">
                    {user.email}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="relative inline-block">
                      <button
                        onClick={() => handleMakeAdmin(user.id)}
                        className="flex items-center justify-center rounded-lg bg-gradient-to-r from-green-500 to-green-600 px-4 py-2 text-sm font-semibold text-white shadow hover:from-green-600 hover:to-green-700 focus:outline-none focus:ring-2 focus:ring-green-400"
                      >
                        <GrUserAdmin size={20} />
                      </button>
                      <div className="absolute bottom-12 left-1/2 z-50 -translate-x-1/2 transform whitespace-nowrap rounded-md bg-gray-800 px-3 py-1 text-xs font-medium text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                        Make Admin
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
              {currentRecords.length === 0 && (
                <tr>
                  <td
                    colSpan="3"
                    className="px-6 py-4 text-center text-gray-500"
                  >
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Section */}
        <div className="mt-4 flex items-center justify-between">
          {/* Previous Button is kept as per original request */}
          {currentPage !== 1 && (
            <button
              onClick={goToPreviousPage}
              className="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600"
            >
              <FaAngleLeft />
            </button>
          )}

          <span className="mx-auto text-center text-gray-600">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={goToNextPage}
            disabled={currentPage === totalPages}
            className={`rounded px-4 py-2 ${
              currentPage === totalPages
                ? 'cursor-not-allowed bg-gray-300 text-gray-500'
                : 'bg-green-500 text-lg text-white hover:bg-green-600'
            }`}
          >
            <FaAngleRight />
          </button>
        </div>
      </div>
    </div>
  );
}

export default AllUsers;
