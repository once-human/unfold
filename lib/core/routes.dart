import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:unfold/layout/app_scaffold.dart';
import 'package:unfold/screens/ui_showcase.dart';
import 'constants.dart';

/// Router configuration provider
final routerProvider = Provider<GoRouter>((ref) {
  // Placeholder for future auth state listener
  // We'll replace this with proper authentication state management
  final isLoggedIn = false;

  return GoRouter(
    initialLocation:
        AppRoutes.uiShowcase, // Start with showcase for development
    debugLogDiagnostics: true, // Disable in production
    routes: [
      // UI Showcase for development
      GoRoute(
        path: AppRoutes.uiShowcase,
        builder:
            (context, state) => AppScaffold(
              currentPath: AppRoutes.uiShowcase,
              child: const UIShowcaseScreen(),
            ),
      ),
      // Main app routes will go here as we implement them
      GoRoute(
        path: AppRoutes.splash,
        builder:
            (context, state) =>
                _getPlaceholderScreen('Splash Screen', AppRoutes.splash),
      ),
      // Home route with nested routes
      GoRoute(
        path: AppRoutes.home,
        builder:
            (context, state) => AppScaffold(
              currentPath: AppRoutes.home,
              child: _getPlaceholderContent('Home Screen'),
            ),
        routes: [
          GoRoute(
            path: 'post/:id',
            builder:
                (context, state) => AppScaffold(
                  currentPath: AppRoutes.home,
                  child: _getPlaceholderContent(
                    'Post Details - ID: ${state.pathParameters['id']}',
                  ),
                ),
          ),
        ],
      ),
      // Explore route
      GoRoute(
        path: AppRoutes.explore,
        builder:
            (context, state) => AppScaffold(
              currentPath: AppRoutes.explore,
              child: _getPlaceholderContent('Explore Screen'),
            ),
      ),
      // Create post route
      GoRoute(
        path: AppRoutes.postCreate,
        builder:
            (context, state) => AppScaffold(
              currentPath: AppRoutes.postCreate,
              child: _getPlaceholderContent('Create Memory'),
            ),
      ),
      // Profile route
      GoRoute(
        path: AppRoutes.profile,
        builder:
            (context, state) => AppScaffold(
              currentPath: AppRoutes.profile,
              child: _getPlaceholderContent('Profile Screen'),
            ),
      ),
      // Auth routes without the app scaffold
      GoRoute(
        path: AppRoutes.login,
        builder:
            (context, state) =>
                _getPlaceholderScreen('Login Screen', AppRoutes.login),
      ),
      GoRoute(
        path: AppRoutes.signup,
        builder:
            (context, state) =>
                _getPlaceholderScreen('Signup Screen', AppRoutes.signup),
      ),
      GoRoute(
        path: AppRoutes.onboarding,
        builder:
            (context, state) => _getPlaceholderScreen(
              'Onboarding Screen',
              AppRoutes.onboarding,
            ),
      ),
    ],
    // Redirect based on authentication state
    redirect: (context, state) {
      // Skip auth check for UI showcase during development
      if (state.matchedLocation == AppRoutes.uiShowcase) {
        return null;
      }

      // Auth paths that don't require redirection
      final isAuthPath =
          state.matchedLocation == AppRoutes.login ||
          state.matchedLocation == AppRoutes.signup ||
          state.matchedLocation == AppRoutes.onboarding ||
          state.matchedLocation == AppRoutes.splash;

      // Redirect logic to be implemented
      if (!isLoggedIn && !isAuthPath) {
        return AppRoutes.login;
      }

      // If already logged in and trying to access auth pages, redirect to home
      if (isLoggedIn &&
          isAuthPath &&
          state.matchedLocation != AppRoutes.splash) {
        return AppRoutes.home;
      }

      // No redirection needed
      return null;
    },
  );
});

/// Temporary placeholder screen without the app scaffold (for auth screens)
Widget _getPlaceholderScreen(String screenName, String path) {
  return Scaffold(
    appBar: AppBar(title: Text(screenName)),
    body: Center(
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Text(screenName, style: const TextStyle(fontSize: 24)),
          const SizedBox(height: 20),
          const CircularProgressIndicator(),
          const SizedBox(height: 20),
          const Text('Coming soon!'),
        ],
      ),
    ),
  );
}

/// Temporary placeholder content (for use within app scaffold)
Widget _getPlaceholderContent(String screenName) {
  return Center(
    child: Column(
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        Text(screenName, style: const TextStyle(fontSize: 24)),
        const SizedBox(height: 20),
        const CircularProgressIndicator(),
        const SizedBox(height: 20),
        const Text('Coming soon!'),
      ],
    ),
  );
}
