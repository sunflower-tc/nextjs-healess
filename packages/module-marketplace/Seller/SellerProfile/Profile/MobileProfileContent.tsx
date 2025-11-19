import { Trans } from '@lingui/macro';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useTheme } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { IProfileProps } from '@voguish/module-marketplace';
import { HTMLRenderer } from '@voguish/module-theme';
import dynamic from 'next/dynamic';
import React, { useState } from 'react';
const AllProductGrid = dynamic(() => import('../AllProductGrid'));
const Review = dynamic(
  () => import('@voguish/module-marketplace/Components/Reviews/Review')
);
export const MobileContent = (props: IProfileProps) => {
  const { id, rating, returnPolicy, shippingPolicy, contactNumber, email } =
    props;
  const [expandedPanel, setExpandedPanel] = useState<string | false>(false);

  const handleAccordionChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpandedPanel(isExpanded ? panel : false);
    };

  const muiTheme = useTheme();

  return (
    <>
      <Box
        sx={{
          paddingBlockStart: '0.5rem',
        }}
      >
        <Accordion
          expanded={expandedPanel === 'panel1'}
          onChange={handleAccordionChange('panel1')}
        >
          <AccordionSummary
            expandIcon={
              <ExpandMoreIcon
                sx={{
                  color: muiTheme.palette.common.black,
                  fontSize: '1.75rem',
                }}
              />
            }
          >
            <Typography variant="subtitle1">
              <Trans>All Products</Trans>
            </Typography>
          </AccordionSummary>

          <AccordionDetails>
            <AllProductGrid sellerId={String(id)} title="Sellers collection" />
          </AccordionDetails>
        </Accordion>

        <Accordion
          expanded={expandedPanel === 'panel2'}
          onChange={handleAccordionChange('panel2')}
        >
          <AccordionSummary
            expandIcon={
              <ExpandMoreIcon
                sx={{
                  color: muiTheme.palette.common.black,
                  fontSize: '1.75rem',
                }}
              />
            }
          >
            <Typography variant="subtitle1">
              <Trans>Recently Added Product</Trans>
            </Typography>
          </AccordionSummary>

          <AccordionDetails>
            <AllProductGrid
              title="Recently Added"
              sellerId={String(id)}
              pageSize={3}
              showPagination={false}
            />
          </AccordionDetails>
        </Accordion>

        <Accordion
          expanded={expandedPanel === 'panel3'}
          onChange={handleAccordionChange('panel3')}
        >
          <AccordionSummary
            expandIcon={
              <ExpandMoreIcon
                sx={{
                  color: muiTheme.palette.common.black,
                  fontSize: '1.75rem',
                }}
              />
            }
          >
            <Typography variant="subtitle1">
              <Trans>Reviews</Trans>
            </Typography>
          </AccordionSummary>

          <AccordionDetails>
            <Review id={id} totalRating={rating} />
          </AccordionDetails>
        </Accordion>

        <Accordion
          expanded={expandedPanel === 'panel4'}
          onChange={handleAccordionChange('panel4')}
        >
          <AccordionSummary
            expandIcon={
              <ExpandMoreIcon
                sx={{
                  color: muiTheme.palette.common.black,
                  fontSize: '1.75rem',
                }}
              />
            }
          >
            <Typography variant="subtitle1">
              <Trans> Policy</Trans>
            </Typography>
          </AccordionSummary>

          <AccordionDetails>
            <Typography variant="body2" textAlign="justify">
              <HTMLRenderer htmlText={returnPolicy}></HTMLRenderer>
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion
          expanded={expandedPanel === 'panel5'}
          onChange={handleAccordionChange('panel5')}
        >
          <AccordionSummary
            expandIcon={
              <ExpandMoreIcon
                sx={{
                  color: muiTheme.palette.common.black,
                  fontSize: '1.75rem',
                }}
              />
            }
          >
            <Typography variant="subtitle1">
              <Trans>Shipping Policy</Trans>
            </Typography>
          </AccordionSummary>

          <AccordionDetails>
            <Typography variant="body2" textAlign="justify">
              <HTMLRenderer htmlText={shippingPolicy}></HTMLRenderer>
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion
          expanded={expandedPanel === 'panel6'}
          onChange={handleAccordionChange('panel6')}
        >
          <AccordionSummary
            expandIcon={
              <ExpandMoreIcon
                sx={{
                  color: muiTheme.palette.common.black,
                  fontSize: '1.75rem',
                }}
              />
            }
          >
            <Typography variant="subtitle1">
              <Trans>Seller Contact</Trans>
            </Typography>
          </AccordionSummary>

          <AccordionDetails>
            <Typography variant="body2">
              <Trans>Phone :</Trans>
            </Typography>
            <Typography variant="body2">
              <Trans>Mobile : </Trans>
              {contactNumber}
            </Typography>
            <Typography variant="body2">
              <Trans>Email : </Trans>
              {email}
            </Typography>
          </AccordionDetails>
        </Accordion>
      </Box>
    </>
  );
};
