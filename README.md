## Project Structure

```
threejs-deformable-model
├── src
│   ├── main.js               # Entry point of the application
│   ├── model
│   │   └── deformableModel.js # Handles loading and deforming the 3D model
│   ├── ui
│   │   └── controls.js       # Manages user interface for model interaction
│   └── styles
│       └── style.css         # Styles for the user interface
├── index.html                # Main HTML document
├── package.json              # npm configuration file
└── README.md                 # Project documentation
```

## Comment utiliser le code
   ```
   cd threejs-deformable-model
   ```

# Dépendances
   ```
   npm install
   ```

# Lancement du serveur
   ```
   npx http-server
   ```

   # ou

   ```
   npm start
   ```

# Lien du navigateur
   `http://localhost:8080` 

## Features demandées

- **Interface** -> Notre interface servira au fonctions clés comme des resets, prefabriqués ou encore tool stash
- **Déformation du modèle** -> Viser une déformation par la séléction d'un point puis sa translation vers sur un axe


