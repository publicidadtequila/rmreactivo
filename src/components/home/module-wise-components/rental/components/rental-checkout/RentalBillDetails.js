import { fontWeight } from "@mui/system";
import H3 from "components/typographies/H3";
import React from "react";
import { CustomBoxFullWidth } from "styled-components/CustomStyles.style";
import ErrorIcon from "@mui/icons-material/Error";
import { Box, Grid, Stack, Tooltip, Typography } from "@mui/material";
import { t } from "i18next";
import { PrimaryToolTip } from "components/cards/QuickView";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { getAmountWithSign } from "helper-functions/CardHelpers";
import { getTaxableTotalPrice } from "utils/CustomFunctions";
import { useSelector } from "react-redux";
const RentalBillDetails = ({
  showTotal = true,
  tripDiscount,
  tripCost,
  subTotal,
  rentalCoupon,
  vatTax,
  storeData,
  totalPrice,
  couponDiscount,
  vatPer,
  additionalCharge,
}) => {
  const { configData } = useSelector((state) => state.configData);
  return (
    <>
      <CustomBoxFullWidth
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <H3
          text={t("Bill Details")}
          sx={{
            fontWeight: "700",
            color: (theme) => theme.palette.neutral[1000],
          }}
        />
        <Tooltip
          title={t(
            "Price may vary based on time or distance and total trip cost  calculated accordingly."
          )}
          placement="bottom"
          arrow
          componentsProps={{
            tooltip: {
              sx: {
                bgcolor: (theme) => theme.palette.toolTipColor,
                "& .MuiTooltip-arrow": {
                  color: (theme) => theme.palette.toolTipColor,
                },
              },
            },
          }}
        >
          <ErrorIcon
            sx={{
              fontSize: "18px",
              cursor: "pointer",
              color: (theme) => theme.palette.primary.main,
            }}
          />
        </Tooltip>
      </CustomBoxFullWidth>
      <CustomBoxFullWidth
        sx={{
          border: (theme) => `1px solid ${theme.palette.neutral[200]}`,
          my: "10px",
          borderRadius: "10px",
          p: "20px",
        }}
      >
        <Box
          sx={{
            borderBottom: (theme) => `1px solid ${theme.palette.neutral[200]}`,
          }}
        >
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{ mb: "15px" }}
          >
            <Typography
              sx={{
                fontSize: "14px",
                fontWeight: "400",
                color: (theme) => theme.palette.neutral[600],
              }}
            >
              {t("Trip Cost")}
            </Typography>
            <Typography
              sx={{
                fontSize: "14px",
                fontWeight: "400",
                color: (theme) => theme.palette.neutral[600],
              }}
            >
              {getAmountWithSign(tripCost)}
            </Typography>
          </Stack>

          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{ mb: "15px" }}
          >
            <Typography
              sx={{
                fontSize: "14px",
                fontWeight: "400",
                color: (theme) => theme.palette.neutral[600],
              }}
            >
              {t("Trip Discount")}
            </Typography>
            <Typography
              sx={{
                fontSize: "14px",
                fontWeight: "400",
                color: (theme) => theme.palette.neutral[600],
              }}
            >
              -{getAmountWithSign(tripDiscount>tripCost? tripCost : tripDiscount)}
            </Typography>
          </Stack>
          {rentalCoupon || couponDiscount ? (
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              sx={{ mb: "15px" }}
            >
              <Typography
                sx={{
                  fontSize: "14px",
                  fontWeight: "400",
                  color: (theme) => theme.palette.neutral[600],
                }}
              >
                {t("Coupon Discount")}
              </Typography>
              <Typography
                sx={{
                  fontSize: "14px",
                  fontWeight: "400",
                  color: (theme) => theme.palette.neutral[600],
                }}
              >
                - {getAmountWithSign(rentalCoupon)}
              </Typography>
            </Stack>
          ) : (
            ""
          )}
        </Box>
        <Box
          sx={{
            borderBottom: (theme) =>
              showTotal && `1px solid ${theme.palette.neutral[200]}`,
            mt: "15px",
          }}
        >
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{ mb: "15px" }}
          >
            <Typography
              sx={{
                fontSize: "14px",
                fontWeight: "600",
                color: (theme) => theme.palette.neutral[500],
              }}
              component="span"
            >
              {t("Subtotal")}
             <Typography
               sx={{
                 fontSize: "12px",
                 fontWeight: "400",
                 color: (theme) => theme.palette.neutral[500],
               }}
               component="span"
             >
               {" "} {vatTax?.tax_included === 1 && vatTax?.tax_included!==null && ("(Vat/Tax incl.)")}
             </Typography>
            </Typography>
            <Typography
              sx={{
                fontSize: "14px",
                fontWeight: "600",
                color: (theme) => theme.palette.neutral[500],
              }}
            >
              {getAmountWithSign(subTotal) }

            </Typography>
          </Stack>
          {(vatTax?.tax_included!==null || vatTax?.tax_included===0 ) && vatTax?.tax_amount>0 ? (
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              sx={{ mb: "15px" }}
            >
              <Typography
                sx={{
                  fontSize: "14px",
                  fontWeight: "400",
                  color: (theme) => theme.palette.neutral[600],
                }}
              >
                {t("VAT/TAX")}{" "}
              </Typography>
              <Typography
                sx={{
                  fontSize: "14px",
                  fontWeight: "400",
                  color: (theme) => theme.palette.neutral[600],
                }}
              >
                {vatTax?.tax_included === 0 && <>{"+"}</>}
                {getAmountWithSign(vatTax?.tax_amount)}
              </Typography>
            </Stack>
          ):null}


          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{ mb: "15px" }}
          >
            <Typography
              sx={{
                fontSize: "14px",
                fontWeight: "400",
                display: "flex",
                alignItems: "center",
                gap: "5px",
                color: (theme) => theme.palette.neutral[600],
              }}
            >
              {t("Service Fee")}{" "}
              <Tooltip
                title={t("This amount is for service maintenance.")}
                placement="bottom"
                arrow
                componentsProps={{
                  tooltip: {
                    sx: {
                      bgcolor: (theme) => theme.palette.toolTipColor,
                      "& .MuiTooltip-arrow": {
                        color: (theme) => theme.palette.toolTipColor,
                      },
                    },
                  },
                }}
              >
                <InfoOutlinedIcon
                  sx={{
                    fontSize: "14px",
                    color: (theme) => theme.palette.neutral[1000],
                  }}
                />
              </Tooltip>
            </Typography>
            <Typography
              sx={{
                fontSize: "14px",
                fontWeight: "400",
                color: (theme) => theme.palette.neutral[600],
              }}
            >
              + {getAmountWithSign(additionalCharge)}
            </Typography>
          </Stack>
        </Box>
        {showTotal && (
          <Box
            sx={{
              mt: "15px",
            }}
          >
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              sx={{ mb: "15px" }}
            >
              <Typography
                sx={{
                  fontSize: "14px",
                  fontWeight: "600",
                  color: (theme) => theme.palette.neutral[500],
                }}
              >
                {t("Total")}
              </Typography>
              <Typography
                sx={{
                  fontSize: "14px",
                  fontWeight: "600",
                  color: (theme) => theme.palette.neutral[500],
                }}
              >
                {getAmountWithSign(totalPrice)}
              </Typography>
            </Stack>

            {/*<Stack*/}
            {/*	direction="row"*/}
            {/*	justifyContent="space-between"*/}
            {/*	alignItems="center"*/}
            {/*	sx={{ mb: "15px" }}*/}
            {/*>*/}
            {/*	<Typography*/}
            {/*		sx={{ fontSize: "14px", fontWeight: "400" }}*/}
            {/*	>*/}
            {/*		{t("Due Amount")}*/}
            {/*	</Typography>*/}
            {/*	<Typography*/}
            {/*		sx={{ fontSize: "14px", fontWeight: "400" }}*/}
            {/*	>*/}
            {/*		$500.00*/}
            {/*	</Typography>*/}
            {/*</Stack>*/}
          </Box>
        )}
      </CustomBoxFullWidth>
    </>
  );
};

export default RentalBillDetails;
