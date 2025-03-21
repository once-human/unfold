import 'dart:io';
import 'dart:math' as math;
import 'dart:typed_data';

import 'package:flutter/foundation.dart';
import 'package:path_provider/path_provider.dart';

/// Utility class for media processing and optimization
class MediaUtils {
  // Private constructor to prevent instantiation
  MediaUtils._();

  /// Compress an image for upload or storage
  ///
  /// This would integrate with an image compression library
  /// Currently a placeholder for actual implementation
  static Future<Uint8List?> compressImage(
    Uint8List imageBytes, {
    int quality = 85,
    int maxWidth = 1080,
    int maxHeight = 1080,
  }) async {
    try {
      // This is a placeholder for actual image compression
      // In a real implementation, would use a platform-specific solution

      // Simulate compression delay for demo purposes
      if (kDebugMode) {
        await Future.delayed(const Duration(milliseconds: 200));
        debugPrint('🖼️ Image compressed: ${imageBytes.length} bytes');
        // Return original bytes for now
        return imageBytes;
      }

      return imageBytes;
    } catch (e) {
      debugPrint('Error compressing image: $e');
      return null;
    }
  }

  /// Create an optimized thumbnail from an image
  static Future<Uint8List?> createThumbnail(
    Uint8List imageBytes, {
    int width = 300,
    int height = 300,
    int quality = 80,
  }) async {
    try {
      // This is a placeholder for actual thumbnail generation
      // In a real implementation, would resize the image

      // Simulate processing delay for demo purposes
      if (kDebugMode) {
        await Future.delayed(const Duration(milliseconds: 100));
        debugPrint('👍 Thumbnail created');
        // Return original bytes for now
        return imageBytes;
      }

      return imageBytes;
    } catch (e) {
      debugPrint('Error creating thumbnail: $e');
      return null;
    }
  }

  /// Get temporary file path for media processing
  static Future<String> getTemporaryFilePath(String filename) async {
    final directory = await getTemporaryDirectory();
    return '${directory.path}/$filename';
  }

  /// Get optimized cache directory for media storage
  static Future<Directory> getMediaCacheDirectory() async {
    final cacheDir = await getTemporaryDirectory();
    final mediaCacheDir = Directory('${cacheDir.path}/media_cache');

    if (!await mediaCacheDir.exists()) {
      await mediaCacheDir.create(recursive: true);
    }

    return mediaCacheDir;
  }

  /// Clear media cache to free up space
  static Future<bool> clearMediaCache() async {
    try {
      final cacheDir = await getMediaCacheDirectory();
      if (await cacheDir.exists()) {
        await cacheDir.delete(recursive: true);
        await cacheDir.create();
        return true;
      }
      return false;
    } catch (e) {
      debugPrint('Error clearing media cache: $e');
      return false;
    }
  }

  /// Get total size of media cache in bytes
  static Future<int> getMediaCacheSize() async {
    try {
      final cacheDir = await getMediaCacheDirectory();
      int totalSize = 0;

      await for (final entity in cacheDir.list(recursive: true)) {
        if (entity is File) {
          totalSize += await entity.length();
        }
      }

      return totalSize;
    } catch (e) {
      debugPrint('Error calculating media cache size: $e');
      return 0;
    }
  }

  /// Format bytes into human-readable size
  static String formatBytes(int bytes, {int decimals = 1}) {
    if (bytes <= 0) return '0 B';
    const suffixes = ['B', 'KB', 'MB', 'GB', 'TB'];
    var i = (math.log(bytes) / math.log(1024)).floor();
    return '${(bytes / math.pow(1024, i)).toStringAsFixed(decimals)} ${suffixes[i]}';
  }
}
