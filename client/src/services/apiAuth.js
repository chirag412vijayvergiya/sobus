import customFetch from '../utils/customFetch';

export async function signup({ fullName, email, password }) {
  try {
    const res = await customFetch.post('/users/signup', {
      name: fullName,
      email,
      password,
      passwordConfirm: password,
    });
    console.log(res.data);
    return res.data;
  } catch (err) {
    console.error(err);
    // toast.error(err.message);
    throw new Error('Failed to signup');
  }
}

export async function patientLogin({ email, password }) {
  try {
    const response = await customFetch.post(
      `/users/login`,
      {
        email,
        password,
      },
      { withCredentials: true },
    );
    console.log(response.data.data);
    return response.data;
  } catch (error) {
    console.error('Error logging in: ', error);
    throw new Error('Failed to login');
  }
}

export async function logout() {
  const res = await customFetch.post(`/users/logout`);
  return res.data;
}
