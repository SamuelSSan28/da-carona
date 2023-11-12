import { useState } from "react";
import { useToast } from '@chakra-ui/react'
import SignUp from "./signUp";
import SignIn from "./signIn";
import CodeValidation from "./codeValidation";
import { sendSMSCode } from "../../services/auth";
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
  const toast = useToast();
  
  const onChange = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const handleValidatioStep = async () => {
    try {
      const currentStep = step;
      const respSMS = await sendSMSCode(`+55 ${form.phone}`);
      setStep(2);
      setUtils({
        stepBefore: currentStep,
        confirm: respSMS,
      });
    } catch (error) {
      console.error("Erro ao handleValidatioStep:", error);
      toast({
        title: 'Não foi possível enviar o SMS',
        description: JSON.stringify(error),
        status: 'error',
        position: "bottom",
        duration: 9000,
        isClosable: true,
      })
    }
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
