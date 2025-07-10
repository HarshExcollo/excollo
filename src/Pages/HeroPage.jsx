import React, { useState, useEffect, useRef } from "react";
import { Box, Fade, Button, useTheme, useMediaQuery } from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import ThreeDE from "../Components/ThreeDE";
import NavBar from "../Components/NavBar";
import HeroPageSection1 from "../Components/LandingPage/HeroPageSection1";
import HeroPageSection2 from "../Components/LandingPage/HeroPageSection2";
import HeroPageSection3 from "../Components/LandingPage/HeroPageSection3/HeroPageSection3";
import HeroPageSection4 from "../Components/LandingPage/HeroPageSection4";
import HeroPageSection5 from "../Components/LandingPage/HeroPageSection5";
import Footer from "../Components/Footer";
import HeroPageSection6 from "../Components/LandingPage/HeroPageSection6";
import HeroPageSection7 from "../Components/LandingPage/HeroPageSection7";
import { useLocation } from "react-router-dom";
import { ErrorBoundary } from "./ErrorBoundary";
import { IoLogoWhatsapp } from "react-icons/io5";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, MotionPathPlugin);

const HeroPage = () => {
  const [showThreeDE, setShowThreeDE] = useState(true);
  const [animationComplete, setAnimationComplete] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [showWhatsAppButton, setShowWhatsAppButton] = useState(false);
  const [hero1Complete, setHero1Complete] = useState(false);
  const [hero2Complete, setHero2Complete] = useState(false);
  const threeDERef = useRef(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));
  const isSpecificSize = useMediaQuery(theme.breakpoints.up("md"));
  const isLargeScreenSize = useMediaQuery(theme.breakpoints.up("lg"));
  const isXtraLargeScreenSize = useMediaQuery(theme.breakpoints.up("xl"));
  const isDesktop = !isMobile && !isTablet;

   useEffect(() => {
     let resizeTimeout;
     const handleResize = () => {
       // Only reload if there's a significant change in screen width
       const currentWidth = window.innerWidth;
       const storedWidth = parseInt(
         sessionStorage.getItem("screenWidth") || "0"
       );
       // Check if width changed by more than 100px (adjust this threshold as needed)
       if (Math.abs(currentWidth - storedWidth) > 100) {
         sessionStorage.setItem("screenWidth", currentWidth.toString());
         window.location.reload();
       }
     };
     const debouncedResize = () => {
       clearTimeout(resizeTimeout);
       resizeTimeout = setTimeout(handleResize, 250); // Wait 250ms after resize ends
     };
     // Store initial width
     sessionStorage.setItem("screenWidth", window.innerWidth.toString());
     // Add debounced event listener
     window.addEventListener("resize", debouncedResize);
     return () => {
       window.removeEventListener("resize", debouncedResize);
       clearTimeout(resizeTimeout);
     };
   }, []);
   // Add orientation change handler separately if needed
   useEffect(() => {
     const handleOrientationChange = () => {
       // Wait for the orientation change to complete
       setTimeout(() => {
         window.location.reload();
       }, 100);
     };
     window.addEventListener("orientationchange", handleOrientationChange);
     return () => {
       window.removeEventListener("orientationchange", handleOrientationChange);
     };
   }, []);

  // scroll remember
  const location = useLocation();

  useEffect(() => {
    const saveScroll = () =>
      sessionStorage.setItem("scrollY", ScrollTrigger.scroll());
    window.addEventListener("beforeunload", saveScroll);

    return () => {
      window.removeEventListener("beforeunload", saveScroll);
    };
  }, []);

  useEffect(() => {
    let savedScrollY = sessionStorage.getItem("scrollY");
    if (savedScrollY) {
      gsap.to(window, { scrollTo: savedScrollY, duration: 0.5 });
    }
  }, [location]);

  // threeDE animation with scrollTrigger
  const ANIMATION_SESSION_DURATION = 1 * 60 * 60 * 1000;

  const [hasAnimationPlayed, setHasAnimationPlayed] = useState(() => {
    const lastAnimationTime = localStorage.getItem("lastAnimationTime");
    if (!lastAnimationTime) return false;

    const timeSinceLastAnimation = Date.now() - parseInt(lastAnimationTime);
    return timeSinceLastAnimation < ANIMATION_SESSION_DURATION;
  });

  const [threeDEPosition, setThreeDEPosition] = useState(() => {
    const savedPosition = localStorage.getItem("threeDEPosition");
    return savedPosition ? JSON.parse(savedPosition) : null;
  });

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 250) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setShowWhatsAppButton(true);
      } else {
        setShowButton(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (!hero1Complete || showThreeDE) {
      document.body.style.overflow = "hidden";
    } else {
      setTimeout(() => {
        document.body.style.overflow = "auto";
      }, 100);
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [hero1Complete, showThreeDE]);

  useEffect(() => {
    if (!hasAnimationPlayed) {
      const rotationDuration = 1;
      const timer = setTimeout(() => {
        setShowThreeDE(false);
      }, rotationDuration * 1000);
      return () => clearTimeout(timer);
    } else {
      setShowThreeDE(false);
    }
  }, [hasAnimationPlayed]);

  useEffect(() => {
    // Function to run the animation
    const runAnimation = () => {
      const timeline = gsap.timeline();

      if (isDesktop) {
        if (isSpecificSize) {
          timeline.to(".threeDE", {
            x: "32%",
            y: "0%",
            duration: 0.7,
            ease: "power2.out",
            onComplete: () => {
              localStorage.setItem(
                "threeDEPosition",
                JSON.stringify({ x: "32%", y: "0%" })
              );
            },
          });
        } else {
          timeline.to(".threeDE", {
            x: "28%",
            y: "0%",
            duration: 0.7,
            ease: "power2.out",
            onComplete: () => {
              localStorage.setItem(
                "threeDEPosition",
                JSON.stringify({ x: "28%", y: "0%" })
              );
            },
          });
        }

        timeline.add([
          gsap.fromTo(
            [".gradient-background",".navbar", ".hero-content"],
            {
              opacity: 0,
              x: -100,
            },
            {
              opacity: 1,
              x: 0,
              duration: 0.5,
              ease: "power2.out",
              onComplete: () => {
                setAnimationComplete(true);
                setTimeout(() => {
                  setHero1Complete(true);
                  // Save animation timestamp
                  localStorage.setItem(
                    "lastAnimationTime",
                    Date.now().toString()
                  );
                  setHasAnimationPlayed(true);
                }, 500);
              },
            }
          ),
        ]);
      }
    };

    // Function to skip animation and set default styles
    const skipAnimation = () => {
      setAnimationComplete(true);
      setHero1Complete(true);

      const elements = {
        navbar: document.querySelector(".navbar"),
        heroContent: document.querySelector(".hero-content"),
        gradientBackground: document.querySelector(".gradient-background"),
      };

      Object.values(elements).forEach((element) => {
        if (element) {
          element.style.opacity = "1";
          if (element !== elements.gradientBackground) {
            element.style.transform = "translateX(0)";
          }
        }
      });
    };

    if (!showThreeDE) {
      const lastAnimationTime = localStorage.getItem("lastAnimationTime");
      const timeSinceLastAnimation = lastAnimationTime
        ? Date.now() - parseInt(lastAnimationTime)
        : ANIMATION_SESSION_DURATION + 1;

      if (
        !lastAnimationTime ||
        timeSinceLastAnimation >= ANIMATION_SESSION_DURATION
      ) {
        // Run animation if it's the first time or session has expired
        runAnimation();
      } else {
        // Skip animation if within session duration
        skipAnimation();
      }
    }

    ScrollTrigger.refresh();
  }, [
    showThreeDE,
    isSpecificSize,
    isTablet,
    isMobile,
    isDesktop,
    hasAnimationPlayed,
  ]);

  // Initialize ThreeDE position on mount if animation has played
  useEffect(() => {
    if (hasAnimationPlayed && threeDEPosition) {
      const threeDE = document.querySelector(".threeDE");
      if (threeDE) {
        threeDE.style.transform = `translate(${threeDEPosition.x}, ${threeDEPosition.y})`;
      }
    }
  }, []);
  useEffect(() => {
    if (hero1Complete && isDesktop) {
      gsap.fromTo(
        ".hero-section-2",
        {
          x: "50%",
          opacity: 0,
        },
        {
          x: 0,
          opacity: 1,
          duration: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".hero-section-2",
            start: "top center",
            end: "top center",
            toggleActions: "play none none reverse",
            onEnter: () => setHero2Complete(true),
          },
        }
      );
      if (isXtraLargeScreenSize) {
        gsap.to(threeDERef.current, {
          scrollTrigger: {
            trigger: ".hero-section-2",
            start: "top center",
            end: "center center",
            scrub: true,
          },
          motionPath: {
            path: [
              { x: "33%", y: "0%" },
              { x: "12%", y: "50%" },
              { x: "-23vw", y: "90vh" },
            ],
            curviness: 1.5,
          },
          duration: 3,
          ease: "power6.out",
        });
      } else if (isLargeScreenSize) {
        gsap.to(threeDERef.current, {
          scrollTrigger: {
            trigger: ".hero-section-2",
            start: "top center",
            end: "center center",
            scrub: true,
          },
          motionPath: {
            path: [
              { x: "33%", y: "0%" },
              { x: "12%", y: "50%" },
              { x: "-23vw", y: "92vh" },
            ],
            curviness: 1.5,
          },
          duration: 3,
          ease: "power6.out",
        });
      } else if (isSpecificSize) {
        gsap.to(threeDERef.current, {
          scrollTrigger: {
            trigger: ".hero-section-2",
            start: "top center",
            end: "center center",
            scrub: true,
          },
          motionPath: {
            path: [
              { x: "33%", y: "0%" },
              { x: "12%", y: "50%" },
              { x: "-23vw", y: "102vh" },
            ],
            curviness: 1.5,
          },
          duration: 3,
          ease: "power6.out",
        });
      }
      return () => {
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      };
    } else if (hero1Complete && !isDesktop) {
      setHero2Complete(true);
      const heroSection2 = document.querySelector(".hero-section-2");
      if (heroSection2) {
        heroSection2.style.opacity = "1";
        heroSection2.style.transform = "translateX(0)";
      }
    }
  }, [hero1Complete, isDesktop, isSpecificSize]);
 const handleScrollToTop = () => {
   // Immediately set scroll position
   window.scrollTo({
     top: 0,
     behavior: "smooth",
   });
 };

 const handleWhatsapp = () => {
   window.open(
     "https://wa.me/918890204938?text=Hey%2C%20I%20need%20help%20with%20a%20tech%20solution.%20Let’s%20talk%21",
     "_blank"
   );
 };


  return (
    <Box
      sx={{
        minHeight: "100vh",
        position: "relative",
        overflowX: "hidden",
        overflowY: "auto",
        background: "#000000",
      }}
    >
      <Fade in={showButton}>
        <Button
          onClick={handleScrollToTop}
          variant="contained"
          color="primary"
          sx={{
            position: "fixed",
            height: 60,
            bottom: { xs: 100, md: 50 },
            left: { xs: 30, md: 50 },
            zIndex: 1000,
            borderRadius: "50%",
            background: "rgba(255, 255, 255, 0.1)",
            "&:hover": {
              background: "linear-gradient(180deg, #2579E3 0%, #8E54F7 100%)",
            },
          }}
        >
          <ArrowUpwardIcon />
        </Button>
      </Fade>
      <Fade in={showWhatsAppButton}>
        <Button
          onClick={handleWhatsapp}
          variant="contained"
          color="primary"
          sx={{
            position: "fixed",
            height: 60,
            bottom: { xs: 200, md: 100 },
            right: { xs: 24, md: 24 },
            zIndex: 1000,
            borderRadius: "50%",
            background: "rgba(255, 255, 255, 0.1)",
            "&:hover": {
              background: "linear-gradient(180deg, #2579E3 0%, #8E54F7 100%)",
            },
          }}
        >
          <IoLogoWhatsapp size={30} />
        </Button>
      </Fade>
      <Box
        className="threeDE"
        ref={threeDERef}
        sx={{
          width: "100vw",
          height: "100vh",
          display: isMobile || isTablet ? "none" : "flex",
          justifyContent: "left",
          alignItems: "left",
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "100%",
          }}
        >
          <ThreeDE textSize="34.5" />
        </Box>
      </Box>
      <Box
        className="gradient-background"
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "90%",
          height: { xs: "5%", md: "4%" },
          background: `radial-gradient(ellipse at top, rgba(154, 106, 255, 0.6) 0%, rgba(0, 0, 0, 0) 60%)`,
          zIndex: 1,
          opacity: isMobile || isTablet ? 1 : 0,
        }}
      />
      <Box
        className="navbar"
        sx={{
          position: "relative",
          zIndex: 10,
          opacity: isMobile || isTablet ? 1 : 0,
          transform:
            isMobile || isTablet ? "translateX(0)" : "translateX(-100px)",
        }}
      >
        <NavBar />
      </Box>
      <Box
        sx={{
          width: { xs: "100%", md: "50%", lg: "40%" },
          height: "55vh",
          display: { xs: "block", md: "none", lg: "none", xl: "none" },
          // isMobile || isTablet || isLandscapeMedium ? "block" : "none",
          top: 0,
          left: 200,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "100%",
          }}
        >
          <ThreeDE textSize="34.5" />
        </Box>
      </Box>
      <Box
        className="hero-content"
        sx={{
          display: "flex",
          position: "relative",
          zIndex: 3,
          marginTop: { xs: "-20%", sm: "-6rem" },
          opacity: isMobile || isTablet ? 1 : 0,
          transform:
            isMobile || isTablet ? "translateX(0)" : "translateX(-100px)",
        }}
      >
        <HeroPageSection1 />
      </Box>
      <Box
        className="hero-section-2"
        sx={{
          position: "relative",
          zIndex: 3,
          ...(isMobile || isTablet
            ? {
                opacity: 1,
                transform: "none",
              }
            : {
                opacity: 1,
                transform: "translateX(50%)",
              }),
        }}
      >
        <HeroPageSection2 onAnimationComplete={() => setHero2Complete(true)} />
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: { xs: 2, md: 4, lg: 6 },
          marginTop: 4,
          zIndex: 1,
        }}
      >
        <Box>
          <HeroPageSection3 />
        </Box>
        <ErrorBoundary>
          <HeroPageSection4 />
        </ErrorBoundary>
        <HeroPageSection5 />
        <HeroPageSection6 />
        <HeroPageSection7 />
      </Box>
      <Footer />
    </Box>
  );
};
export default HeroPage;
