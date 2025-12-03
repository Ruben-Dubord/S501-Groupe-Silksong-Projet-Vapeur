import Card from '@/components/Card';
import { useState } from 'react';
import { StyleSheet, ScrollView, View, Text, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, fontSize, spacing } from '@/themes/themes';

export default function Settings() {

    const [isThemeEnabled, setTheme] = useState(false);
    const themeToggle = () => setTheme(previousState => !previousState);
    const [isVibrateEnabled, setVibrate] = useState(false);
    const vibrationsToggle = () => setVibrate(previousState => !previousState);

    return (
      <ScrollView style={styles.background}>
        <SafeAreaView style={styles.page}>
          <Text style={styles.title}>Vos préférences</Text>
          <Card>
            <View style={styles.container}>
              <Text style={styles.Text}>Thème</Text>
              <View style={styles.toggle}>
                <Text style={styles.Text}>Lumineux</Text>
                <Switch onValueChange={themeToggle} value={isThemeEnabled} />
                <Text style={styles.Text}>Sombre</Text>
              </View>
            </View>
          </Card>
          <Card>
            <View style={styles.container}>
              <Text style={styles.Text}>Vibrations</Text>
              <View style={styles.toggle}>
                <Text style={styles.Text}>Non</Text>
                <Switch
                  onValueChange={vibrationsToggle}
                  value={isVibrateEnabled}
                />
                <Text style={styles.Text}>Oui</Text>
              </View>
            </View>
          </Card>
          <Card>
            <View style={styles.container}>
              <Text style={styles.Text}>Paramètres de notifications</Text>
            </View>
          </Card>
          <Card>
            <View style={styles.container}>
              <Text style={{ color: colors.accent }}>
                Supprimer tous les favoris
              </Text>
            </View>
          </Card>
          <Card>
            <View style={styles.container}>
              <Text style={styles.Text}>
                Consulter les conditions d'utilisations
              </Text>
            </View>
          </Card>
          <View>
            <Text style={styles.bottomText}>
              Version de l'application : 1.0.0
            </Text>
            <Text style={styles.bottomText}>
              Copyright Team Silksong™ 2025. Tous droits réservés. Larry le
              malicieux.
            </Text>
          </View>
        </SafeAreaView>
      </ScrollView>
    );
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: colors.background,
  },
  page: {
    margin: spacing.large,
    gap: spacing.extralarge,
  },
  title: {
    color: colors.textPrimary,
    fontSize: fontSize.extralarge,
    fontWeight: "600",
    marginBottom: spacing.large,
    marginTop: spacing.large,
    textAlign: "center",
  },
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 40,
  },
  toggle: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.medium,
  },
  bottomText: {
    fontSize: fontSize.extrasmall,
    color: colors.textSecondary,
  },
  Text: {
    color: colors.textPrimary,
  },
});
