import { useState } from "react";
import SignUp from "./signUp";
import SignIn from "./signIn";
import CodeValidation from "./codeValidation";
import { sendSMSCode } from "../../services/firebaseAuth";

/*
 Steps
  0 - login
  1 - cadastro
  2 - validação do código via sms
*/
export default function Auth() {
  const [step, setStep] = useState(1);
  const [utils, setUtils] = useState({ stepBefore: 0, confirm: null });
  const [form, setForm] = useState({ name: "", phone: "", code: "" });

  const onChange = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const handleValidatioStep = async () => {
    const currentStep = step;
    setStep(2);
    const respSMS = await sendSMSCode(`+55 ${form.phone}`);
    setUtils({
      stepBefore: currentStep,
      confirm: respSMS
    })
  };

  if (step === 1) {
    return (
      <SignUp
        setStep={setStep}
        form={form}
        onChange={onChange}
        handleValidatioStep={handleValidatioStep}
      />
    );
  } else if (step === 2) {
    return (
      <CodeValidation
        setStep={setStep}
        form={form}
        utils={utils}
        handleValidatioStep={handleValidatioStep}
      />
    );
  }

  return (
    <SignIn
      setStep={setStep}
      phone={form.phone}
      onChange={onChange}
      handleValidatioStep={handleValidatioStep}
    />
  );
}
