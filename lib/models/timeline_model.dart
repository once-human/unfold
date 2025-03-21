import 'package:flutter/material.dart';
import 'package:unfold/models/post_model.dart';

/// A model representing a timeline of memory posts
class Timeline {
  /// List of all posts in the timeline
  final List<MemoryPost> posts;

  /// Currently active filter categories (empty means show all)
  final Set<MemoryCategory> activeCategories;

  /// Whether to show only milestone posts
  final bool showMilestonesOnly;

  /// Current sorting method
  final TimelineSortMethod sortMethod;

  /// Current grouping method
  final TimelineGrouping grouping;

  /// Filter text for searching posts
  final String? searchQuery;

  /// Date range filter for posts
  final DateTimeRange? dateRange;

  /// Creates a timeline model
  Timeline({
    this.posts = const [],
    this.activeCategories = const {},
    this.showMilestonesOnly = false,
    this.sortMethod = TimelineSortMethod.dateDescending,
    this.grouping = TimelineGrouping.monthly,
    this.searchQuery,
    this.dateRange,
  });

  /// Sorts and filters the posts based on current settings
  List<MemoryPost> get filteredAndSortedPosts {
    // Start with all posts
    List<MemoryPost> result = List.from(posts);

    // Apply category filter if categories are selected
    if (activeCategories.isNotEmpty) {
      result =
          result
              .where((post) => activeCategories.contains(post.category))
              .toList();
    }

    // Apply milestone filter
    if (showMilestonesOnly) {
      result = result.where((post) => post.isMilestone).toList();
    }

    // Apply search filter
    if (searchQuery != null && searchQuery!.isNotEmpty) {
      final query = searchQuery!.toLowerCase();
      result =
          result.where((post) {
            return post.title.toLowerCase().contains(query) ||
                post.content.toLowerCase().contains(query) ||
                post.tags.any((tag) => tag.toLowerCase().contains(query));
          }).toList();
    }

    // Apply date range filter
    if (dateRange != null) {
      result =
          result.where((post) {
            return (post.memoryDate.isAfter(dateRange!.start) ||
                    post.memoryDate.isAtSameMomentAs(dateRange!.start)) &&
                (post.memoryDate.isBefore(dateRange!.end) ||
                    post.memoryDate.isAtSameMomentAs(dateRange!.end));
          }).toList();
    }

    // Sort the posts
    _sortPosts(result);

    return result;
  }

  /// Sort posts based on the current sort method
  void _sortPosts(List<MemoryPost> posts) {
    switch (sortMethod) {
      case TimelineSortMethod.dateAscending:
        posts.sort((a, b) => a.memoryDate.compareTo(b.memoryDate));
        break;
      case TimelineSortMethod.dateDescending:
        posts.sort((a, b) => b.memoryDate.compareTo(a.memoryDate));
        break;
      case TimelineSortMethod.createdAtDescending:
        posts.sort((a, b) => b.createdAt.compareTo(a.createdAt));
        break;
      case TimelineSortMethod.titleAscending:
        posts.sort((a, b) => a.title.compareTo(b.title));
        break;
      case TimelineSortMethod.categoryGrouped:
        posts.sort((a, b) {
          // First sort by category
          final categoryComparison = a.category.index.compareTo(
            b.category.index,
          );
          if (categoryComparison != 0) return categoryComparison;
          // Then by date (newest first)
          return b.memoryDate.compareTo(a.memoryDate);
        });
        break;
    }
  }

  /// Group posts by the current grouping method
  Map<String, List<MemoryPost>> get groupedPosts {
    final sorted = filteredAndSortedPosts;
    final Map<String, List<MemoryPost>> result = {};

    for (final post in sorted) {
      final String key = _getGroupKey(post);
      if (!result.containsKey(key)) {
        result[key] = [];
      }
      result[key]!.add(post);
    }

    return result;
  }

  /// Get the group key for a post based on the current grouping method
  String _getGroupKey(MemoryPost post) {
    switch (grouping) {
      case TimelineGrouping.daily:
        // Format: "YYYY-MM-DD"
        return '${post.memoryDate.year}-${post.memoryDate.month.toString().padLeft(2, '0')}-${post.memoryDate.day.toString().padLeft(2, '0')}';

      case TimelineGrouping.monthly:
        // Format: "YYYY-MM"
        return '${post.memoryDate.year}-${post.memoryDate.month.toString().padLeft(2, '0')}';

      case TimelineGrouping.yearly:
        // Format: "YYYY"
        return post.memoryDate.year.toString();

      case TimelineGrouping.byCategory:
        // Use category name
        return MemoryPost.getCategoryName(post.category);
    }
  }

