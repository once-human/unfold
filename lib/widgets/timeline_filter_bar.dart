import 'package:flutter/material.dart';
import 'package:unfold/core/constants.dart';
import 'package:unfold/models/post_model.dart';
import 'package:unfold/models/timeline_model.dart';

/// A filter bar for the timeline
class TimelineFilterBar extends StatelessWidget {
  /// Callback when a category filter is changed
  final Function(MemoryCategory) onFilterChanged;

  /// Callback when the sort method is changed
  final Function(TimelineSortMethod) onSortChanged;

  /// Callback when the grouping method is changed
  final Function(TimelineGrouping) onGroupingChanged;

  /// Currently active category filters
  final Set<MemoryCategory> activeFilters;

  /// Current sort method
  final TimelineSortMethod currentSortMethod;

  /// Current grouping method
  final TimelineGrouping currentGrouping;

  /// Creates a filter bar for the timeline
  const TimelineFilterBar({
    Key? key,
    required this.onFilterChanged,
    required this.onSortChanged,
    required this.onGroupingChanged,
    required this.activeFilters,
    required this.currentSortMethod,
    required this.currentGrouping,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(AppConstants.spacingS),
      color: Theme.of(context).scaffoldBackgroundColor,
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // Category filters
          _buildCategoryFilters(context),

          const SizedBox(height: AppConstants.spacingS),

          // Sort and Group controls
          _buildSortAndGroupControls(context),
        ],
      ),
    );
  }

  /// Build category filter chips
  Widget _buildCategoryFilters(BuildContext context) {
    return SizedBox(
      height: 40,
      child: ListView(
        scrollDirection: Axis.horizontal,
        children: [
          const SizedBox(width: AppConstants.spacingS),

          // All categories filter chip
          FilterChip(
            label: const Text('All'),
            selected: activeFilters.isEmpty,
            onSelected: (selected) {
              if (selected) {
                // Clear all filters
                for (final category in MemoryCategory.values) {
                  if (activeFilters.contains(category)) {
                    onFilterChanged(category);
                  }
                }
              }
            },
            backgroundColor: Theme.of(context).colorScheme.surface,
            selectedColor: Theme.of(
              context,
            ).colorScheme.primary.withOpacity(0.2),
            checkmarkColor: Theme.of(context).colorScheme.primary,
          ),

          const SizedBox(width: AppConstants.spacingS),

          // Individual category filter chips
          ...MemoryCategory.values.map((category) {
            final color = MemoryPost.getCategoryColor(category);
            final icon = MemoryPost.getCategoryIcon(category);
            final name = MemoryPost.getCategoryName(category);

            return Padding(
              padding: const EdgeInsets.only(right: AppConstants.spacingS),
              child: FilterChip(
                avatar: Icon(
                  icon,
                  size: 16,
                  color:
                      activeFilters.contains(category)
                          ? Theme.of(context).colorScheme.onPrimary
                          : color,
                ),
                label: Text(name),
                selected: activeFilters.contains(category),
                onSelected: (selected) {
                  onFilterChanged(category);
                },
                backgroundColor: Theme.of(context).colorScheme.surface,
                selectedColor: color.withOpacity(0.8),
                labelStyle: TextStyle(
                  color:
                      activeFilters.contains(category)
                          ? Theme.of(context).colorScheme.onPrimary
                          : Theme.of(context).colorScheme.onSurface,
                ),
              ),
            );
          }),
        ],
      ),
    );
  }

  /// Build sort and group controls
  Widget _buildSortAndGroupControls(BuildContext context) {
    return Row(
      children: [
        // Sort dropdown
        Expanded(
          child: _buildDropdown<TimelineSortMethod>(
            context,
            value: currentSortMethod,
            icon: Icons.sort,
            label: 'Sort',
            items:
                TimelineSortMethod.values
                    .map(
                      (method) => DropdownMenuItem<TimelineSortMethod>(
                        value: method,
                        child: Text(_getSortMethodName(method)),
                      ),
                    )
                    .toList(),
            onChanged: (method) {
              if (method != null) {
                onSortChanged(method);
              }
            },
          ),
        ),

        const SizedBox(width: AppConstants.spacingM),

        // Group dropdown
        Expanded(
          child: _buildDropdown<TimelineGrouping>(
            context,
            value: currentGrouping,
            icon: Icons.view_agenda,
            label: 'Group',
            items:
                TimelineGrouping.values
                    .map(
                      (grouping) => DropdownMenuItem<TimelineGrouping>(
                        value: grouping,
                        child: Text(_getGroupingName(grouping)),
                      ),
                    )
                    .toList(),
            onChanged: (grouping) {
              if (grouping != null) {
                onGroupingChanged(grouping);
              }
            },
          ),
        ),
      ],
    );
  }

  /// Build a dropdown button with icon and label
  Widget _buildDropdown<T>(
    BuildContext context, {
    required T value,
    required IconData icon,
    required String label,
    required List<DropdownMenuItem<T>> items,
    required void Function(T?) onChanged,
  }) {
    return Row(
      children: [
        Icon(
          icon,
          size: 18,
          color: Theme.of(context).colorScheme.onBackground.withOpacity(0.6),
        ),
        const SizedBox(width: AppConstants.spacingXS),
        Text(
          '$label:',
          style: Theme.of(context).textTheme.bodySmall?.copyWith(
            color: Theme.of(context).colorScheme.onBackground.withOpacity(0.6),
          ),
        ),
        const SizedBox(width: AppConstants.spacingXS),
        Expanded(
          child: DropdownButton<T>(
            value: value,
            items: items,
            onChanged: onChanged,
            isExpanded: true,
            underline: const SizedBox.shrink(),
            style: Theme.of(context).textTheme.bodyMedium,
            icon: const Icon(Icons.arrow_drop_down, size: 18),
          ),
        ),
      ],
    );
  }

  /// Get a human-readable name for a sort method
  String _getSortMethodName(TimelineSortMethod method) {
    switch (method) {
      case TimelineSortMethod.dateAscending:
        return 'Oldest first';
      case TimelineSortMethod.dateDescending:
        return 'Newest first';
      case TimelineSortMethod.createdAtDescending:
        return 'Recently created';
      case TimelineSortMethod.titleAscending:
        return 'Title A-Z';
      case TimelineSortMethod.categoryGrouped:
        return 'By category';
    }
  }

  /// Get a human-readable name for a grouping method
  String _getGroupingName(TimelineGrouping grouping) {
    switch (grouping) {
      case TimelineGrouping.daily:
        return 'By day';
      case TimelineGrouping.monthly:
        return 'By month';
      case TimelineGrouping.yearly:
        return 'By year';
      case TimelineGrouping.byCategory:
        return 'By category';
    }
  }
}
