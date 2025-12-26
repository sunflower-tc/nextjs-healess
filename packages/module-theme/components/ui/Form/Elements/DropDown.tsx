import Button from '@mui/material/Button';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grid from '@mui/material/Grid';
import Grow from '@mui/material/Grow';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import Typography from '@mui/material/Typography';
import { isValidArray } from '@utils/Helper';
import ErrorBoundary from '@voguish/module-theme/components/ErrorBoundary';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import {
  KeyboardEvent,
  SyntheticEvent,
  useEffect,
  useRef,
  useState,
} from 'react';
import Containers from '../../Container';
import { Link } from '../../Link';
const ExpandMoreIcon = dynamic(() => import('@mui/icons-material/ExpandMore'));

// for desktop view

export default function DropDown({ items, url, name, level = 0 }: any) {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef<HTMLButtonElement>(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: Event | SyntheticEvent) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event: KeyboardEvent) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === 'Escape') {
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current!.focus();
    }

    prevOpen.current = open;
  }, [open]);
  const router = useRouter();
  return (
    <ErrorBoundary>
      <span className="flex cta">
        <span className="flex space-x-1 hover-underline-animation">
          <Button
            sx={{ minWidth: 0, padding: 0 }}
            id={`'composition-button-'${url}`}
          >
            {url ? (
              <Link underline="none" href={`/catalog/category/${url}`}>
                <span
                  className={`${
                    router.asPath == `/catalog/category/${url}`
                      ? 'text-brand'
                      : ' text-black hover:text-link'
                  } font-medium`}
                >
                  {name}
                </span>
              </Link>
            ) : (
              <Link underline="none" href={`/catalog/category/${url}`}>
                <span
                  className={`${
                    router.asPath == `/catalog/category/${url}`
                      ? 'text-brand'
                      : ' text-black hover:text-link'
                  } font-medium`}
                >
                  {name}
                </span>
              </Link>
            )}
          </Button>
          <Button
            className={`${open && 'rotate-180 transform duration-700'}`}
            sx={{ minWidth: 0, padding: 0 }}
            variant="text"
            ref={anchorRef}
            aria-label={name}
            onClick={handleToggle}
            aria-controls={open ? 'composition-menu' : undefined}
            aria-expanded={open ? 'true' : undefined}
            aria-haspopup="true"
          >
            <ExpandMoreIcon />
          </Button>
        </span>
      </span>
      <span className="nestedSide">
        <Popper
          className="w-full"
          open={open}
          anchorEl={anchorRef.current}
          role={undefined}
          placement="bottom-start"
          transition
          disablePortal
        >
          {({ TransitionProps, placement }) => (
            <Grow
              className="max-w-full"
              {...TransitionProps}
              style={{
                transformOrigin:
                  placement === 'bottom-start' ? 'left top' : 'left bottom',
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList
                    autoFocusItem={open}
                    id="composition-menu"
                    aria-labelledby={`'composition-button-'${url}`}
                    onKeyDown={handleListKeyDown}
                  >
                    <Containers>
                      {isValidArray(items) && (
                        <span className="grid grid-cols-3 py-5">
                          {items.map(
                            (item: any, index: number) =>
                              index >= level && (
                                <Grid key={index}>
                                  <span className="grid">
                                    <ListItem
                                      color={`${
                                        isValidArray(items) && 'text-slate-500'
                                      }`}
                                      handleClose={handleClose}
                                      item={item}
                                    />

                                    {isValidArray(item?.children) &&
                                      item?.children.map(
                                        (
                                          item: {
                                            url_key: string;
                                            name: string;
                                            children: [];
                                          },
                                          index: number
                                        ) => (
                                          <span key={index}>
                                            <ListItem
                                              handleClose={handleClose}
                                              item={item}
                                            />
                                          </span>
                                        )
                                      )}
                                  </span>
                                </Grid>
                              )
                          )}
                        </span>
                      )}
                    </Containers>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </span>
    </ErrorBoundary>
  );
}

function ListItem({
  handleClose,
  item,
  color,
}: {
  color?: string;
  handleClose?: Function | any;
  item?: { url_key: string; name: string };
}) {
  const router = useRouter();

  return (
    <ErrorBoundary>
      <Link href={`/catalog/category/${item?.url_key}`} underline="none">
        <MenuItem className="cta" onClick={handleClose}>
          <Typography
            onClick={handleClose}
            className={`${
              router.asPath == `/catalog/category/${item?.url_key}`
                ? 'text-brand'
                : `${color} text-black hover:text-link`
            } hover-underline-animation flex items-center font-semibold`}
          >
            {item?.name}
          </Typography>
        </MenuItem>
      </Link>
    </ErrorBoundary>
  );
}
