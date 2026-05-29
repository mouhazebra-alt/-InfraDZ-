import React, { useCallback } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  AccessibilityInfo,
  AccessibilityRole,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
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

const SEVERITY_ICONS = {
  low: "check-circle",
  medium: "alert-circle",
  high: "alert-triangle",
  critical: "x-circle",
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
  const severityIcon = SEVERITY_ICONS[violation.severity];
  const favorite = isFavorite(violation.id);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const heartStyle = useAnimatedStyle(() => ({
    transform: [{ scale: heartScale.value }],
  }));

  const handlePressIn = useCallback(() => {
    scale.value = withSpring(0.98, { damping: 15 });
  }, [scale]);

  const handlePressOut = useCallback(() => {
    scale.value = withSpring(1, { damping: 15 });
  }, [scale]);

  const handleFavorite = useCallback(async () => {
    if (Platform.OS !== "web") {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
    heartScale.value = withSpring(1.4, { damping: 8 }, () => {
      heartScale.value = withSpring(1, { damping: 8 });
    });
    toggleFavorite(violation.id);
  }, [toggleFavorite, violation.id, heartScale]);

  const styles = StyleSheet.create({
    card: {
      backgroundColor: colors.card,
      borderRadius: 16,
      padding: compact ? 14 : 18,
      marginBottom: 14,
      shadowColor: colors.shadow,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.08,
      shadowRadius: 12,
      elevation: 3,
      borderWidth: 1,
      borderColor: colors.border,
    },
    header: {
      flexDirection: "row-reverse",
      alignItems: "flex-start",
      justifyContent: "space-between",
      marginBottom: 12,
      gap: 12,
    },
    titleSection: {
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
      marginBottom: 6,
    },
    categoryBadge: {
      flexDirection: "row-reverse",
      alignItems: "center",
      gap: 6,
      backgroundColor: colors.muted,
      paddingHorizontal: 10,
      paddingVertical: 5,
      borderRadius: 20,
      alignSelf: "flex-end",
    },
    categoryIcon: {
      width: 14,
      height: 14,
      borderRadius: 7,
      backgroundColor: category?.color || colors.primary,
    },
    categoryText: {
      fontSize: 11,
      color: category?.color || colors.primary,
      fontWeight: "600" as const,
      textAlign: "right",
      writingDirection: "rtl",
    },
    favoriteBtn: {
      width: 44,
      height: 44,
      borderRadius: 22,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: favorite ? colors.accent : colors.muted,
    },
    description: {
      fontSize: 13,
      color: colors.mutedForeground,
      textAlign: "right",
      writingDirection: "rtl",
      lineHeight: 19,
      marginBottom: 12,
    },
    severitySection: {
      flexDirection: "row-reverse",
      alignItems: "center",
      gap: 8,
      paddingVertical: 10,
      paddingHorizontal: 12,
      backgroundColor: colors.muted,
      borderRadius: 12,
      marginBottom: 12,
    },
    severityIcon: {
      width: 20,
      height: 20,
      borderRadius: 10,
      backgroundColor: severityColor,
      alignItems: "center",
      justifyContent: "center",
    },
    severityText: {
      fontSize: 12,
      color: severityColor,
      fontWeight: "600" as const,
      textAlign: "right",
      writingDirection: "rtl",
    },
    fineRow: {
      flexDirection: "row-reverse",
      justifyContent: "space-between",
      alignItems: "center",
      paddingTop: 12,
      borderTopWidth: 1,
      borderTopColor: colors.border,
      gap: 12,
    },
    fineBlock: {
      flex: 1,
      alignItems: "flex-end",
    },
    fineLabel: {
      fontSize: 11,
      color: colors.mutedForeground,
      marginBottom: 4,
      textAlign: "right",
      writingDirection: "rtl",
    },
    fineAmount: {
      fontSize: compact ? 16 : 18,
      fontWeight: "800" as const,
      color: colors.primary,
      textAlign: "right",
      writingDirection: "rtl",
    },
    pointsBlock: {
      flex: 1,
      alignItems: "flex-end",
    },
    pointsLabel: {
      fontSize: 11,
      color: colors.mutedForeground,
      marginBottom: 4,
      textAlign: "right",
      writingDirection: "rtl",
    },
    pointsValue: {
      fontSize: compact ? 14 : 16,
      fontWeight: "800" as const,
      color: colors.warning,
      textAlign: "right",
      writingDirection: "rtl",
    },
    articleText: {
      fontSize: 11,
      color: colors.info,
      textAlign: "right",
      writingDirection: "rtl",
      marginTop: 10,
      fontStyle: "italic",
    },
  });

  const accessibilityLabel = `${violation.nameAr}، خطورة: ${SEVERITY_LABELS[violation.severity]}`;
  const accessibilityHint = `الغرامة: ${violation.fine} دج، النقاط: ${violation.points}`;

  return (
    <Animated.View style={animatedStyle}>
      <TouchableOpacity
        activeOpacity={0.95}
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        accessibilityRole="button" as AccessibilityRole
        accessibilityLabel={accessibilityLabel}
        accessibilityHint={accessibilityHint}
      >
        <View style={styles.card}>
          {/* Header with favorite button */}
          <View style={styles.header}>
            <Animated.View style={heartStyle}>
              <TouchableOpacity
                onPress={handleFavorite}
                style={styles.favoriteBtn}
                accessibilityRole="button" as AccessibilityRole
                accessibilityLabel={favorite ? "إزالة من المفضلة" : "إضافة إلى المفضلة"}
                accessibilityHint="اضغط لتبديل حالة المفضلة"
              >
                <Feather
                  name={favorite ? "heart" : "heart"}
                  size={20}
                  color={favorite ? colors.primary : colors.mutedForeground}
                />
              </TouchableOpacity>
            </Animated.View>

            <View style={styles.titleSection}>
              <Text style={styles.title}>{violation.nameAr}</Text>
              {category && (
                <View style={styles.categoryBadge}>
                  <View style={[styles.categoryIcon, { backgroundColor: category.color }]} />
                  <Text style={styles.categoryText}>{category.nameAr}</Text>
                </View>
              )}
            </View>
          </View>

          {/* Description */}
          {!compact && <Text style={styles.description} numberOfLines={2}>{violation.descriptionAr}</Text>}

          {/* Severity Badge */}
          <View style={styles.severitySection}>
            <View style={[styles.severityIcon, { backgroundColor: severityColor }]}>
              <Feather name={severityIcon as any} size={12} color="white" />
            </View>
            <Text style={styles.severityText}>{SEVERITY_LABELS[violation.severity]}</Text>
          </View>

          {/* Fine and Points Row */}
          <View style={styles.fineRow}>
            <View style={styles.pointsBlock}>
              <Text style={styles.pointsLabel}>النقاط</Text>
              <Text style={styles.pointsValue}>-{violation.points}</Text>
            </View>
            <View style={styles.fineBlock}>
              <Text style={styles.fineLabel}>الغرامة</Text>
              <Text style={styles.fineAmount}>{violation.fine.toLocaleString("ar-DZ")}</Text>
            </View>
          </View>

          {/* Article Reference */}
          {!compact && <Text style={styles.articleText}>{violation.article}</Text>}
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
}
