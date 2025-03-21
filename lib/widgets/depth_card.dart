import 'package:flutter/material.dart';
import 'package:unfold/core/constants.dart';

/// A card with a natural depth effect using layered shadows
class DepthCard extends StatelessWidget {
  /// Child widget
  final Widget child;

  /// Width of the card
  final double? width;

  /// Height of the card
  final double? height;

  /// Border radius of the card
  final BorderRadius? borderRadius;

  /// Background color
  final Color? backgroundColor;

  /// Depth level (1-5, where 5 is the most elevated)
  final int depth;

  /// Border color
  final Color? borderColor;

  /// Whether to animate the shadows on tap
  final bool animateOnTap;

  /// Callback when card is tapped
  final VoidCallback? onTap;

  /// Padding inside the card
  final EdgeInsetsGeometry padding;

  /// Creates a card with natural depth effect
  const DepthCard({
    Key? key,
    required this.child,
    this.width,
    this.height,
    this.borderRadius,
    this.backgroundColor,
    this.depth = 2,
    this.borderColor,
    this.animateOnTap = false,
    this.onTap,
    this.padding = const EdgeInsets.all(AppConstants.spacingM),
  }) : assert(depth >= 0 && depth <= 5, 'Depth must be between 0 and 5'),
       super(key: key);

  @override
  Widget build(BuildContext context) {
    final effectiveBorderRadius =
        borderRadius ?? BorderRadius.circular(AppConstants.radiusL);
    final effectiveBackgroundColor =
        backgroundColor ?? Theme.of(context).colorScheme.surface;

    // Determine shadow colors based on theme brightness
    final isDarkMode = Theme.of(context).brightness == Brightness.dark;

    // Base card with shadows
    Widget card = Container(
      width: width,
      height: height,
      decoration: BoxDecoration(
        color: effectiveBackgroundColor,
        borderRadius: effectiveBorderRadius,
        border: borderColor != null ? Border.all(color: borderColor!) : null,
        boxShadow: _getShadowsForDepth(depth, isDarkMode),
      ),
      padding: padding,
      child: child,
    );

    // Add tap behavior if needed
    if (onTap != null) {
      card =
          animateOnTap
              ? _AnimatedTapCard(
                card: card,
                onTap: onTap!,
                duration: AppConstants.animDurationFast,
              )
              : GestureDetector(onTap: onTap, child: card);
    }

    return card;
  }

  // Get appropriate shadows based on depth level
  List<BoxShadow> _getShadowsForDepth(int depth, bool isDarkMode) {
    // Early return for no shadows
    if (depth == 0) return [];

    // Base shadow colors
    final Color ambientShadowColor =
        isDarkMode
            ? Colors.black.withOpacity(0.25)
            : Colors.black.withOpacity(0.1);

    final Color directionalShadowColor =
        isDarkMode
            ? Colors.black.withOpacity(0.35)
            : Colors.black.withOpacity(0.15);

    // Calculate shadow properties based on depth
    final double ambientBlurRadius = depth * 2.0;
    final double directionalBlurRadius = depth * 4.0;
    final double directionalOffset = depth * 1.0;

    return [
      // Ambient shadow (all around, simulates ambient occlusion)
      BoxShadow(
        color: ambientShadowColor,
        blurRadius: ambientBlurRadius,
        spreadRadius: 0.5,
      ),
      // Directional shadow (bottom-right, simulates light source)
      BoxShadow(
        color: directionalShadowColor,
        blurRadius: directionalBlurRadius,
        spreadRadius: 0.0,
        offset: Offset(directionalOffset, directionalOffset),
      ),
    ];
  }
}

/// Internal widget for animated tap effect
class _AnimatedTapCard extends StatefulWidget {
  final Widget card;
  final VoidCallback onTap;
  final Duration duration;

  const _AnimatedTapCard({
    required this.card,
    required this.onTap,
    required this.duration,
  });

  @override
  State<_AnimatedTapCard> createState() => _AnimatedTapCardState();
}

class _AnimatedTapCardState extends State<_AnimatedTapCard> {
  double _scale = 1.0;

  void _handleTapDown(TapDownDetails details) {
    setState(() {
      _scale = 0.98;
    });
  }

  void _handleTapUp(TapUpDetails details) {
    setState(() {
      _scale = 1.0;
    });
  }

  void _handleTapCancel() {
    setState(() {
      _scale = 1.0;
    });
  }

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: widget.onTap,
      onTapDown: _handleTapDown,
      onTapUp: _handleTapUp,
      onTapCancel: _handleTapCancel,
      child: AnimatedScale(
        scale: _scale,
        duration: widget.duration,
        curve: Curves.easeInOut,
        child: widget.card,
      ),
    );
  }
}
