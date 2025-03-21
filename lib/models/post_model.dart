import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:uuid/uuid.dart';

/// Categories for memory posts
enum MemoryCategory {
  personal,
  career,
  travel,
  health,
  education,
  family,
  friends,
  hobby,
  other,
}

/// Types of media that can be attached to a memory
enum MediaType { image, video, audio, document }

/// A model representing a user's memory post
class MemoryPost {
  /// Unique identifier for the post
  final String id;

  /// User ID of the post creator
  final String userId;

  /// Title of the memory
  final String title;

  /// Main content text
  final String content;

  /// When the memory occurred (not the post creation time)
  final DateTime memoryDate;

  /// When the post was created
  final DateTime createdAt;

  /// Last modified timestamp
  final DateTime updatedAt;

  /// Category of the memory
  final MemoryCategory category;

  /// Whether this is marked as a milestone (important life event)
  final bool isMilestone;

  /// Media attachments (images, videos, etc.)
  final List<MediaAttachment> mediaAttachments;

  /// Location data if available
  final LocationData? location;

  /// Tags for the post (including people tags)
  final List<String> tags;

  /// Privacy level (who can see this post)
  final PrivacyLevel privacyLevel;

  /// Tagged users in the post
  final List<String> taggedUserIds;

  /// Whether this post is pinned to the top of the profile
  final bool isPinned;

  /// Optional mood/feeling associated with the memory
  final String? mood;

  /// Number of likes on the post
  final int likeCount;

  /// Number of comments on the post
  final int commentCount;

  /// Constructs a memory post
  MemoryPost({
    String? id,
    required this.userId,
    required this.title,
    required this.content,
    required this.memoryDate,
    DateTime? createdAt,
    DateTime? updatedAt,
    required this.category,
    this.isMilestone = false,
    this.mediaAttachments = const [],
    this.location,
    this.tags = const [],
    this.privacyLevel = PrivacyLevel.friends,
    this.taggedUserIds = const [],
    this.isPinned = false,
    this.mood,
    this.likeCount = 0,
    this.commentCount = 0,
  }) : id = id ?? const Uuid().v4(),
       createdAt = createdAt ?? DateTime.now(),
       updatedAt = updatedAt ?? DateTime.now();

  /// Create a copy of this memory post with modified fields
  MemoryPost copyWith({
    String? id,
    String? userId,
    String? title,
    String? content,
    DateTime? memoryDate,
    DateTime? createdAt,
    DateTime? updatedAt,
    MemoryCategory? category,
    bool? isMilestone,
    List<MediaAttachment>? mediaAttachments,
    LocationData? location,
    List<String>? tags,
    PrivacyLevel? privacyLevel,
    List<String>? taggedUserIds,
    bool? isPinned,
    String? mood,
    int? likeCount,
    int? commentCount,
  }) {
    return MemoryPost(
      id: id ?? this.id,
      userId: userId ?? this.userId,
      title: title ?? this.title,
      content: content ?? this.content,
      memoryDate: memoryDate ?? this.memoryDate,
      createdAt: createdAt ?? this.createdAt,
      updatedAt: updatedAt ?? DateTime.now(),
      category: category ?? this.category,
      isMilestone: isMilestone ?? this.isMilestone,
      mediaAttachments: mediaAttachments ?? this.mediaAttachments,
      location: location ?? this.location,
      tags: tags ?? this.tags,
      privacyLevel: privacyLevel ?? this.privacyLevel,
      taggedUserIds: taggedUserIds ?? this.taggedUserIds,
      isPinned: isPinned ?? this.isPinned,
      mood: mood ?? this.mood,
      likeCount: likeCount ?? this.likeCount,
      commentCount: commentCount ?? this.commentCount,
    );
  }

  /// Convert to a map for storage
  Map<String, dynamic> toMap() {
    return {
      'id': id,
      'userId': userId,
      'title': title,
      'content': content,
      'memoryDate': memoryDate.millisecondsSinceEpoch,
      'createdAt': createdAt.millisecondsSinceEpoch,
      'updatedAt': updatedAt.millisecondsSinceEpoch,
      'category': category.index,
      'isMilestone': isMilestone,
      'mediaAttachments': mediaAttachments.map((m) => m.toMap()).toList(),
      'location': location?.toMap(),
      'tags': tags,
      'privacyLevel': privacyLevel.index,
      'taggedUserIds': taggedUserIds,
      'isPinned': isPinned,
      'mood': mood,
      'likeCount': likeCount,
      'commentCount': commentCount,
    };
  }

  /// Create a memory post from a map
  factory MemoryPost.fromMap(Map<String, dynamic> map) {
    return MemoryPost(
      id: map['id'],
      userId: map['userId'],
      title: map['title'],
      content: map['content'],
      memoryDate: DateTime.fromMillisecondsSinceEpoch(map['memoryDate']),
      createdAt: DateTime.fromMillisecondsSinceEpoch(map['createdAt']),
      updatedAt: DateTime.fromMillisecondsSinceEpoch(map['updatedAt']),
      category: MemoryCategory.values[map['category']],
      isMilestone: map['isMilestone'],
      mediaAttachments:
          (map['mediaAttachments'] as List)
              .map((m) => MediaAttachment.fromMap(m))
              .toList(),
      location:
          map['location'] != null
              ? LocationData.fromMap(map['location'])
              : null,
      tags: List<String>.from(map['tags']),
      privacyLevel: PrivacyLevel.values[map['privacyLevel']],
      taggedUserIds: List<String>.from(map['taggedUserIds']),
      isPinned: map['isPinned'],
      mood: map['mood'],
      likeCount: map['likeCount'],
      commentCount: map['commentCount'],
    );
  }

