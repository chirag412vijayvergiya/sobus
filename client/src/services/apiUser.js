import customFetch from '../utils/customFetch';

export async function getCurrentUser() {
  try {
    const response = await customFetch.get(`/users/me`);

    return response.data;
  } catch (error) {
    console.error('Error fetching user data: ', error);
    throw new Error('Failed to fetch user data');
  }
}

export async function updateUserData({ fullName, photo }) {
  try {
    const formdata = new FormData();
    formdata.append('name', fullName);
    formdata.append('photo', photo);

    // for (let [key, value] of formdata.entries()) {
    //   console.log(key, value);
    // }
    const response = await customFetch.patch(`/users/updateMe`, formdata);

    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching user data: ', error);
    throw new Error('Failed to update user data');
  }
}

export async function UpdateUserPassword({
  passwordCurrent,
  password,
  passwordConfirm,
}) {
  try {
    const response = await customFetch.patch(`/users/updateMyPassword`, {
      passwordCurrent,
      password,
      passwordConfirm,
    });

    // console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching user data: ', error);
    throw new Error('Failed to update user password');
  }
}

export async function MakeAdmin({ emailId }) {
  try {
    const response = await customFetch.patch(`/users/make-admin`, {
      emailId,
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching user data: ', error);
    throw new Error('Failed to update user data');
  }
}

export async function getAllUsers() {
  try {
    const response = await customFetch.get(`/users/getAllusers`);
    // console.log(response.result, response.data.data);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching user data: ', error);
    throw new Error('Failed to fetch user data');
  }
}
