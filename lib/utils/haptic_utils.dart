import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

/// Utility class for haptic feedback with iOS-like patterns
class HapticUtils {
  // Private constructor to prevent instantiation
  HapticUtils._();

  /// Light impact feedback - use for subtle interactions
  static Future<void> lightImpact() async {
    await HapticFeedback.lightImpact();
  }

  /// Medium impact feedback - use for moderate interactions like selections
  static Future<void> mediumImpact() async {
    await HapticFeedback.mediumImpact();
  }

  /// Heavy impact feedback - use for important interactions
  static Future<void> heavyImpact() async {
    await HapticFeedback.heavyImpact();
  }

  /// Selection click feedback - use for selecting items
  static Future<void> selectionClick() async {
    await HapticFeedback.selectionClick();
  }

  /// Vibrate feedback - longer vibration for critical actions
  static Future<void> vibrate() async {
    await HapticFeedback.vibrate();
  }

  /// Success feedback - custom pattern for successful operations
  static Future<void> success() async {
    // iOS success pattern: light + delay + light
    await lightImpact();
    await Future.delayed(const Duration(milliseconds: 40));
    await lightImpact();
  }

  /// Warning feedback - custom pattern for warnings
  static Future<void> warning() async {
    // iOS warning pattern: medium + delay + light
    await mediumImpact();
    await Future.delayed(const Duration(milliseconds: 40));
    await lightImpact();
  }

  /// Error feedback - custom pattern for errors
  static Future<void> error() async {
    // iOS error pattern: heavy + delay + medium
    await heavyImpact();
    await Future.delayed(const Duration(milliseconds: 50));
    await mediumImpact();
  }

  /// Toggle feedback - used for toggling switches
  static Future<void> toggleOn() async {
    await lightImpact();
  }

  /// Swipe success feedback - used when a swipe action completes
  static Future<void> swipeSuccess() async {
    await mediumImpact();
  }

  /// Page transition feedback - subtle feedback for page changes
  static Future<void> pageTransition() async {
    await lightImpact();
  }

  /// Method to check if haptics are supported
  static Future<bool> isSupported() async {
    try {
      // Try a simple haptic operation to see if it's supported
      await HapticFeedback.selectionClick();
      return true;
    } catch (e) {
      return false;
    }
  }
}
