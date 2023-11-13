import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { Icon, MD3Colors } from "react-native-paper";
import { calculateTimeAfterHours, getTodayAt5 } from "../../utils/timeUtils";

interface SafeDriveInfoProps {
  bloodAlcoholContent: number;
  drinkStartTime: string;
  requiredTimeToDrive: number;
  additionalTimeForDrive: number;
}

const SafeDriveInfo: React.FC<SafeDriveInfoProps> = ({
  bloodAlcoholContent,
  drinkStartTime,
  requiredTimeToDrive,
  additionalTimeForDrive,
}) => {
  let canDriveFrom: string;

  if (drinkStartTime === null) {
    canDriveFrom = calculateTimeAfterHours(
      getTodayAt5(),
      additionalTimeForDrive
    );
  } else {
    const startTime = new Date(drinkStartTime);
    const todayAt5 = new Date(getTodayAt5());
    const timeDiff = startTime.getTime() - todayAt5.getTime();
    const remainingTimeAfterNewDrink = parseFloat(
      (timeDiff / (1000 * 60 * 60)).toFixed(1)
    );

    canDriveFrom = calculateTimeAfterHours(
      drinkStartTime,
      requiredTimeToDrive + remainingTimeAfterNewDrink
    );
  }

  return (
    <View style={styles.rootContainer}>
      <View style={styles.chipsContainer}>
        <Icon source="blood-bag" color={MD3Colors.error50} size={32} />
        <Text style={styles.chipText}>MAX {bloodAlcoholContent} %</Text>
      </View>
      <View style={styles.chipsContainer}>
        {canDriveFrom === "passed" ? (
          <>
            <Icon source="car" color="#6A9C89" size={32} />
            <Text style={styles.chipText}>안전 운전</Text>
          </>
        ) : (
          <>
            <Icon source="car-off" color={MD3Colors.error50} size={32} />
            <Text style={styles.chipText}>{canDriveFrom} 까지</Text>
          </>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    paddingBottom: 8,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  chipsContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: "48%",
    padding: 12,
    borderRadius: 5,
    backgroundColor: "rgba(255,255,255,0.1)",
  },
  chipText: {
    fontSize: 16,
    // fontFamily: "LineRegular",
    color: "white",
  },
});

export default SafeDriveInfo;