  /// Get a human-readable title for a group key
  String getGroupTitle(String groupKey) {
    if (grouping == TimelineGrouping.byCategory) {
      // Group key is already the category name
      return groupKey.substring(0, 1).toUpperCase() + groupKey.substring(1);
    }

    // For date-based groupings, parse the date parts
    final parts = groupKey.split('-');

    switch (grouping) {
      case TimelineGrouping.daily:
        // Format as "Month Day, Year" (e.g., "January 15, 2023")
        final date = DateTime(
          int.parse(parts[0]),
          int.parse(parts[1]),
          int.parse(parts[2]),
        );
        return _formatDate(date, includeDay: true);

      case TimelineGrouping.monthly:
        // Format as "Month Year" (e.g., "January 2023")
        final date = DateTime(int.parse(parts[0]), int.parse(parts[1]));
        return _formatDate(date, includeDay: false);

      case TimelineGrouping.yearly:
        // Just the year
        return parts[0];

      default:
        return groupKey;
    }
  }

  /// Format a date as a readable string
  String _formatDate(DateTime date, {required bool includeDay}) {
    final String month = _getMonthName(date.month);

    if (includeDay) {
      return '$month ${date.day}, ${date.year}';
    } else {
      return '$month ${date.year}';
    }
  }

  /// Get the name of a month from its number
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

  /// Create a copy with modified properties
  Timeline copyWith({
    List<MemoryPost>? posts,
    Set<MemoryCategory>? activeCategories,
    bool? showMilestonesOnly,
    TimelineSortMethod? sortMethod,
    TimelineGrouping? grouping,
    String? searchQuery,
    DateTimeRange? dateRange,
  }) {
    return Timeline(
      posts: posts ?? this.posts,
      activeCategories: activeCategories ?? this.activeCategories,
      showMilestonesOnly: showMilestonesOnly ?? this.showMilestonesOnly,
      sortMethod: sortMethod ?? this.sortMethod,
      grouping: grouping ?? this.grouping,
      searchQuery: searchQuery ?? this.searchQuery,
      dateRange: dateRange ?? this.dateRange,
    );
  }

  /// Add a post to the timeline
  Timeline addPost(MemoryPost post) {
    final newPosts = List<MemoryPost>.from(posts)..add(post);
    return copyWith(posts: newPosts);
  }

  /// Add multiple posts to the timeline
  Timeline addPosts(List<MemoryPost> newPosts) {
    final updatedPosts = List<MemoryPost>.from(posts)..addAll(newPosts);
    return copyWith(posts: updatedPosts);
  }

  /// Update a post in the timeline
  Timeline updatePost(MemoryPost updatedPost) {
    final updatedPosts =
        posts.map((post) {
          return post.id == updatedPost.id ? updatedPost : post;
        }).toList();

    return copyWith(posts: updatedPosts);
  }

  /// Remove a post from the timeline
  Timeline removePost(String postId) {
    final updatedPosts = posts.where((post) => post.id != postId).toList();
    return copyWith(posts: updatedPosts);
  }

  /// Toggle a category filter
  Timeline toggleCategory(MemoryCategory category) {
    final updatedCategories = Set<MemoryCategory>.from(activeCategories);

    if (updatedCategories.contains(category)) {
      updatedCategories.remove(category);
    } else {
      updatedCategories.add(category);
    }

    return copyWith(activeCategories: updatedCategories);
  }

  /// Set specific categories to filter by
  Timeline setCategories(Set<MemoryCategory> categories) {
    return copyWith(activeCategories: categories);
  }

  /// Clear all category filters
  Timeline clearCategoryFilters() {
    return copyWith(activeCategories: {});
  }

  /// Toggle milestone filter
  Timeline toggleMilestoneFilter() {
    return copyWith(showMilestonesOnly: !showMilestonesOnly);
  }

  /// Change the sort method
  Timeline changeSortMethod(TimelineSortMethod method) {
    return copyWith(sortMethod: method);
  }

  /// Change the grouping method
  Timeline changeGrouping(TimelineGrouping method) {
    return copyWith(grouping: method);
  }

  /// Set a search query
  Timeline setSearchQuery(String? query) {
    return copyWith(searchQuery: query);
  }

  /// Set a date range filter
  Timeline setDateRange(DateTimeRange? range) {
    return copyWith(dateRange: range);
  }

  /// Get all years present in the timeline
  Set<int> get availableYears {
    return posts.map((post) => post.memoryDate.year).toSet();
  }

  /// Find post by ID
  MemoryPost? findPostById(String id) {
    try {
      return posts.firstWhere((post) => post.id == id);
    } catch (e) {
      return null;
    }
  }
}

/// Sort methods for timeline posts
enum TimelineSortMethod {
  /// Oldest to newest
  dateAscending,

  /// Newest to oldest (default)
  dateDescending,

  /// Most recently created first
  createdAtDescending,

  /// Alphabetical by title
  titleAscending,

  /// Grouped by category then sorted by date
  categoryGrouped,
}

/// Grouping methods for timeline sections
enum TimelineGrouping {
  /// Group by day
  daily,

  /// Group by month (default)
  monthly,

  /// Group by year
  yearly,

  /// Group by category
  byCategory,
}
