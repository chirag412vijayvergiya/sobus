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
      `/tasks/task-assign/${activityId}`,
      data,
    );
    return response.data.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
}

// For the admin to update any task
export async function UpdateTask({ task, deadline, status, taskId }) {
  try {
    console.log(task, deadline, status, taskId);
    const response = await customFetch.patch(`/tasks/${taskId}`, {
      task,
      deadline,
      status,
    });
    return response.data.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
}

// For the admin to delete any task
export async function DeleteTask(taskId) {
  try {
    const response = await customFetch.delete(`/tasks/${taskId}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
}

// For the normal user to get their tasks only
export async function GetMyTasks() {
  try {
    const response = await customFetch.get('/tasks');
    console.log(response);
    return response.data.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
}

export async function SubmitTask({ taskId, abouttask, googleDriveLink }) {
  try {
    const response = await customFetch.patch(
      `/tasks/authenticateUser/${taskId}`,
      {
        abouttask,
        googleDriveLink,
      },
    );
    return response.data.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
}

export async function ReviewTask({ taskId, status }) {
  try {
    const response = await customFetch.patch(`/tasks/${taskId}/review`, {
      status,
    });
    return response.data.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
}
