import customFetch from '../utils/customFetch';

// For the admin to get all tasks
export async function GetTasks(activityId) {
  try {
    const response = await customFetch.get(`/tasks/${activityId}`);
    return response.data.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
}

// For the admin to create a task
export async function CreateTask({ data, activityId }) {
  try {
    const response = await customFetch.post(
      `/task/task-assign/${activityId}`,
      data,
    );
    return response.data.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
}

// For the admin to update any task
export async function UpdateTask({ data, taskId }) {
  try {
    const response = await customFetch.patch(
      `/task/updateTask/${taskId}`,
      data,
    );
    return response.data.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
}

// For the admin to delete any task
export async function DeleteTask({ taskId }) {
  try {
    const response = await customFetch.delete(`/task/deleteTask/${taskId}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
}

// For the normal user to get their tasks only
export async function GetMyTasks() {
  try {
    const response = await customFetch.get('/tasks');
    return response.data.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
}