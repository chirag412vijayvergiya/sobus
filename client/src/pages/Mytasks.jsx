import { useState } from 'react';
import { useGetMyTask } from '../components/activities/useGetMyTask';

function Mytasks() {
  // Fake data for tasks
  const { MyTasks, isLoading, isError } = useGetMyTask();

  if (isLoading) {
    return (
      <div className="mt-2 flex h-10 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-t-2 border-green-500"></div>
      </div>
    );
  }

  console.log(MyTasks.tasks);
}

export default Mytasks;
