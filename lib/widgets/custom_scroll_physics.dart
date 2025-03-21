import 'package:flutter/material.dart';

/// Custom scroll physics mimicking iOS smooth scrolling behavior
class CustomScrollPhysics extends BouncingScrollPhysics {
  /// Create iOS-style smooth scrolling physics
  const CustomScrollPhysics({ScrollPhysics? parent}) : super(parent: parent);

  @override
  CustomScrollPhysics applyTo(ScrollPhysics? ancestor) {
    return CustomScrollPhysics(parent: buildParent(ancestor));
  }

  @override
  SpringDescription get spring => const SpringDescription(
    mass: 0.5, // Lighter for smoother scrolling
    stiffness: 100.0, // Lower for more bounce
    damping: 1.0, // Lower for less resistance
  );

  @override
  double get dragStartDistanceMotionThreshold => 3.5;

  @override
  double get minFlingVelocity => 50.0;

  @override
  double frictionFactor(double overscrollFraction) {
    return 0.2 * super.frictionFactor(overscrollFraction);
  }

  @override
  double carriedMomentum(double existingVelocity) {
    // Enhanced momentum that gradually decays
    return existingVelocity * 0.9;
  }
}

/// Scroll physics with momentum and smooth deceleration
class SmoothMomentumScrollPhysics extends ScrollPhysics {
  /// Create smooth momentum physics
  const SmoothMomentumScrollPhysics({ScrollPhysics? parent})
    : super(parent: parent);

  @override
  SmoothMomentumScrollPhysics applyTo(ScrollPhysics? ancestor) {
    return SmoothMomentumScrollPhysics(parent: buildParent(ancestor));
  }

  @override
  bool get allowImplicitScrolling => true;

  @override
  double get dragStartDistanceMotionThreshold => 3.5;

  @override
  double applyPhysicsToUserOffset(ScrollMetrics position, double offset) {
    if (offset.abs() < 1.0) {
      // Small offsets get amplified slightly for more responsive feel
      return offset * 1.2;
    }
    return super.applyPhysicsToUserOffset(position, offset);
  }

  @override
  double applyBoundaryConditions(ScrollMetrics position, double value) {
    // Implement a very small resistance at the boundaries
    if (value < position.minScrollExtent) {
      return 0.1 * (value - position.minScrollExtent);
    }
    if (value > position.maxScrollExtent) {
      return 0.1 * (value - position.maxScrollExtent);
    }
    return 0.0;
  }

  @override
  Simulation? createBallisticSimulation(
    ScrollMetrics position,
    double velocity,
  ) {
    // Use ClampingScrollSimulation with custom parameters
    final Tolerance tolerance = this.tolerance;
    if (velocity.abs() < tolerance.velocity ||
        (velocity > 0.0 && position.pixels >= position.maxScrollExtent) ||
        (velocity < 0.0 && position.pixels <= position.minScrollExtent)) {
      return null;
    }

    // Customize the simulation for smoother deceleration
    return ClampingScrollSimulation(
      position: position.pixels,
      velocity: velocity,
      friction: 0.15, // Lower friction for smooth scrolling
      tolerance: tolerance,
    );
  }
}
