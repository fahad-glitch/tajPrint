import React, { useState } from "react";
import { View, TouchableOpacity, Text } from "react-native";

const Accordion = ({ title, content }) => {
  const [expanded, setExpanded] = useState(false);

  const toggleAccordion = () => {
    setExpanded(!expanded);
  };

  return (
    <View
      style={{
        marginBottom: 15,
      }}
    >
      <TouchableOpacity onPress={toggleAccordion}>
        <View
          style={[{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingVertical: 14,
            paddingHorizontal: 20,
            borderRadius:10,
            // borderBottomWidth: 1,
            backgroundColor: "#d9d9d96e",
          },expanded?{
            borderBottomLeftRadius:0,
            borderBottomRightRadius:0,
          }:{}]}
        >
          <Text
            style={{
              fontSize: 16,
              fontFamily: "Poppins-SemiBold",
            }}
          >
            {title}
          </Text>
          <Text>{expanded ? "-" : "+"}</Text>
        </View>
      </TouchableOpacity>
      {expanded && (
        <View
          style={{
            paddingVertical: 10,
            paddingHorizontal: 20,
            backgroundColor: "#FAFAFA",
          }}
        >
          <Text
            style={{
              fontSize: 13,
              fontFamily: "Poppins-Regular",
            }}
          >
            {content}
          </Text>
        </View>
      )}
    </View>
  );
};

export default Accordion;
