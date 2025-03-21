import 'package:flutter/material.dart';
import 'package:flutter/scheduler.dart';
import 'package:unfold/core/constants.dart';

/// Utility class for optimized animations
class AnimationUtils {
  // Private constructor to prevent instantiation
  AnimationUtils._();

  /// Fluid iOS-like animation curve
  static const Curve fluidCurve = Curves.easeOutCubic;

  /// Material Design curve for motion
  static const Curve materialCurve = Curves.easeInOutCubic;

  /// Apply optimized page transition
  static Widget applyPageTransition({
    required Widget child,
    bool isPopTransition = false,
    Duration duration = const Duration(milliseconds: 300),
  }) {
    return PageTransition(
      child: child,
      type:
          isPopTransition
              ? PageTransitionType.rightToLeft
              : PageTransitionType.leftToRight,
      duration: duration,
    );
  }

  /// Apply fade animation to any widget
  static Widget fadeIn(
    Widget child, {
    Duration duration = const Duration(milliseconds: 300),
    Curve curve = Curves.easeInOut,
  }) {
    return FadeTransition(
      opacity: CurvedAnimation(
        parent: AlwaysStoppedAnimation(1.0),
        curve: curve,
      ),
      child: child,
    );
  }

  /// Optimize animation performance
  static void optimizeAnimations() {
    // Set the target frame rate to match device capabilities
    if (SchedulerBinding.instance.schedulerPhase != SchedulerPhase.idle) {
      SchedulerBinding.instance.addPostFrameCallback(
        (_) => _setOptimalFrameRate(),
      );
    } else {
      _setOptimalFrameRate();
    }
  }

  static void _setOptimalFrameRate() {
    // This is a placeholder - in actual implementation, you would
    // determine device capabilities and set appropriate frame rate
    // For now, we'll use default system behavior
  }

  /// Create a staggered animation sequence
  static List<Widget> createStaggeredList(
    List<Widget> children, {
    Duration staggerDuration = const Duration(milliseconds: 50),
    Duration animationDuration = const Duration(milliseconds: 300),
    Offset beginOffset = const Offset(0.0, 0.05),
  }) {
    final List<Widget> result = [];

    for (int i = 0; i < children.length; i++) {
      result.add(
        AnimatedSlideIn(
          delay: Duration(milliseconds: i * staggerDuration.inMilliseconds),
          duration: animationDuration,
          beginOffset: beginOffset,
          child: children[i],
        ),
      );
    }

    return result;
  }

  /// Apply a parallax effect to a widget based on scroll position
  static Widget applyParallaxEffect(
    Widget child, {
    required ScrollController scrollController,
    double parallaxFactor = 0.5,
  }) {
    return AnimatedBuilder(
      animation: scrollController,
      builder: (context, child) {
        final scrollOffset = scrollController.offset;
        return Transform.translate(
          offset: Offset(0, -scrollOffset * parallaxFactor),
          child: child,
        );
      },
      child: child,
    );
  }
}

/// A performant page transition widget
class PageTransition extends StatelessWidget {
  final Widget child;
  final PageTransitionType type;
  final Curve curve;
  final Alignment alignment;
  final Duration duration;

  const PageTransition({
    Key? key,
    required this.child,
    this.type = PageTransitionType.rightToLeft,
    this.curve = Curves.easeInOut,
    this.alignment = Alignment.center,
    this.duration = const Duration(milliseconds: 300),
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    switch (type) {
      case PageTransitionType.fade:
        return FadeTransition(
          opacity: AlwaysStoppedAnimation(1.0),
          child: child,
        );
      case PageTransitionType.rightToLeft:
        return SlideTransition(
          position: AlwaysStoppedAnimation(const Offset(0.0, 0.0)),
          transformHitTests: false,
          child: child,
        );
      case PageTransitionType.leftToRight:
        return SlideTransition(
          position: AlwaysStoppedAnimation(const Offset(0.0, 0.0)),
          transformHitTests: false,
          child: child,
        );
      default:
        return child;
    }
  }
}

/// Types of page transitions
enum PageTransitionType { fade, rightToLeft, leftToRight }

/// Optimized animated slide-in widget
class AnimatedSlideIn extends StatefulWidget {
  final Widget child;
  final Duration delay;
  final Duration duration;
  final Offset beginOffset;
  final Curve curve;

  const AnimatedSlideIn({
    Key? key,
    required this.child,
    this.delay = Duration.zero,
    this.duration = const Duration(milliseconds: 300),
    this.beginOffset = const Offset(0.0, 0.1),
    this.curve = Curves.easeOutQuad,
  }) : super(key: key);

  @override
  State<AnimatedSlideIn> createState() => _AnimatedSlideInState();
}

class _AnimatedSlideInState extends State<AnimatedSlideIn>
    with SingleTickerProviderStateMixin {
  late AnimationController _controller;
  late Animation<Offset> _slideAnimation;
  late Animation<double> _opacityAnimation;

  @override
  void initState() {
    super.initState();

    _controller = AnimationController(vsync: this, duration: widget.duration);

    _slideAnimation = Tween<Offset>(
      begin: widget.beginOffset,
      end: Offset.zero,
    ).animate(CurvedAnimation(parent: _controller, curve: widget.curve));

    _opacityAnimation = Tween<double>(
      begin: 0.0,
      end: 1.0,
    ).animate(CurvedAnimation(parent: _controller, curve: widget.curve));

    if (widget.delay == Duration.zero) {
      _controller.forward();
    } else {
      Future.delayed(widget.delay, () {
        if (mounted) {
          _controller.forward();
        }
      });
    }
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return SlideTransition(
      position: _slideAnimation,
      child: FadeTransition(opacity: _opacityAnimation, child: widget.child),
    );
  }
}
