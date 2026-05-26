/**
 * iMediaSave — Root Application Component
 *
 * @format
 */

import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {colors, spacing, typography} from './src/theme';

function App(): React.JSX.Element {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={colors.primary}
      />
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View style={styles.header}>
          <Text style={styles.headerTitle}>iMediaSave</Text>
          <Text style={styles.headerSubtitle}>Your Media. Saved. Anywhere.</Text>
        </View>
        <View style={styles.body}>
          <Text style={styles.sectionTitle}>Welcome</Text>
          <Text style={styles.sectionBody}>
            iMediaSave is loading… Configure your environment and start building.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.xl,
    alignItems: 'center',
  },
  headerTitle: {
    ...typography.h1,
    color: colors.white,
  },
  headerSubtitle: {
    ...typography.body,
    color: colors.primaryLight,
    marginTop: spacing.xs,
  },
  body: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  sectionTitle: {
    ...typography.h2,
    color: colors.textPrimary,
    marginBottom: spacing.sm,
  },
  sectionBody: {
    ...typography.body,
    color: colors.textSecondary,
  },
});

export default App;
