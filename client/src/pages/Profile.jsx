import { useState } from 'react';
import { useUser } from '../components/profile/useUser';
import { useUpdateUserData } from '../components/profile/useUpdateUserData';
import { useUpdateUserPassword } from '../components/profile/useUpdateUserPassword';
import NavItem from '../components/profile/NavItem';
import Modal from '../ui/Modal';
import CreateActivityForm from '../components/activities/CreateActivityForm';
import MakeAdminForm from '../components/profile/MakeAdminForm';
import { useNavigate } from 'react-router-dom';

function Profile() {
  const {
    user: {
      data: {
        data: { name, email, role, photo, googleId },
      },
    },
  } = useUser();
  const { updateUser, isUpdating } = useUpdateUserData();
  const [fullName, setFullName] = useState(name);
  const [avatar, setAvatar] = useState(null);
  const [preview, setPreview] = useState(null);
  const { updateUserPassword, isUpdating: isPasswordUpdating } =
    useUpdateUserPassword();
  const [curPassword, setCurPassword] = useState('test1234');
  const [newPassword, setNewPassword] = useState('');
  const [ConfPassword, setConfPassword] = useState('');
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatar(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  function handleUserSubmit(e) {
    e.preventDefault();
    console.log(avatar, fullName);

    updateUser(
      { fullName, photo: avatar },
      {
        onSuccess: () => {
          console.log('User account successfully updated', avatar);
          e.target.reset();
        },
      },
    );
  }

  function handlePasswordSubmit(e) {
    e.preventDefault();
    console.log(curPassword, newPassword, ConfPassword);

    updateUserPassword(
      {
        passwordCurrent: curPassword,
        password: newPassword,
        passwordConfirm: ConfPassword,
      },
      {
        onSuccess: () => {
          console.log('User password successfully updated');
          e.target.reset();
        },
      },
    );
  }

  // function handleCancelPassword() {
  //   setCurPassword('');
  //   setNewPassword('');
  //   setConfPassword('');
  // }

  // function handleCancelUser() {
  //   setFullName(name);
  //   setAvatar(null);
  // }

  return (
    <main className="relative flex-1 bg-green-100 p-[8rem_1rem] dark:bg-slate-800 md:p-[8rem_6rem]">
      <div className="bg-gray-0 mx-auto min-h-screen max-w-[110rem] overflow-hidden rounded-[3px] shadow-[0_2.5rem_8rem_2rem_rgba(0,0,0,0.07)] dark:bg-slate-700 md:flex">
        <nav className="user-view__menu">
          <ul className="side-nav">
            {/* <h5 className="admin-nav__heading">User</h5> */}
            {/* {navItem('#', 'Settings', 'settings', true)}
            {navItem('/my-tours', 'My bookings', 'briefcase')}
            {navItem('/my-reviews', 'My reviews', 'star')}
            {navItem('#', 'Billing', 'credit-card')}
            {navItem('/my-favourites', 'My Favourites', 'heart')} */}
            <button
              onClick={() => navigate('/my-tasks')}
              className="ml-[4rem] inline-flex items-center rounded-lg bg-green-700 px-4 py-1 text-center font-mono text-lg font-medium text-white hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-green-400 dark:hover:bg-green-400 dark:focus:ring-green-400"
            >
              Get Assigned Tasks
            </button>
          </ul>
          {role === 'admin' && (
            <div className="admin-nav">
              <h5 className="admin-nav__heading">Admin</h5>
              <ul className="side-nav">
                {/* {navItem('#', 'Manage tours', 'map')}
                {navItem('#', 'Manage users', 'users')}
                {navItem('#', 'Manage reviews', 'star')}
                {navItem('/create-activity', 'Manage bookings', 'briefcase')} */}
                <Modal>
                  <Modal.Open opens="BookActivity-form">
                    <button
                      // onClick={() => navigate('/book-activity')}
                      className="ml-[4rem] inline-flex items-center rounded-lg bg-green-700 px-4 py-1 text-center font-mono text-lg font-medium text-white hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-green-400 dark:hover:bg-green-400 dark:focus:ring-green-400"
                    >
                      Create Activity
                    </button>
                  </Modal.Open>
                  <Modal.Window name="BookActivity-form">
                    <CreateActivityForm />
                  </Modal.Window>
                </Modal>
                {/* <Modal>
                  <Modal.Open opens="BookProject-form">
                    <button
                      // onClick={() => navigate('/book-activity')}
                      className="ml-[4rem] mt-[2rem] inline-flex items-center rounded-lg bg-green-700 px-4 py-1 text-center font-mono text-lg font-medium text-white hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-green-400 dark:hover:bg-green-400 dark:focus:ring-green-400"
                    >
                      Create Project
                    </button>
                  </Modal.Open>
                  <Modal.Window name="BookProject-form">
                    <CreateActivityForm />
                  </Modal.Window>
                </Modal> */}
                <Modal>
                  <Modal.Open opens="Make-admin">
                    <button
                      // onClick={() => navigate('/book-activity')}
                      className="ml-[4rem] mt-[2rem] inline-flex items-center rounded-lg bg-green-700 px-4 py-1 text-center font-mono text-lg font-medium text-white hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-green-400 dark:hover:bg-green-400 dark:focus:ring-green-400"
                    >
                      Make Admin
                    </button>
                  </Modal.Open>
                  <Modal.Window name="Make-admin">
                    <MakeAdminForm />
                  </Modal.Window>
                </Modal>

                <button
                  onClick={() => navigate('/all-users')}
                  className="ml-[4rem] mt-[2rem] inline-flex items-center rounded-lg bg-green-700 px-4 py-1 text-center font-mono text-lg font-medium text-white hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-green-400 dark:hover:bg-green-400 dark:focus:ring-green-400"
                >
                  View All Users
                </button>
              </ul>
            </div>
          )}
        </nav>
        <div className="user-view__content p-[2rem_0rem] md:p-[4.5rem_4rem]">
          <div className="user-view__form-container mx-auto p-[0_1rem] md:p-[0_4rem]">
            <div class="heading-secondary-container">
              <h2 className="heading-secondary ma-bt-md text-sm md:text-lg">
                Your account settings
              </h2>
            </div>
            <form className="form form-user-data" onSubmit={handleUserSubmit}>
              <div className="form__group">
                <label className="form__label" htmlFor="name">
                  Name
                </label>
                <input
                  id="name"
                  className="form__input"
                  type="text"
                  name="name"
                  defaultValue={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  disabled={isUpdating}
                  required
                />
              </div>
              <div className="form__group ma-bt-md">
                <label className="form__label" htmlFor="email">
                  Email address
                </label>
                <input
                  id="email"
                  className="form__input"
                  type="email"
                  name="email"
                  defaultValue={email}
                  disabled
                />
              </div>
              <div className="form__group form__photo-upload">
                <img
                  className="form__user-photo text-sm"
                  src={preview || photo}
                  alt={`Avatar of ${fullName}`}
                />
                <input
                  className="form__upload"
                  type="file"
                  accept="image/*"
                  id="photo"
                  name="photo"
                  onChange={handleFileChange}
                />
                <label htmlFor="photo" className="font-mono text-sm md:text-lg">
                  Choose new photo
                </label>
              </div>
              <div className="form__group text-center md:text-right">
                <button
                  className="btn btn--small btn--green btn--save-data mx-auto md:ml-[14rem]"
                  type="submit"
                  disabled={isUpdating}
                >
                  Save settings
                </button>
              </div>
            </form>
          </div>
          <div className="line">&nbsp;</div>
          <div className="user-view__form-container mx-auto p-[0_1rem] md:p-[0_4rem]">
            <div class="heading-secondary-container">
              <h2 className="heading-secondary ma-bt-md">Password change</h2>
            </div>
            <form
              className="form form-user-password"
              onSubmit={handlePasswordSubmit}
            >
              <div className="form__group">
                {!googleId && (
                  <>
                    <label className="form__label" htmlFor="password-current">
                      Current password
                    </label>
                    <input
                      id="password-current"
                      className="form__input"
                      type="password"
                      name="passwordCurrent"
                      placeholder="••••••••"
                      onChange={(e) => setCurPassword(e.target.value)}
                      disabled={isPasswordUpdating}
                      required
                      minLength="8"
                    />
                  </>
                )}
              </div>
              <div className="form__group">
                <label className="form__label" htmlFor="password">
                  New password
                </label>
                <input
                  id="password"
                  className="form__input"
                  type="password"
                  name="newPassword"
                  placeholder="••••••••"
                  onChange={(e) => setNewPassword(e.target.value)}
                  disabled={isPasswordUpdating}
                  required
                  minLength="8"
                />
              </div>
              <div className="form__group ma-bt-lg">
                <label className="form__label" htmlFor="password-confirm">
                  Confirm password
                </label>
                <input
                  id="password-confirm"
                  className="form__input"
                  type="password"
                  name="confirmPassword"
                  placeholder="••••••••"
                  onChange={(e) => setConfPassword(e.target.value)}
                  disabled={isPasswordUpdating}
                  required
                  minLength="8"
                />
              </div>
              <div className="form__group text-center md:text-right">
                <button
                  className="btn btn--small btn--green btn--save-password"
                  type="submit"
                  disabled={isPasswordUpdating}
                >
                  Save password
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Profile;
