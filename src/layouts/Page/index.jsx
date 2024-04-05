import { AppShell } from '@mantine/core';
import { Outlet } from 'react-router-dom';
import CustomNavbar from '../Navbar/index';
import CustomHeader from '../Header/index';

function Page() {
  return (
    <AppShell navbar={<CustomNavbar />} header={<CustomHeader />}>
      <Outlet />
    </AppShell>
  );
}

export default Page;
