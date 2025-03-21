import 'package:flutter/foundation.dart';

/// App environment types
enum AppEnvironment { development, staging, production }

/// App-level configuration
class AppConfig {
  // Private constructor for singleton pattern
  AppConfig._();

  // Singleton instance
  static final AppConfig instance = AppConfig._();

  // Current environment
  AppEnvironment _environment = AppEnvironment.development;

  // Getters
  AppEnvironment get environment => _environment;
  bool get isDevelopment => _environment == AppEnvironment.development;
  bool get isStaging => _environment == AppEnvironment.staging;
  bool get isProduction => _environment == AppEnvironment.production;

  // Base URLs based on environment
  String get apiBaseUrl {
    switch (_environment) {
      case AppEnvironment.development:
        return 'https://dev-api.unfold-app.com';
      case AppEnvironment.staging:
        return 'https://staging-api.unfold-app.com';
      case AppEnvironment.production:
        return 'https://api.unfold-app.com';
    }
  }

  // Features flags that can be toggled
  bool enableAnalytics = false;
  bool enablePerformanceMonitoring = true;
  bool enableCrashReporting = true;

  // Set environment (call during app initialization)
  void setEnvironment(AppEnvironment env) {
    _environment = env;

    // Configure environment-specific settings
    if (_environment == AppEnvironment.production) {
      enableAnalytics = true;
    }

    // Log environment when not in production
    if (!isProduction) {
      debugPrint('🔧 App running in ${_environment.name} mode');
    }
  }

  // Performance optimization settings
  final int timelinePageSize = 20; // Number of posts to load at once
  final int maxCachedImages =
      100; // Maximum number of images to keep in memory cache
  final Duration prefetchTimeout = const Duration(
    seconds: 5,
  ); // Timeout for prefetching content

  // App version info
  String get appVersionString => '$appVersion ($buildNumber)';
  String appVersion = '1.0.0';
  String buildNumber = '1';

  // Device-specific optimizations
  final bool enableHardwareAcceleration = true;
  final bool preferIsolateComputing =
      true; // Use isolates for heavy computations

  // Initialize with device-specific settings
  Future<void> initialize() async {
    // This will be filled in when we add device_info_plus integration
    // For now, just a placeholder for future implementation
  }
}
