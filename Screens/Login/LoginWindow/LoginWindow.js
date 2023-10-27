import { Alert, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import useScreenNavigator from "../../../Hooks/useScreenNavigator";
import useUserLogin from "../../../Hooks/useUserLogin";
import Input from "../../../UI/Input";
import Button from "../../../UI/Button";
import { FlatList } from "react-native-gesture-handler";
import { TextInput } from "react-native-paper";
import ScreenWrapper from "../../../utiles/ScreenWrapper";
import routes from "../../../Navigation/routes";
import Loader from "../../../utiles/Loader";
import colors from "../../../styles/colors";
const LoginWindow = () => {
  const [isSchemaValid, setIsSchemaValid] = useState(false);
  const dispatch = useDispatch();
  const [passwordShowToggle, setPasswordShowToggle] = useState(true);
  const [formData, setFormData] = useState({});
  const { navigateToRoute } = useScreenNavigator();
  const userInputRef = useRef();
  const passwordInputRef = useRef();
  const { token, loading, loginUser, initializeUserToken } = useUserLogin();
  // initiating the data if user existed
  //   useEffect(() => {
  //     initializeUserToken();
  //   }, []);
  // eliav
  // s465erydgfhg
  const schema = yup.object().shape({
    username: yup.string().required("username is required"),
    password: yup
      .string()
      .required("password is required")
      .min(1, "password must contain at least 6 digits"),
  });
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    schema
      .validate(formData)
      .then(() => setIsSchemaValid(true))
      .catch(() => setIsSchemaValid(false));
  }, [schema]);
  const handlePasswordToggle = () => {
    setPasswordShowToggle(!passwordShowToggle);
  };

  //handling the input change
  const handleInputChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
    setIsSchemaValid(true);
  };
  const handleLogin = async () => {
    // eliav
    // s465erydgfhg
    const username = formData.username;
    const password = formData.password;
    const response = await loginUser(username, password);

    if (isSchemaValid && response.token) {
      console.log("[LoginWindow]token:", response.token);
      navigateToRoute(routes.ONBOARDING.Start);
    }
  };
  console.log(formData);
  // console.log(token);
  return (
    <ScreenWrapper isForm={true} wrapperStyle={styles.container}>
      {loading ? (
        <Loader size={"large"} color={colors.xeyeBlue} visible={loading} />
      ) : (
        <>
          <View style={styles.inputWrapper}>
            <Input
              control={control}
              name={"username"}
              proxyRef={userInputRef}
              label={"User"}
              // defaultValue={formData.username !== "" ? formData.username : ""}
              mode={"flat"}
              secureTextEntry={false}
              returnKeyType={"next"}
              underlineColor={"#0C1430"}
              contentStyle={styles.inputContentStyling}
              inputStyle={styles.inputStyling}
              activeUnderlineColor={"#0C1430"}
              onChangeFunction={(value) => handleInputChange("username", value)}
              onSubmitEditing={() => passwordInputRef.current.focus()}
            />
            <Input
              control={control}
              name={"password"}
              proxyRef={passwordInputRef}
              label={"password"}
              // defaultValue={formData.password !== "" ? formData.password : ""}
              mode={"flat"}
              inputIcon={
                <TextInput.Icon icon="eye" onPress={handlePasswordToggle} />
              }
              secureTextEntry={passwordShowToggle}
              returnKeyType={"done"}
              contentStyle={styles.inputContentStyling}
              inputStyle={styles.inputStyling}
              underlineColor={"#0C1430"}
              activeUnderlineColor={"#0C1430"}
              onChangeFunction={(value) => handleInputChange("password", value)}
              //   onSubmitEditing={handleLogin}
            />
          </View>
          <Button
            buttonText={"התחברות"}
            buttonFunction={handleSubmit(handleLogin)}
            buttonStyle={styles.button}
            buttonTextStyle={styles.buttonText}
            disableLogic={!isSchemaValid}
          />
        </>
      )}
    </ScreenWrapper>
  );
};

export default LoginWindow;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
  },
  inputWrapper: {
    // flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  inputContentStyling: { backgroundColor: "white" },
  inputStyling: { minWidth: 279, backgroundColor: "white" },
  button: {},
});
