import 'package:flutter/material.dart';
import 'package:unfold/core/constants.dart';
import 'package:unfold/widgets/depth_card.dart';
import 'package:unfold/widgets/glass_container.dart';
import 'package:unfold/widgets/ios_button.dart';

/// A showcase screen for our UI components
class UIShowcaseScreen extends StatelessWidget {
  const UIShowcaseScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final isDark = theme.brightness == Brightness.dark;

    return Scaffold(
      appBar: AppBar(
        title: const Text('UI Components'),
        centerTitle: true,
        elevation: 0,
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(AppConstants.spacingM),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            _buildSectionTitle(context, 'Glassmorphism'),
            const SizedBox(height: AppConstants.spacingM),
            _buildGlassmorphismShowcase(context),

            const SizedBox(height: AppConstants.spacing2XL),
            _buildSectionTitle(context, 'Depth Cards'),
            const SizedBox(height: AppConstants.spacingM),
            _buildDepthCardsShowcase(context),

            const SizedBox(height: AppConstants.spacing2XL),
            _buildSectionTitle(context, 'iOS Buttons'),
            const SizedBox(height: AppConstants.spacingM),
            _buildIOSButtonsShowcase(context),

            const SizedBox(height: AppConstants.spacing2XL),
            _buildSectionTitle(context, 'Material You Colors'),
            const SizedBox(height: AppConstants.spacingM),
            _buildMaterialYouShowcase(context),

            const SizedBox(height: 100), // Bottom padding
          ],
        ),
      ),
    );
  }

  Widget _buildSectionTitle(BuildContext context, String title) {
    return Text(
      title,
      style: Theme.of(
        context,
      ).textTheme.headlineSmall?.copyWith(fontWeight: FontWeight.bold),
    );
  }

  Widget _buildGlassmorphismShowcase(BuildContext context) {
    return SizedBox(
      height: 200,
      child: Stack(
        children: [
          // Background image or gradient
          Container(
            decoration: BoxDecoration(
              gradient: LinearGradient(
                colors: [
                  Theme.of(context).colorScheme.primary,
                  Theme.of(context).colorScheme.tertiary,
                ],
                begin: Alignment.topLeft,
                end: Alignment.bottomRight,
              ),
              borderRadius: BorderRadius.circular(AppConstants.radiusL),
            ),
          ),

          // Circle decorations
          Positioned(
            top: -30,
            left: -30,
            child: Container(
              width: 100,
              height: 100,
              decoration: BoxDecoration(
                shape: BoxShape.circle,
                color: Theme.of(context).colorScheme.secondary.withOpacity(0.5),
              ),
            ),
          ),

          Positioned(
            bottom: -20,
            right: -20,
            child: Container(
              width: 80,
              height: 80,
              decoration: BoxDecoration(
                shape: BoxShape.circle,
                color: Theme.of(context).colorScheme.primary.withOpacity(0.5),
              ),
            ),
          ),

          // Glass containers
          Positioned(
            top: 20,
            left: 20,
            child: GlassContainer.light(
              width: 150,
              height: 80,
              child: const Center(
                child: Text(
                  'Light Glass',
                  style: TextStyle(fontWeight: FontWeight.bold),
                ),
              ),
            ),
          ),

          Positioned(
            bottom: 20,
            right: 20,
            child: GlassContainer.dark(
              width: 150,
              height: 80,
              child: const Center(
                child: Text(
                  'Dark Glass',
                  style: TextStyle(
                    fontWeight: FontWeight.bold,
                    color: Colors.white,
                  ),
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildDepthCardsShowcase(BuildContext context) {
    return Wrap(
      spacing: AppConstants.spacingM,
      runSpacing: AppConstants.spacingM,
      children: [
        for (int depth = 0; depth <= 5; depth++)
          DepthCard(
            width: 100,
            height: 100,
            depth: depth,
            onTap: () {},
            animateOnTap: true,
            child: Center(
              child: Text(
                'Depth $depth',
                style: Theme.of(context).textTheme.bodyLarge,
              ),
            ),
          ),
      ],
    );
  }

  Widget _buildIOSButtonsShowcase(BuildContext context) {
    return Wrap(
      spacing: AppConstants.spacingM,
      runSpacing: AppConstants.spacingM,
      children: [
        IOSButton.primary(label: 'Primary', icon: Icons.star, onPressed: () {}),

        IOSButton.secondary(
          label: 'Secondary',
          icon: Icons.favorite,
          onPressed: () {},
        ),

        IOSButton.destructive(
          label: 'Destructive',
          icon: Icons.delete,
          onPressed: () {},
        ),

        IOSButton.small(label: 'Small', icon: Icons.add, onPressed: () {}),

        IOSButton(
          label: 'Disabled',
          icon: Icons.block,
          isDisabled: true,
          onPressed: () {},
        ),
      ],
    );
  }

  Widget _buildMaterialYouShowcase(BuildContext context) {
    final colorScheme = Theme.of(context).colorScheme;

    final colors = [
      ColorSwatch('Primary', colorScheme.primary, colorScheme.onPrimary),
      ColorSwatch(
        'Primary Container',
        colorScheme.primaryContainer,
        colorScheme.onPrimaryContainer,
      ),
      ColorSwatch('Secondary', colorScheme.secondary, colorScheme.onSecondary),
      ColorSwatch(
        'Secondary Container',
        colorScheme.secondaryContainer,
        colorScheme.onSecondaryContainer,
      ),
      ColorSwatch('Tertiary', colorScheme.tertiary, colorScheme.onTertiary),
      ColorSwatch(
        'Tertiary Container',
        colorScheme.tertiaryContainer,
        colorScheme.onTertiaryContainer,
      ),
      ColorSwatch('Surface', colorScheme.surface, colorScheme.onSurface),
      ColorSwatch(
        'Surface Variant',
        colorScheme.surfaceVariant,
        colorScheme.onSurfaceVariant,
      ),
    ];

    return Wrap(
      spacing: AppConstants.spacingS,
      runSpacing: AppConstants.spacingS,
      children: colors.map((swatch) => _buildColorSwatch(swatch)).toList(),
    );
  }

  Widget _buildColorSwatch(ColorSwatch swatch) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Container(
          width: 100,
          height: 100,
          decoration: BoxDecoration(
            color: swatch.color,
            borderRadius: BorderRadius.circular(AppConstants.radiusM),
          ),
          child: Center(
            child: Text(
              swatch.name.split(' ').first,
              style: TextStyle(
                color: swatch.textColor,
                fontWeight: FontWeight.bold,
              ),
            ),
          ),
        ),
        const SizedBox(height: AppConstants.spacingXS),
        Text(
          swatch.name,
          style: const TextStyle(fontSize: 12),
          overflow: TextOverflow.ellipsis,
        ),
      ],
    );
  }
}

/// Helper class for color swatches
class ColorSwatch {
  final String name;
  final Color color;
  final Color textColor;

  ColorSwatch(this.name, this.color, this.textColor);
}
