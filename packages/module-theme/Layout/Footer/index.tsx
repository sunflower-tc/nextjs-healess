import { useQuery } from '@apollo/client';
import { Trans } from '@lingui/macro';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';

import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { STORE_CONFIG, getKeyFromStorage } from '@store/local-storage';
import { isValidArray } from '@utils/Helper';
import { FooterPlaceHolder } from '@voguish/module-theme';
import Containers from '@voguish/module-theme/components/ui/Container';
import Footer_Query from '@voguish/module-theme/graphql/footer.graphql';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { FooterLinksResult, SubLinks } from './type';
const Facebook = dynamic(() => import('@mui/icons-material/Facebook'));
const Instagram = dynamic(() => import('@mui/icons-material/Instagram'));
const LinkedIn = dynamic(() => import('@mui/icons-material/LinkedIn'));
const Twitter = dynamic(() => import('@mui/icons-material/Twitter'));
const YouTube = dynamic(() => import('@mui/icons-material/YouTube'));

const StoreSwitcher = dynamic(
  () => import('@voguish/module-store/StoreSwitcher')
);

const parseLink = (option: SubLinks) => {
  if (option.type === 'category') {
    return `/catalog/category/${option.url_key}`;
  }

  if (option.type === 'page') {
    return `/${option.url_key}.html`;
  }

  return `/${option.url_key}`;
};

