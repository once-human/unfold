import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:unfold/core/app_config.dart';
import 'package:unfold/core/constants.dart';
import 'package:unfold/core/routes.dart';
import 'package:unfold/core/theme.dart';
import 'package:unfold/services/timeline_provider.dart';
import 'package:unfold/utils/animation_utils.dart';
import 'package:unfold/utils/performance_benchmark.dart';
import 'package:unfold/utils/performance_utils.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();

  // Set preferred device orientation for optimal performance
  await SystemChrome.setPreferredOrientations([
    DeviceOrientation.portraitUp,
    DeviceOrientation.portraitDown,
  ]);

  // Set system UI overlay style for better integration with our theme
  SystemChrome.setSystemUIOverlayStyle(
    const SystemUiOverlayStyle(
      statusBarColor: Colors.transparent,
      statusBarIconBrightness: Brightness.dark,
      statusBarBrightness: Brightness.light,
    ),
  );

  // Start tracking app launch time
  PerformanceBenchmark.startTrackingOperation('AppLaunch');

  // Initialize app configuration
  await AppConfig.instance.initialize();

  // Initialize performance optimizations
  await PerformanceUtils.initialize();

  // Initialize theme system
  AppTheme.initialize();

  // Setup animation optimizations
  AnimationUtils.optimizeAnimations();

  // Create ProviderContainer for pre-initialization
  final container = ProviderContainer();

  // Initialize timeline providers
  await initializeTimelineProviders(container);

  // Set performance goals
  PerformanceBenchmark.setPerformanceGoals(
    targetFps: 120,
    maxFrameTimeMs: 8, // For 120fps (1000ms / 120 frames = ~8ms per frame)
    targetStartupMs: 1500,
  );

  // Start performance monitoring in debug mode
  PerformanceBenchmark.startMonitoring();

  // Record app launch complete
  final launchDuration = PerformanceBenchmark.stopTrackingOperation(
    'AppLaunch',
  );
  if (launchDuration != null) {
    debugPrint('📱 App launch completed in ${launchDuration.inMilliseconds}ms');
  }

  runApp(ProviderScope(parent: container, child: const UnfoldApp()));
}

// Theme provider to control theme mode
final themeModeProvider = StateProvider<ThemeMode>((ref) {
  return ThemeMode.system; // Default to system theme
});

class UnfoldApp extends ConsumerWidget {
  const UnfoldApp({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    // Get the router from the provider
    final router = ref.watch(routerProvider);
    // Get the current theme mode from the provider
    final themeMode = ref.watch(themeModeProvider);

    return MaterialApp.router(
      title: AppConstants.appName,
      debugShowCheckedModeBanner: false,
      theme: AppTheme.lightTheme,
      darkTheme: AppTheme.darkTheme,
      themeMode: themeMode,
      routerConfig: router,
    );
  }
}

class PlaceholderScreen extends StatelessWidget {
  const PlaceholderScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            const Text(
              'Unfold',
              style: TextStyle(fontSize: 32, fontWeight: FontWeight.bold),
            ),
            const SizedBox(height: 16),
            const Text(
              'Your chronological life story',
              style: TextStyle(fontSize: 16),
            ),
            const SizedBox(height: 32),
            CircularProgressIndicator(
              valueColor: AlwaysStoppedAnimation<Color>(
                Theme.of(context).colorScheme.primary,
              ),
            ),
          ],
        ),
      ),
    );
  }
}
