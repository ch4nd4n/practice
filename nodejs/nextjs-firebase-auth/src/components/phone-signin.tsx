import { signInWithPhone } from "@/firebase/firebase-auth";
import { ConfirmationResult } from "firebase/auth";
import { useState } from "react";

export function PhoneAuthentication() {
  const [step, setStep] = useState(1);
  const [confirmationResult, setConfirmationResult] =
    useState<ConfirmationResult>();

  const getLabel = () => {
    return step === 1 ? "Get OTP" : "Login";
  };
  function handSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    // @ts-ignore
    const phone = event.target.phone?.value;
    // @ts-ignore
    const otp = event.target.otp?.value;
    console.log({ phone, otp });
    if (step === 1) {
      signInWithPhone(`+91${phone}`)
        .then((confirmResponse) => {
          setConfirmationResult(confirmResponse);
          setStep(2);
        })
        .catch((phoneErr) => {
          console.log({ phoneErr });
        });
    } else if (step === 2) {
      confirmationResult
        ?.confirm(otp)
        .then((otpResult) => console.log(otpResult))
        .catch((otpErr) => console.error(otpErr));
    }
  }

  return (
    <div>
      <form onSubmit={handSubmit}>
        <span id="sign-in-button"></span>
        {step === 1 && <input name="phone" placeholder="Enter Phone" />}
        {step === 2 && <input name="otp" placeholder="Enter OTP" />}
        <button>{getLabel()}</button>
      </form>
    </div>
  );
}
