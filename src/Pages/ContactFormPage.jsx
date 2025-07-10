import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Fade,
  TextField,
  Button,
  Typography,
  useTheme,
  Dialog,
  Link,
  Grid,
  Autocomplete,
  Paper,
  Chip,
  DialogContent,
  useMediaQuery,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import { styled } from "@mui/material/styles";
import NavBar from "../Components/NavBar";
import Footer from "../Components/OurServices/Footer";
import ThreeDE from "../Components/ThreeDE";
import { IoLogoWhatsapp } from "react-icons/io5";
import { MdOutlineEmail } from "react-icons/md";

// Styled Components
const StyledFormContainer = styled(Box)(({ theme }) => ({
  background: "#12101A",
  borderRadius: theme.spacing(4),
  padding: theme.spacing(6),
  border: "1px solid #7E22CE",
  boxShadow: "0px 0px 100px 0px rgba(133, 86, 245, 0.4)",
  margin: "0 auto",
  width: "100%",
  maxHeight: "fit-content", // Increased to accommodate the new form fields
  "@media (min-width: 320px) and (max-width:480px)": {
    padding: theme.spacing(4),
    maxHeight: "950px",
  },
}));

const StyledAutocomplete = styled(Autocomplete)(({ theme }) => ({
  "& .MuiInputBase-root": {
    backgroundColor: "rgba(30, 32, 37, 0.6)",
    borderRadius: theme.spacing(1),
    color: theme.palette.common.white,
    "&:hover": {
      backgroundColor: "rgba(30, 32, 37, 0.8)",
    },
  },
  "& .MuiOutlinedInput-notchedOutline": {
    border: "none",
  },
  "& .MuiAutocomplete-tag": {
    backgroundColor: "rgba(142, 84, 247, 0.2)",
    borderRadius: theme.spacing(1),
    color: theme.palette.common.white,
    margin: theme.spacing(0.5),
  },
  "& .MuiChip-deleteIcon": {
    color: theme.palette.grey[400],
    "&:hover": {
      color: theme.palette.common.white,
    },
  },
  "& .MuiAutocomplete-popupIndicator": {
    color: theme.palette.grey[400],
  },
  "& .MuiAutocomplete-clearIndicator": {
    color: theme.palette.grey[400],
  },
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  "& .MuiInputBase-root": {
    backgroundColor: "rgba(30, 32, 37, 0.6)",
    borderRadius: theme.spacing(1),
    color: theme.palette.common.white,
    "&:hover": {
      backgroundColor: "rgba(30, 32, 37, 0.8)",
    },
  },
  "& .MuiOutlinedInput-notchedOutline": {
    border: "none",
  },
  "& .MuiInputLabel-root": {
    color: theme.palette.grey[600],
  },
  marginBottom: theme.spacing(2),
  fontSize: {
    md: `clamp(0.5rem, calc(0.8rem + 0.6vw), 1.5rem)`,
    lg: `clamp(0.5rem, calc(0.8rem + 0.7vw), 1.8rem)`,
    xl: `clamp(0.5rem, calc(0.8rem + 0.8vw), 2.1rem)`,
  },
}));

const IframeWrapper = styled(Box)({
  position: "relative",
  width: "100%",
  height: "100vh",
});

const SubmitButton = styled(Button)(({ theme }) => ({
  backgroundColor: "#8E54F7",
  color: "white",
  border: "2px",
  padding: theme.spacing(2),
  marginTop: theme.spacing(2),
  borderRadius: theme.spacing(6),
  "&:hover": {
    backgroundColor: "#7E22CE",
  },
  "@media (min-width: 320px) and (max-width:480px)": {
    padding: theme.spacing(1),
    fontSize: "0.8rem",
  },
}));