  /// Serializes the post to JSON
  String toJson() => json.encode(toMap());

  /// Creates a post from JSON
  factory MemoryPost.fromJson(String source) =>
      MemoryPost.fromMap(json.decode(source));

  @override
  String toString() {
    return 'MemoryPost(id: $id, title: $title, date: $memoryDate, isMilestone: $isMilestone)';
  }

  /// Implement equality
  @override
  bool operator ==(Object other) {
    if (identical(this, other)) return true;

    return other is MemoryPost && other.id == id;
  }

  @override
  int get hashCode => id.hashCode;

  /// Get the color associated with a category
  static Color getCategoryColor(MemoryCategory category) {
    switch (category) {
      case MemoryCategory.personal:
        return Colors.purple;
      case MemoryCategory.career:
        return Colors.blue;
      case MemoryCategory.travel:
        return Colors.green;
      case MemoryCategory.health:
        return Colors.red;
      case MemoryCategory.education:
        return Colors.orange;
      case MemoryCategory.family:
        return Colors.pink;
      case MemoryCategory.friends:
        return Colors.teal;
      case MemoryCategory.hobby:
        return Colors.indigo;
      case MemoryCategory.other:
        return Colors.grey;
    }
  }

  /// Get the icon associated with a category
  static IconData getCategoryIcon(MemoryCategory category) {
    switch (category) {
      case MemoryCategory.personal:
        return Icons.person;
      case MemoryCategory.career:
        return Icons.work;
      case MemoryCategory.travel:
        return Icons.flight;
      case MemoryCategory.health:
        return Icons.favorite;
      case MemoryCategory.education:
        return Icons.school;
      case MemoryCategory.family:
        return Icons.family_restroom;
      case MemoryCategory.friends:
        return Icons.group;
      case MemoryCategory.hobby:
        return Icons.palette;
      case MemoryCategory.other:
        return Icons.category;
    }
  }

  /// Get a human-readable name for a category
  static String getCategoryName(MemoryCategory category) {
    return category.toString().split('.').last;
  }
}

/// An attachment (image, video, etc.) for a memory post
class MediaAttachment {
  /// Unique identifier for the attachment
  final String id;

  /// URL or path to the media file
  final String url;

  /// Type of media (image, video, etc.)
  final MediaType type;

  /// Optional caption for the media
  final String? caption;

  /// Thumbnail URL for videos
  final String? thumbnailUrl;

  /// Position in the list of attachments
  final int order;

  /// Width of the media in pixels
  final int? width;

  /// Height of the media in pixels
  final int? height;

  /// Creates a media attachment
  MediaAttachment({
    String? id,
    required this.url,
    required this.type,
    this.caption,
    this.thumbnailUrl,
    this.order = 0,
    this.width,
    this.height,
  }) : id = id ?? const Uuid().v4();

  /// Convert to a map for storage
  Map<String, dynamic> toMap() {
    return {
      'id': id,
      'url': url,
      'type': type.index,
      'caption': caption,
      'thumbnailUrl': thumbnailUrl,
      'order': order,
      'width': width,
      'height': height,
    };
  }

  /// Create a media attachment from a map
  factory MediaAttachment.fromMap(Map<String, dynamic> map) {
    return MediaAttachment(
      id: map['id'],
      url: map['url'],
      type: MediaType.values[map['type']],
      caption: map['caption'],
      thumbnailUrl: map['thumbnailUrl'],
      order: map['order'],
      width: map['width'],
      height: map['height'],
    );
  }

  /// Create a copy with some fields changed
  MediaAttachment copyWith({
    String? id,
    String? url,
    MediaType? type,
    String? caption,
    String? thumbnailUrl,
    int? order,
    int? width,
    int? height,
  }) {
    return MediaAttachment(
      id: id ?? this.id,
      url: url ?? this.url,
      type: type ?? this.type,
      caption: caption ?? this.caption,
      thumbnailUrl: thumbnailUrl ?? this.thumbnailUrl,
      order: order ?? this.order,
      width: width ?? this.width,
      height: height ?? this.height,
    );
  }
}

/// Location data for a memory post
class LocationData {
  /// Location name (e.g., "Eiffel Tower")
  final String name;

  /// Address details
  final String? address;

  /// Latitude coordinate
  final double? latitude;

  /// Longitude coordinate
  final double? longitude;

  /// Creates location data
  LocationData({
    required this.name,
    this.address,
    this.latitude,
    this.longitude,
  });

  /// Convert to a map for storage
  Map<String, dynamic> toMap() {
    return {
      'name': name,
      'address': address,
      'latitude': latitude,
      'longitude': longitude,
    };
  }

  /// Create location data from a map
  factory LocationData.fromMap(Map<String, dynamic> map) {
    return LocationData(
      name: map['name'],
      address: map['address'],
      latitude: map['latitude'],
      longitude: map['longitude'],
    );
  }

  /// Create a copy with some fields changed
  LocationData copyWith({
    String? name,
    String? address,
    double? latitude,
    double? longitude,
  }) {
    return LocationData(
      name: name ?? this.name,
      address: address ?? this.address,
      latitude: latitude ?? this.latitude,
      longitude: longitude ?? this.longitude,
    );
  }
}

/// Privacy level for a memory post
enum PrivacyLevel {
  /// Only visible to the post creator
  private,

  /// Visible to friends/followers
  friends,

  /// Visible to everyone
  public,

  /// Custom visibility to specific users
  custom,
}
