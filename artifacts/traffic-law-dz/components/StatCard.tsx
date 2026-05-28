import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useColors } from "@/hooks/useColors";

interface StatCardProps {
  icon: keyof typeof Feather.glyphMap;
  iconColor: string;
  label: string;
  value: string;
}

export function StatCard({ icon, iconColor, label, value }: StatCardProps) {
  const colors = useColors();

  const styles = StyleSheet.create({
    card: {
      flex: 1,
      backgroundColor: colors.card,
      borderRadius: colors.radius,
      padding: 14,
      alignItems: "flex-end",
      borderWidth: 1,
      borderColor: colors.border,
      shadowColor: colors.shadow,
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 1,
      shadowRadius: 4,
      elevation: 2,
    },
    iconBox: {
      width: 36,
      height: 36,
      borderRadius: 10,
      backgroundColor: iconColor + "20",
      alignItems: "center",
      justifyContent: "center",
      marginBottom: 8,
    },
    value: {
      fontSize: 22,
      fontWeight: "800" as const,
      color: colors.foreground,
      textAlign: "right",
    },
    label: {
      fontSize: 12,
      color: colors.mutedForeground,
      textAlign: "right",
      marginTop: 2,
    },
  });

  return (
    <View style={styles.card}>
      <View style={styles.iconBox}>
        <Feather name={icon} size={18} color={iconColor} />
      </View>
      <Text style={styles.value}>{value}</Text>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
}
