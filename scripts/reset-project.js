#!/usr/bin/env node

/**
 * Ce script est utilisé pour remettre le projet à un état vierge.
 * Il supprime ou déplace les répertoires /app, /components, /hooks, /scripts et /constants vers /app-example selon l'entrée utilisateur et crée un nouveau répertoire /app avec un fichier index.tsx et _layout.tsx.
 * Vous pouvez supprimer le script `reset-project` de package.json et supprimer ce fichier en toute sécurité après l'avoir exécuté.
 */

const fs = require("fs");
const path = require("path");
const readline = require("readline");

// Répertoire racine du projet
const root = process.cwd();
// Anciens répertoires à déplacer ou supprimer
const oldDirs = ["app", "components", "hooks", "constants", "scripts"];
// Répertoire d'exemple
const exampleDir = "app-example";
// Nouveau répertoire app
const newAppDir = "app";
// Chemin du répertoire d'exemple
const exampleDirPath = path.join(root, exampleDir);

// Contenu du fichier index.tsx
const indexContent = `import { Text, View } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Edit app/index.tsx to edit this screen.</Text>
    </View>
  );
}
`;

// Contenu du fichier _layout.tsx
const layoutContent = `import { Stack } from "expo-router";

export default function RootLayout() {
  return <Stack />;
}
`;

// Interface readline pour l'entrée utilisateur
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Fonction pour déplacer ou supprimer les répertoires
const moveDirectories = async (userInput) => {
  try {
    // Créer le répertoire app-example si l'utilisateur choisit de déplacer
    if (userInput === "y") {
      // Créer le répertoire app-example
      await fs.promises.mkdir(exampleDirPath, { recursive: true });
      console.log(`📁 /${exampleDir} directory created.`);
    }

    // Déplacer les anciens répertoires vers le nouveau répertoire app-example ou les supprimer
    for (const dir of oldDirs) {
      const oldDirPath = path.join(root, dir);
      if (fs.existsSync(oldDirPath)) {
        if (userInput === "y") {
          const newDirPath = path.join(root, exampleDir, dir);
          await fs.promises.rename(oldDirPath, newDirPath);
          console.log(`➡️ /${dir} moved to /${exampleDir}/${dir}.`);
        } else {
          await fs.promises.rm(oldDirPath, { recursive: true, force: true });
          console.log(`❌ /${dir} deleted.`);
        }
      } else {
        console.log(`➡️ /${dir} does not exist, skipping.`);
      }
    }

    // Créer le nouveau répertoire /app
    const newAppDirPath = path.join(root, newAppDir);
    await fs.promises.mkdir(newAppDirPath, { recursive: true });
    console.log("\n📁 New /app directory created.");

    // Créer index.tsx
    const indexPath = path.join(newAppDirPath, "index.tsx");
    await fs.promises.writeFile(indexPath, indexContent);
    console.log("📄 app/index.tsx created.");

    // Créer _layout.tsx
    const layoutPath = path.join(newAppDirPath, "_layout.tsx");
    await fs.promises.writeFile(layoutPath, layoutContent);
    console.log("📄 app/_layout.tsx created.");

    console.log("\n✅ Project reset complete. Next steps:");
    console.log(
      `1. Run \`npx expo start\` to start a development server.\n2. Edit app/index.tsx to edit the main screen.${
        userInput === "y"
          ? `\n3. Delete the /${exampleDir} directory when you're done referencing it.`
          : ""
      }`
    );
  } catch (error) {
    console.error(`❌ Error during script execution: ${error.message}`);
  }
};

// Poser une question à l'utilisateur
rl.question(
  "Do you want to move existing files to /app-example instead of deleting them? (Y/n): ",
  (answer) => {
    const userInput = answer.trim().toLowerCase() || "y";
    if (userInput === "y" || userInput === "n") {
      moveDirectories(userInput).finally(() => rl.close());
    } else {
      console.log("❌ Invalid input. Please enter 'Y' or 'N'.");
      rl.close();
    }
  }
);
