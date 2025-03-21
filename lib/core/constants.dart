import 'package:flutter/material.dart';

/// Global application constants
class AppConstants {
  // App details
  static const String appName = 'Unfold';
  static const String appVersion = '1.0.0';
  static const String appTagline = 'Your chronological life story';

  // Primary color seed for Material You
  static const Color seedColor = Color(0xFF6750A4); // Primary purple

  // Spacing constants
  static const double spacingXS = 4.0;
  static const double spacingS = 8.0;
  static const double spacingM = 16.0;
  static const double spacingL = 24.0;
  static const double spacingXL = 32.0;
  static const double spacing2XL = 48.0;
  static const double spacing3XL = 64.0;

  // Border radius constants
  static const double radiusXS = 4.0;
  static const double radiusS = 8.0;
  static const double radiusM = 12.0;
  static const double radiusL = 16.0;
  static const double radiusXL = 24.0;
  static const double radiusCircular = 1000.0; // Very large for circular shapes

  // Animation durations
  static const Duration animDurationFast = Duration(milliseconds: 200);
  static const Duration animDurationMedium = Duration(milliseconds: 300);
  static const Duration animDurationSlow = Duration(milliseconds: 500);

  // Image placeholders
  static const String defaultImagePlaceholder = 'assets/images/placeholder.png';
  static const String defaultAvatarPlaceholder =
      'assets/images/avatar_placeholder.png';

  // Layout
  static const double maxContentWidth = 1200.0;
  static const double maxCardWidth = 600.0;
  static const EdgeInsets screenPadding = EdgeInsets.all(spacingM);

  // Performance
  static const int defaultAnimationFps = 60;
  static const int highQualityAnimationFps = 120;

  // API and networking
  static const Duration defaultTimeout = Duration(seconds: 10);
  static const Duration cacheValidityDuration = Duration(hours: 1);

  // Typography
  static const double fontSizeXS = 12.0;
  static const double fontSizeS = 14.0;
  static const double fontSizeM = 16.0;
  static const double fontSizeL = 18.0;
  static const double fontSizeXL = 20.0;
  static const double fontSize2XL = 24.0;
  static const double fontSize3XL = 32.0;

  // Elevation
  static const double elevationS = 1.0;
  static const double elevationM = 2.0;
  static const double elevationL = 4.0;
  static const double elevationXL = 8.0;
}

/// App route names
class AppRoutes {
  // Private constructor to prevent instantiation
  AppRoutes._();

  // Auth routes
  static const String splash = '/';
  static const String onboarding = '/onboarding';
  static const String login = '/login';
  static const String signup = '/signup';

  // Main app routes
  static const String home = '/home';
  static const String explore = '/explore';
  static const String postCreate = '/post/create';
  static const String postDetails = '/post/:id';
  static const String profile = '/profile';
  static const String profileEdit = '/profile/edit';
  static const String settings = '/settings';
  static const String notifications = '/notifications';
  static const String search = '/search';

  // Development/Debug routes
  static const String uiShowcase = '/ui-showcase';
}
