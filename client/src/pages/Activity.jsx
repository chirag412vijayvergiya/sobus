import { useEffect, useState } from 'react';
import * as XLSX from 'xlsx';
import { useSaveExcel } from '../components/activities/useSaveExcel';
import { useGetActivity } from '../components/activities/useGetActivity';
import { useUser } from '../components/profile/useUser';
import SpinnerMini from '../ui/SpinnerMini';
import Button from '../ui/Button';
import Modal from '../ui/Modal';
import ConfirmDelete from '../ui/ConfirmDelete';
import { useDeleteActivity } from '../components/activities/useDeleteActivity';
import ActivitySection from '../components/activities/ActivitySection';
import { Link } from 'react-router-dom';
import { useSaveIternaryExcel } from '../components/activities/useSaveIternaryExcel';
import SpeakerSection from '../components/activities/SpeakerSection';
import CreateActivityForm from '../components/activities/CreateActivityForm';
import CreateTaskForm from '../components/activities/CreateTaskForm';
import TaskTable from '../components/activities/TaskTable';

function Activity() {
  const [columns, setColumns] = useState([]);
  const [ItineraryColumns, setItineraryColumns] = useState([]);
  const [data, setData] = useState([]);
  const [ItineraryData, setItineraryData] = useState([]);
  const [file, setFile] = useState(null);
  const [IternaryFile, setIternaryFile] = useState(null);
  const {
    user: {
      data: {
        data: { role },
      },
    },
  } = useUser();

  const { isPending, activity } = useGetActivity();
  const { CreateExcel, isBooking } = useSaveExcel();
  const { isCreating, CreateIternaryExcel } = useSaveIternaryExcel();

  const { isDeleting, deleteActivity } = useDeleteActivity();

  useEffect(() => {
    if (activity?.excelLink) {
      fetch(activity.excelLink)
        .then((response) => response.arrayBuffer())
        .then((buffer) => {
          const workbook = XLSX.read(buffer, { type: 'array' });
          const sheetName = workbook.SheetNames[0];
          const sheet = workbook.Sheets[sheetName];
          const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });
          setColumns(jsonData[0] || []);
          setData(jsonData.slice(1));
        })
        .catch((err) =>
          console.error('Error loading existing Excel data:', err),
        );
    }
    if (activity?.activityItenry) {
      fetch(activity.activityItenry)
        .then((response) => response.arrayBuffer())
        .then((buffer) => {
          const workbook = XLSX.read(buffer, { type: 'array' });
          const sheetName = workbook.SheetNames[0];
          const sheet = workbook.Sheets[sheetName];
          const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });
          setItineraryColumns(jsonData[0] || []);
          setItineraryData(jsonData.slice(1));
        })
        .catch((err) =>
          console.error('Error loading itinerary Excel data:', err),
        );
    }
  }, [activity]);

  const handleFileUpload = (event) => {
    const uploadedFile = event.target.files[0];
    setFile(uploadedFile);
    const reader = new FileReader();

    reader.onload = (e) => {
      const binaryStr = e.target.result;
      const workbook = XLSX.read(binaryStr, { type: 'binary' });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });
      setColumns(jsonData[0] || []);
      setData(jsonData.slice(1));
    };
    reader.readAsBinaryString(uploadedFile);
  };

  const handleItineraryUpload = (event) => {
    const uploadedFile = event.target.files[0];
    setIternaryFile(uploadedFile);
    const reader = new FileReader();

    reader.onload = (e) => {
      const binaryStr = e.target.result;
      const workbook = XLSX.read(binaryStr, { type: 'binary' });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });
      setItineraryColumns(jsonData[0] || []);
      setItineraryData(jsonData.slice(1));
    };
    reader.readAsBinaryString(uploadedFile);
  };

  const handleInputChange = (rowIndex, columnIndex, value) => {
    const newData = [...data];
    newData[rowIndex][columnIndex] = value;
    setData(newData);
  };

  const handleItineraryInputChange = (rowIndex, columnIndex, value) => {
    const newData = [...ItineraryData];
    newData[rowIndex][columnIndex] = value;
    setItineraryData(newData);
  };

  const handleSave = () => {
    if (!file && !activity?.excelLink) {
      alert('Please upload an Excel file before saving.');
      return;
    }
    CreateExcel({ file, columns, data });
  };

  const handleItinerarySave = () => {
    if (!IternaryFile && !activity?.activityItenry) {
      alert('Please upload an Excel file before saving.');
      return;
    }
    CreateIternaryExcel({ IternaryFile, ItineraryColumns, ItineraryData });
  };

  if (isPending) return <SpinnerMini />;

  return (
    <div className="relative min-h-screen w-full flex-1 bg-green-100 p-[8rem_1rem] font-sans tracking-wide dark:bg-slate-800 md:p-[8rem_6rem]">
      <ActivitySection activity={activity} />
      {role === 'admin' && (
        <>
          <Modal>
            <Modal.Open opens="BookActivity-form">
              <div className="flex items-center justify-center">
                <button className="inline-flex items-center rounded-lg bg-green-700 px-4 py-1 text-center font-mono text-lg font-medium text-white hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-green-400 dark:hover:bg-green-400 dark:focus:ring-green-400">
                  Assign Task
                </button>
              </div>
            </Modal.Open>
            <Modal.Window name="BookActivity-form">
              <CreateTaskForm />
            </Modal.Window>
          </Modal>

          <TaskTable />
        </>
      )}
      {/* <SpeakerSection /> */}
      {(role === 'admin' || ItineraryColumns.length > 0) && (
        <h2 className="my-4 text-center text-lg font-semibold text-green-500 dark:text-green-400 md:text-xl">
          Activity Itinerary
        </h2>
      )}

      {ItineraryColumns.length > 0 && (
        <div className="overflow-x-auto rounded-lg shadow-md">
          <table className="min-w-full border-collapse rounded-lg bg-white dark:border-slate-900 dark:bg-slate-800">
            <thead className="bg-green-500 text-white dark:border-slate-900">
              <tr>
                {ItineraryColumns.map((col, index) => (
                  <th
                    key={index}
                    className="rounded-tl-lg rounded-tr-lg border p-3 text-center text-sm dark:border-slate-600 md:text-base"
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ItineraryData.map((row, rowIndex) => (
                <tr
                  key={rowIndex}
                  className="odd:bg-gray-100 even:bg-gray-200 dark:odd:bg-slate-800 dark:even:bg-slate-900"
                >
                  {row.map((cell, columnIndex) => (
                    <td
                      key={columnIndex}
                      className="border bg-transparent p-3 text-center dark:border-slate-600"
                    >
                      <input
                        disabled
                        value={cell || ''}
                        onChange={(e) =>
                          handleItineraryInputChange(
                            rowIndex,
                            columnIndex,
                            e.target.value,
                          )
                        }
                        className="rounded-lg border border-white bg-slate-100 p-2 text-center text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-green-400 dark:border-slate-900 dark:bg-slate-800 dark:text-grey-200 md:text-base"
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {role === 'admin' && (
        <div className="my-4 flex flex-col items-center justify-between md:flex-row">
          {/* File Input and Save Button - Right Side */}
          <div className="flex items-center">
            <input
              type="file"
              onChange={handleItineraryUpload}
              className="w-[180px] rounded border bg-green-400 p-[6px] text-grey-900 shadow-md hover:cursor-pointer md:w-[230px]"
            />
            <button
              onClick={handleItinerarySave}
              disabled={isCreating}
              className="ml-4 transform rounded bg-green-400 p-[10px] px-4 text-grey-900 shadow-md transition-transform duration-200 ease-in-out hover:scale-105 hover:bg-green-300 active:scale-95"
            >
              {isCreating ? 'Saving...' : 'Save'}
            </button>
          </div>
        </div>
      )}

      {(role === 'admin' || columns.length > 0) && (
        <h2 className="mt-4 text-center text-lg font-semibold text-green-500 dark:text-green-400 md:text-xl">
          Activity Data
        </h2>
      )}

      {columns.length > 0 && (
        <div className="overflow-x-auto rounded-lg shadow-md">
          <table className="min-w-full border-collapse rounded-lg bg-white dark:border-slate-900 dark:bg-slate-800">
            <thead className="bg-green-500 text-white dark:border-slate-900">
              <tr>
                {columns.map((col, index) => (
                  <th
                    key={index}
                    className="rounded-tl-lg rounded-tr-lg border p-3 text-center text-sm dark:border-slate-600 md:text-base"
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((row, rowIndex) => (
                <tr
                  key={rowIndex}
                  className="odd:bg-gray-100 even:bg-gray-200 dark:odd:bg-slate-800 dark:even:bg-slate-900"
                >
                  {row.map((cell, columnIndex) => (
                    <td
                      key={columnIndex}
                      className="border bg-transparent p-3 text-center dark:border-slate-600"
                    >
                      <input
                        disabled
                        value={cell || ''}
                        onChange={(e) =>
                          handleInputChange(
                            rowIndex,
                            columnIndex,
                            e.target.value,
                          )
                        }
                        className="rounded-lg border border-white bg-slate-100 p-2 text-center text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-green-400 dark:border-slate-900 dark:bg-slate-800 dark:text-grey-200 md:text-base"
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {role === 'admin' && (
        <div className="mt-4 flex flex-col items-center justify-between md:flex-row">
          {/* File Input and Save Button - Right Side */}
          <div className="flex items-center">
            <input
              type="file"
              onChange={handleFileUpload}
              className="w-[180px] rounded border bg-green-400 p-[6px] text-grey-900 shadow-md hover:cursor-pointer md:w-[230px]"
            />
            <button
              onClick={handleSave}
              disabled={isBooking}
              className="ml-4 transform rounded bg-green-400 p-[10px] px-4 text-grey-900 shadow-md transition-transform duration-200 ease-in-out hover:scale-105 hover:bg-green-300 active:scale-95"
            >
              {isBooking ? 'Saving...' : 'Save'}
            </button>
          </div>
          <div className="mt-4 md:mt-0">
            <Modal>
              <Modal.Open opens="delete-Activity">
                <Button
                  type="danger"
                  // className="rounded bg-red-500 p-2 px-4 text-white shadow-md transition-transform duration-200 ease-in-out hover:scale-105 hover:bg-red-400 active:scale-95"
                >
                  Delete Activity
                </Button>
              </Modal.Open>
              <Modal.Window name="delete-Activity">
                <ConfirmDelete
                  resourceName="Activity"
                  disabled={isDeleting}
                  onConfirm={() => deleteActivity(activity._id)}
                />
              </Modal.Window>
            </Modal>
          </div>
        </div>
      )}
    </div>
  );
}

export default Activity;
