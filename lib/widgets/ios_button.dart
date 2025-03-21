import 'package:flutter/material.dart';
import 'package:unfold/core/constants.dart';
import 'package:unfold/utils/haptic_utils.dart';

/// iOS-inspired button with fluid animation
class IOSButton extends StatefulWidget {
  /// Button label
  final String label;

  /// Icon to display (optional)
  final IconData? icon;

  /// Whether to show the icon before the label
  final bool iconLeading;

  /// Function to call when button is pressed
  final VoidCallback? onPressed;

  /// Background color (defaults to primary in light mode, surface in dark)
  final Color? backgroundColor;

  /// Text color
  final Color? textColor;

  /// Border radius
  final BorderRadius? borderRadius;

  /// Whether button is disabled
  final bool isDisabled;

  /// Whether this is a destructive action button (red)
  final bool isDestructive;

  /// Whether this is a filled button (iOS-style)
  final bool isFilled;

  /// Button padding
  final EdgeInsetsGeometry padding;

  /// Button type
  final IOSButtonType type;

  /// Whether to provide haptic feedback on tap
  final bool useHapticFeedback;

  /// Creates an iOS-inspired button
  const IOSButton({
    Key? key,
    required this.label,
    this.icon,
    this.iconLeading = true,
    this.onPressed,
    this.backgroundColor,
    this.textColor,
    this.borderRadius,
    this.isDisabled = false,
    this.isDestructive = false,
    this.isFilled = true,
    this.padding = const EdgeInsets.symmetric(
      horizontal: AppConstants.spacingL,
      vertical: AppConstants.spacingM,
    ),
    this.type = IOSButtonType.primary,
    this.useHapticFeedback = true,
  }) : super(key: key);

  /// Creates a primary (filled) iOS-style button
  factory IOSButton.primary({
    Key? key,
    required String label,
    IconData? icon,
    bool iconLeading = true,
    VoidCallback? onPressed,
    Color? backgroundColor,
    Color? textColor,
    BorderRadius? borderRadius,
    bool isDisabled = false,
    EdgeInsetsGeometry padding = const EdgeInsets.symmetric(
      horizontal: AppConstants.spacingL,
      vertical: AppConstants.spacingM,
    ),
    bool useHapticFeedback = true,
  }) {
    return IOSButton(
      key: key,
      label: label,
      icon: icon,
      iconLeading: iconLeading,
      onPressed: onPressed,
      backgroundColor: backgroundColor,
      textColor: textColor,
      borderRadius: borderRadius,
      isDisabled: isDisabled,
      isFilled: true,
      padding: padding,
      type: IOSButtonType.primary,
      useHapticFeedback: useHapticFeedback,
    );
  }

  /// Creates a secondary (outlined) iOS-style button
  factory IOSButton.secondary({
    Key? key,
    required String label,
    IconData? icon,
    bool iconLeading = true,
    VoidCallback? onPressed,
    Color? backgroundColor,
    Color? textColor,
    BorderRadius? borderRadius,
    bool isDisabled = false,
    EdgeInsetsGeometry padding = const EdgeInsets.symmetric(
      horizontal: AppConstants.spacingL,
      vertical: AppConstants.spacingM,
    ),
    bool useHapticFeedback = true,
  }) {
    return IOSButton(
      key: key,
      label: label,
      icon: icon,
      iconLeading: iconLeading,
      onPressed: onPressed,
      backgroundColor: backgroundColor,
      textColor: textColor,
      borderRadius: borderRadius,
      isDisabled: isDisabled,
      isFilled: false,
      padding: padding,
      type: IOSButtonType.secondary,
      useHapticFeedback: useHapticFeedback,
    );
  }

  /// Creates a destructive (red) iOS-style button
  factory IOSButton.destructive({
    Key? key,
    required String label,
    IconData? icon,
    bool iconLeading = true,
    VoidCallback? onPressed,
    BorderRadius? borderRadius,
    bool isDisabled = false,
    bool isFilled = true,
    EdgeInsetsGeometry padding = const EdgeInsets.symmetric(
      horizontal: AppConstants.spacingL,
      vertical: AppConstants.spacingM,
    ),
    bool useHapticFeedback = true,
  }) {
    return IOSButton(
      key: key,
      label: label,
      icon: icon,
      iconLeading: iconLeading,
      onPressed: onPressed,
      borderRadius: borderRadius,
      isDisabled: isDisabled,
      isDestructive: true,
      isFilled: isFilled,
      padding: padding,
      type: IOSButtonType.destructive,
      useHapticFeedback: useHapticFeedback,
    );
  }

  /// Creates a small iOS-style button
  factory IOSButton.small({
    Key? key,
    required String label,
    IconData? icon,
    bool iconLeading = true,
    VoidCallback? onPressed,
    Color? backgroundColor,
    Color? textColor,
    BorderRadius? borderRadius,
    bool isDisabled = false,
    bool isFilled = true,
    bool isDestructive = false,
    IOSButtonType type = IOSButtonType.primary,
    bool useHapticFeedback = true,
  }) {
    return IOSButton(
      key: key,
      label: label,
      icon: icon,
      iconLeading: iconLeading,
      onPressed: onPressed,
      backgroundColor: backgroundColor,
      textColor: textColor,
      borderRadius: borderRadius,
      isDisabled: isDisabled,
      isDestructive: isDestructive,
      isFilled: isFilled,
      padding: const EdgeInsets.symmetric(
        horizontal: AppConstants.spacingM,
        vertical: AppConstants.spacingS,
      ),
      type: type,
      useHapticFeedback: useHapticFeedback,
    );
  }

