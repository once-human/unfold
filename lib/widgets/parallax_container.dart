import 'package:flutter/material.dart';
import 'package:flutter/rendering.dart';
import 'package:unfold/core/constants.dart';

/// A container with parallax effect for depth perception
class ParallaxContainer extends StatefulWidget {
  /// The child widget
  final Widget child;

  /// The background image that will have parallax effect
  final Widget background;

  /// The parallax factor, higher values mean more movement
  final double parallaxFactor;

  /// Container height
  final double height;

  /// Container width (default to screen width)
  final double? width;

  /// Border radius for container
  final BorderRadius borderRadius;

  /// Container box shadow
  final List<BoxShadow>? boxShadow;

  /// Creates a container with parallax effect
  const ParallaxContainer({
    Key? key,
    required this.child,
    required this.background,
    this.parallaxFactor = 0.4,
    this.height = 200,
    this.width,
    this.borderRadius = const BorderRadius.all(
      Radius.circular(AppConstants.radiusL),
    ),
    this.boxShadow,
  }) : super(key: key);

  @override
  State<ParallaxContainer> createState() => _ParallaxContainerState();
}

class _ParallaxContainerState extends State<ParallaxContainer> {
  // Track the container position for parallax effect
  late Offset _containerPosition;
  // Track mouse position for parallax effect
  Offset _pointerPosition = Offset.zero;
  final GlobalKey _containerKey = GlobalKey();
  bool _isInitialized = false;

  @override
  void initState() {
    super.initState();
    _containerPosition = Offset.zero;
    // We need to find the container position after layout
    WidgetsBinding.instance.addPostFrameCallback((_) {
      _findContainerPosition();
    });
  }

  @override
  void didUpdateWidget(ParallaxContainer oldWidget) {
    super.didUpdateWidget(oldWidget);
    // Reset when widget updates
    _isInitialized = false;
    WidgetsBinding.instance.addPostFrameCallback((_) {
      _findContainerPosition();
    });
  }

  // Find the container position to calculate parallax effect
  void _findContainerPosition() {
    if (!mounted) return;

    final RenderBox? renderBox =
        _containerKey.currentContext?.findRenderObject() as RenderBox?;
    if (renderBox != null) {
      final Size size = renderBox.size;
      final Offset position = renderBox.localToGlobal(Offset.zero);
      setState(() {
        _containerPosition = position;
        _isInitialized = true;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return MouseRegion(
      onHover: (PointerEvent details) {
        if (!_isInitialized) return;
        setState(() {
          _pointerPosition = details.position;
        });
      },
      child: GestureDetector(
        // On touch, update parallax angle
        onPanUpdate: (details) {
          if (!_isInitialized) return;
          setState(() {
            _pointerPosition = details.globalPosition;
          });
        },
        child: Container(
          key: _containerKey,
          width: widget.width,
          height: widget.height,
          clipBehavior: Clip.antiAlias,
          decoration: BoxDecoration(
            borderRadius: widget.borderRadius,
            boxShadow: widget.boxShadow,
          ),
          child: Stack(
            children: [
              // Background with parallax effect
              _buildParallaxBackground(context),

              // Content
              Positioned.fill(child: widget.child),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildParallaxBackground(BuildContext context) {
    if (!_isInitialized) {
      return SizedBox.expand(child: widget.background);
    }

    // Get pointer position for effect calculation
    final RenderBox? renderBox = context.findRenderObject() as RenderBox?;
    if (renderBox == null) {
      return SizedBox.expand(child: widget.background);
    }

    // Use pointer position or center of screen when not interacting
    final Offset pointerPosition =
        _pointerPosition.dx == 0 && _pointerPosition.dy == 0
            ? MediaQuery.of(context).size.center(Offset.zero)
            : _pointerPosition;

    // Calculate relative position for parallax
    final relativeX =
        (pointerPosition.dx - _containerPosition.dx) / renderBox.size.width;
    final relativeY =
        (pointerPosition.dy - _containerPosition.dy) / renderBox.size.height;

    // Apply parallax offset based on pointer position
    final offsetX = (relativeX - 0.5) * widget.parallaxFactor * -1;
    final offsetY = (relativeY - 0.5) * widget.parallaxFactor * -1;

    return Positioned.fill(
      // Expand the background slightly to allow for movement
      left: offsetX * 50,
      top: offsetY * 50,
      right: -offsetX * 50,
      bottom: -offsetY * 50,
      child: widget.background,
    );
  }
}
