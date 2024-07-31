import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from "react-native";
import { Colors } from "../styles/Colors";

export default function CustomCheckBox({
  options,
  selectedItems = [],
  onSelect,
}) {
  const handleToggle = (item) => {
    const isSelected = selectedItems.includes(item);
    if (isSelected) {
      onSelect(selectedItems.filter((selectedItem) => selectedItem !== item));
    } else {
      onSelect([...selectedItems, item]);
    }
  };

  return (
    <View style={styles.container}>
      {options.map((item) => (
        <TouchableOpacity
          key={item}
          style={styles.checkboxContainer}
          onPress={() => handleToggle(item)}
        >
          <View style={styles.checkbox}>
            {selectedItems?.includes(item) && (
              <View style={styles.checkedCircle} />
            )}
          </View>
          <Text>{item}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    gap: 8,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: Colors.secondary,
    backgroundColor: "#fff",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
    shadowColor: "#000000",
    ...Platform.select({
      android: {
        elevation: 7,
        overflow: "hidden",
      },
    }),
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  checkedCircle: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: Colors.secondary,
  },
});
