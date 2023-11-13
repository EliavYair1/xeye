import { SvgXml } from "react-native-svg";

// * assigning the right icon to display according to the alert.
export const getAlertIcon = (typeOfAlert, alertIcon) => {
  // console.log("typeOfAlert", typeOfAlert);

  const matchingIcon = typeOfAlert?.find(
    (icon) => icon.name === alertIcon && icon.role === "alert"
  );
  // console.log("matchingIcon", matchingIcon.icon);
  if (matchingIcon) {
    return <SvgXml xml={matchingIcon.icon} style={{ color: "white" }} />;
  }
  return null;
};
