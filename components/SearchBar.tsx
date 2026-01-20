// components/SearchBar.tsx
import React from "react";
import { View, TextInput, Pressable, StyleSheet, Platform } from "react-native";
import { Search, X } from "lucide-react-native";
import { colors, fonts, fontSize, spacing } from "@/themes/themes";

type SearchBarProps = {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
};

const styles = StyleSheet.create({
  searchContainer: {
    paddingHorizontal: spacing.medium,
    paddingVertical: spacing.small,
    backgroundColor: colors.background,
  },
  searchBar: {
    backgroundColor: '#1e1e1e',
    borderRadius: 8,
    paddingHorizontal: spacing.medium,
    paddingVertical: Platform.OS === 'ios' ? spacing.small : spacing.extrasmall,
    fontSize: fontSize.medium,
    fontFamily: fonts.regular,
    color: 'white',
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchInput: {
    flex: 1,
    color: 'white',
    fontSize: fontSize.medium,
    fontFamily: fonts.regular,
    marginLeft: spacing.small,
  },
  clearButton: {
    padding: spacing.extrasmall,
  },
});

export default function SearchBar({ searchQuery, setSearchQuery }: SearchBarProps) {
  return (
    <View style={styles.searchContainer}>
      <View style={styles.searchBar}>
        <Search size={20} color="#888" />
        <TextInput
          style={styles.searchInput}
          placeholder="Rechercher un jeu..."
          placeholderTextColor="#888"
          value={searchQuery}
          onChangeText={setSearchQuery}
          returnKeyType="search"
          clearButtonMode="while-editing"
        />
        {searchQuery.length > 0 && (
          <Pressable
            style={styles.clearButton}
            onPress={() => setSearchQuery('')}
          >
            <X size={20} color="#888" />
          </Pressable>
        )}
      </View>
    </View>
  );
}
