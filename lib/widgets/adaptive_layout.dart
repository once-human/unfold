import 'package:flutter/material.dart';

/// Screen size breakpoints for responsive design
class ScreenBreakpoints {
  static const double extraSmall = 480;
  static const double small = 640;
  static const double medium = 960;
  static const double large = 1280;
  static const double extraLarge = 1440;
}

/// Screen size categories for adaptive layouts
enum ScreenSize {
  /// Mobile portrait: < 480px
  extraSmall,

  /// Mobile landscape / small tablet portrait: 480px - 640px
  small,

  /// Tablet portrait / small tablet landscape: 640px - 960px
  medium,

  /// Desktop / large tablet landscape: 960px - 1280px
  large,

  /// Large desktop: > 1280px
  extraLarge,
}

/// An adaptive layout that changes based on screen size
class AdaptiveLayout extends StatelessWidget {
  /// Widget to display on extra small screens (mobile portrait)
  final Widget? extraSmallScreen;

  /// Widget to display on small screens (mobile landscape)
  final Widget? smallScreen;

  /// Widget to display on medium screens (tablet portrait)
  final Widget? mediumScreen;

  /// Widget to display on large screens (desktop / tablet landscape)
  final Widget? largeScreen;

  /// Widget to display on extra large screens (large desktop)
  final Widget? extraLargeScreen;

  /// Force a specific screen size (useful for testing)
  final ScreenSize? forceScreenSize;

  /// Creates an adaptive layout that changes based on screen size
  const AdaptiveLayout({
    Key? key,
    this.extraSmallScreen,
    this.smallScreen,
    this.mediumScreen,
    this.largeScreen,
    this.extraLargeScreen,
    this.forceScreenSize,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return LayoutBuilder(
      builder: (context, constraints) {
        final screenSize =
            forceScreenSize ?? _getScreenSize(constraints.maxWidth);

        // Determine which layout to show based on screen size
        // Falls back to larger layouts if specific one isn't provided
        switch (screenSize) {
          case ScreenSize.extraSmall:
            return extraSmallScreen ??
                smallScreen ??
                mediumScreen ??
                largeScreen ??
                extraLargeScreen ??
                _buildPlaceholder('Extra Small Screen', context);

          case ScreenSize.small:
            return smallScreen ??
                mediumScreen ??
                largeScreen ??
                extraLargeScreen ??
                extraSmallScreen ??
                _buildPlaceholder('Small Screen', context);

          case ScreenSize.medium:
            return mediumScreen ??
                largeScreen ??
                smallScreen ??
                extraLargeScreen ??
                extraSmallScreen ??
                _buildPlaceholder('Medium Screen', context);

          case ScreenSize.large:
            return largeScreen ??
                mediumScreen ??
                extraLargeScreen ??
                smallScreen ??
                extraSmallScreen ??
                _buildPlaceholder('Large Screen', context);

          case ScreenSize.extraLarge:
            return extraLargeScreen ??
                largeScreen ??
                mediumScreen ??
                smallScreen ??
                extraSmallScreen ??
                _buildPlaceholder('Extra Large Screen', context);
        }
      },
    );
  }

  /// Determine screen size category based on width
  ScreenSize _getScreenSize(double width) {
    if (width < ScreenBreakpoints.extraSmall) {
      return ScreenSize.extraSmall;
    } else if (width < ScreenBreakpoints.small) {
      return ScreenSize.small;
    } else if (width < ScreenBreakpoints.medium) {
      return ScreenSize.medium;
    } else if (width < ScreenBreakpoints.large) {
      return ScreenSize.large;
    } else {
      return ScreenSize.extraLarge;
    }
  }

  /// Placeholder widget when no layout is provided
  Widget _buildPlaceholder(String text, BuildContext context) {
    return Center(
      child: Text(
        'No layout provided for $text',
        style: Theme.of(context).textTheme.bodyLarge,
      ),
    );
  }
}

/// Extension methods for MediaQuery to check screen size
extension ScreenSizeExtension on MediaQueryData {
  /// Check if screen is extra small
  bool get isExtraSmall => size.width < ScreenBreakpoints.extraSmall;

  /// Check if screen is small
  bool get isSmall =>
      size.width >= ScreenBreakpoints.extraSmall &&
      size.width < ScreenBreakpoints.small;

  /// Check if screen is medium
  bool get isMedium =>
      size.width >= ScreenBreakpoints.small &&
      size.width < ScreenBreakpoints.medium;

  /// Check if screen is large
  bool get isLarge =>
      size.width >= ScreenBreakpoints.medium &&
      size.width < ScreenBreakpoints.large;

  /// Check if screen is extra large
  bool get isExtraLarge => size.width >= ScreenBreakpoints.large;

  /// Get the screen size category
  ScreenSize get screenSize {
    if (isExtraSmall) return ScreenSize.extraSmall;
    if (isSmall) return ScreenSize.small;
    if (isMedium) return ScreenSize.medium;
    if (isLarge) return ScreenSize.large;
    return ScreenSize.extraLarge;
  }
}

/// Helper class for adapting to different screen sizes
class ScreenAdaptive {
  /// Private constructor to prevent instantiation
  ScreenAdaptive._();

  /// Get responsive value based on screen width
  static T value<T>({
    required BuildContext context,
    required T extraSmall,
    T? small,
    T? medium,
    T? large,
    T? extraLarge,
  }) {
    final screenWidth = MediaQuery.of(context).size.width;

    if (screenWidth >= ScreenBreakpoints.large && extraLarge != null) {
      return extraLarge;
    }
    if (screenWidth >= ScreenBreakpoints.medium && large != null) {
      return large;
    }
    if (screenWidth >= ScreenBreakpoints.small && medium != null) {
      return medium;
    }
    if (screenWidth >= ScreenBreakpoints.extraSmall && small != null) {
      return small;
    }

    return extraSmall;
  }

  /// Get padding that adapts to screen size
  static EdgeInsets padding(
    BuildContext context, {
    EdgeInsets? extraSmall,
    EdgeInsets? small,
    EdgeInsets? medium,
    EdgeInsets? large,
    EdgeInsets? extraLarge,
  }) {
    return value<EdgeInsets>(
      context: context,
      extraSmall: extraSmall ?? const EdgeInsets.all(8),
      small: small ?? const EdgeInsets.all(12),
      medium: medium ?? const EdgeInsets.all(16),
      large: large ?? const EdgeInsets.all(24),
      extraLarge: extraLarge ?? const EdgeInsets.all(32),
    );
  }

  /// Get font size that adapts to screen size
  static double fontSize(
    BuildContext context, {
    double? extraSmall,
    double? small,
    double? medium,
    double? large,
    double? extraLarge,
  }) {
    return value<double>(
      context: context,
      extraSmall: extraSmall ?? 14,
      small: small ?? 16,
      medium: medium ?? 18,
      large: large ?? 20,
      extraLarge: extraLarge ?? 22,
    );
  }
}
