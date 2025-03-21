import 'package:flutter/material.dart';
import 'package:unfold/core/constants.dart';
import 'package:unfold/models/post_model.dart';
import 'package:unfold/widgets/parallax_container.dart';
import 'package:timeago/timeago.dart' as timeago;

/// A card displaying a memory post in the timeline
class MemoryCard extends StatelessWidget {
  /// The memory post to display
  final MemoryPost post;

  /// Callback when the card is tapped
  final VoidCallback? onTap;

  /// Whether to use a compact layout (less detail)
  final bool isCompact;

  /// Creates a memory card
  const MemoryCard({
    Key? key,
    required this.post,
    this.onTap,
    this.isCompact = false,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final colorScheme = theme.colorScheme;

    // Get category color
    final categoryColor = MemoryPost.getCategoryColor(post.category);
    final categoryIcon = MemoryPost.getCategoryIcon(post.category);

    return GestureDetector(
      onTap: onTap,
      child: Container(
        margin: const EdgeInsets.only(bottom: AppConstants.spacingM),
        decoration: BoxDecoration(
          color: theme.cardColor,
          borderRadius: BorderRadius.circular(AppConstants.radiusL),
          boxShadow: [
            BoxShadow(
              color: Colors.black.withOpacity(0.05),
              blurRadius: 10,
              offset: const Offset(0, 2),
            ),
          ],
        ),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Header with category and date
            _buildHeader(context, categoryColor, categoryIcon),

            // Content
            Padding(
              padding: const EdgeInsets.all(AppConstants.spacingM),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  // Title
                  Text(
                    post.title,
                    style: theme.textTheme.titleLarge?.copyWith(
                      fontWeight: FontWeight.bold,
                    ),
                    maxLines: 2,
                    overflow: TextOverflow.ellipsis,
                  ),

                  const SizedBox(height: AppConstants.spacingS),

                  // Content preview
                  if (!isCompact && post.content.isNotEmpty)
                    Text(
                      post.content,
                      style: theme.textTheme.bodyMedium,
                      maxLines: 3,
                      overflow: TextOverflow.ellipsis,
                    ),
                ],
              ),
            ),

            // Media preview
            _buildMediaPreview(context),

            // Footer with tags and actions
            if (!isCompact) _buildFooter(context),
          ],
        ),
      ),
    );
  }

  /// Build the category header
  Widget _buildHeader(
    BuildContext context,
    Color categoryColor,
    IconData categoryIcon,
  ) {
    return Container(
      padding: const EdgeInsets.symmetric(
        horizontal: AppConstants.spacingM,
        vertical: AppConstants.spacingS,
      ),
      decoration: BoxDecoration(
        color: categoryColor.withOpacity(0.1),
        borderRadius: BorderRadius.only(
          topLeft: Radius.circular(AppConstants.radiusL),
          topRight: Radius.circular(AppConstants.radiusL),
        ),
      ),
      child: Row(
        children: [
          // Category
          Icon(categoryIcon, size: 16, color: categoryColor),
          const SizedBox(width: 4),
          Text(
            MemoryPost.getCategoryName(post.category),
            style: Theme.of(context).textTheme.bodySmall?.copyWith(
              color: categoryColor,
              fontWeight: FontWeight.bold,
            ),
          ),

          const Spacer(),

          // Date indicator
          Text(
            _getFormattedDate(),
            style: Theme.of(context).textTheme.bodySmall,
          ),

          // Milestone indicator
          if (post.isMilestone)
            Padding(
              padding: const EdgeInsets.only(left: AppConstants.spacingS),
              child: Icon(Icons.star, size: 16, color: Colors.amber),
            ),
        ],
      ),
    );
  }

  /// Build media preview if available
  Widget _buildMediaPreview(BuildContext context) {
    if (post.mediaAttachments.isEmpty) {
      return const SizedBox.shrink();
    }

    // Get first attachment
    final media = post.mediaAttachments.first;

    // Height for media preview
    final previewHeight = isCompact ? 120.0 : 200.0;

    switch (media.type) {
      case MediaType.image:
        return SizedBox(
          height: previewHeight,
          width: double.infinity,
          child: Image.network(
            media.url,
            fit: BoxFit.cover,
            errorBuilder: (context, error, stackTrace) {
              return Container(
                color: Colors.grey.shade200,
                child: Icon(
                  Icons.image_not_supported,
                  color: Colors.grey.shade400,
                  size: 48,
                ),
              );
            },
          ),
        );

      case MediaType.video:
        return Container(
          height: previewHeight,
          width: double.infinity,
          color: Colors.black,
          child: Stack(
            alignment: Alignment.center,
            children: [
              // Thumbnail if available
              if (media.thumbnailUrl != null)
                Image.network(
                  media.thumbnailUrl!,
                  fit: BoxFit.cover,
                  width: double.infinity,
                  height: double.infinity,
                ),

              // Play button
              Container(
                padding: const EdgeInsets.all(AppConstants.spacingM),
                decoration: BoxDecoration(
                  color: Colors.black.withOpacity(0.5),
                  shape: BoxShape.circle,
                ),
                child: const Icon(
                  Icons.play_arrow,
                  color: Colors.white,
                  size: 32,
                ),
              ),
            ],
          ),
        );

      default:
        return const SizedBox.shrink();
    }
  }

  /// Build footer with tags and actions
  Widget _buildFooter(BuildContext context) {
    final theme = Theme.of(context);

    return Padding(
      padding: const EdgeInsets.all(AppConstants.spacingM),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // Tags
          if (post.tags.isNotEmpty)
            Wrap(
              spacing: AppConstants.spacingS,
              runSpacing: AppConstants.spacingXS,
              children:
                  post.tags
                      .map(
                        (tag) => Chip(
                          label: Text(
                            tag,
                            style: theme.textTheme.bodySmall?.copyWith(
                              color: theme.colorScheme.onPrimary,
                            ),
                          ),
                          backgroundColor: theme.colorScheme.primary
                              .withOpacity(0.8),
                          padding: EdgeInsets.zero,
                          materialTapTargetSize:
                              MaterialTapTargetSize.shrinkWrap,
                        ),
                      )
                      .toList(),
            ),

          const SizedBox(height: AppConstants.spacingS),

          // Actions
          Row(
            children: [
              // Like button
              Icon(
                Icons.favorite_border,
                size: 18,
                color: theme.colorScheme.onSurface.withOpacity(0.5),
              ),
              const SizedBox(width: 4),
              Text(post.likeCount.toString(), style: theme.textTheme.bodySmall),

              const SizedBox(width: AppConstants.spacingM),

              // Comment button
              Icon(
                Icons.comment_outlined,
                size: 18,
                color: theme.colorScheme.onSurface.withOpacity(0.5),
              ),
              const SizedBox(width: 4),
              Text(
                post.commentCount.toString(),
                style: theme.textTheme.bodySmall,
              ),

              const Spacer(),

              // Share button
              Icon(
                Icons.share_outlined,
                size: 18,
                color: theme.colorScheme.onSurface.withOpacity(0.5),
              ),
            ],
          ),
        ],
      ),
    );
  }

  /// Get a nicely formatted date
  String _getFormattedDate() {
    final now = DateTime.now();
    final difference = now.difference(post.memoryDate);

    // If the memory is recent (less than 7 days), use time ago format
    if (difference.inDays < 7) {
      return timeago.format(post.memoryDate);
    }

    // If in current year, just show month and day
    if (post.memoryDate.year == now.year) {
      return '${_getMonthName(post.memoryDate.month)} ${post.memoryDate.day}';
    }

    // Otherwise show month, day and year
    return '${_getMonthName(post.memoryDate.month)} ${post.memoryDate.day}, ${post.memoryDate.year}';
  }

  /// Get month name from month number
  String _getMonthName(int month) {
    const months = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];
    return months[month - 1];
  }
}
