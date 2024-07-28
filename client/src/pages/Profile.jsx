import { useState } from 'react';
import { useUser } from '../components/profile/useUser';
import { useUpdateUserData } from '../components/profile/useUpdateUserData';
import { useUpdateUserPassword } from '../components/profile/useUpdateUserPassword';

function Profile() {
  const {
    user: {
      data: {
        data: { name, email, role, photo },
      },
    },
  } = useUser();
  const { updateUser, isUpdating } = useUpdateUserData();
  const [fullName, setFullName] = useState(name);
  const [avatar, setAvatar] = useState(null);
  const [preview, setPreview] = useState(null);
  const { updateUserPassword, isUpdating: isPasswordUpdating } =
    useUpdateUserPassword();
  const [curPassword, setCurPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [ConfPassword, setConfPassword] = useState('');

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

  const navItem = (link, text, icon, active) => (
    <li className={`${active ? 'side-nav--active' : ''} `}>
      <a href={link}>
        <svg>
          <use xlinkHref={`#${icon}`} />
        </svg>
        <span className="text-md">{text}</span>
      </a>
    </li>
  );

  return (
    <main className="main">
      <div className="user-view">
        <nav className="user-view__menu">
          <ul className="side-nav">
            {navItem('#', 'Settings', 'settings', true)}
            {navItem('/my-tours', 'My bookings', 'briefcase')}
            {navItem('/my-reviews', 'My reviews', 'star')}
            {navItem('#', 'Billing', 'credit-card')}
            {navItem('/my-favourites', 'My Favourites', 'heart')}
          </ul>
          {role === 'admin' && (
            <div className="admin-nav">
              <h5 className="admin-nav__heading">Admin</h5>
              <ul className="side-nav">
                {navItem('#', 'Manage tours', 'map')}
                {navItem('#', 'Manage users', 'users')}
                {navItem('#', 'Manage reviews', 'star')}
                {navItem('/all-bookings', 'Manage bookings', 'briefcase')}
              </ul>
            </div>
          )}
        </nav>
        <div className="user-view__content">
          <div className="user-view__form-container">
            <div class="heading-secondary-container">
              <h2 className="heading-secondary ma-bt-md">
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
                <label htmlFor="photo" className="font-mono text-lg">
                  Choose new photo
                </label>
              </div>
              <div className="form__group right">
                <button
                  className="btn btn--small btn--green btn--save-data"
                  type="submit"
                  disabled={isUpdating}
                >
                  Save settings
                </button>
              </div>
            </form>
          </div>
          <div className="line">&nbsp;</div>
          <div className="user-view__form-container">
            <div class="heading-secondary-container">
              <h2 className="heading-secondary ma-bt-md">Password change</h2>
            </div>
            <form
              className="form form-user-password"
              onSubmit={handlePasswordSubmit}
            >
              <div className="form__group">
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
              <div className="form__group right">
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
