import React from "react";
import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";

const HeroPageSection1 = ({ animationComplete }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));
  const isSmallerLaptop = useMediaQuery(theme.breakpoints.up("md"));
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));
  const isXtraLargeScreen = useMediaQuery(theme.breakpoints.up("xl"));
  const isTabletOrMobile = isMobile || isTablet;

  return (
    <Box
      sx={{
        color: "#fff",
        display: "flex",
        textAlign: isTabletOrMobile ? "center" : "left",
        justifyContent: isTabletOrMobile ? "center" : "left",
        width: {
          xs: "100%",
          sm: "95%",
          md: "100%",
        },
        px: {
          xs: 2,
          sm: 4,
          md: 0,
        },
        marginLeft: {
          xs: "2.5%",
          md: "7.5%",
        },
        marginRight: {
          xs: "2.5%",
          md: "0%",
        },
        position: "relative",
        minHeight: {
          xs: "60vh",
          md: "60vh",
        },
        zIndex: 2,
        marginTop: {
          md: "calc(45vh - 7%)",
          lg: "calc(47.5vh - 8%)",
          xl: "calc(50vh - 10%)",
        },
      }}
    >
      <Box
        sx={{
          maxWidth: {
            xs: "100%",
            sm: "100%",
            md: "85%",
          },
          padding: {
            xs: 2,
            sm: 0,
            md: 0,
          },
        }}
      >
        <Typography
          variant="h3"
          component="h1"
          sx={{
            fontWeight: 400,
            fontSize: {
              xs: `clamp(1.75rem, calc(1.25rem + 2vw), 9rem)`,
              md: `clamp(1.75rem, calc(1.25rem + 2.5vw), 9rem)`,
              lg: `clamp(1.75rem, calc(1.37rem + 3vw), 8rem)`,
              xl: `clamp(2.25rem, calc(2rem + 3vw), 10rem)`,
            },
            lineHeight: 1.167, // Line height remains the same
            letterSpacing: "-0.01562em",
            mt: {
              xs: 20,
              sm: 22,
              md: 0,
            },
          }}
        >
          Shaping the Future With
        </Typography>

        <Typography
          variant="h3"
          sx={{
            fontWeight: 600,
            lineHeight: 1.167,
            letterSpacing: "-0.01562em",
            fontSize: {
              xs: `clamp(1.75rem, calc(1.25rem + 2vw), 9rem)`,
              md: `clamp(1.75rem, calc(1.25rem + 2.5vw), 9rem)`,
              lg: `clamp(1.75rem, calc(1.37rem + 3vw), 8rem)`,
              xl: `clamp(2.25rem, calc(2rem + 3vw), 10rem)`,
            },
          }}
        >
          <Box
            component="span"
            fontWeight="bold"
            sx={{
              background: "linear-gradient(180deg, #2579e3 0%, #8e54f7 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              display: "inline-block",
              wordBreak: "break-word",
              mb: {
                xs: 2,
                sm: 2.5,
                md: 3,
              },
            }}
          >
            <span
              style={{
                background: "linear-gradient(180deg, #2579e3 0%, #8e54f7 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                display: "inline-block",
                wordBreak: "break-word",
              }}
            >
              Outcome Driven{" "}
            </span>
            &nbsp;
            <span
              style={{
                background: "linear-gradient(180deg, #2579e3 0%, #8e54f7 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                display: "inline-block",
                wordBreak: "break-word",
              }}
            >
              {" "}
              Innovation{" "}
            </span>
          </Box>
        </Typography>

        <Typography
          variant="h5"
          component="h5"
          sx={{
            fontSize: {
              xs: `clamp(0.5rem, calc(0.8rem + 0.6vw), 1.5rem)`,
              md: `clamp(0.5rem, calc(0.8rem + 0.6vw), 1.5rem)`,
              lg: `clamp(0.5rem, calc(0.8rem + 0.7vw), 1.8rem)`,
              xl: `clamp(0.5rem, calc(0.8rem + 0.8vw), 2.1rem)`,
            },
            fontWeight: 200,
            lineHeight: 1.7,
            marginLeft: isTabletOrMobile ? 0 : "1%",
            mb: {
              xs: 4,
              sm: 5,
              md: 4.5,
            },
            textAlign: isTabletOrMobile ? "center" : "left",
          }}
        >
          Unlock the potential of AI to transform your business and redefine
          success.
        </Typography>

        <Box
          sx={{
            display: "flex",
            justifyContent: isTabletOrMobile ? "center" : "flex-start",
            width: "100%",
          }}
        >
          <Typography
            component="a"
            href="/contact"
            sx={{
              display: "inline-block",
              color: "#ffffff",
              textDecoration: "none",
              fontWeight: 100,
              fontSize: {
                xs: `clamp(0rem, calc(0.5rem + 0.8vw), 5rem)`,
                md: `clamp(0rem, calc(0.5rem + 0.8vw), 5rem)`,
                xl: `clamp(0rem, calc(0.5rem + 0.8vw), 5rem)`,
              },
              border: "1px solid transparent",
              padding: {
                xs: "1.5vw 4vw",
                sm: "1vw 2vw",
              },
              borderRadius: { xs: "80px", md: "80px", xl: "80px" },
              background:
                "linear-gradient(to right, #000, #000) padding-box, linear-gradient(180deg, rgba(170, 63, 255, 0.9) 0%, rgba(94, 129, 235, 0.9) 100%) border-box",
              zIndex: 3,
              position: "relative",
              transition: "all 0.3s ease",
              width: isTabletOrMobile ? "auto" : "auto",
              textAlign: "center",
              "&:hover": {
                background:
                  "linear-gradient(180deg, rgba(170, 63, 255, 0.9) 0%, rgba(94, 129, 235, 0.9) 100%)",
                color: "#ffffff",
                transform: "scale(1.05)",
              },
            }}
          >
            Schedule a Call
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default HeroPageSection1;
