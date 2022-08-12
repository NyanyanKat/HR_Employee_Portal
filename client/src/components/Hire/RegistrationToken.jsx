import React, { useRef, useEffect, useState } from "react";
import emailjs from "@emailjs/browser";
import {
  Button,
  Alert,
  AlertTitle,
  Box,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Paper,
  Typography,
} from "@mui/material";
import "bootstrap/dist/css/bootstrap.min.css";
import api from "../../api/api";
import { message } from "antd";

export default function RegistrationToken() {
  const form = useRef(); //for emailJS
  const [activeStep, setActiveStep] = useState(0); //for MUI
  const [hr_token, setToken] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    api
      .registerToken()
      .then((res) => {
        // console.log(res.data.token);
        setToken(res.data.token);
      })
      .catch((error) => console.log(error));
  }, []);

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const sendEmail = (e) => {
    e.preventDefault();
    emailjs
      .sendForm(
        "service_df9zmxy",
        "jimmyfire_onboarding",
        form.current,
        "Z_2yk4B8Z8Sa-A9Zp"
      )
      .then(
        (result) => {
          message.success("Registration Link Sent");
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
  };

  const steps = [
    {
      label: "Generate registration token for a employee ",
      description: (
        <Alert severity="success">
          <AlertTitle>Success</AlertTitle>
          {hr_token}
        </Alert>
      ),
    },
    {
      label: "Send a registration link to the employee via email",
      description: (
        <form
          ref={form}
          onSubmit={sendEmail}
          style={{ display: "flex", flexDirection: "column", width: "50%" }}
        >
          <label>Employee Name:</label>
          <input className="form-control" type="text" name="to_name" />
          <label style={{ marginTop: "15px" }}>Employee Email:</label>
          <input
            className="form-control"
            type="email"
            name="user_email"
            value={email}
            onChange={handleEmail}
          />
          <input
            type="hidden"
            value={`http://127.0.0.1:3000/register?token=${hr_token}&email=${email}`}
            name="registration_link"
          />
          <input
            style={{ margin: "15px 0" }}
            className="form-control"
            type="submit"
            value="Send Email"
          ></input>
        </form>
      ),
    },
  ];

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setToken("");
    window.location.assign("/hire/register");
  };

  return (
    <Box sx={{ maxWidth: 1000 }}>
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((step, index) => (
          <Step key={step.label}>
            <StepLabel
              optional={
                index === 2 ? (
                  <Typography variant="caption">Last step</Typography>
                ) : null
              }
            >
              {step.label}
            </StepLabel>
            <StepContent>
              <Typography>{step.description}</Typography>
              <Box sx={{ mb: 2 }}>
                <div>
                  <Button
                    variant="contained"
                    onClick={handleNext}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    {index === steps.length - 1 ? "Finish" : "Continue"}
                  </Button>
                  <Button
                    disabled={index === 0}
                    onClick={handleBack}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    Back
                  </Button>
                </div>
              </Box>
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length && (
        <Paper square elevation={0} sx={{ p: 3 }}>
          <Typography>All steps completed - you&apos;re finished</Typography>
          <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
            Reset
          </Button>
        </Paper>
      )}
    </Box>
  );
}
