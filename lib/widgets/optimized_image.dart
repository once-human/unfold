import 'package:cached_network_image/cached_network_image.dart';
import 'package:flutter/material.dart';
import 'package:unfold/core/constants.dart';

/// An optimized image widget that handles caching, loading states and errors
class OptimizedImage extends StatelessWidget {
  /// URL of the image to display
  final String imageUrl;

  /// Width of the image
  final double? width;

  /// Height of the image
  final double? height;

  /// How to fit the image within its bounds
  final BoxFit fit;

  /// Border radius for the image
  final BorderRadius? borderRadius;

  /// Placeholder asset path to show while loading
  final String? placeholder;

  /// Whether to use a shimmer effect for loading
  final bool useShimmer;

  /// Whether to use a blur hash placeholder
  final String? blurHash;

  /// Optional color filter to apply to the image
  final ColorFilter? colorFilter;

  /// Duration of fade-in animation
  final Duration fadeInDuration;

  /// Memory cache width (for downsampling optimization)
  final int? memCacheWidth;

  /// Memory cache height (for downsampling optimization)
  final int? memCacheHeight;

  /// Create an optimized image
  const OptimizedImage({
    Key? key,
    required this.imageUrl,
    this.width,
    this.height,
    this.fit = BoxFit.cover,
    this.borderRadius,
    this.placeholder,
    this.useShimmer = true,
    this.blurHash,
    this.colorFilter,
    this.fadeInDuration = const Duration(milliseconds: 200),
    this.memCacheWidth,
    this.memCacheHeight,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final actualPlaceholder =
        placeholder ?? AppConstants.defaultImagePlaceholder;

    final imageWidget = CachedNetworkImage(
      imageUrl: imageUrl,
      width: width,
      height: height,
      fit: fit,
      memCacheWidth: memCacheWidth,
      memCacheHeight: memCacheHeight,
      fadeInDuration: fadeInDuration,
      placeholder: (context, url) => _buildPlaceholder(context),
      errorWidget: (context, url, error) => _buildErrorWidget(),
    );

    // Apply border radius if specified
    if (borderRadius != null) {
      return ClipRRect(borderRadius: borderRadius!, child: imageWidget);
    }

    // Apply color filter if specified
    if (colorFilter != null) {
      return ColorFiltered(colorFilter: colorFilter!, child: imageWidget);
    }

    return imageWidget;
  }

  /// Build loading placeholder
  Widget _buildPlaceholder(BuildContext context) {
    // If shimmer effect is enabled, we would add it here
    // For now, using a simplified placeholder
    return Container(
      width: width,
      height: height,
      color: Theme.of(context).colorScheme.surfaceVariant.withOpacity(0.3),
      child: Center(
        child: SizedBox(
          width: 24,
          height: 24,
          child: CircularProgressIndicator(
            strokeWidth: 2,
            color: Theme.of(context).colorScheme.primary,
          ),
        ),
      ),
    );
  }

  /// Build error widget
  Widget _buildErrorWidget() {
    return Container(
      width: width,
      height: height,
      color: Colors.grey.shade200,
      child: const Center(
        child: Icon(Icons.broken_image_rounded, color: Colors.grey),
      ),
    );
  }
}
