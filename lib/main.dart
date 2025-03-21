import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:unfold/core/app_config.dart';
import 'package:unfold/core/constants.dart';
import 'package:unfold/core/routes.dart';
import 'package:unfold/core/theme.dart';

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

  // Initialize app configuration
  await AppConfig.instance.initialize();

  runApp(const ProviderScope(child: UnfoldApp()));
}

class UnfoldApp extends ConsumerWidget {
  const UnfoldApp({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    // Get the router from the provider
    final router = ref.watch(routerProvider);

    return MaterialApp.router(
      title: AppConstants.appName,
      debugShowCheckedModeBanner: false,
      theme: AppTheme.lightTheme,
      darkTheme: AppTheme.darkTheme,
      themeMode: ThemeMode.system, // Will be controlled by a provider later
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
