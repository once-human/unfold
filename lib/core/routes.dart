import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'constants.dart';

/// Router configuration provider
final routerProvider = Provider<GoRouter>((ref) {
  // Placeholder for future auth state listener
  // We'll replace this with proper authentication state management
  final isLoggedIn = false;

  return GoRouter(
    initialLocation: AppRoutes.splash,
    debugLogDiagnostics: true, // Disable in production
    routes: [
      // Main app routes will go here as we implement them
      GoRoute(
        path: AppRoutes.splash,
        builder: (context, state) => _getPlaceholderScreen('Splash Screen'),
      ),
      // Placeholder route structure to be filled in as we implement screens
      GoRoute(
        path: AppRoutes.home,
        builder: (context, state) => _getPlaceholderScreen('Home Screen'),
        routes: [
          GoRoute(
            path: 'post/:id',
            builder:
                (context, state) => _getPlaceholderScreen(
                  'Post Details - ID: ${state.pathParameters['id']}',
                ),
          ),
        ],
      ),
      GoRoute(
        path: AppRoutes.explore,
        builder: (context, state) => _getPlaceholderScreen('Explore Screen'),
      ),
      GoRoute(
        path: AppRoutes.profile,
        builder: (context, state) => _getPlaceholderScreen('Profile Screen'),
      ),
    ],
    // Redirect based on authentication state
    redirect: (context, state) {
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

/// Temporary placeholder screen until we build actual screens
Widget _getPlaceholderScreen(String screenName) {
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
