import 'package:flutter/material.dart';
import 'package:unfold/core/constants.dart';

/// A date marker widget for the timeline
class TimelineDateMarker extends StatelessWidget {
  /// The title to display (formatted date)
  final String title;

  /// Whether this marker is for a milestone
  final bool isMilestone;

  /// Creates a date marker
  const TimelineDateMarker({
    Key? key,
    required this.title,
    this.isMilestone = false,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);

    return Padding(
      padding: const EdgeInsets.symmetric(vertical: AppConstants.spacingM),
      child: Row(
        children: [
          // Date marker line
          Container(
            width: 3,
            height: 30,
            decoration: BoxDecoration(
              color:
                  isMilestone
                      ? theme.colorScheme.primary
                      : theme.colorScheme.primary.withOpacity(0.5),
              borderRadius: BorderRadius.circular(1.5),
            ),
          ),

          // Date marker dot
          Container(
            width: 12,
            height: 12,
            margin: const EdgeInsets.symmetric(horizontal: 8),
            decoration: BoxDecoration(
              color:
                  isMilestone
                      ? theme.colorScheme.primary
                      : theme.colorScheme.primary.withOpacity(0.7),
              shape: BoxShape.circle,
              border: Border.all(color: theme.colorScheme.surface, width: 2),
            ),
          ),

          // Date text
          Text(
            title,
            style: theme.textTheme.titleMedium?.copyWith(
              fontWeight: FontWeight.bold,
              color:
                  isMilestone
                      ? theme.colorScheme.primary
                      : theme.colorScheme.onBackground,
            ),
          ),

          // Milestone indicator
          if (isMilestone)
            Container(
              margin: const EdgeInsets.only(left: AppConstants.spacingS),
              padding: const EdgeInsets.symmetric(
                horizontal: AppConstants.spacingS,
                vertical: 2,
              ),
              decoration: BoxDecoration(
                color: theme.colorScheme.primary,
                borderRadius: BorderRadius.circular(AppConstants.radiusS),
              ),
              child: Text(
                'Milestone',
                style: theme.textTheme.bodySmall?.copyWith(
                  color: theme.colorScheme.onPrimary,
                  fontWeight: FontWeight.bold,
                ),
              ),
            ),
        ],
      ),
    );
  }
}
