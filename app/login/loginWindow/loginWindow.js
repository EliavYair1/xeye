import { Alert, Image, StyleSheet, Text, View } from "react-native";
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
import background from "../../../assets/background/background.svg";
import fonts from "../../../styles/fonts";
import CustomIcon from "../../../UI/CustomIcon";
import passwordIcon from "../../../assets/icons/password.png";
import { router } from "expo-router";
const LoginWindow = () => {
  const [isSchemaValid, setIsSchemaValid] = useState(false);
  const dispatch = useDispatch();
  const [passwordShowToggle, setPasswordShowToggle] = useState(true);
  const [formData, setFormData] = useState({});
  // const { navigateToRoute } = useScreenNavigator();
  const userInputRef = useRef();
  const passwordInputRef = useRef();
  const { token, loading, loginUser, initializeUserToken } = useUserLogin();
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
    const username = formData.username;
    const password = formData.password;
    const response = await loginUser(username, password);

    if (isSchemaValid && response.token) {
      console.log("[LoginWindow]token:", response.token);
      // navigateToRoute(routes.ONBOARDING.Start);
      router.push({
        pathname: "/home",
        params: { loginToken: response.token },
      });
    }
  };
  // console.log(token);
  return (
    <ScreenWrapper
      isForm={true}
      wrapperStyle={styles.container}
      // newReportBackGroundImg={"../../../assets/background/background.png"}
    >
      {loading ? (
        <Loader size={"large"} color={colors.white} visible={loading} />
      ) : (
        <>
          <View style={styles.logoWrapper}>
            <Image
              style={styles.logo}
              source={require("../../../assets/imgs/xeyeLogo.png")}
            />
          </View>
          <View style={styles.formContainer}>
            <View style={styles.headerWrapper}>
              <Text style={styles.header}>Account login</Text>
            </View>
            <View style={styles.inputWrapper}>
              <Input
                control={control}
                name={"username"}
                proxyRef={userInputRef}
                label={"User"}
                mode={"flat"}
                secureTextEntry={false}
                returnKeyType={"next"}
                underlineColor={"#0C1430"}
                contentStyle={styles.inputContentStyling}
                inputStyle={styles.inputStyling}
                activeUnderlineColor={"#0C1430"}
                onChangeFunction={(value) =>
                  handleInputChange("username", value)
                }
                onSubmitEditing={() => passwordInputRef.current.focus()}
                leftIcon={
                  //todo import the icon imgs
                  <TextInput.Icon icon="account" color={colors.white} />
                  // <TextInput.Icon icon="account" color={colors.white} />
                  // <>
                  //   <CustomIcon
                  //     image={require("../../../assets/icons/user.png")}
                  //     size={16}
                  //     color={colors.white}
                  //   />
                  // </>
                }
              />

              <Input
                control={control}
                name={"password"}
                proxyRef={passwordInputRef}
                label={"password"}
                mode={"flat"}
                leftIcon={
                  //todo import the icon imgs

                  <TextInput.Icon
                    icon="key"
                    onPress={handlePasswordToggle}
                    color={colors.white}
                  />
                }
                secureTextEntry={passwordShowToggle}
                returnKeyType={"done"}
                contentStyle={styles.inputContentStyling}
                inputStyle={styles.inputStyling}
                underlineColor={"#0C1430"}
                activeUnderlineColor={"#0C1430"}
                onChangeFunction={(value) =>
                  handleInputChange("password", value)
                }
                //   onSubmitEditing={handleLogin}
                onSubmitEditing={handleSubmit(handleLogin)}
              />
              <Button
                buttonText={"Login"}
                buttonFunction={handleSubmit(handleLogin)}
                buttonStyle={styles.button}
                buttonWidth={279}
                buttonTextStyle={styles.buttonText}
                // disableLogic={!isSchemaValid}
              />
            </View>
          </View>

          <Text style={styles.assistanceGuide}>
            Need assistance? Please contact your system administrator.
          </Text>
        </>
      )}
    </ScreenWrapper>
  );
};

export default LoginWindow;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  formContainer: {
    backgroundColor: colors.background,
    justifyContent: "center",
    alignItems: "center",
    elevation: 11,
    shadowColor: "rgba(255, 255, 255, 0.12)",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    marginBottom: 20,
  },
  logoWrapper: {
    marginBottom: 40,
  },
  logo: { width: 100, height: 40 },
  headerWrapper: {
    width: 320,
    paddingVertical: 16,

    // width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#333B44",
  },
  header: {
    alignSelf: "center",
    fontSize: 20,
    color: colors.white,
    fontFamily: fonts.SemiBold,
  },
  inputWrapper: {
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    // width: 303,
    // height: 171,
    backgroundColor: colors.xeyeBlack,
    marginBottom: 20,
  },

  inputContentStyling: {
    backgroundColor: "#333B44",
    direction: "ltr",
    color: "#fff",
    textAlign: "left",
  },
  inputStyling: {
    minWidth: 279,
    backgroundColor: "#333B44",
    direction: "ltr",
  },
  button: {
    backgroundColor: colors.xeyeLightBlue,
  },
  buttonText: {
    paddingVertical: 12,
    color: colors.white,
    fontFamily: fonts.Bold,
    fontSize: 16,
  },
  assistanceGuide: {
    fontSize: 14,
    color: colors.white,
    textAlign: "center",
    opacity: 0.6,
    fontFamily: fonts.Regular,
  },
});
