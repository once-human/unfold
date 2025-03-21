unfold/
├── lib/                        # Main source code
│   ├── core/                   # Core functionalities & configurations
│   │   ├── constants.dart       # Global constants (colors, padding, etc.)
│   │   ├── theme.dart           # Material You + iOS-inspired custom theme
│   │   ├── routes.dart          # Named route management
│   │   ├── app_config.dart      # App-level configurations
│   ├── models/                  # Data models
│   │   ├── user_model.dart       # User data structure
│   │   ├── post_model.dart       # Memory post structure
│   │   ├── comment_model.dart    # Comment structure
│   │   ├── notification_model.dart # Notifications data model
│   ├── services/                 # Business logic & backend interaction
│   │   ├── auth_service.dart      # Firebase/Auth provider logic
│   │   ├── post_service.dart      # CRUD operations for posts
│   │   ├── user_service.dart      # User profile & settings logic
│   │   ├── notification_service.dart # Push notification handling
│   │   ├── analytics_service.dart # Event tracking (future)
│   ├── layout/                   # Global UI layout (navigation bars)
│   │   ├── bottom_nav_bar.dart     # Persistent bottom navigation bar
│   │   ├── top_app_bar.dart        # Persistent top app bar
│   │   ├── app_scaffold.dart       # Main scaffold to manage pages
│   ├── screens/                   # UI screens
│   │   ├── auth/                   # Authentication-related screens
│   │   │   ├── login_screen.dart    
│   │   │   ├── signup_screen.dart   
│   │   │   ├── onboarding_screen.dart 
│   │   ├── home/                   # Home & timeline screens
│   │   │   ├── home_screen.dart      
│   │   │   ├── post_details_screen.dart 
│   │   ├── post/                   # Post creation & management
│   │   │   ├── create_memory_screen.dart 
│   │   │   ├── edit_memory_screen.dart   
│   │   ├── explore/                # Explore & search
│   │   │   ├── explore_screen.dart    
│   │   │   ├── search_screen.dart     
│   │   ├── profile/                 # Profile-related screens
│   │   │   ├── my_profile_screen.dart  
│   │   │   ├── edit_profile_screen.dart
│   │   │   ├── user_profile_screen.dart
│   │   ├── notifications/           # Notifications
│   │   │   ├── notification_screen.dart 
│   ├── widgets/                     # Reusable UI components
│   │   ├── custom_button.dart        # Reusable button widgets
│   │   ├── post_card.dart            # Memory post card UI
│   │   ├── user_avatar.dart          # Profile picture widget
│   │   ├── comment_tile.dart         # Comment UI element
│   ├── utils/                        # Helper functions
│   │   ├── validators.dart           # Form validation logic
│   │   ├── date_formatter.dart       # Date & time formatting
│   │   ├── storage_helper.dart       # Media storage handling
│   ├── main.dart                     # Entry point of the app
├── assets/                           # Static assets
│   ├── images/                       # App images
│   ├── icons/                        # App icons
├── android/                          # Android-specific configurations
├── ios/                              # iOS-specific configurations (future)
├── pubspec.yaml                      # Flutter dependencies
