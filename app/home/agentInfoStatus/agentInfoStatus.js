import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { AgentIcon, GrayCircleSvg, GreenCircleSvg } from "../../../UI/SvgIcon";
import Fonts, { MediumText, DefaultText } from "../../../utiles/Fonts";
import colors from "../../../styles/colors";
import { retrieveData } from "../../../Auth/StorageService";
import axios from "axios";
const AgentInfoStatus = ({
  agentName,
  agentProfession,
  agentId,
  status = false,
  styling,
}) => {
  const [agentData, setAgentData] = useState(null);
  useEffect(() => {
    const fetchAgent = async () => {
      const agentData = await retrieveData("agent");
      // console.log("agentData", agentData);
      setAgentData(agentData);
    };
    fetchAgent();
  }, []);
  const agent = agentData?.currentUser;
  // useEffect(() => {
  //   const fetchblabla = async () => {
  //     const response = await axios.put(
  //       `${process.env.API_BASE_URL}/front/alert/${agent.id}/status`,
  //       {
  //         status: "assigned",
  //       }
  //     );
  //     console.log(response);
  //   };
  //   fetchblabla();
  // }, []);
  // console.log(agentData);
  // todo to apply the agent data from the api
  return (
    <View style={[styles.container, styling ?? ""]}>
      <View style={styles.agentWrapper}>
        <AgentIcon />
        <MediumText style={styles.agentDetails}>{agent?.fullname}</MediumText>
        <MediumText style={styles.agentDetails}>
          {agentProfession}{" "}
          <MediumText
            style={styles.agentDetails}
          >{`#${agent?.userNumber}`}</MediumText>
        </MediumText>
      </View>
      <View style={styles.statusWrapper}>
        {status ? (
          <>
            <GreenCircleSvg />
            <Text style={styles.statusText}>Online</Text>
          </>
        ) : (
          <>
            <GrayCircleSvg />
            <Text style={styles.statusText}>Offline</Text>
          </>
        )}
      </View>
    </View>
  );
};

export default AgentInfoStatus;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    gap: 35,
    borderWidth: 1,
    borderColor: "#7E90AE",
    padding: 12,
    borderRadius: 4,
  },
  icon: {},
  agentWrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  agentDetails: {
    fontSize: 16,
    color: colors.white,
  },
  statusWrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  statusText: {
    fontFamily: Fonts.Regular,
    fontSize: 14,
    color: colors.white,
  },
});
