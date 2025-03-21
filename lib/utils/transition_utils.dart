import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:unfold/core/constants.dart';
import 'package:unfold/utils/animation_utils.dart';

/// Provides transition utilities for the app
class TransitionUtils {
  /// Private constructor to prevent instantiation
  TransitionUtils._();

  /// Creates a customized page transition based on the transition type
  static Page<T> buildTransition<T>({
    required BuildContext context,
    required GoRouterState state,
    required Widget child,
    TransitionType type = TransitionType.rightToLeft,
    Duration duration = AppConstants.animDurationMedium,
  }) {
    return CustomTransitionPage<T>(
      key: state.pageKey,
      child: child,
      transitionsBuilder: (context, animation, secondaryAnimation, child) {
        switch (type) {
          case TransitionType.rightToLeft:
            return _buildRightToLeftTransition(
              animation,
              secondaryAnimation,
              child,
            );
          case TransitionType.bottomToTop:
            return _buildBottomToTopTransition(
              animation,
              secondaryAnimation,
              child,
            );
          case TransitionType.scale:
            return _buildScaleTransition(animation, secondaryAnimation, child);
          case TransitionType.fade:
            return _buildFadeTransition(animation, child);
          case TransitionType.parallax:
            return _buildParallaxTransition(
              animation,
              secondaryAnimation,
              child,
            );
        }
      },
      transitionDuration: duration,
      maintainState: true,
      opaque: true,
      barrierDismissible: false,
    );
  }

  /// Right to left transition (standard push transition)
  static Widget _buildRightToLeftTransition(
    Animation<double> animation,
    Animation<double> secondaryAnimation,
    Widget child,
  ) {
    // Optimized curve for fluid iOS-like animations
    final curvedAnimation = CurvedAnimation(
      parent: animation,
      curve: AnimationUtils.fluidCurve,
    );

    // Slide out current screen slightly to the left
    final secondaryCurvedAnimation = CurvedAnimation(
      parent: secondaryAnimation,
      curve: AnimationUtils.fluidCurve,
    );

    return SlideTransition(
      position: Tween<Offset>(
        begin: const Offset(1.0, 0.0),
        end: Offset.zero,
      ).animate(curvedAnimation),
      child: SlideTransition(
        position: Tween<Offset>(
          begin: Offset.zero,
          end: const Offset(-0.3, 0.0),
        ).animate(secondaryCurvedAnimation),
        child: child,
      ),
    );
  }

  /// Bottom to top transition (modal style)
  static Widget _buildBottomToTopTransition(
    Animation<double> animation,
    Animation<double> secondaryAnimation,
    Widget child,
  ) {
    final curvedAnimation = CurvedAnimation(
      parent: animation,
      curve: AnimationUtils.fluidCurve,
    );

    // Scale down current screen slightly
    final secondaryCurvedAnimation = CurvedAnimation(
      parent: secondaryAnimation,
      curve: AnimationUtils.fluidCurve,
    );

    return SlideTransition(
      position: Tween<Offset>(
        begin: const Offset(0.0, 1.0),
        end: Offset.zero,
      ).animate(curvedAnimation),
      child: ScaleTransition(
        scale: Tween<double>(
          begin: 1.0,
          end: 0.95,
        ).animate(secondaryCurvedAnimation),
        child: child,
      ),
    );
  }

  /// Scale transition
  static Widget _buildScaleTransition(
    Animation<double> animation,
    Animation<double> secondaryAnimation,
    Widget child,
  ) {
    final curvedAnimation = CurvedAnimation(
      parent: animation,
      curve: AnimationUtils.fluidCurve,
    );

    return ScaleTransition(
      scale: Tween<double>(begin: 0.9, end: 1.0).animate(curvedAnimation),
      child: FadeTransition(
        opacity: Tween<double>(begin: 0.5, end: 1.0).animate(curvedAnimation),
        child: child,
      ),
    );
  }

  /// Fade transition
  static Widget _buildFadeTransition(
    Animation<double> animation,
    Widget child,
  ) {
    final curvedAnimation = CurvedAnimation(
      parent: animation,
      curve: AnimationUtils.fluidCurve,
    );

    return FadeTransition(
      opacity: Tween<double>(begin: 0.0, end: 1.0).animate(curvedAnimation),
      child: child,
    );
  }

  /// Parallax transition with depth effect
  static Widget _buildParallaxTransition(
    Animation<double> animation,
    Animation<double> secondaryAnimation,
    Widget child,
  ) {
    final curvedAnimation = CurvedAnimation(
      parent: animation,
      curve: AnimationUtils.fluidCurve,
    );

    // Shadow animation for depth effect
    final elevationAnimation = Tween<double>(
      begin: 0.0,
      end: 20.0,
    ).animate(curvedAnimation);

    // Parallax slide with different speeds for elements
    final slideAnimation = Tween<Offset>(
      begin: const Offset(1.0, 0.0),
      end: Offset.zero,
    ).animate(curvedAnimation);

    // Scale for depth perception
    final scaleAnimation = Tween<double>(
      begin: 0.92,
      end: 1.0,
    ).animate(curvedAnimation);

    return AnimatedBuilder(
      animation: curvedAnimation,
      builder: (context, child) {
        return Container(
          decoration: BoxDecoration(
            boxShadow: [
              BoxShadow(
                color: Colors.black.withOpacity(0.2),
                blurRadius: elevationAnimation.value,
                offset: Offset(0, elevationAnimation.value / 2),
              ),
            ],
          ),
          child: SlideTransition(
            position: slideAnimation,
            child: ScaleTransition(scale: scaleAnimation, child: child),
          ),
        );
      },
      child: child,
    );
  }
}

/// Types of transitions available in the app
enum TransitionType { rightToLeft, bottomToTop, scale, fade, parallax }
