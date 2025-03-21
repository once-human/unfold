import 'dart:ui';
import 'package:flutter/material.dart';
import 'package:unfold/core/constants.dart';

/// A container with glassmorphism effect (frosted glass)
class GlassContainer extends StatelessWidget {
  /// Child widget
  final Widget child;

  /// Width of the container
  final double? width;

  /// Height of the container
  final double? height;

  /// How much to blur the background
  final double blurAmount;

  /// Opacity of the glass effect
  final double opacity;

  /// Border radius of the container
  final BorderRadius? borderRadius;

  /// Color tint to apply (usually white or black with opacity)
  final Color? tint;

  /// Border color (optional)
  final Color? borderColor;

  /// Border width
  final double borderWidth;

  /// Padding inside the container
  final EdgeInsetsGeometry padding;

  /// Creates a container with glassmorphism effect
  const GlassContainer({
    Key? key,
    required this.child,
    this.width,
    this.height,
    this.blurAmount = 10.0,
    this.opacity = 0.1,
    this.borderRadius,
    this.tint,
    this.borderColor,
    this.borderWidth = 1.0,
    this.padding = const EdgeInsets.all(AppConstants.spacingM),
  }) : super(key: key);

  /// Creates a light glassmorphism effect (white tint)
  factory GlassContainer.light({
    Key? key,
    required Widget child,
    double? width,
    double? height,
    double blurAmount = 10.0,
    double opacity = 0.1,
    BorderRadius? borderRadius,
    EdgeInsetsGeometry padding = const EdgeInsets.all(AppConstants.spacingM),
  }) {
    return GlassContainer(
      key: key,
      child: child,
      width: width,
      height: height,
      blurAmount: blurAmount,
      opacity: opacity,
      borderRadius: borderRadius ?? BorderRadius.circular(AppConstants.radiusL),
      tint: Colors.white.withOpacity(0.3),
      borderColor: Colors.white.withOpacity(0.2),
      padding: padding,
    );
  }

  /// Creates a dark glassmorphism effect (black tint)
  factory GlassContainer.dark({
    Key? key,
    required Widget child,
    double? width,
    double? height,
    double blurAmount = 10.0,
    double opacity = 0.1,
    BorderRadius? borderRadius,
    EdgeInsetsGeometry padding = const EdgeInsets.all(AppConstants.spacingM),
  }) {
    return GlassContainer(
      key: key,
      child: child,
      width: width,
      height: height,
      blurAmount: blurAmount,
      opacity: opacity,
      borderRadius: borderRadius ?? BorderRadius.circular(AppConstants.radiusL),
      tint: Colors.black.withOpacity(0.3),
      borderColor: Colors.white.withOpacity(0.1),
      padding: padding,
    );
  }

  @override
  Widget build(BuildContext context) {
    final effectiveBorderRadius =
        borderRadius ?? BorderRadius.circular(AppConstants.radiusL);
    final effectiveTint =
        tint ??
        (Theme.of(context).brightness == Brightness.light
            ? Colors.white.withOpacity(0.3)
            : Colors.black.withOpacity(0.3));

    return ClipRRect(
      borderRadius: effectiveBorderRadius,
      child: BackdropFilter(
        filter: ImageFilter.blur(sigmaX: blurAmount, sigmaY: blurAmount),
        child: Container(
          width: width,
          height: height,
          decoration: BoxDecoration(
            color: effectiveTint,
            borderRadius: effectiveBorderRadius,
            border:
                borderColor != null
                    ? Border.all(color: borderColor!, width: borderWidth)
                    : null,
          ),
          padding: padding,
          child: child,
        ),
      ),
    );
  }
}
