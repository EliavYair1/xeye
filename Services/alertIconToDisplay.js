import {
  GrenadeIcon,
  GrenadeNavbar,
  GunIcon,
  GunNavbar,
  KnifeIcon,
  KnifeNavbar,
} from "../UI/SvgIcon";
// * assigning the right icon to display according to the alert.
export const getAlertIcon = (typeOfAlert, alertIcon, thumbNail) => {
  if (typeOfAlert[0]?.role === "alert") {
    const matchingIcon = typeOfAlert?.find((icon) => icon.name === alertIcon);
    if (matchingIcon) {
      if (thumbNail) {
        switch (alertIcon) {
          case "gun":
            return <GunIcon />;
          case "knife":
            return <KnifeIcon />;
          case "grenade":
            return <GrenadeIcon />;
          default:
            return null;
        }
      } else {
        switch (alertIcon) {
          case "gun":
            return <GunNavbar />;
          case "knife":
            return <KnifeNavbar />;
          case "grenade":
            return <GrenadeNavbar />;
          default:
            return null;
        }
      }
    }
  }
  return null;
};
