import 'dart:async';
import 'dart:convert';

import 'package:flutter/foundation.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:unfold/models/post_model.dart';

/// A repository for managing memory posts storage and retrieval
class PostRepository {
  /// Key for storing posts in SharedPreferences
  static const String _postsStorageKey = 'memory_posts';

  /// In-memory cache of posts
  final List<MemoryPost> _cachedPosts = [];

  /// Stream controller for post updates
  final _postsController = StreamController<List<MemoryPost>>.broadcast();

  /// Stream of posts updates
  Stream<List<MemoryPost>> get postsStream => _postsController.stream;

  /// Singleton instance
  static PostRepository? _instance;

  /// Get the singleton instance
  static Future<PostRepository> getInstance() async {
    if (_instance == null) {
      final repository = PostRepository._();
      await repository._initialize();
      _instance = repository;
    }
    return _instance!;
  }

  /// Private constructor
  PostRepository._();

  /// Initialize the repository by loading posts from storage
  Future<void> _initialize() async {
    await _loadPosts();
  }

  /// Get all posts
  List<MemoryPost> getAllPosts() {
    return List.unmodifiable(_cachedPosts);
  }

  /// Get all posts sorted by date (newest first)
  List<MemoryPost> getPostsByDate() {
    final sortedPosts = List<MemoryPost>.from(_cachedPosts);
    sortedPosts.sort((a, b) => b.memoryDate.compareTo(a.memoryDate));
    return sortedPosts;
  }

  /// Get a post by its ID
  MemoryPost? getPostById(String id) {
    try {
      return _cachedPosts.firstWhere((post) => post.id == id);
    } catch (e) {
      return null;
    }
  }

  /// Get all posts for a specific year
  List<MemoryPost> getPostsByYear(int year) {
    return _cachedPosts.where((post) => post.memoryDate.year == year).toList();
  }

  /// Get all posts for a specific month in a year
  List<MemoryPost> getPostsByMonth(int year, int month) {
    return _cachedPosts
        .where(
          (post) =>
              post.memoryDate.year == year && post.memoryDate.month == month,
        )
        .toList();
  }

  /// Get posts by category
  List<MemoryPost> getPostsByCategory(MemoryCategory category) {
    return _cachedPosts.where((post) => post.category == category).toList();
  }

  /// Get milestone posts only
  List<MemoryPost> getMilestonePosts() {
    return _cachedPosts.where((post) => post.isMilestone).toList();
  }

  /// Search posts by query
  List<MemoryPost> searchPosts(String query) {
    final lowerQuery = query.toLowerCase();
    return _cachedPosts
        .where(
          (post) =>
              post.title.toLowerCase().contains(lowerQuery) ||
              post.content.toLowerCase().contains(lowerQuery) ||
              post.tags.any((tag) => tag.toLowerCase().contains(lowerQuery)),
        )
        .toList();
  }

  /// Add a new post
  Future<MemoryPost> addPost(MemoryPost post) async {
    // Add to cache
    _cachedPosts.add(post);

    // Save to storage
    await _savePosts();

    // Notify listeners
    _postsController.add(List.unmodifiable(_cachedPosts));

    return post;
  }

  /// Add multiple posts
  Future<void> addPosts(List<MemoryPost> posts) async {
    // Add to cache
    _cachedPosts.addAll(posts);

    // Save to storage
    await _savePosts();

    // Notify listeners
    _postsController.add(List.unmodifiable(_cachedPosts));
  }

  /// Update an existing post
  Future<MemoryPost?> updatePost(MemoryPost updatedPost) async {
    final index = _cachedPosts.indexWhere((post) => post.id == updatedPost.id);

    if (index >= 0) {
      // Update in cache
      _cachedPosts[index] = updatedPost;

      // Save to storage
      await _savePosts();

      // Notify listeners
      _postsController.add(List.unmodifiable(_cachedPosts));

      return updatedPost;
    }

    return null;
  }

  /// Delete a post
  Future<bool> deletePost(String id) async {
    final initialLength = _cachedPosts.length;

    // Remove from cache
    _cachedPosts.removeWhere((post) => post.id == id);

    if (_cachedPosts.length != initialLength) {
      // Save to storage
      await _savePosts();

      // Notify listeners
      _postsController.add(List.unmodifiable(_cachedPosts));

      return true;
    }

    return false;
  }

  /// Load posts from persistent storage
  Future<void> _loadPosts() async {
    try {
      final prefs = await SharedPreferences.getInstance();
      final postsJson = prefs.getStringList(_postsStorageKey);

      if (postsJson != null) {
        // Clear current cache
        _cachedPosts.clear();

        // Parse posts from JSON
        for (final json in postsJson) {
          try {
            final post = MemoryPost.fromJson(json);
            _cachedPosts.add(post);
          } catch (e) {
            debugPrint('Error parsing post: $e');
          }
        }

        // Sort by date, newest first
        _cachedPosts.sort((a, b) => b.memoryDate.compareTo(a.memoryDate));

        // Notify listeners
        _postsController.add(List.unmodifiable(_cachedPosts));
      }
    } catch (e) {
      debugPrint('Error loading posts: $e');
    }
  }

  /// Save posts to persistent storage
  Future<void> _savePosts() async {
    try {
      final prefs = await SharedPreferences.getInstance();

      // Convert posts to JSON
      final postsJson = _cachedPosts.map((post) => post.toJson()).toList();

      // Save to SharedPreferences
      await prefs.setStringList(_postsStorageKey, postsJson);
    } catch (e) {
      debugPrint('Error saving posts: $e');
    }
  }

  /// Dispose resources
  void dispose() {
    _postsController.close();
  }
}
