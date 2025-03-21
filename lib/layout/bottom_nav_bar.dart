import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'package:unfold/core/constants.dart';
import 'package:unfold/utils/haptic_utils.dart';
import 'package:unfold/widgets/ios_button.dart';

/// A fluid bottom navigation bar with animations
class BottomNavBar extends ConsumerStatefulWidget {
  final String currentPath;

  const BottomNavBar({super.key, required this.currentPath});

  @override
  ConsumerState<BottomNavBar> createState() => _BottomNavBarState();
}

class _BottomNavBarState extends ConsumerState<BottomNavBar>
    with SingleTickerProviderStateMixin {
  late AnimationController _animationController;
  int _selectedIndex = 0;

  @override
  void initState() {
    super.initState();
    _animationController = AnimationController(
      vsync: this,
      duration: AppConstants.animDurationFast,
    );
    _animationController.forward();

    // Set initial selected index based on the current path
    _updateSelectedIndex();
  }

  @override
  void didUpdateWidget(BottomNavBar oldWidget) {
    super.didUpdateWidget(oldWidget);
    if (oldWidget.currentPath != widget.currentPath) {
      _updateSelectedIndex();
    }
  }

  void _updateSelectedIndex() {
    if (widget.currentPath == AppRoutes.home) {
      _selectedIndex = 0;
    } else if (widget.currentPath == AppRoutes.explore) {
      _selectedIndex = 1;
    } else if (widget.currentPath == AppRoutes.postCreate) {
      _selectedIndex = 2;
    } else if (widget.currentPath == AppRoutes.profile) {
      _selectedIndex = 3;
    }
  }

  @override
  void dispose() {
    _animationController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final colorScheme = theme.colorScheme;

    return AnimatedBuilder(
      animation: _animationController,
      builder: (context, _) {
        return Container(
          height: 80,
          decoration: BoxDecoration(
            color: colorScheme.surface,
            boxShadow: [
              BoxShadow(
                color: colorScheme.shadow.withOpacity(0.1),
                blurRadius: 10,
                offset: const Offset(0, -2),
              ),
            ],
          ),
          child: SafeArea(
            top: false,
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceAround,
              children: [
                _buildNavItem(0, Icons.home_rounded, 'Home', AppRoutes.home),
                _buildNavItem(
                  1,
                  Icons.explore_rounded,
                  'Explore',
                  AppRoutes.explore,
                ),
                _buildCreateButton(),
                _buildNavItem(
                  3,
                  Icons.person_rounded,
                  'Profile',
                  AppRoutes.profile,
                ),
              ],
            ),
          ),
        );
      },
    );
  }

  Widget _buildNavItem(int index, IconData icon, String label, String route) {
    final theme = Theme.of(context);
    final colorScheme = theme.colorScheme;
    final isSelected = _selectedIndex == index;

    return Expanded(
      child: InkWell(
        onTap: () => _onItemTapped(index, route),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            // Animated icon with scale effect on selection
            TweenAnimationBuilder<double>(
              tween: Tween<double>(
                begin: isSelected ? 0.8 : 1.0,
                end: isSelected ? 1.0 : 0.8,
              ),
              duration: AppConstants.animDurationFast,
              curve: Curves.easeOutBack,
              builder: (context, value, child) {
                return Transform.scale(
                  scale: value,
                  child: Icon(
                    icon,
                    color:
                        isSelected
                            ? colorScheme.primary
                            : colorScheme.onSurface.withOpacity(0.7),
                    size: 24,
                  ),
                );
              },
            ),
            const SizedBox(height: 4),
            // Animated text with slide effect
            AnimatedDefaultTextStyle(
              duration: AppConstants.animDurationFast,
              style: TextStyle(
                fontSize: 12,
                fontWeight: isSelected ? FontWeight.bold : FontWeight.normal,
                color:
                    isSelected
                        ? colorScheme.primary
                        : colorScheme.onSurface.withOpacity(0.7),
              ),
              child: Text(label),
            ),
            // Animated indicator dot
            AnimatedContainer(
              duration: AppConstants.animDurationFast,
              margin: const EdgeInsets.only(top: 4),
              height: 4,
              width: isSelected ? 20 : 0,
              decoration: BoxDecoration(
                color: colorScheme.primary,
                borderRadius: BorderRadius.circular(
                  AppConstants.radiusCircular,
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildCreateButton() {
    final isSelected = _selectedIndex == 2;

    return Expanded(
      child: Center(
        child: IOSButton.small(
          label: '',
          icon: Icons.add_rounded,
          backgroundColor:
              isSelected
                  ? Theme.of(context).colorScheme.primaryContainer
                  : Theme.of(context).colorScheme.primary,
          textColor:
              isSelected
                  ? Theme.of(context).colorScheme.primary
                  : Theme.of(context).colorScheme.onPrimary,
          onPressed: () => _onItemTapped(2, AppRoutes.postCreate),
        ),
      ),
    );
  }

  void _onItemTapped(int index, String route) {
    if (_selectedIndex == index) return;

    setState(() {
      _selectedIndex = index;
    });

    HapticUtils.mediumImpact();
    _animationController.reset();
    _animationController.forward();

    GoRouter.of(context).go(route);
  }
}
