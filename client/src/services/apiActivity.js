import customFetch from '../utils/customFetch';

export async function createActivity({ data }) {
  try {
    console.log('from api :- ', data);
    const response = await customFetch.post('/activity/create-activity', {
      data,
    });
    console.log(response.data.session);
    return response.data.session;
  } catch (error) {
    // console.error('Error creating appointment: ', error.response.data.message);
    throw new Error(error.response.data.message);
  }
}

export async function getAllActivities() {
  try {
    const response = await customFetch.get('/activity/all-activities');
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
}

export async function GetActivity(activityId) {
  try {
    const response = await customFetch.get(
      `/activity/getActivity/${activityId}`,
    );
    console.log(response.data.data);
    return response.data.data.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
}

export async function saveExcel({ file, columns, data, activityId }) {
  try {
    const formData = new FormData();
    formData.append('file', file); // Append the Excel file
    formData.append('columns', JSON.stringify(columns)); // Append columns as JSON
    formData.append('data', JSON.stringify(data)); // Append data as JSON

    const response = await customFetch.post(
      `/activity/save-excel/${activityId}`,
      formData,
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
}

export async function deleteActivity(activityId) {
  try {
    const response = await customFetch.delete(
      `/activity/delete-activity/${activityId}`,
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
}