const ContactForm = () => {
  const theme = useTheme();
  const [formData, setFormData] = useState({
    fullName: "",
    companyName: "",
    email: "",
    phoneNumber: "",
    message: "",
    services: [],
    otherService: "",
    uploadedFiles: [],
    isOtherServiceEnabled: false,
  });
  const isMd = useMediaQuery(theme.breakpoints.up("md"));
  const isLg = useMediaQuery(theme.breakpoints.up("lg"));
  const isXl = useMediaQuery(theme.breakpoints.up("xl"));
  const [showWhatsAppButton, setShowWhatsAppButton] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [showCalendar, setShowCalendar] = useState(true);
  const [submitState, setSubmitState] = useState("initial"); // "initial", "submitting", "submitted"

  let textSize;
  if (isXl) {
    textSize = 50; // Text size for xl screens
  } else if (isLg) {
    textSize = 50; // Text size for lg screens
  } else if (isMd) {
    textSize = 50; // Text size for md screens
  } else {
    textSize = 25; // Default text size for small screens
  }

  const GOOGLE_FORM_ACTION =
    "https://script.google.com/macros/s/AKfycbz4LggW4hnSyV4GbcLTl-9JiGykDQyLuR9inpt58x6-v_LFrAf1opb8ptiKBmYpPhLm/exec";

  const serviceOptions = [
    "AI & Automation Solutions",
    "Sales Channel Development",
    "ML Driven Data Analysis",
    "Technical Consultancy",
    "Website or Application Development",
    "Other Services",
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const maxSize = 10 * 1024 * 1024; // 10MB
    const allowedTypes = /\.(doc|docx|pdf|ppt|pptx|jpg|jpeg|png)$/i;

    const validFiles = files.filter((file) => {
      const isValidSize = file.size <= maxSize;
      const isValidType = allowedTypes.test(file.name);

      if (!isValidSize) {
        alert(`File ${file.name} is too large. Maximum size is 10MB.`);
      }
      if (!isValidType) {
        alert(
          `File ${file.name} has an invalid type. Allowed types are: doc, docx, pdf, ppt, pptx, jpg, jpeg, png`
        );
      }

      return isValidSize && isValidType;
    });

    setFormData((prev) => ({
      ...prev,
      uploadedFiles: [...prev.uploadedFiles, ...validFiles],
    }));
  };

  const handleServicesChange = (event, newValue) => {
    setFormData((prev) => {
      const updatedData = { ...prev, services: newValue };

      // Handle "Other Services" selection
      if (newValue.includes("Other Services")) {
        if (!prev.services.includes("Other Services")) {
          updatedData.otherServiceChecked = true;
        }
      } else {
        updatedData.otherServiceChecked = false;
        updatedData.otherService = "";
      }

      return updatedData;
    });
  };

  const submitToGoogleScript = async (data) => {
    try {
      const formData = new URLSearchParams();
      formData.append("fullName", data.fullName);
      formData.append("companyName", data.companyName);
      formData.append("email", data.email);
      formData.append("phoneNumber", data.phoneNumber);
      formData.append("message", data.message);
      formData.append("services", data.services.join(", "));
      if (data.otherService) {
        formData.append("otherService", data.otherService);
      }

      for (let i = 0; i < data.uploadedFiles.length; i++) {
        const file = data.uploadedFiles[i];
        const base64File = await new Promise((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result);
          reader.readAsDataURL(file);
        });

        formData.append("uploadedFiles", base64File);
        formData.append("fileName", file.name);
        formData.append("fileType", file.type);
      }
      const response = await fetch(GOOGLE_FORM_ACTION, {
        redirect: "follow",
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: formData.toString(),
      });

      return { status: "success" };
    } catch (error) {
      console.error("Error submitting form:", error);
      throw error;
    }
  };

  const resetForm = () => {
    setFormData({
      fullName: "",
      companyName: "",
      email: "",
      phoneNumber: "",
      message: "",
      services: [],
      otherService: "",
      uploadedFiles: [],
      isOtherServiceEnabled: false,
    });
  };

  const handleRemoveFile = (index) => {
    setFormData((prev) => ({
      ...prev,
      uploadedFiles: prev.uploadedFiles.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitState("submitting");

    try {
      const result = await submitToGoogleScript(formData);
      if (result.status === "success") {
        setSubmitState("submitted");
        resetForm();
      } else {
        throw new Error(result.message || "Submission failed");
      }
    } catch (error) {
      console.error("Form submission error:", error);
      alert("There was an error submitting the form. Please try again.");
      setSubmitState("initial");
    }
  };

  useEffect(() => {
    let timeoutId;
    if (submitState === "submitted") {
      timeoutId = setTimeout(() => {
        setSubmitState("initial");
      }, 3000); // 5 seconds
    }
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [submitState]);
  
  const getButtonContent = () => {
    switch (submitState) {
      case "submitting":
        return "Submitting...";
      case "submitted":
        return (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 1,
            }}
          >
            ✔ Submitted
          </Box>
        );
      default:
        return "Submit";
    }
  };
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

  const handleScrollToTop = () => {
    // Immediately set scroll position
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

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

    const handleWhatsapp = () => {
      window.open(
        "https://wa.me/918890204938?text=Hey%2C%20I%20need%20help%20with%20a%20tech%20solution.%20Let’s%20talk%21",
        "_blank"
      );
    };

  return (
    <Box sx={{ backgroundColor: "#000000", minHeight: "100vh", width: "100%" }}>
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
      {/* Gradient Overlay */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "30%",
          background: `radial-gradient(ellipse at top, rgba(154, 106, 255, 0.6) 0%, rgba(0, 0, 0, 0) 60%)`,
          zIndex: 1,
          opacity: 1,
        }}
      />
      <NavBar />
      <Container
        sx={{ paddingTop: theme.spacing(8), position: "relative", zIndex: 2 }}
      >
        {/* Header Section */}
        <Box textAlign="center" mb={4}>
          <Typography
            sx={{
              fontSize: {
                xs: `clamp(1.75rem, calc(1.25rem + 2vw), 9rem)`,
                md: `clamp(1.75rem, calc(1.25rem + 2.5vw), 9rem)`,
                lg: `clamp(1.75rem, calc(1.37rem + 3vw), 8rem)`,
                xl: `clamp(2.25rem, calc(2rem + 3vw), 10rem)`,
              },
            }}
            color="common.white"
            fontWeight="bold"
            mb={2}
          >
            Get in{" "}
            <Box
              component="span"
              sx={{
                background: "linear-gradient(180deg, #2579E3 0%, #8E54F7 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              touch
            </Box>
          </Typography>
          <Typography
            textAlign="center"
            color="#fff"
            sx={{
              fontSize: {
                xs: `clamp(0.5rem, calc(0.8rem + 0.6vw), 1.5rem)`,
                md: `clamp(0.5rem, calc(0.8rem + 0.6vw), 1.5rem)`,
                lg: `clamp(0.5rem, calc(0.8rem + 0.7vw), 1.8rem)`,
                xl: `clamp(0.5rem, calc(0.8rem + 0.8vw), 2.1rem)`,
              },
              fontWeight: 200,
              lineHeight: 1.7,
              width: "80%",
              marginLeft: "10%",
            }}
          >
            Looking to automate, optimize, or scale your business with tailored
            AI-native solutions? Let us craft the right solution for you.
          </Typography>
        </Box>
        <Box
          textAlign="center"
          mb={8}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignContent: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              justifyContent: { xs: "center", md: "flex-start" },
            }}
          >
            <MdOutlineEmail
              size={25}
              color="#8E54F7"
              sx={{
                fontSize: {
                  xs: `clamp(0.5rem, calc(0.8rem + 0.6vw), 1.5rem)`,
                  md: `clamp(0.5rem, calc(0.8rem + 0.6vw), 1.5rem)`,
                  lg: `clamp(0.5rem, calc(0.8rem + 0.7vw), 1.8rem)`,
                  xl: `clamp(0.5rem, calc(0.8rem + 0.8vw), 2.1rem)`,
                },
                zIndex: "2",
                fontWeight: 200,
                lineHeight: 1.7,
              }}
            />

            <Link
              href="mailto:info@excollo.com"
              target="_blank" // This opens in new tab
              rel="noopener noreferrer" // Security best practice for links opening in new tab
              sx={{
                color: "#fff",
                textDecoration: "none",
                zIndex: "2",
                fontSize: {
                  xs: `clamp(0.5rem, calc(0.8rem + 0.6vw), 1.5rem)`,
                  md: `clamp(0.5rem, calc(0.8rem + 0.6vw), 1.5rem)`,
                  lg: `clamp(0.5rem, calc(0.8rem + 0.7vw), 1.8rem)`,
                  xl: `clamp(0.5rem, calc(0.8rem + 0.8vw), 2.1rem)`,
                },
                "&:hover": { color: "#8E54F7" },
                fontWeight: 200,
                lineHeight: 1.7,
                fontFamily: '"Inter", sans-serif',
              }}
            >
              info@excollo.com
            </Link>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              justifyContent: { xs: "center", md: "flex-start" },
            }}
          >
            <Typography
              sx={{
                color: "#fff",
                textDecoration: "none",
                zIndex: "2",
                fontSize: {
                  xs: `clamp(0.5rem, calc(0.8rem + 0.6vw), 1.5rem)`,
                  md: `clamp(0.5rem, calc(0.8rem + 0.6vw), 1.5rem)`,
                  lg: `clamp(0.5rem, calc(0.8rem + 0.7vw), 1.8rem)`,
                  xl: `clamp(0.5rem, calc(0.8rem + 0.8vw), 2.1rem)`,
                },
                fontWeight: 200,
                lineHeight: 1.7,
              }}
            >
              &nbsp; &nbsp; &nbsp; | &nbsp; &nbsp; &nbsp;
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              justifyContent: { xs: "center", md: "flex-start" },
            }}
          >
            <IoLogoWhatsapp
              size={25}
              color="#8E54F7"
              sx={{
                fontSize: {
                  xs: `clamp(0.5rem, calc(0.8rem + 0.6vw), 1.5rem)`,
                  md: `clamp(0.5rem, calc(0.8rem + 0.6vw), 1.5rem)`,
                  lg: `clamp(0.5rem, calc(1rem + 1vw), 1.8rem)`,
                  xl: `clamp(0.5rem, calc(1rem + 1vw), 2.1rem)`,
                },
                fontWeight: 200,
                lineHeight: 1.7,
              }}
            />
            <Link
              href="tel:+918890204938"
              target="_blank" // This opens in new tab
              rel="noopener noreferrer" // Security best practice for links opening in new tab
              sx={{
                textDecoration: "none",
                color: "#fff",
                fontSize: {
                  xs: `clamp(0.5rem, calc(0.8rem + 0.6vw), 1.5rem)`,
                  md: `clamp(0.5rem, calc(0.8rem + 0.6vw), 1.5rem)`,
                  lg: `clamp(0.5rem, calc(0.8rem + 0.7vw), 1.8rem)`,
                  xl: `clamp(0.5rem, calc(0.8rem + 0.8vw), 2.1rem)`,
                },
                "&:hover": { color: "#8E54F7" },
                fontWeight: 200,
                lineHeight: 1.7,
                fontFamily: '"Inter", sans-serif',
              }}
            >
              +91 8890204938
            </Link>
          </Box>
        </Box>
      </Container>
      <Box
        sx={{
          background: "#12101A",
          border: "1px solid #7E22CE",
          boxShadow: "0px 0px 100px 0px rgba(133, 86, 245, 0.4)",
          width: "76%",
          margin: "auto",
          borderRadius: theme.spacing(4),
          padding: "2vw 2vw",
          maxHeight: "fit-content", // Increased to accommodate the new form fields
          "@media (min-width: 320px) and (max-width:480px)": {
            padding: theme.spacing(4),
            maxHeight: "950px",
          },
        }}
      >
        <Box display="grid" gridTemplateColumns={{ md: "1fr 1fr" }} gap={2}>
          {/* 3D Element Section */}
          <Box
            display={{ xs: "none", md: "flex" }}
            alignItems="center"
            justifyContent="center"
            sx={{
              position: "relative",
            }}
          >
            <ThreeDE textSize={textSize} />
          </Box>
          {/* Form Section */}
          <Box
            alignItems="center"
            justifyContent="center"
            margin="auto 0"
            sx={{
              position: "relative",
            }}
          >
            <Typography
              variant="h4"
              color="common.white"
              mb={1}
              sx={{
                fontSize: {
                  xs: `clamp(1rem, calc(1rem + 1.25vw), 6rem)`,
                  md: `clamp(1rem, calc(1rem + 1.25vw), 6rem)`,
                  lg: `clamp(1rem, calc(1rem + 1.4vw), 6rem)`,
                  xl: `clamp(1rem, calc(1rem + 1.4vw), 6rem)`,
                },
              }}
            >
              Let’s Talk Tech!
            </Typography>
            <Typography
              color="grey.400"
              mb={4}
              sx={{
                fontSize: {
                  xs: `clamp(0.5rem, calc(0.8rem + 0.6vw), 1.5rem)`,
                  md: `clamp(0.5rem, calc(0.8rem + 0.5vw), 1.5rem)`,
                  lg: `clamp(0.5rem, calc(0.8rem + 0.6vw), 1.8rem)`,
                  xl: `clamp(0.5rem, calc(0.8rem + 0.7vw), 2.1rem)`,
                },
                fontWeight: 200,
                lineHeight: 1.7,
              }}
            >
              Tell us about your project, and we’ll take it from there.
            </Typography>
            <form onSubmit={handleSubmit}>
              {/* Name Fields */}

              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <StyledTextField
                    name="fullName"
                    placeholder="Full Name"
                    fullWidth
                    value={formData.fullName}
                    onChange={handleInputChange}
                    required
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <StyledTextField
                    name="companyName"
                    placeholder="Company Name"
                    fullWidth
                    value={formData.companyName}
                    onChange={handleInputChange}
                    required
                  />
                </Grid>
              </Grid>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <StyledTextField
                    name="email"
                    placeholder="Email"
                    fullWidth
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    type="email"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <StyledTextField
                    name="phoneNumber"
                    placeholder="Phone Number"
                    fullWidth
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    required
                  />
                </Grid>
              </Grid>

              {/* Services Selection */}
              <Box sx={{ mb: 3 }}>
                <Typography
                  color="grey.300"
                  sx={{
                    fontSize: {
                      xs: `clamp(0.5rem, calc(0.8rem + 0.6vw), 1.5rem)`,
                      md: `clamp(0.5rem, calc(0.8rem + 0.5vw), 1.5rem)`,
                      lg: `clamp(0.5rem, calc(0.8rem + 0.6vw), 1.8rem)`,
                      xl: `clamp(0.5rem, calc(0.8rem + 0.7vw), 2.1rem)`,
                    },
                    fontWeight: 200,
                    lineHeight: 1.7,
                    mb: 1,
                  }}
                >
                  Services Required:
                </Typography>

                <StyledAutocomplete
                  multiple
                  options={serviceOptions}
                  value={formData.services}
                  onChange={handleServicesChange}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      placeholder={
                        formData.services.length === 0 ? "Select Services" : ""
                      }
                      sx={{
                        fontSize: {
                          xs: `clamp(0.5rem, calc(0.8rem + 0.6vw), 1.5rem)`,
                          md: `clamp(0.5rem, calc(0.8rem + 0.5vw), 1.5rem)`,
                          lg: `clamp(0.5rem, calc(0.8rem + 0.6vw), 1.8rem)`,
                          xl: `clamp(0.5rem, calc(0.8rem + 0.7vw), 2.1rem)`,
                        },
                      }}
                    />
                  )}
                  renderTags={(selected, getTagProps) =>
                    selected.map((option, index) => (
                      <Chip
                        key={option}
                        label={option}
                        {...getTagProps({ index })}
                        sx={{
                          fontSize: {
                            xs: "0.8rem",
                            md: "0.9rem",
                            lg: "1rem",
                          },
                        }}
                      />
                    ))
                  }
                  renderOption={(props, option) => (
                    <Box
                      component="li"
                      {...props}
                      sx={{
                        color: "white",
                        fontSize: {
                          xs: "0.8rem",
                          md: "0.9rem",
                          lg: "1rem",
                        },
                        "&:hover": {
                          backgroundColor: "rgba(142, 84, 247, 0.2)",
                        },
                        "&.Mui-selected": {
                          backgroundColor: "rgba(142, 84, 247, 0.3)",
                        },
                      }}
                    >
                      {option}
                    </Box>
                  )}
                  PaperComponent={(props) => (
                    <Paper
                      {...props}
                      sx={{
                        backgroundColor: "#12101A",
                        border: "1px solid #7E22CE",
                        boxShadow: "0px 0px 20px rgba(133, 86, 245, 0.2)",
                      }}
                    />
                  )}
                />

                {formData.services.includes("Other Services") && (
                  <StyledTextField
                    name="otherService"
                    placeholder="Specify Other Service"
                    fullWidth
                    value={formData.otherService}
                    onChange={handleInputChange}
                    sx={{ mt: 2 }}
                  />
                )}
              </Box>
              {/* Message Field */}
              <StyledTextField
                name="message"
                placeholder="Message"
                fullWidth
                multiline
                rows={4}
                value={formData.message}
                onChange={handleInputChange}
                required
              />

              {/* File Upload Section */}
              <Box sx={{ mb: 2, display: "flex" }}>
                <Typography
                  color="grey.300"
                  sx={{
                    fontSize: {
                      xs: `clamp(0.5rem, calc(0.8rem + 0.6vw), 1.5rem)`,
                      md: `clamp(0.5rem, calc(0.8rem + 0.5vw), 1.5rem)`,
                      lg: `clamp(0.5rem, calc(0.8rem + 0.6vw), 1.8rem)`,
                      xl: `clamp(0.5rem, calc(0.8rem + 0.7vw), 2.1rem)`,
                    },
                    fontWeight: 200,
                    lineHeight: 1.7,
                  }}
                >
                  Upload File (Optional): &nbsp;
                </Typography>
                <input
                  accept=".doc,.docx,.pdf,.ppt,.pptx,.jpg,.jpeg,.png"
                  style={{ display: "none" }}
                  id="file-upload"
                  type="file"
                  multiple
                  onChange={handleFileChange}
                />
                <label htmlFor="file-upload">
                  <Button
                    component="span"
                    variant="outlined"
                    sx={{
                      color: "grey.300",
                      width: "100%",
                      borderColor: "grey.700",
                      "&:hover": {
                        borderColor: "#8E54F7",
                        backgroundColor: "rgba(142, 84, 247, 0.1)",
                      },
                      fontSize: {
                        xs: `clamp(0.2rem, calc(0.3rem + 0.8vw), 1.5rem)`,
                        md: `clamp(0.5rem, calc(0.3rem + 0.8vw), 1.5rem)`,
                        xl: `clamp(0rem, calc(0.5rem + 0.8vw), 5rem)`,
                      },
                      fontWeight: "400",
                      textTransform: "none",
                    }}
                  >
                    Choose File
                  </Button>
                </label>

                {formData.uploadedFiles.length > 0 && (
                  <Box sx={{ mt: 2 }}>
                    {formData.uploadedFiles.map((file, index) => (
                      <Box
                        key={index}
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          backgroundColor: "rgba(30, 32, 37, 0.6)",
                          padding: 1,
                          borderRadius: 1,
                          mb: 1,
                        }}
                      >
                        <Typography color="grey.300">
                          {file.name} ({(file.size / (1024 * 1024)).toFixed(2)}{" "}
                          MB)
                        </Typography>
                        <Button
                          size="small"
                          onClick={() => handleRemoveFile(index)}
                          sx={{ color: "grey.400" }}
                        >
                          Remove
                        </Button>
                      </Box>
                    ))}
                  </Box>
                )}
              </Box>
              {/* Submit Button */}
              <SubmitButton
                type="submit"
                fullWidth
                disabled={submitState === "submitting"}
                className={submitState === "submitted" ? "submitted" : ""}
                sx={{
                  background:
                    submitState === "submitted"
                      ? " linear-gradient(180deg, #2579E3 0%, #8E54F7 100%)"
                      : "linear-gradient(180deg, #2579E3 0%, #8E54F7 100%)",
                  fontSize: {
                    xs: `clamp(0.2rem, calc(0.3rem + 0.8vw), 1.5rem)`,
                    md: `clamp(0.5rem, calc(0.3rem + 0.8vw), 1.5rem)`,
                    xl: `clamp(0rem, calc(0.5rem + 0.8vw), 5rem)`,
                  },
                  fontWeight: "400",
                }}
              >
                {getButtonContent()}
              </SubmitButton>
            </form>
          </Box>
        </Box>
      </Box>
      <Box textAlign="center" mt={8} mb={8}>
        <Typography
          sx={{
            fontSize: {
              xs: `clamp(1.75rem, calc(1.25rem + 2vw), 9rem)`,
              md: `clamp(1.75rem, calc(1.25rem + 2.5vw), 9rem)`,
              lg: `clamp(1.75rem, calc(1.37rem + 3vw), 8rem)`,
              xl: `clamp(2.25rem, calc(2rem + 3vw), 10rem)`,
            },
          }}
          color="common.white"
          fontWeight="bold"
          mb={2}
        >
          Book a Free{" "}
          <Box
            component="span"
            sx={{
              background: "linear-gradient(180deg, #2579E3 0%, #8E54F7 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Consultation
          </Box>
        </Typography>
        <Typography
          textAlign="center"
          color="#fff"
          sx={{
            fontSize: {
              xs: `clamp(0.5rem, calc(0.8rem + 0.6vw), 1.5rem)`,
              md: `clamp(0.5rem, calc(0.8rem + 0.6vw), 1.5rem)`,
              lg: `clamp(0.5rem, calc(0.8rem + 0.7vw), 1.8rem)`,
              xl: `clamp(0.5rem, calc(0.8rem + 0.8vw), 2.1rem)`,
            },
            fontWeight: 200,
            lineHeight: 1.7,
            width: "80%",
            marginLeft: "10%",
          }}
        >
          Got 30 minutes? Let's talk!
        </Typography>
      </Box>
      <Box
        textAlign="center"
        sx={{
          width: "80%",
          margin: "auto",
          background: "#fff",
          borderRadius: "20px",
          height: "100%",
        }}
      >
        <Box open={showCalendar}>
          <iframe
            src="https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ2aNDl_midhT_0sp4OMzqwX_h8inTRRLY8QlOToNJjU1dFkdKrLBoHp9BSTBLZ0iaDCTpCwt0cY"
            style={{ width: "100%", height: "100vh", border: "none" }}
            title="Schedule Appointment"
          />
        </Box>
      </Box>

      <Box sx={{ position: "relative", zIndex: 1, marginTop: 5 }}>
        <Footer />
      </Box>
    </Box>
  );
};

export default ContactForm;
