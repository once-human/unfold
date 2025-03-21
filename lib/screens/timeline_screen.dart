import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:unfold/models/post_model.dart';
import 'package:unfold/models/timeline_model.dart';
import 'package:unfold/services/post_repository.dart';
import 'package:unfold/services/timeline_provider.dart';
import 'package:unfold/widgets/memory_card.dart';
import 'package:unfold/widgets/timeline_date_marker.dart';
import 'package:unfold/widgets/timeline_filter_bar.dart';
import 'package:unfold/core/constants.dart';

/// The main timeline screen showing memory posts
class TimelineScreen extends StatelessWidget {
  /// Creates a timeline screen
  const TimelineScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Timeline'), centerTitle: true),
      body: ProviderScope(
        overrides: [
          // This ensures the timeline screen can be opened independently
          // by initializing its own provider instance
        ],
        child: _TimelineContent(),
      ),
    );
  }
}

/// Content of the timeline screen
class _TimelineContent extends ConsumerStatefulWidget {
  @override
  ConsumerState<_TimelineContent> createState() => _TimelineContentState();
}

class _TimelineContentState extends ConsumerState<_TimelineContent> {
  /// Scroll controller for the timeline
  final ScrollController _scrollController = ScrollController();

  /// Tracks if we need to load more items
  bool _isLoadingMore = false;

  /// Current year being viewed in the timeline
  int? _currentYear;

  @override
  void initState() {
    super.initState();
    _scrollController.addListener(_scrollListener);

    // Initialize the repository if needed
    WidgetsBinding.instance.addPostFrameCallback((_) async {
      final repository = await PostRepository.getInstance();
      ref.read(postRepositoryProvider.notifier).state = repository;
    });
  }

  @override
  void dispose() {
    _scrollController.removeListener(_scrollListener);
    _scrollController.dispose();
    super.dispose();
  }

  /// Listen for scroll events to load more content and update current year
  void _scrollListener() {
    // Detect when we should load more posts
    if (_scrollController.position.pixels >=
        _scrollController.position.maxScrollExtent - 500) {
      _loadMorePosts();
    }

    // Update current year for the year indicator
    _updateCurrentYear();
  }

  /// Load more posts when approaching end of list
  void _loadMorePosts() {
    // Only run this if we're not already loading
    if (!_isLoadingMore) {
      setState(() {
        _isLoadingMore = true;
      });

      // In a real app, you would load more posts here
      // This is just a simulation of loading more
      Future.delayed(const Duration(milliseconds: 500), () {
        setState(() {
          _isLoadingMore = false;
        });
      });
    }
  }

  /// Update the current year based on scroll position
  void _updateCurrentYear() {
    // This would use the actual rendered position of date markers
    // For now, we'll just use the first visible item
    // In a production app, this would be more sophisticated
  }

  @override
  Widget build(BuildContext context) {
    // Check if the repository is initialized
    final repository = ref.watch(postRepositoryProvider);

    if (repository == null) {
      return const Center(child: CircularProgressIndicator());
    }

    final groupedPosts = ref.watch(groupedPostsProvider);
    final timelineState = ref.watch(timelineProvider);

    return SafeArea(
      child: Column(
        children: [
          // Filter and sort controls
          TimelineFilterBar(
            onFilterChanged: (category) {
              ref.read(timelineProvider.notifier).filterByCategory(category);
            },
            onSortChanged: (sortMethod) {
              ref.read(timelineProvider.notifier).setSortMethod(sortMethod);
            },
            onGroupingChanged: (grouping) {
              ref.read(timelineProvider.notifier).setGrouping(grouping);
            },
            activeFilters: timelineState.activeCategories,
            currentSortMethod: timelineState.sortMethod,
            currentGrouping: timelineState.grouping,
          ),

          // Year indicator that sticks to the top
          if (_currentYear != null)
            Padding(
              padding: const EdgeInsets.symmetric(vertical: 8.0),
              child: Text(
                _currentYear.toString(),
                style: Theme.of(context).textTheme.headlineSmall?.copyWith(
                  fontWeight: FontWeight.bold,
                ),
              ),
            ),

          // Timeline content
          Expanded(
            child:
                groupedPosts.isEmpty
                    ? _buildEmptyState()
                    : _buildTimeline(groupedPosts, timelineState.grouping),
          ),
        ],
      ),
    );
  }

