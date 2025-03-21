import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:unfold/models/post_model.dart';
import 'package:unfold/models/timeline_model.dart';
import 'package:unfold/services/post_repository.dart';

/// Provider for timeline repository
final postRepositoryProvider = StateProvider<PostRepository?>((ref) => null);

/// Provider for timeline state
final timelineProvider = StateNotifierProvider<TimelineNotifier, Timeline>((
  ref,
) {
  final repository = ref.watch(postRepositoryProvider);
  if (repository == null) {
    throw UnimplementedError('Repository must be initialized before use');
  }
  return TimelineNotifier(repository);
});

/// Notifier for timeline state
class TimelineNotifier extends StateNotifier<Timeline> {
  /// Post repository for data access
  final PostRepository _repository;

  /// Create a timeline notifier
  TimelineNotifier(this._repository) : super(Timeline()) {
    _initializeTimeline();
  }

  /// Initialize the timeline with posts from repository
  Future<void> _initializeTimeline() async {
    final posts = _repository.getAllPosts();
    state = state.copyWith(posts: posts);
  }

  /// Reload posts from repository
  Future<void> refreshPosts() async {
    final posts = _repository.getAllPosts();
    state = state.copyWith(posts: posts);
  }

  /// Add a post to the timeline
  Future<void> addPost(MemoryPost post) async {
    await _repository.addPost(post);
    await refreshPosts();
  }

  /// Update a post in the timeline
  Future<void> updatePost(MemoryPost post) async {
    await _repository.updatePost(post);
    await refreshPosts();
  }

  /// Delete a post from the timeline
  Future<void> deletePost(String postId) async {
    await _repository.deletePost(postId);
    await refreshPosts();
  }

  /// Filter posts by category
  void filterByCategory(MemoryCategory category) {
    state = state.toggleCategory(category);
  }

  /// Reset category filters
  void resetCategoryFilters() {
    state = state.clearCategoryFilters();
  }

  /// Toggle milestone filter
  void toggleMilestoneFilter() {
    state = state.toggleMilestoneFilter();
  }

  /// Change sort method
  void setSortMethod(TimelineSortMethod method) {
    state = state.changeSortMethod(method);
  }

  /// Change grouping method
  void setGrouping(TimelineGrouping grouping) {
    state = state.changeGrouping(grouping);
  }

  /// Set search query
  void setSearchQuery(String? query) {
    state = state.setSearchQuery(query);
  }

  /// Set date range filter
  void setDateRange(DateTimeRange? range) {
    state = state.setDateRange(range);
  }
}

/// Provider for fetching a single post by ID
final postDetailProvider = Provider.family<AsyncValue<MemoryPost?>, String>((
  ref,
  id,
) {
  try {
    final repository = ref.watch(postRepositoryProvider);
    if (repository == null) {
      return const AsyncValue.loading();
    }
    final post = repository.getPostById(id);
    return AsyncValue.data(post);
  } catch (e) {
    return AsyncValue.error(e, StackTrace.current);
  }
});

/// Provider for filtered timeline posts
final filteredPostsProvider = Provider<List<MemoryPost>>((ref) {
  final timeline = ref.watch(timelineProvider);
  return timeline.filteredAndSortedPosts;
});

/// Provider for grouped timeline posts
final groupedPostsProvider = Provider<Map<String, List<MemoryPost>>>((ref) {
  final timeline = ref.watch(timelineProvider);
  return timeline.groupedPosts;
});

/// Provider for available years in the timeline
final availableYearsProvider = Provider<List<int>>((ref) {
  final timeline = ref.watch(timelineProvider);
  final years = timeline.availableYears.toList();
  years.sort((a, b) => b.compareTo(a)); // newest first
  return years;
});

/// Initialize the timeline providers
Future<void> initializeTimelineProviders(ProviderContainer container) async {
  final repository = await PostRepository.getInstance();
  container.read(postRepositoryProvider.notifier).state = repository;
}
