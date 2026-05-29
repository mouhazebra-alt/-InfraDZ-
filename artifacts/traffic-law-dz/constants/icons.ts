/**
 * Icon mapping system for consistent Arabic icons across the app
 * Associates icons with descriptive labels and accessibility strings
 */

export interface IconConfig {
  feather: string;
  sf: { default: string; selected: string };
  ariaLabel: string;
  ariaDescription?: string;
}

export const ICON_LIBRARY: Record<string, IconConfig> = {
  // Navigation icons
  home: {
    feather: 'home',
    sf: { default: 'house', selected: 'house.fill' },
    ariaLabel: 'الرئيسية',
    ariaDescription: 'الشاشة الرئيسية للتطبيق',
  },
  violations: {
    feather: 'alert-triangle',
    sf: { default: 'exclamationmark.triangle', selected: 'exclamationmark.triangle.fill' },
    ariaLabel: 'المخالفات',
    ariaDescription: 'قائمة جميع المخالفات المرورية',
  },
  assistant: {
    feather: 'message-circle',
    sf: { default: 'message.circle', selected: 'message.circle.fill' },
    ariaLabel: 'المساعد',
    ariaDescription: 'مساعد قانوني ذكي للإجابة على أسئلتك',
  },
  calculator: {
    feather: 'sliders',
    sf: { default: 'gauge', selected: 'gauge' },
    ariaLabel: 'الحاسبة',
    ariaDescription: 'حاسبة لحساب الغرامات والنقاط',
  },
  log: {
    feather: 'clipboard',
    sf: { default: 'list.clipboard', selected: 'list.clipboard.fill' },
    ariaLabel: 'السجل',
    ariaDescription: 'سجل المخالفات والغرامات',
  },
  favorites: {
    feather: 'heart',
    sf: { default: 'heart', selected: 'heart.fill' },
    ariaLabel: 'المفضلة',
    ariaDescription: 'المخالفات المفضلة لديك',
  },
  settings: {
    feather: 'settings',
    sf: { default: 'gearshape', selected: 'gearshape.fill' },
    ariaLabel: 'الإعدادات',
    ariaDescription: 'إعدادات التطبيق والتفضيلات',
  },

  // Category icons
  speed: {
    feather: 'zap',
    sf: { default: 'speedometer', selected: 'speedometer' },
    ariaLabel: 'السرعة',
    ariaDescription: 'مخالفات تجاوز السرعة',
  },
  alcohol: {
    feather: 'alert-octagon',
    sf: { default: 'exclamationmark.octagon', selected: 'exclamationmark.octagon.fill' },
    ariaLabel: 'الكحول',
    ariaDescription: 'مخالفات القيادة تحت التأثير',
  },
  safety: {
    feather: 'shield',
    sf: { default: 'shield', selected: 'shield.fill' },
    ariaLabel: 'السلامة',
    ariaDescription: 'مخالفات السلامة والحماية',
  },
  priority: {
    feather: 'traffic-light',
    sf: { default: 'arrow.merge', selected: 'arrow.merge' },
    ariaLabel: 'الأولوية',
    ariaDescription: 'مخالفات عدم احترام الأولوية',
  },
  parking: {
    feather: 'map-pin',
    sf: { default: 'mappin.circle', selected: 'mappin.circle.fill' },
    ariaLabel: 'التوقف',
    ariaDescription: 'مخالفات التوقف والوقوف',
  },
  lights: {
    feather: 'lightbulb',
    sf: { default: 'lightbulb', selected: 'lightbulb.fill' },
    ariaLabel: 'الإضاءة',
    ariaDescription: 'مخالفات الإضاءة والإشارات',
  },
  documents: {
    feather: 'file-check',
    sf: { default: 'doc.text', selected: 'doc.text.fill' },
    ariaLabel: 'الوثائق',
    ariaDescription: 'مخالفات الوثائق والتراخيص',
  },
  behavior: {
    feather: 'alert-circle',
    sf: { default: 'exclamationmark.circle', selected: 'exclamationmark.circle.fill' },
    ariaLabel: 'السلوك',
    ariaDescription: 'مخالفات السلوك الخطير',
  },

  // Common action icons
  search: {
    feather: 'search',
    sf: { default: 'magnifyingglass', selected: 'magnifyingglass' },
    ariaLabel: 'بحث',
    ariaDescription: 'البحث عن مخالفة',
  },
  filter: {
    feather: 'filter',
    sf: { default: 'line.3.horizontal.decrease', selected: 'line.3.horizontal.decrease' },
    ariaLabel: 'تصفية',
    ariaDescription: 'تصفية المخالفات',
  },
  favorite: {
    feather: 'heart',
    sf: { default: 'heart', selected: 'heart.fill' },
    ariaLabel: 'المفضلة',
    ariaDescription: 'إضافة إلى المفضلة',
  },
  share: {
    feather: 'share-2',
    sf: { default: 'square.and.arrow.up', selected: 'square.and.arrow.up' },
    ariaLabel: 'مشاركة',
    ariaDescription: 'مشاركة هذه المخالفة',
  },
  info: {
    feather: 'info',
    sf: { default: 'info.circle', selected: 'info.circle.fill' },
    ariaLabel: 'معلومات',
    ariaDescription: 'معلومات إضافية',
  },
  close: {
    feather: 'x',
    sf: { default: 'xmark', selected: 'xmark' },
    ariaLabel: 'إغلاق',
    ariaDescription: 'إغلاق هذه النافذة',
  },
  back: {
    feather: 'arrow-left',
    sf: { default: 'arrow.left', selected: 'arrow.left' },
    ariaLabel: 'رجوع',
    ariaDescription: 'العودة إلى الصفحة السابقة',
  },
  forward: {
    feather: 'arrow-right',
    sf: { default: 'arrow.right', selected: 'arrow.right' },
    ariaLabel: 'تقدم',
    ariaDescription: 'الانتقال إلى الصفحة التالية',
  },
  menu: {
    feather: 'menu',
    sf: { default: 'line.3.horizontal', selected: 'line.3.horizontal' },
    ariaLabel: 'قائمة',
    ariaDescription: 'فتح القائمة الرئيسية',
  },
  bell: {
    feather: 'bell',
    sf: { default: 'bell', selected: 'bell.fill' },
    ariaLabel: 'إشعارات',
    ariaDescription: 'الإشعارات والتنبيهات',
  },
};

export default ICON_LIBRARY;
