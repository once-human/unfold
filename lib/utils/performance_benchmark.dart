import 'dart:developer' as developer;
import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:flutter/rendering.dart';
import 'package:flutter/scheduler.dart';

/// Utility for performance benchmarking and measurement
class PerformanceBenchmark {
  // Private constructor to prevent instantiation
  PerformanceBenchmark._();

  // Store performance metrics
  static final Map<String, _PerformanceEntry> _entries = {};

  // Track whether performance monitoring is enabled
  static bool _isMonitoringEnabled = false;

  /// Start performance monitoring for the app
  static void startMonitoring() {
    if (kReleaseMode) return; // Only active in debug/profile mode

    _isMonitoringEnabled = true;

    // Set up frame callback to monitor frame times
    SchedulerBinding.instance.addPostFrameCallback((_) {
      debugPrint('🚀 Performance monitoring started');
    });

    debugPrint('🚀 Performance monitoring started');
  }

  /// Stop performance monitoring
  static void stopMonitoring() {
    _isMonitoringEnabled = false;
    debugPrint('⛔ Performance monitoring stopped');
  }

  /// Track frame time manually
  static void trackFrameTime(Duration frameTime) {
    if (!_isMonitoringEnabled) return;

    // Calculate total frame time in milliseconds
    final totalFrameTimeMs = frameTime.inMicroseconds / 1000;

    // A frame time > 16.67ms means we're not hitting 60fps
    if (totalFrameTimeMs > 16.67) {
      // Log potential jank
      debugPrint(
        '⚠️ Frame exceeded 16.67ms: ${totalFrameTimeMs.toStringAsFixed(2)}ms',
      );
    }
  }

  /// Start tracking a specific operation for benchmarking
  static void startTrackingOperation(String name) {
    if (!_isMonitoringEnabled) return;

    _entries[name] = _PerformanceEntry(name: name, startTime: DateTime.now());
  }

  /// Stop tracking a specific operation and record its performance
  static Duration? stopTrackingOperation(String name) {
    if (!_isMonitoringEnabled) return null;

    final entry = _entries[name];
    if (entry == null) return null;

    entry.endTime = DateTime.now();
    final duration = entry.endTime!.difference(entry.startTime);

    // Log performance information
    debugPrint('⏱️ Operation "$name" took ${duration.inMilliseconds}ms');

    // Start a trace in DevTools if duration is significant
    if (duration.inMilliseconds > 100) {
      developer.Timeline.startSync('Long operation: $name');
      developer.Timeline.finishSync();
    }

    return duration;
  }

  /// Track a widget rebuild for performance analysis
  static void trackWidgetRebuild(String widgetName) {
    if (!_isMonitoringEnabled) return;

    // We can track this in DevTools timeline
    developer.Timeline.instantSync('Widget rebuild: $widgetName');

    // Uncomment for verbose rebuild logging
    // debugPrint('🔄 Widget "$widgetName" rebuilt');
  }

  /// Set target performance metrics
  static void setPerformanceGoals({
    int targetFps = 60,
    int maxFrameTimeMs = 16,
    int targetStartupMs = 2000,
  }) {
    debugPrint('📊 Performance goals set:');
    debugPrint('   - Target FPS: $targetFps');
    debugPrint('   - Max Frame Time: ${maxFrameTimeMs}ms');
    debugPrint('   - Target Startup: ${targetStartupMs}ms');
  }

  /// Enable detailed performance overlay (in debug builds)
  static void enablePerformanceOverlay(BuildContext context) {
    if (kReleaseMode) return;

    // Note: This is just informational - the actual overlay is enabled
    // via MaterialApp's showPerformanceOverlay property
    debugPrint('🔍 Performance overlay should be enabled');
  }
}

/// Internal class for tracking performance operations
class _PerformanceEntry {
  final String name;
  final DateTime startTime;
  DateTime? endTime;

  _PerformanceEntry({required this.name, required this.startTime});
}
