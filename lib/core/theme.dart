import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'constants.dart';

/// App theme manager implementing Material You design system
class AppTheme {
  // Store current color scheme
  static late ColorScheme _lightColorScheme;
  static late ColorScheme _darkColorScheme;

  // Cache themes to avoid rebuilding
  static late ThemeData _lightTheme;
  static late ThemeData _darkTheme;

  // Initialize with default colors
  static void initialize() {
    // Initialize with default seed color
    _lightColorScheme = ColorScheme.fromSeed(
      seedColor: AppConstants.seedColor,
      brightness: Brightness.light,
    );

    _darkColorScheme = ColorScheme.fromSeed(
      seedColor: AppConstants.seedColor,
      brightness: Brightness.dark,
    );

    _buildThemes();
  }

  // Generate themes from color schemes
  static void _buildThemes() {
    _lightTheme = _buildTheme(_lightColorScheme);
    _darkTheme = _buildTheme(_darkColorScheme);
  }

  // Get current light theme
  static ThemeData get lightTheme => _lightTheme;

  // Get current dark theme
  static ThemeData get darkTheme => _darkTheme;

  // Update themes with new seed color
  static void updateWithSeedColor(Color seedColor) {
    _lightColorScheme = ColorScheme.fromSeed(
      seedColor: seedColor,
      brightness: Brightness.light,
    );

    _darkColorScheme = ColorScheme.fromSeed(
      seedColor: seedColor,
      brightness: Brightness.dark,
    );

    _buildThemes();
  }

  // Build theme data from color scheme
  static ThemeData _buildTheme(ColorScheme colorScheme) {
    final isLight = colorScheme.brightness == Brightness.light;
    final baseTextTheme = _createBaseTextTheme(isLight);

    return ThemeData(
      // Use Material 3 (Material You)
      useMaterial3: true,

      // Apply color scheme (Material You)
      colorScheme: colorScheme,

      // Background & scaffolds
      scaffoldBackgroundColor: colorScheme.background,
      canvasColor: colorScheme.surface,

      // Primary elements
      primaryColor: colorScheme.primary,
      primaryColorLight: colorScheme.primaryContainer,
      primaryColorDark: colorScheme.onPrimaryContainer,

      // Cards appearance
      cardTheme: CardTheme(
        elevation: 0,
        color: colorScheme.surfaceVariant,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(AppConstants.radiusL),
        ),
        clipBehavior: Clip.antiAlias,
        margin: const EdgeInsets.all(AppConstants.spacingS),
      ),

      // Elevated buttons
      elevatedButtonTheme: ElevatedButtonThemeData(
        style: ElevatedButton.styleFrom(
          elevation: 0,
          backgroundColor: colorScheme.primary,
          foregroundColor: colorScheme.onPrimary,
          padding: const EdgeInsets.symmetric(
            horizontal: AppConstants.spacingL,
            vertical: AppConstants.spacingM,
          ),
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(AppConstants.radiusM),
          ),
          textStyle: baseTextTheme.labelLarge?.copyWith(
            fontWeight: FontWeight.w600,
          ),
        ),
      ),

