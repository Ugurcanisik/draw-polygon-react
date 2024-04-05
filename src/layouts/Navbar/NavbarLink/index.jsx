import { NavLink } from 'react-router-dom';
import { createStyles, Tooltip, UnstyledButton } from '@mantine/core';

const useStyles = createStyles((theme) => ({
  link: {
    width: 50,
    height: 50,
    borderRadius: theme.radius.md,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[0]
    }
  },
  active: {
    '&, &:hover': {
      backgroundColor: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).background,
      color: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).color
    }
  }
}));

function NavbarLink({
  icon: Icon, label, active, onClick, path = ''
}) {
  const { classes, cx } = useStyles();
  return (
    <NavLink to={path}>
      <Tooltip label={label} position='right' transitionDuration={0}>
        <UnstyledButton onClick={onClick} className={cx(classes.link, { [classes.active]: active })}>
          <Icon stroke={1.5} />
        </UnstyledButton>
      </Tooltip>
    </NavLink>

  );
}

export default NavbarLink;
