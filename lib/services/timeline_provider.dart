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

  // Generate sample data for the timeline if it's empty
  if (repository.getAllPosts().isEmpty) {
    await _generateSampleData(repository);
  }
}

/// Generates sample data for the timeline
Future<void> _generateSampleData(PostRepository repository) async {
  // Create sample posts with different dates, categories, and content
  final now = DateTime.now();
  final posts = [
    // This year - recent posts
    MemoryPost(
      userId: 'user123',
      title: 'Started Learning Flutter',
      content:
          'Today I began my journey into Flutter development. The framework seems very promising and I\'m excited to build my first app!',
      memoryDate: DateTime(now.year, now.month, now.day - 14),
      category: MemoryCategory.education,
      tags: ['flutter', 'coding', 'learning'],
    ),
    MemoryPost(
      userId: 'user123',
      title: 'Family Vacation to the Mountains',
      content:
          'We spent a wonderful week in the mountains. The views were breathtaking and the hiking trails were amazing.',
      memoryDate: DateTime(now.year, now.month - 1, 15),
      category: MemoryCategory.family,
      isMilestone: true,
      tags: ['vacation', 'mountains', 'hiking'],
      mediaAttachments: [
        MediaAttachment(
          url: 'https://images.unsplash.com/photo-1454496522488-7a8e488e8606',
          type: MediaType.image,
          caption: 'Beautiful mountain view',
        ),
      ],
    ),
    MemoryPost(
      userId: 'user123',
      title: 'Completed My First Half Marathon',
      content:
          'After months of training, I finally ran my first half marathon! Finished in 1:45, which is better than I expected.',
      memoryDate: DateTime(now.year, now.month - 2, 5),
      category: MemoryCategory.health,
      isMilestone: true,
      tags: ['running', 'achievement', 'fitness'],
    ),

    // Last year
    MemoryPost(
      userId: 'user123',
      title: 'New Job at Tech Company',
      content:
          'Started my new position as a software developer at a great tech company. The team is amazing and I\'m looking forward to learning and growing here.',
      memoryDate: DateTime(now.year - 1, 10, 10),
      category: MemoryCategory.career,
      isMilestone: true,
      tags: ['career', 'software', 'newjob'],
    ),
    MemoryPost(
      userId: 'user123',
      title: 'Road Trip Along the Coast',
      content:
          'Spent two weeks driving along the coast, stopping at beautiful beaches and coastal towns. It was one of the best trips I\'ve ever taken.',
      memoryDate: DateTime(now.year - 1, 7, 22),
      category: MemoryCategory.travel,
      tags: ['roadtrip', 'beach', 'vacation'],
      mediaAttachments: [
        MediaAttachment(
          url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e',
          type: MediaType.image,
          caption: 'Sunset at the beach',
        ),
      ],
    ),

    // Two years ago
    MemoryPost(
      userId: 'user123',
      title: 'Started a New Hobby: Photography',
      content:
          'Got my first DSLR camera and started learning photography. I\'m particularly interested in landscape and nature photography.',
      memoryDate: DateTime(now.year - 2, 5, 17),
      category: MemoryCategory.hobby,
      tags: ['photography', 'camera', 'hobby'],
    ),
    MemoryPost(
      userId: 'user123',
      title: 'Graduated from University',
      content:
          'Finally graduated with a degree in Computer Science! It\'s been a challenging but rewarding journey.',
      memoryDate: DateTime(now.year - 2, 6, 30),
      category: MemoryCategory.education,
      isMilestone: true,
      tags: ['graduation', 'university', 'achievement'],
    ),
  ];

  // Add sample posts to the repository
  await repository.addPosts(posts);
}
