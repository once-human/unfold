import 'package:flutter/material.dart';
import 'constants.dart';

class AppTheme {
  static ThemeData get lightTheme {
    return ThemeData(
      useMaterial3: true,
      brightness: Brightness.light,
      colorScheme: ColorScheme.fromSeed(
        seedColor: const Color(0xFF6750A4), // Primary color
        brightness: Brightness.light,
      ),
      // Performance optimization - precompute text styles
      textTheme: const TextTheme().copyWith(
        displayLarge: const TextStyle(
          fontWeight: FontWeight.bold,
          fontSize: 32,
          letterSpacing: -1.0,
        ),
        displayMedium: const TextStyle(
          fontWeight: FontWeight.bold,
          fontSize: 28,
          letterSpacing: -0.5,
        ),
        displaySmall: const TextStyle(
          fontWeight: FontWeight.w600,
          fontSize: 24,
        ),
        headlineLarge: const TextStyle(
          fontWeight: FontWeight.w600,
          fontSize: 20,
        ),
        bodyLarge: const TextStyle(fontSize: 16, fontWeight: FontWeight.normal),
        bodyMedium: const TextStyle(
          fontSize: 14,
          fontWeight: FontWeight.normal,
        ),
      ),
      // Optimize scrolling performance
      scrollbarTheme: ScrollbarThemeData(
        thickness: MaterialStateProperty.all(6),
        thumbVisibility: MaterialStateProperty.all(true),
        radius: const Radius.circular(10),
      ),
      // Add custom card theme
      cardTheme: CardTheme(
        elevation: 0,
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
        clipBehavior: Clip.antiAlias,
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
    );
  }

  static ThemeData get darkTheme {
    return ThemeData(
      useMaterial3: true,
      brightness: Brightness.dark,
      colorScheme: ColorScheme.fromSeed(
        seedColor: const Color(0xFF6750A4), // Primary color
        brightness: Brightness.dark,
      ),
      // Performance optimization - precompute text styles
      textTheme: const TextTheme().copyWith(
        displayLarge: const TextStyle(
          fontWeight: FontWeight.bold,
          fontSize: 32,
          letterSpacing: -1.0,
        ),
        displayMedium: const TextStyle(
          fontWeight: FontWeight.bold,
          fontSize: 28,
          letterSpacing: -0.5,
        ),
        displaySmall: const TextStyle(
          fontWeight: FontWeight.w600,
          fontSize: 24,
        ),
        headlineLarge: const TextStyle(
          fontWeight: FontWeight.w600,
          fontSize: 20,
        ),
        bodyLarge: const TextStyle(fontSize: 16, fontWeight: FontWeight.normal),
        bodyMedium: const TextStyle(
          fontSize: 14,
          fontWeight: FontWeight.normal,
        ),
      ),
      // Optimize scrolling performance
      scrollbarTheme: ScrollbarThemeData(
        thickness: MaterialStateProperty.all(6),
        thumbVisibility: MaterialStateProperty.all(true),
        radius: const Radius.circular(10),
      ),
      // Add custom card theme
      cardTheme: CardTheme(
        elevation: 0,
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
        clipBehavior: Clip.antiAlias,
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
    );
  }
}
