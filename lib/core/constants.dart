import 'package:flutter/material.dart';

/// App-wide constants
class AppConstants {
  // Private constructor to prevent instantiation
  AppConstants._();

  // App information
  static const String appName = 'Unfold';
  static const String appVersion = '1.0.0';

  // API constants
  static const int apiConnectTimeout = 10000; // 10 seconds
  static const int apiReceiveTimeout = 10000; // 10 seconds

  // Animation durations
  static const Duration quickAnimation = Duration(milliseconds: 150);
  static const Duration normalAnimation = Duration(milliseconds: 250);
  static const Duration slowAnimation = Duration(milliseconds: 350);

  // UI spacing constants
  static const double spacingXS = 4.0;
  static const double spacingS = 8.0;
  static const double spacingM = 16.0;
  static const double spacingL = 24.0;
  static const double spacingXL = 32.0;
  static const double spacingXXL = 48.0;

  // Border radius
  static const double radiusS = 4.0;
  static const double radiusM = 8.0;
  static const double radiusL = 12.0;
  static const double radiusXL = 16.0;
  static const double radiusXXL = 24.0;
  static const double radiusCircular = 100.0;

  // Icon sizes
  static const double iconS = 16.0;
  static const double iconM = 24.0;
  static const double iconL = 32.0;
  static const double iconXL = 48.0;

  // Default page sizes for pagination
  static const int defaultPageSize = 20;

  // UI constraints
  static const double maxContentWidth = 600.0;
  static const double maxDialogWidth = 400.0;

  // Tap areas
  static const double minTapSize = 48.0;

  // Scrolling physics for smooth scrolling
  static const ScrollPhysics smoothScrollPhysics = BouncingScrollPhysics(
    parent: AlwaysScrollableScrollPhysics(),
  );

  // Cache constants
  static const Duration defaultCacheDuration = Duration(days: 7);

  // Default placeholder asset paths
  static const String defaultUserPlaceholder =
      'assets/images/user_placeholder.png';
  static const String defaultImagePlaceholder =
      'assets/images/image_placeholder.png';
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
}
