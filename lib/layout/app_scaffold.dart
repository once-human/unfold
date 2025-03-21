import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:unfold/core/constants.dart';
import 'package:unfold/utils/haptic_utils.dart';

import 'bottom_nav_bar.dart';
import 'top_app_bar.dart';

/// Main application scaffold that provides the persistent layout
/// for the app, including navigation bars and common UI elements.
class AppScaffold extends ConsumerStatefulWidget {
  final Widget child;
  final bool showBottomNav;
  final bool showTopAppBar;
  final String currentPath;

  const AppScaffold({
    super.key,
    required this.child,
    this.showBottomNav = true,
    this.showTopAppBar = true,
    required this.currentPath,
  });

  @override
  ConsumerState<AppScaffold> createState() => _AppScaffoldState();
}

class _AppScaffoldState extends ConsumerState<AppScaffold> {
  // For swipe navigation
  double _dragStartX = 0;
  double _dragEndX = 0;
  final double _swipeThreshold = 100;

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onHorizontalDragStart: _handleDragStart,
      onHorizontalDragEnd: _handleDragEnd,
      child: Scaffold(
        // Background color from theme
        backgroundColor: Theme.of(context).colorScheme.background,

        // Responsive safe area with system UI insets
        body: SafeArea(
          child: Column(
            children: [
              // Top App Bar (shown conditionally)
              if (widget.showTopAppBar)
                TopAppBar(currentPath: widget.currentPath),

              // Main content area
              Expanded(child: widget.child),
            ],
          ),
        ),

        // Bottom navigation (shown conditionally)
        bottomNavigationBar:
            widget.showBottomNav
                ? BottomNavBar(currentPath: widget.currentPath)
                : null,
      ),
    );
  }

  // Handle the start of a horizontal drag gesture
  void _handleDragStart(DragStartDetails details) {
    _dragStartX = details.globalPosition.dx;
  }

  // Handle the end of a horizontal drag gesture
  void _handleDragEnd(DragEndDetails details) {
    _dragEndX = _dragStartX + details.velocity.pixelsPerSecond.dx / 10;
    final delta = _dragEndX - _dragStartX;

    // Only process significant swipes
    if (delta.abs() > _swipeThreshold) {
      // Swipe from left to right (backward navigation)
      if (delta > 0) {
        if (Navigator.of(context).canPop()) {
          HapticUtils.lightImpact();
          Navigator.of(context).pop();
        }
      }
      // Swipe from right to left (navigate to next tab)
      else {
        _navigateToNextTab();
      }
    }
  }

  // Navigate to the next tab based on current path
  void _navigateToNextTab() {
    final router = GoRouter.of(context);

    // Define navigation order
    const tabOrder = [
      AppRoutes.home,
      AppRoutes.explore,
      AppRoutes.postCreate,
      AppRoutes.profile,
    ];

    // Find current index
    final currentIndex = tabOrder.indexOf(widget.currentPath);
    if (currentIndex < 0 || currentIndex >= tabOrder.length - 1) return;

    // Navigate to next tab with haptic feedback
    HapticUtils.lightImpact();
    router.go(tabOrder[currentIndex + 1]);
  }
}

/// Provider for scaffold key to access drawer from anywhere
final scaffoldKeyProvider = Provider<GlobalKey<ScaffoldState>>((ref) {
  return GlobalKey<ScaffoldState>();
});
