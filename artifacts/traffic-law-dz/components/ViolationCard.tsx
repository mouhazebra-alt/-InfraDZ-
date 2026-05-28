import React, { useCallback } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { useColors } from "@/hooks/useColors";
import { useApp } from "@/context/AppContext";
import { Violation, CATEGORIES } from "@/data/violations";

interface ViolationCardProps {
  violation: Violation;
  onPress?: () => void;
  compact?: boolean;
}

const SEVERITY_COLORS = {
  low: "#22C55E",
  medium: "#F59E0B",
  high: "#EF4444",
  critical: "#DC143C",
};

const SEVERITY_LABELS = {
  low: "خفيفة",
  medium: "متوسطة",
  high: "خطيرة",
  critical: "بالغة الخطورة",
};

export function ViolationCard({ violation, onPress, compact = false }: ViolationCardProps) {
  const colors = useColors();
  const { isFavorite, toggleFavorite } = useApp();
  const scale = useSharedValue(1);
  const heartScale = useSharedValue(1);

  const category = CATEGORIES.find((c) => c.id === violation.category);
  const severityColor = SEVERITY_COLORS[violation.severity];
  const favorite = isFavorite(violation.id);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const heartStyle = useAnimatedStyle(() => ({
    transform: [{ scale: heartScale.value }],
  }));

  const handlePressIn = useCallback(() => {
    scale.value = withSpring(0.97, { damping: 15 });
  }, [scale]);

  const handlePressOut = useCallback(() => {
    scale.value = withSpring(1, { damping: 15 });
  }, [scale]);

  const handleFavorite = useCallback(async () => {
    if (Platform.OS !== "web") {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    heartScale.value = withSpring(1.4, { damping: 8 }, () => {
      heartScale.value = withSpring(1, { damping: 8 });
    });
    toggleFavorite(violation.id);
  }, [toggleFavorite, violation.id, heartScale]);

  const styles = StyleSheet.create({
    card: {
      backgroundColor: colors.card,
      borderRadius: colors.radius,
      padding: compact ? 12 : 16,
      marginBottom: 12,
      shadowColor: colors.shadow,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 1,
      shadowRadius: 8,
      elevation: 3,
      borderWidth: 1,
      borderColor: colors.border,
    },
    header: {
      flexDirection: "row-reverse",
      alignItems: "flex-start",
      justifyContent: "space-between",
      marginBottom: 8,
    },
    titleRow: {
      flex: 1,
      alignItems: "flex-end",
    },
    title: {
      fontSize: compact ? 14 : 16,
      fontWeight: "700" as const,
      color: colors.foreground,
      textAlign: "right",
      writingDirection: "rtl",
      lineHeight: 22,
    },
    categoryBadge: {
      flexDirection: "row-reverse",
      alignItems: "center",
      gap: 4,
      backgroundColor: colors.muted,
      paddingHorizontal: 8,
      paddingVertical: 3,
      borderRadius: 20,
      marginTop: 4,
      alignSelf: "flex-end",
    },
    categoryText: {
      fontSize: 11,
      color: colors.mutedForeground,
      fontWeight: "600" as const,
    },
    favoriteBtn: {
      padding: 4,
      marginRight: 8,
    },
    fineRow: {
      flexDirection: "row-reverse",
      justifyContent: "space-between",
      alignItems: "center",
      marginTop: compact ? 8 : 12,
      paddingTop: compact ? 8 : 12,
      borderTopWidth: 1,
      borderTopColor: colors.border,
    },
    fineBlock: {
      alignItems: "flex-end",
    },
    fineLabel: {
      fontSize: 11,
      color: colors.mutedForeground,
      marginBottom: 2,
    },
    fineAmount: {
      fontSize: compact ? 16 : 20,
      fontWeight: "800" as const,
      color: colors.primary,
    },
    fineCurrency: {
      fontSize: 12,
      fontWeight: "600" as const,
      color: colors.primary,
    },
    pointsBlock: {
      alignItems: "center",
    },
    pointsLabel: {
      fontSize: 11,
      color: colors.mutedForeground,
      marginBottom: 2,
    },
    pointsValue: {
      fontSize: compact ? 14 : 18,
      fontWeight: "800" as const,
      color: colors.warning,
    },
    severityDot: {
      width: 8,
      height: 8,
      borderRadius: 4,
      backgroundColor: severityColor,
      marginLeft: 6,
    },
    severityRow: {
      flexDirection: "row-reverse",
      alignItems: "center",
      marginTop: 6,
    },
    severityText: {
      fontSize: 11,
      color: severityColor,
      fontWeight: "600" as const,
    },
    description: {
      fontSize: 13,
      color: colors.mutedForeground,
      textAlign: "right",
      writingDirection: "rtl",
      lineHeight: 19,
      marginTop: 6,
    },
    articleText: {
      fontSize: 11,
      color: colors.info,
      textAlign: "right",
      marginTop: 6,
      fontStyle: "italic",
    },
  });

  return (
    <Animated.View style={animatedStyle}>
      <TouchableOpacity
        activeOpacity={0.95}
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
      >
        <View style={styles.card}>
          <View style={styles.header}>
            <Animated.View style={heartStyle}>
              <TouchableOpacity onPress={handleFavorite} style={styles.favoriteBtn}>
                <Feather
                  name={favorite ? "heart" : "heart"}
                  size={20}
                  color={favorite ? colors.primary : colors.mutedForeground}
                  style={{ opacity: favorite ? 1 : 0.5 }}
                />
              </TouchableOpacity>
            </Animated.View>
            <View style={styles.titleRow}>
              <Text style={styles.title}>{violation.nameAr}</Text>
              {category && (
                <View style={styles.categoryBadge}>
                  <Text style={[styles.categoryText, { color: category.color }]}>
                    {category.nameAr}
                  </Text>
                </View>
              )}
            </View>
          </View>

          {!compact && (
            <Text style={styles.description} numberOfLines={2}>
              {violation.descriptionAr}
            </Text>
          )}

          <View style={styles.severityRow}>
            <View style={styles.severityDot} />
            <Text style={styles.severityText}>{SEVERITY_LABELS[violation.severity]}</Text>
          </View>

          <View style={styles.fineRow}>
            <View style={styles.pointsBlock}>
              <Text style={styles.pointsLabel}>النقاط المخصومة</Text>
              <Text style={styles.pointsValue}>-{violation.points} نقاط</Text>
            </View>
            <View style={styles.fineBlock}>
              <Text style={styles.fineLabel}>الغرامة المالية</Text>
              <Text style={styles.fineAmount}>
                {violation.fine.toLocaleString("ar-DZ")}{" "}
                <Text style={styles.fineCurrency}>دج</Text>
              </Text>
            </View>
          </View>

          {!compact && (
            <Text style={styles.articleText}>{violation.article}</Text>
          )}
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
}
