import { useState } from 'react';
import {
  Group,
  Box,
  Collapse,
  ThemeIcon,
  Text,
  UnstyledButton,
  createStyles
} from '@mantine/core';
import { IconChevronLeft, IconChevronRight } from '@tabler/icons';
import { useNavigate } from 'react-router-dom';


const useStyles = createStyles((theme) => ({
  control: {
    fontWeight: 500,
    display: 'block',
    width: '100%',
    padding: `${theme.spacing.xs} ${theme.spacing.md}`,
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
    fontSize: theme.fontSizes.sm,

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[0],
      color: theme.colorScheme === 'dark' ? theme.white : theme.black
    }
  },

  link: {
    fontWeight: 500,
    display: 'block',
    textDecoration: 'none',
    padding: '16px 32px 16px',
    fontSize: theme.fontSizes.sm,
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
    borderLeft: `1px solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[0],
      color: theme.colorScheme === 'dark' ? theme.white : theme.black
    }
  },

  chevron: {
    transition: 'transform 200ms ease'
  }
}));

function LinksGroup({ icon: Icon, label, initiallyOpened, links }) {
  const items = []
  const navigate = useNavigate();
  const { classes, theme } = useStyles();
  const [opened, setOpened] = useState(initiallyOpened || false);
  const ChevronIcon = theme.dir === 'ltr' ? IconChevronRight : IconChevronLeft;
  for (const link of links) {
    items.push((
      <Text
        className={classes.link}
        href={link.link}
        key={link.label}
        onClick={() => navigate(link.link)}
      >
        {link.label}
      </Text>
    ))
  }

  return (
    <>
      <UnstyledButton onClick={() => setOpened((o) => !o)} className={classes.control}>
        <Group position='apart' spacing={0}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <ThemeIcon variant='light' size={30}>
              <Icon size='1.1rem' />
            </ThemeIcon>
            <Box ml='md'>{label}</Box>
          </Box>
          <ChevronIcon
            className={classes.chevron}
            size='1rem'
            stroke={1.5}
            style={
              {
                transform: opened ? `rotate(${theme.dir === 'rtl' ? -90 : 90}deg)` : 'none'
              }
            }
          />
        </Group>
      </UnstyledButton>
      <Collapse in={opened}>{items}</Collapse>
    </>
  );
}

export default LinksGroup;