const Footer = () => {
  const { data, loading } = useQuery<FooterLinksResult>(Footer_Query);
  const requiredKey = 'copyright';
  const storeData = getKeyFromStorage(STORE_CONFIG, requiredKey) || {};

  return (
    <footer>
      {loading ? (
        <FooterPlaceHolder />
      ) : (
        <>
          <div className="flex-col hidden w-full max-w-2xl gap-y-4 gap-x-10 md:flex-row-reverse md:justify-between" />
          <>
            <Containers className="justify-between hidden w-full px-0 pt-12 pb-16 md:flex">
              {isValidArray(data?.footerLinks) && (
                <Grid className="hidden w-full gap-4 md:items-start md:justify-between md:flex md:flex-wrap">
                  {data?.footerLinks.map((footerLink) => (
                    <Grid key={footerLink.uid} item>
                      <Stack spacing={2}>
                        <Typography
                          variant="body1"
                          component="p"
                          className="font-semibold uppercase"
                        >
                          {footerLink.title}
                        </Typography>
                        {isValidArray(footerLink.subLinks) && (
                          <Stack spacing={0.5}>
                            {footerLink.subLinks.map((option) => (
                              <Typography
                                key={option.url_key}
                                variant="body1"
                                className="text-[#64687A] cta hover:text-brand duration-200 max-w-fit"
                              >
                                <Link
                                  className="hover-underline-animation"
                                  href={parseLink(option)}
                                  rel="noopener noreferrer"
                                  target="_blank"
                                >
                                  {option.title}
                                </Link>
                              </Typography>
                            ))}
                          </Stack>
                        )}
                      </Stack>
                    </Grid>
                  ))}
                </Grid>
              )}
            </Containers>
            <div className="hidden w-full px-6 py-3 md:flex bg-secondary">
              <div className="flex flex-row items-center justify-between w-full text-white -sm:flex-col">
                <div className="flex w-full -md:justify-center">
                  <Typography className="-sm:text-center text-[0.875rem]">
                    {storeData ? storeData : ''}
                  </Typography>
                </div>
                <div className="flex items-center justify-center w-full gap-4 -md:pt-4 md:justify-end">
                  <div className="-lg:hidden">
                    <StoreSwitcher />
                  </div>
                  <div className="flex items-center -md:grid gap-1.5 -md:flex-row -sm:flex -lg:flex-col">
                    <Typography className="text-[0.875rem]">
                      <Trans>FIND US ON :</Trans>
                    </Typography>
                    <span className="flex gap-2">
                      <Button
                        className="min-w-0 min-h-0 p-2 text-white border border-white w-7 h-7 "
                        aria-label="Facebook"
                        variant="outlined"
                      >
                        <Facebook fontSize="small" />
                      </Button>

                      <Button
                        aria-label="Instagram"
                        className="min-w-0 min-h-0 p-2 text-white border border-white w-7 h-7 "
                        variant="outlined"
                      >
                        <Instagram fontSize="small" />
                      </Button>

                      <Button
                        aria-label="Twitter"
                        className="min-w-0 min-h-0 p-2 text-white border border-white w-7 h-7 "
                        variant="outlined"
                      >
                        <Twitter fontSize="small" />
                      </Button>
                      <Button
                        aria-label="Linkedin"
                        className="min-w-0 min-h-0 p-2 text-white border border-white w-7 h-7 "
                        variant="outlined"
                      >
                        <LinkedIn fontSize="small" />
                      </Button>
                      <Button
                        aria-label="Youtube"
                        className="min-w-0 min-h-0 p-2 text-white border border-white w-7 h-7 "
                        variant="outlined"
                      >
                        <YouTube fontSize="small" />
                      </Button>
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <Containers className="-md:!mx-0 md:hidden -md:!px-0 px-0 pt-12 pb-3">
              <Accordion className=" shadow-[unset] my-0" elevation={0}>
                <AccordionSummary
                  className="mx-0"
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography variant="body1" className="font-semibold">
                    Explore More
                  </Typography>
                </AccordionSummary>
                <AccordionDetails className="p-0">
                  <div className="px-5 pb-4">
                    {isValidArray(data?.footerLinks) && (
                      <Grid className="grid items-start justify-between grid-cols-2 gap-4">
                        {data?.footerLinks.map((footerLink) => (
                          <Grid key={footerLink.uid} item xs={6} lg={3}>
                            <Stack spacing={2}>
                              <Typography
                                variant="body1"
                                component="p"
                                className="font-semibold uppercase"
                              >
                                {footerLink.title}
                              </Typography>
                              {isValidArray(footerLink.subLinks) && (
                                <Stack spacing={0.5}>
                                  {footerLink.subLinks.map((option) => (
                                    <Typography
                                      key={option.url_key}
                                      variant="body1"
                                      className="text-[#64687A] cta hover:text-brand duration-200 max-w-fit"
                                    >
                                      <Link
                                        className="hover-underline-animation"
                                        href={parseLink(option)}
                                        rel="noopener noreferrer"
                                        target="_blank"
                                      >
                                        {option.title}
                                      </Link>
                                    </Typography>
                                  ))}
                                </Stack>
                              )}
                            </Stack>
                          </Grid>
                        ))}
                      </Grid>
                    )}
                  </div>
                  <div className="flex w-full px-6 py-3 bg-secondary">
                    <div className="flex flex-row items-center justify-between w-full text-white -sm:flex-col">
                      <div className="flex w-full -md:justify-center">
                        <Typography className="-sm:text-center text-[0.875rem]">
                          {storeData ? storeData : ''}
                        </Typography>
                      </div>
                      <div className="flex items-center justify-center w-full gap-4 -md:pt-4 md:justify-end">
                        <div className="-lg:hidden">
                          <StoreSwitcher />
                        </div>
                        <div className="flex items-center -md:grid gap-1.5 -md:flex-row -sm:flex -lg:flex-col">
                          <Typography className="text-[0.875rem]">
                            <Trans>FIND US ON :</Trans>
                          </Typography>
                          <span className="flex gap-2">
                            <Button
                              className="min-w-0 min-h-0 p-2 text-white border border-white w-7 h-7 "
                              aria-label="Facebook"
                              variant="outlined"
                            >
                              <Facebook fontSize="small" />
                            </Button>

                            <Button
                              aria-label="Instagram"
                              className="min-w-0 min-h-0 p-2 text-white border border-white w-7 h-7 "
                              variant="outlined"
                            >
                              <Instagram fontSize="small" />
                            </Button>

                            <Button
                              aria-label="Twitter"
                              className="min-w-0 min-h-0 p-2 text-white border border-white w-7 h-7 "
                              variant="outlined"
                            >
                              <Twitter fontSize="small" />
                            </Button>
                            <Button
                              aria-label="Linkedin"
                              className="min-w-0 min-h-0 p-2 text-white border border-white w-7 h-7 "
                              variant="outlined"
                            >
                              <LinkedIn fontSize="small" />
                            </Button>
                            <Button
                              aria-label="Youtube"
                              className="min-w-0 min-h-0 p-2 text-white border border-white w-7 h-7 "
                              variant="outlined"
                            >
                              <YouTube fontSize="small" />
                            </Button>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </AccordionDetails>
              </Accordion>
            </Containers>
          </>
        </>
      )}
    </footer>
  );
};

export default Footer;
