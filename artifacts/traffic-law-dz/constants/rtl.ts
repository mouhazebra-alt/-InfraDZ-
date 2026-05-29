/**
 * RTL/LTR Configuration System
 * Centralized RTL handling for consistent Arabic UI
 */

import { I18nManager, Platform } from 'react-native';

// Force RTL for Arabic
if (Platform.OS !== 'web') {
  I18nManager.forceRTL(true);
  I18nManager.allowRTL(true);
}

export const RTL_CONFIG = {
  direction: 'rtl' as const,
  isRTL: true,
  isAndroid: Platform.OS === 'android',
  isIOS: Platform.OS === 'ios',
  isWeb: Platform.OS === 'web',
};

/**
 * Flex direction that auto-reverses based on RTL
 */
export const rtlRow = () => 'row-reverse' as const;
export const rtlRowReverse = () => 'row' as const;

/**
 * Margin/Padding helpers for RTL
 */
export const rtlMargin = (top: number, right: number, bottom: number, left: number) => ({
  marginTop: top,
  marginRight: left,
  marginBottom: bottom,
  marginLeft: right,
});

export const rtlPadding = (top: number, right: number, bottom: number, left: number) => ({
  paddingTop: top,
  paddingRight: left,
  paddingBottom: bottom,
  paddingLeft: right,
});

/**
 * Text alignment for RTL
 */
export const rtlTextAlign = () => 'right' as const;
export const rtlWritingDirection = () => 'rtl' as const;

/**
 * Common RTL style helpers
 */
export const RTL_STYLES = {
  row: { flexDirection: 'row-reverse' as const },
  rowReverse: { flexDirection: 'row' as const },
  textRTL: {
    textAlign: 'right' as const,
    writingDirection: 'rtl' as const,
  },
  flexEnd: { alignItems: 'flex-end' as const },
  flexStart: { alignItems: 'flex-start' as const },
  justifyEnd: { justifyContent: 'flex-end' as const },
  justifyStart: { justifyContent: 'flex-start' as const },
};

export default RTL_CONFIG;
