import { Navbar } from '@mantine/core';
import NavbarLinksGroup from './NavbarLinksGroup';
import paths from './NavbarPath';

function CustomNavBar() {
  const links = paths.map((item) => <NavbarLinksGroup {...item} key={item.label} />);

  return (
    <Navbar width={{ base: 270 }} p='md'>
      <Navbar.Section grow>
        {links}
      </Navbar.Section>
    </Navbar>
  );
}

export default CustomNavBar;
