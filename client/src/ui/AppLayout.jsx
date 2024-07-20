import { Outlet } from 'react-router-dom';
// import MobileBottombar from './MobileBottombar';
import MainHeader from './Header/MainHeader';

function AppLayout() {
  return (
    <>
      <MainHeader />

      {/* <div className="fixed inset-x-0 bottom-0 z-[10] border-t border-t-grey-100 bg-white dark:border-t-grey-800 dark:bg-grey-900 lg:hidden">
          <MobileBottombar />
        </div> */}
      <div className="w-full">
        <Outlet />
      </div>
    </>
  );
}

export default AppLayout;