  /// Build the empty state when no posts are available
  Widget _buildEmptyState() {
    return Center(
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Icon(
            Icons.timeline,
            size: 64,
            color: Theme.of(context).colorScheme.primary.withOpacity(0.5),
          ),
          const SizedBox(height: 16),
          Text(
            'No memories yet',
            style: Theme.of(context).textTheme.headlineSmall,
          ),
          const SizedBox(height: 8),
          Text(
            'Add your first memory to start your timeline',
            style: Theme.of(context).textTheme.bodyLarge,
            textAlign: TextAlign.center,
          ),
          const SizedBox(height: 24),
          ElevatedButton.icon(
            onPressed: () {
              // Navigate to memory creation screen
            },
            icon: const Icon(Icons.add),
            label: const Text('Add Memory'),
          ),
        ],
      ),
    );
  }

  /// Build the timeline content with grouped posts
  Widget _buildTimeline(
    Map<String, List<MemoryPost>> groupedPosts,
    TimelineGrouping grouping,
  ) {
    // Convert the map to a list of entries for easier iteration
    final entries = groupedPosts.entries.toList();

    return ListView.builder(
      controller: _scrollController,
      padding: const EdgeInsets.only(bottom: 80),
      physics: const ClampingScrollPhysics(),
      itemCount: entries.length * 2, // Double for markers and content
      itemBuilder: (context, index) {
        // Even indices are date markers, odd indices are post groups
        if (index.isEven) {
          final entryIndex = index ~/ 2;
          if (entryIndex >= entries.length) return const SizedBox.shrink();

          final groupKey = entries[entryIndex].key;
          return TimelineDateMarker(
            title: _getFormattedGroupTitle(groupKey, grouping),
          );
        } else {
          final entryIndex = index ~/ 2;
          if (entryIndex >= entries.length) return const SizedBox.shrink();

          final posts = entries[entryIndex].value;
          return _buildPostGroup(posts);
        }
      },
    );
  }

  /// Get a formatted title for a group based on the grouping method
  String _getFormattedGroupTitle(String groupKey, TimelineGrouping grouping) {
    switch (grouping) {
      case TimelineGrouping.daily:
        // Parse YYYY-MM-DD format
        final parts = groupKey.split('-');
        if (parts.length == 3) {
          return '${_getMonthName(int.parse(parts[1]))} ${parts[2]}, ${parts[0]}';
        }
        return groupKey;

      case TimelineGrouping.monthly:
        // Parse YYYY-MM format
        final parts = groupKey.split('-');
        if (parts.length == 2) {
          return '${_getMonthName(int.parse(parts[1]))} ${parts[0]}';
        }
        return groupKey;

      case TimelineGrouping.yearly:
        return groupKey;

      case TimelineGrouping.byCategory:
        // Capitalize the category name
        return groupKey.substring(0, 1).toUpperCase() + groupKey.substring(1);
    }
  }

  /// Get month name from month number
  String _getMonthName(int month) {
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    return months[month - 1];
  }

  /// Build a group of posts for a single time period
  Widget _buildPostGroup(List<MemoryPost> posts) {
    return Padding(
      padding: const EdgeInsets.only(
        left: AppConstants.spacingL,
        right: AppConstants.spacingL,
        bottom: AppConstants.spacingL,
      ),
      child: Column(
        children:
            posts
                .map(
                  (post) => MemoryCard(
                    post: post,
                    onTap: () {
                      // Navigate to post detail screen
                    },
                  ),
                )
                .toList(),
      ),
    );
  }
}
