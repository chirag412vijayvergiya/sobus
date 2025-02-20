import customFetch from '../utils/customFetch';

export async function createActivity({ data }) {
  try {
    // console.log('from api :- ', data);
    const response = await customFetch.post('/activity/create-activity', {
      data,
    });
    // console.log(response.data.session);
    return response.data.session;
  } catch (error) {
    // console.error('Error creating appointment: ', error.response.data.message);
    throw new Error(error.response.data.message);
  }
}
export async function getAllActivities() {
  try {
    const response = await customFetch.get('/activity/all-activities');
    const activities = response.data.data.data;

    // Get current date and time
    const now = new Date();

    // Sort activities by activityStartDate
    const sortedActivities = activities.sort((a, b) => {
      const dateA = new Date(a.activityStartDate);
      const dateB = new Date(b.activityStartDate);

      // If both events are upcoming or both are past, sort by date
      if (dateA >= now && dateB >= now) {
        return dateA - dateB; // Upcoming events sorted by closest start date first
      } else if (dateA < now && dateB < now) {
        return dateA - dateB; // Past events sorted by most recent end date first
      } else {
        // If one event is upcoming and the other is past, upcoming event comes first
        return dateA >= now ? -1 : 1;
      }
    });

    // console.log(sortedActivities);
    return sortedActivities;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
}

export async function GetActivity(activityId) {
  try {
    const response = await customFetch.get(
      `/activity/getActivity/${activityId}`,
    );
    // console.log(response.data.data);
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

export async function saveIternaryExcel({
  IternaryFile,
  ItineraryColumns,
  ItineraryData,
  activityId,
}) {
  try {
    const formData = new FormData();
    formData.append('file', IternaryFile); // Append the Excel file
    formData.append('Iternarycolumns', JSON.stringify(ItineraryColumns)); // Append columns as JSON
    formData.append('Iternarydata', JSON.stringify(ItineraryData)); // Append data as JSON

    const response = await customFetch.post(
      `/activity/save-excelIternary/${activityId}`,
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
