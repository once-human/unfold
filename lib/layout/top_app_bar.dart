import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'package:unfold/core/constants.dart';
import 'package:unfold/utils/haptic_utils.dart';

/// A dynamic top app bar that changes based on the current route
class TopAppBar extends ConsumerWidget {
  final String currentPath;

  const TopAppBar({super.key, required this.currentPath});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final theme = Theme.of(context);
    final colorScheme = theme.colorScheme;

    // Custom styling based on the current path
    String title = _getTitleForRoute(currentPath);
    bool showBackButton = _shouldShowBackButton(currentPath);
    bool showActions = _shouldShowActions(currentPath);

    return Container(
      height: 60,
      decoration: BoxDecoration(
        color: colorScheme.surface,
        boxShadow: [
          BoxShadow(
            color: colorScheme.shadow.withOpacity(0.05),
            blurRadius: 1,
            offset: const Offset(0, 1),
          ),
        ],
      ),
      child: Row(
        children: [
          // Back button
          if (showBackButton)
            IconButton(
              icon: const Icon(Icons.arrow_back_ios_rounded, size: 20),
              onPressed: () {
                HapticUtils.lightImpact();
                Navigator.of(context).canPop()
                    ? Navigator.of(context).pop()
                    : GoRouter.of(context).go(AppRoutes.home);
              },
            )
          else
            const SizedBox(width: AppConstants.spacingM),

          // Title with hero animation for smooth transitions
          Expanded(
            child: Hero(
              tag: 'app_bar_title',
              flightShuttleBuilder: (_, __, ___, ____, _____) {
                return Material(
                  color: Colors.transparent,
                  child: Text(
                    title,
                    style: theme.textTheme.headlineSmall?.copyWith(
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                );
              },
              child: Material(
                color: Colors.transparent,
                child: Text(
                  title,
                  style: theme.textTheme.headlineSmall?.copyWith(
                    fontWeight: FontWeight.bold,
                  ),
                  overflow: TextOverflow.ellipsis,
                ),
              ),
            ),
          ),

          // Action buttons
          if (showActions) ...[
            // Search button
            IconButton(
              icon: const Icon(Icons.search_rounded),
              onPressed: () {
                HapticUtils.lightImpact();
                GoRouter.of(context).push(AppRoutes.search);
              },
            ),

            // Notifications button
            IconButton(
              icon: const Icon(Icons.notifications_outlined),
              onPressed: () {
                HapticUtils.lightImpact();
                GoRouter.of(context).push(AppRoutes.notifications);
              },
            ),
          ] else
            const SizedBox(width: AppConstants.spacingM),
        ],
      ),
    );
  }

  // Helper to get the title based on the current route
  String _getTitleForRoute(String path) {
    if (path == AppRoutes.home) return AppConstants.appName;
    if (path == AppRoutes.explore) return 'Explore';
    if (path == AppRoutes.postCreate) return 'New Memory';
    if (path == AppRoutes.profile) return 'My Profile';
    if (path == AppRoutes.settings) return 'Settings';
    if (path == AppRoutes.notifications) return 'Notifications';
    if (path == AppRoutes.search) return 'Search';
    if (path == AppRoutes.uiShowcase) return 'UI Components';

    // Default title
    return AppConstants.appName;
  }

  // Helper to determine if back button should be shown
  bool _shouldShowBackButton(String path) {
    // Main tabs don't show back button
    final mainTabs = [
      AppRoutes.home,
      AppRoutes.explore,
      AppRoutes.postCreate,
      AppRoutes.profile,
    ];
    return !mainTabs.contains(path);
  }

  // Helper to determine if action buttons should be shown
  bool _shouldShowActions(String path) {
    // Only show actions on main screens
    return path == AppRoutes.home || path == AppRoutes.explore;
  }
}
