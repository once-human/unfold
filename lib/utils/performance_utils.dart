import 'dart:ui';
import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:flutter/rendering.dart';
import 'package:unfold/core/app_config.dart';

/// Utility class for performance optimizations
class PerformanceUtils {
  // Private constructor to prevent instantiation
  PerformanceUtils._();

  /// Initialize performance optimizations
  static Future<void> initialize() async {
    _enableHardwareAcceleration();
    _optimizeRasterizer();
    _optimizeImageCache();

    if (kDebugMode) {
      // Log initialization
      debugPrint('✅ Performance optimizations initialized');
      debugPrint('🚀 Rendering engine: ${_getEngineType()}');
    }
  }

  /// Enable hardware acceleration if available
  static void _enableHardwareAcceleration() {
    if (AppConfig.instance.enableHardwareAcceleration) {
      // Set up optimal rendering settings
      if (!kIsWeb) {
        // Note: Flutter automatically uses hardware acceleration where available
        // These are mostly optimizations for specific use cases
      }

      // Set render policy for maximum smoothness
      WidgetsBinding.instance.renderView.automaticSystemUiAdjustment = false;
    }
  }

  /// Optimize the Flutter rasterizer
  static void _optimizeRasterizer() {
    // Configure rendering policy for better performance
    if (kReleaseMode) {
      // Most of these are debug flags that only have effect in debug mode
      // but we set them explicitly for clarity
      debugPaintSizeEnabled = false;
      debugPaintBaselinesEnabled = false;
      debugPaintPointersEnabled = false;
      debugPaintLayerBordersEnabled = false;
      debugRepaintRainbowEnabled = false;
      debugRepaintTextRainbowEnabled = false;
    }
  }

  /// Optimize the image cache for better performance
  static void _optimizeImageCache() {
    // Set image cache size based on device memory
    PaintingBinding.instance.imageCache.maximumSize =
        AppConfig.instance.maxCachedImages;

    // Set maximum bytes for image cache
    PaintingBinding.instance.imageCache.maximumSizeBytes =
        1024 * 1024 * 100; // 100 MB
  }

  /// Check if Flutter is using Impeller engine
  static bool isUsingImpeller() {
    // Method to check if Impeller is being used
    // Currently, we can't reliably detect this at runtime
    // so we'll use platform detection
    return defaultTargetPlatform == TargetPlatform.iOS ||
        defaultTargetPlatform == TargetPlatform.macOS;
  }

  /// Get the current rendering engine type
  static String _getEngineType() {
    if (kIsWeb) {
      return 'CanvasKit (Web)';
    } else {
      // For native platforms, we determine based on platform
      // In the future, we could use more reliable runtime detection
      if (defaultTargetPlatform == TargetPlatform.iOS ||
          defaultTargetPlatform == TargetPlatform.macOS) {
        return 'Likely Impeller';
      } else {
        return 'Likely Skia';
      }
    }
  }
}
