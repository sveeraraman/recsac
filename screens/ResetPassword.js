import React, { useState } from "react";
import { View } from "react-native";
import { useDispatch } from "react-redux";

const ResetPassword = (props) => {
  const [error, setError] = useState();
  const [isLoading, setisLoading] = useState(false);
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const [confirmpassword, setconfirmpassword] = useState("");
  const [codeSent, setCodeSent] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [isConfirming, setIsConfirming] = useState(false);
  const [isSendingCode, setIsSendingCode] = useState(false);
  const dispatch = useDispatch();

  async function handleSendCodeClick(event) {
    //https://serverless-stack.com/chapters/handle-forgot-and-reset-password.html
    setIsSendingCode(true);

    try {
      //await Auth.forgotPassword(fields.email);
      setCodeSent(true);
    } catch (error) {
      onError(error);
      setIsSendingCode(false);
    }
  }
  return <View></View>;
};