  @override
  State<IOSButton> createState() => _IOSButtonState();
}

class _IOSButtonState extends State<IOSButton>
    with SingleTickerProviderStateMixin {
  late AnimationController _animationController;
  late Animation<double> _scaleAnimation;
  late Animation<double> _opacityAnimation;

  @override
  void initState() {
    super.initState();

    _animationController = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 150),
    );

    _scaleAnimation = Tween<double>(begin: 1.0, end: 0.97).animate(
      CurvedAnimation(parent: _animationController, curve: Curves.easeInOut),
    );

    _opacityAnimation = Tween<double>(begin: 1.0, end: 0.7).animate(
      CurvedAnimation(parent: _animationController, curve: Curves.easeInOut),
    );
  }

  @override
  void dispose() {
    _animationController.dispose();
    super.dispose();
  }

  void _handleTapDown(TapDownDetails details) {
    if (!widget.isDisabled && widget.onPressed != null) {
      _animationController.forward();
    }
  }

  void _handleTapUp(TapUpDetails details) {
    if (!widget.isDisabled && widget.onPressed != null) {
      _animationController.reverse();
    }
  }

  void _handleTapCancel() {
    if (!widget.isDisabled && widget.onPressed != null) {
      _animationController.reverse();
    }
  }

  void _handleTap() {
    if (!widget.isDisabled && widget.onPressed != null) {
      // Provide haptic feedback based on button type
      if (widget.useHapticFeedback) {
        if (widget.isDestructive) {
          HapticUtils.warning();
        } else {
          HapticUtils.lightImpact();
        }
      }

      widget.onPressed?.call();
    }
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final isDarkMode = theme.brightness == Brightness.dark;

    // Determine colors based on button type and theme
    Color effectiveBackgroundColor;
    Color effectiveTextColor;

    if (widget.isDisabled) {
      // Disabled state
      effectiveBackgroundColor =
          isDarkMode ? Colors.grey.shade800 : Colors.grey.shade300;
      effectiveTextColor =
          isDarkMode ? Colors.grey.shade600 : Colors.grey.shade600;
    } else if (widget.isDestructive) {
      // Destructive button
      effectiveBackgroundColor =
          widget.isFilled ? Colors.red.shade600 : Colors.transparent;
      effectiveTextColor = widget.isFilled ? Colors.white : Colors.red.shade600;
    } else {
      // Normal button
      switch (widget.type) {
        case IOSButtonType.primary:
          effectiveBackgroundColor =
              widget.backgroundColor ??
              (widget.isFilled
                  ? theme.colorScheme.primary
                  : Colors.transparent);
          effectiveTextColor =
              widget.textColor ??
              (widget.isFilled
                  ? theme.colorScheme.onPrimary
                  : theme.colorScheme.primary);
          break;
        case IOSButtonType.secondary:
          effectiveBackgroundColor =
              widget.backgroundColor ??
              (widget.isFilled
                  ? theme.colorScheme.secondaryContainer
                  : Colors.transparent);
          effectiveTextColor =
              widget.textColor ??
              (widget.isFilled
                  ? theme.colorScheme.onSecondaryContainer
                  : theme.colorScheme.secondary);
          break;
        case IOSButtonType.destructive:
          effectiveBackgroundColor =
              widget.backgroundColor ??
              (widget.isFilled ? Colors.red.shade600 : Colors.transparent);
          effectiveTextColor =
              widget.textColor ??
              (widget.isFilled ? Colors.white : Colors.red.shade600);
          break;
      }
    }

    final effectiveBorderRadius =
        widget.borderRadius ?? BorderRadius.circular(AppConstants.radiusL);

    return AnimatedBuilder(
      animation: _animationController,
      builder: (context, child) {
        return GestureDetector(
          onTapDown: _handleTapDown,
          onTapUp: _handleTapUp,
          onTapCancel: _handleTapCancel,
          onTap: widget.isDisabled ? null : _handleTap,
          child: Transform.scale(
            scale: _scaleAnimation.value,
            child: Opacity(
              opacity: widget.isDisabled ? 0.6 : _opacityAnimation.value,
              child: Container(
                padding: widget.padding,
                decoration: BoxDecoration(
                  color: effectiveBackgroundColor,
                  borderRadius: effectiveBorderRadius,
                  border:
                      !widget.isFilled
                          ? Border.all(
                            color:
                                widget.isDisabled
                                    ? Colors.grey.shade400
                                    : effectiveTextColor.withOpacity(0.5),
                            width: 1.5,
                          )
                          : null,
                ),
                child: Row(
                  mainAxisSize: MainAxisSize.min,
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    // Show icon if it exists and is set to leading
                    if (widget.icon != null && widget.iconLeading) ...[
                      Icon(widget.icon, color: effectiveTextColor, size: 18),
                      SizedBox(width: AppConstants.spacingS),
                    ],

                    // Button text
                    Text(
                      widget.label,
                      style: theme.textTheme.labelLarge?.copyWith(
                        color: effectiveTextColor,
                        fontWeight: FontWeight.w600,
                      ),
                    ),

                    // Show icon if it exists and is set to trailing
                    if (widget.icon != null && !widget.iconLeading) ...[
                      SizedBox(width: AppConstants.spacingS),
                      Icon(widget.icon, color: effectiveTextColor, size: 18),
                    ],
                  ],
                ),
              ),
            ),
          ),
        );
      },
    );
  }
}

/// Types of iOS-style buttons
enum IOSButtonType { primary, secondary, destructive }