      // Outlined buttons
      outlinedButtonTheme: OutlinedButtonThemeData(
        style: OutlinedButton.styleFrom(
          foregroundColor: colorScheme.primary,
          side: BorderSide(color: colorScheme.outline),
          padding: const EdgeInsets.symmetric(
            horizontal: AppConstants.spacingL,
            vertical: AppConstants.spacingM,
          ),
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(AppConstants.radiusM),
          ),
          textStyle: baseTextTheme.labelLarge?.copyWith(
            fontWeight: FontWeight.w600,
          ),
        ),
      ),

      // Text buttons
      textButtonTheme: TextButtonThemeData(
        style: TextButton.styleFrom(
          foregroundColor: colorScheme.primary,
          textStyle: baseTextTheme.labelLarge?.copyWith(
            fontWeight: FontWeight.w600,
          ),
        ),
      ),

      // Input decoration for text fields
      inputDecorationTheme: InputDecorationTheme(
        filled: true,
        fillColor: colorScheme.surfaceVariant.withOpacity(0.5),
        contentPadding: const EdgeInsets.symmetric(
          horizontal: AppConstants.spacingM,
          vertical: AppConstants.spacingM,
        ),
        border: OutlineInputBorder(
          borderRadius: BorderRadius.circular(AppConstants.radiusM),
          borderSide: BorderSide.none,
        ),
        enabledBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(AppConstants.radiusM),
          borderSide: BorderSide(color: colorScheme.outline.withOpacity(0.3)),
        ),
        focusedBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(AppConstants.radiusM),
          borderSide: BorderSide(color: colorScheme.primary, width: 2),
        ),
        errorBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(AppConstants.radiusM),
          borderSide: BorderSide(color: colorScheme.error),
        ),
        labelStyle: TextStyle(color: colorScheme.onSurfaceVariant),
      ),

      // AppBar style
      appBarTheme: AppBarTheme(
        elevation: 0,
        backgroundColor: colorScheme.surface,
        foregroundColor: colorScheme.onSurface,
        systemOverlayStyle:
            isLight ? SystemUiOverlayStyle.dark : SystemUiOverlayStyle.light,
        titleTextStyle: baseTextTheme.titleLarge?.copyWith(
          fontWeight: FontWeight.w600,
          color: colorScheme.onSurface,
        ),
      ),

      // Tab bar styling
      tabBarTheme: TabBarTheme(
        labelColor: colorScheme.primary,
        unselectedLabelColor: colorScheme.onSurfaceVariant,
        indicatorColor: colorScheme.primary,
        dividerColor: Colors.transparent,
      ),

      // Bottom navigation bar
      bottomNavigationBarTheme: BottomNavigationBarThemeData(
        backgroundColor: colorScheme.surface,
        selectedItemColor: colorScheme.primary,
        unselectedItemColor: colorScheme.onSurfaceVariant,
        elevation: 8,
        type: BottomNavigationBarType.fixed,
      ),

      // Dialog appearance
      dialogTheme: DialogTheme(
        backgroundColor: colorScheme.surface,
        elevation: 3,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(AppConstants.radiusL),
        ),
      ),

      // Text theme
      textTheme: baseTextTheme,

      // Scroll physics for smooth scrolling
      scrollbarTheme: ScrollbarThemeData(
        thickness: MaterialStateProperty.all(6),
        thumbVisibility: MaterialStateProperty.all(true),
        radius: const Radius.circular(AppConstants.radiusM),
        thumbColor: MaterialStateProperty.all(
          colorScheme.primary.withOpacity(0.5),
        ),
      ),

      // Optimize animation transitions
      pageTransitionsTheme: const PageTransitionsTheme(
        builders: {
          TargetPlatform.android: ZoomPageTransitionsBuilder(),
          TargetPlatform.iOS: CupertinoPageTransitionsBuilder(),
          TargetPlatform.macOS: CupertinoPageTransitionsBuilder(),
          TargetPlatform.windows: ZoomPageTransitionsBuilder(),
          TargetPlatform.linux: ZoomPageTransitionsBuilder(),
        },
      ),

      // Divider theme
      dividerTheme: DividerThemeData(
        color: colorScheme.outlineVariant,
        thickness: 1,
        space: 1,
      ),

      // Slider customization
      sliderTheme: SliderThemeData(
        activeTrackColor: colorScheme.primary,
        inactiveTrackColor: colorScheme.surfaceVariant,
        thumbColor: colorScheme.primary,
        overlayColor: colorScheme.primary.withOpacity(0.12),
        trackHeight: 4,
      ),

      // Checkbox style
      checkboxTheme: CheckboxThemeData(
        fillColor: MaterialStateProperty.resolveWith((states) {
          if (states.contains(MaterialState.selected)) {
            return colorScheme.primary;
          }
          return colorScheme.surfaceVariant;
        }),
        checkColor: MaterialStateProperty.all(colorScheme.onPrimary),
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(AppConstants.radiusXS),
        ),
      ),

      // Tooltip style
      tooltipTheme: TooltipThemeData(
        decoration: BoxDecoration(
          color: colorScheme.inverseSurface,
          borderRadius: BorderRadius.circular(AppConstants.radiusS),
        ),
        textStyle: TextStyle(color: colorScheme.onInverseSurface),
      ),
    );
  }

  // Create base text theme
  static TextTheme _createBaseTextTheme(bool isLight) {
    return TextTheme(
      // Display styles
      displayLarge: TextStyle(
        fontWeight: FontWeight.bold,
        fontSize: 57,
        letterSpacing: -0.25,
        height: 1.12,
        color: isLight ? const Color(0xFF1C1B1F) : const Color(0xFFF4EFF4),
      ),
      displayMedium: TextStyle(
        fontWeight: FontWeight.bold,
        fontSize: 45,
        letterSpacing: 0,
        height: 1.16,
        color: isLight ? const Color(0xFF1C1B1F) : const Color(0xFFF4EFF4),
      ),
      displaySmall: TextStyle(
        fontWeight: FontWeight.bold,
        fontSize: 36,
        letterSpacing: 0,
        height: 1.22,
        color: isLight ? const Color(0xFF1C1B1F) : const Color(0xFFF4EFF4),
      ),

      // Headline styles
      headlineLarge: TextStyle(
        fontWeight: FontWeight.w600,
        fontSize: 32,
        letterSpacing: 0,
        height: 1.25,
        color: isLight ? const Color(0xFF1C1B1F) : const Color(0xFFF4EFF4),
      ),
      headlineMedium: TextStyle(
        fontWeight: FontWeight.w600,
        fontSize: 28,
        letterSpacing: 0,
        height: 1.29,
        color: isLight ? const Color(0xFF1C1B1F) : const Color(0xFFF4EFF4),
      ),
      headlineSmall: TextStyle(
        fontWeight: FontWeight.w600,
        fontSize: 24,
        letterSpacing: 0,
        height: 1.33,
        color: isLight ? const Color(0xFF1C1B1F) : const Color(0xFFF4EFF4),
      ),

      // Title styles
      titleLarge: TextStyle(
        fontWeight: FontWeight.w600,
        fontSize: 22,
        letterSpacing: 0,
        height: 1.27,
        color: isLight ? const Color(0xFF1C1B1F) : const Color(0xFFF4EFF4),
      ),
      titleMedium: TextStyle(
        fontWeight: FontWeight.w600,
        fontSize: 16,
        letterSpacing: 0.15,
        height: 1.5,
        color: isLight ? const Color(0xFF1C1B1F) : const Color(0xFFF4EFF4),
      ),
      titleSmall: TextStyle(
        fontWeight: FontWeight.w500,
        fontSize: 14,
        letterSpacing: 0.1,
        height: 1.43,
        color: isLight ? const Color(0xFF1C1B1F) : const Color(0xFFF4EFF4),
      ),

      // Label styles
      labelLarge: TextStyle(
        fontWeight: FontWeight.w500,
        fontSize: 14,
        letterSpacing: 0.1,
        height: 1.43,
        color: isLight ? const Color(0xFF1C1B1F) : const Color(0xFFF4EFF4),
      ),
      labelMedium: TextStyle(
        fontWeight: FontWeight.w500,
        fontSize: 12,
        letterSpacing: 0.5,
        height: 1.33,
        color: isLight ? const Color(0xFF1C1B1F) : const Color(0xFFF4EFF4),
      ),
      labelSmall: TextStyle(
        fontWeight: FontWeight.w500,
        fontSize: 11,
        letterSpacing: 0.5,
        height: 1.45,
        color: isLight ? const Color(0xFF1C1B1F) : const Color(0xFFF4EFF4),
      ),

      // Body styles
      bodyLarge: TextStyle(
        fontWeight: FontWeight.normal,
        fontSize: 16,
        letterSpacing: 0.5,
        height: 1.5,
        color: isLight ? const Color(0xFF1C1B1F) : const Color(0xFFF4EFF4),
      ),
      bodyMedium: TextStyle(
        fontWeight: FontWeight.normal,
        fontSize: 14,
        letterSpacing: 0.25,
        height: 1.43,
        color: isLight ? const Color(0xFF1C1B1F) : const Color(0xFFF4EFF4),
      ),
      bodySmall: TextStyle(
        fontWeight: FontWeight.normal,
        fontSize: 12,
        letterSpacing: 0.4,
        height: 1.33,
        color: isLight ? const Color(0xFF49454F) : const Color(0xFFCAC4D0),
      ),
    );
  }
}
