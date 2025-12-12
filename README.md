# Project Task Manager - Full Stack Application

## 📋 Description
Application full-stack de gestion de projets et tâches développée avec Spring Boot et React.

## 🛠️ Technologies Utilisées

### Backend
- **Java 17**
- **Spring Boot 3.2.0**
- **Spring Data JPA**
- **PostgreSQL** (Base de données)
- **Maven** (Gestionnaire de dépendances)
- **Lombok** (Réduction du code boilerplate)

### Frontend
- **React 18.2**
- **React Router DOM** (Navigation)
- **Axios** (Requêtes HTTP)
- **Tailwind CSS** (Styling)
- **React Icons** (Icônes)
- **React Toastify** (Notifications)

## 📁 Structure du Projet

```
project-task-manager/
├── backend/
│   └── src/main/java/com/company/project/
│       ├── config/
│       │   └── CorsConfig.java
│       ├── controllers/
│       │   ├── ProjectController.java
│       │   └── TaskController.java
│       ├── dto/
│       │   ├── ProjectRequest.java
│       │   ├── ProjectResponse.java
│       │   ├── TaskRequest.java
│       │   └── TaskResponse.java
│       ├── entities/
│       │   ├── Project.java
│       │   └── Task.java
│       ├── exceptions/
│       │   ├── ResourceNotFoundException.java
│       │   ├── GlobalExceptionHandler.java
│       │   └── ErrorResponse.java
│       ├── repositories/
│       │   ├── ProjectRepository.java
│       │   └── TaskRepository.java
│       ├── services/
│       │   ├── ProjectService.java
│       │   └── TaskService.java
│       └── ProjectApplication.java
└── frontend/
    └── src/
        ├── components/
        │   ├── ProjectList.jsx
        │   └── ProjectDetail.jsx
        ├── services/
        │   └── api.js
        ├── App.js
        ├── index.js
        └── index.css
```

## 🚀 Installation et Démarrage

### Prérequis
- Java 17 ou supérieur
- Maven 3.6+
- Node.js 16+ et npm
- PostgreSQL 13+

### 1. Configuration de la Base de Données

```sql
-- Se connecter à PostgreSQL
psql -U postgres

-- Créer la base de données
CREATE DATABASE projectdb;

-- Créer un utilisateur (optionnel)
CREATE USER projectuser WITH PASSWORD 'password123';
GRANT ALL PRIVILEGES ON DATABASE projectdb TO projectuser;
```

### 2. Backend (Spring Boot)

```bash
# Naviguer vers le dossier backend
cd backend

# Modifier application.properties si nécessaire
# src/main/resources/application.properties
# Adapter les informations de connexion PostgreSQL

# Compiler et lancer l'application
mvn clean install
mvn spring-boot:run

# Le backend démarre sur http://localhost:8085
```

**Configuration PostgreSQL dans application.properties :**
```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/projectdb
spring.datasource.username=postgres
spring.datasource.password=admin
```

### 3. Frontend (React)

```bash
# Naviguer vers le dossier frontend
cd frontend

# Installer les dépendances
npm install

# Initialiser Tailwind CSS
npx tailwindcss init

# Lancer l'application
npm start

# Le frontend démarre sur http://localhost:3000
```

## 📊 API Endpoints

### Projects

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| GET | `/api/projects` | Liste tous les projets |
| GET | `/api/projects/{id}` | Détails d'un projet |
| POST | `/api/projects` | Créer un projet |
| PUT | `/api/projects/{id}` | Modifier un projet |
| DELETE | `/api/projects/{id}` | Supprimer un projet |
| GET | `/api/projects/{id}/progress` | Progression du projet |

### Tasks

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| GET | `/api/tasks/project/{projectId}` | Tâches d'un projet |
| GET | `/api/tasks/{id}` | Détails d'une tâche |
| POST | `/api/tasks` | Créer une tâche |
| PUT | `/api/tasks/{id}` | Modifier une tâche |
| PATCH | `/api/tasks/{id}/toggle` | Basculer le statut |
| DELETE | `/api/tasks/{id}` | Supprimer une tâche |

## 📝 Exemples de Requêtes

### Créer un Projet
```json
POST /api/projects
{
  "title": "Mon Nouveau Projet",
  "description": "Description du projet"
}
```

### Créer une Tâche
```json
POST /api/tasks
{
  "title": "Implémenter la fonctionnalité X",
  "description": "Description détaillée",
  "dueDate": "2025-12-31",
  "projectId": 1
}
```

## ✨ Fonctionnalités

- ✅ Créer, lire, modifier et supprimer des projets
- ✅ Créer, lire, modifier et supprimer des tâches
- ✅ Marquer les tâches comme complétées
- ✅ Barre de progression par projet
- ✅ Calcul automatique du pourcentage de progression
- ✅ Interface utilisateur responsive
- ✅ Notifications toast
- ✅ Gestion des erreurs
- ✅ Validation des données

## 🎯 Fonctionnalités Techniques

### Backend
- Architecture en couches (Controller, Service, Repository)
- Validation des entrées avec Bean Validation
- Gestion globale des exceptions
- Relations JPA (OneToMany, ManyToOne)
- Timestamps automatiques
- Configuration CORS

### Frontend
- Composants React fonctionnels avec Hooks
- Routing avec React Router
- Gestion d'état local avec useState
- Appels API avec Axios
- Design responsive avec Tailwind CSS
- Modales pour les formulaires

## 🐛 Dépannage

### Erreur de connexion à la base de données
```
Vérifier que PostgreSQL est lancé
Vérifier les identifiants dans application.properties
Vérifier que la base de données existe
```

### CORS Error
```
Vérifier que CorsConfig.java est présent
Vérifier l'URL autorisée (http://localhost:3000)
```

### Port déjà utilisé
```bash
# Backend (port 8085)
lsof -ti:8085 | xargs kill -9

# Frontend (port 3000)
lsof -ti:3000 | xargs kill -9
```

## 📦 Construction pour Production

### Backend
```bash
mvn clean package
java -jar target/project-task-manager-1.0.0.jar
```

### Frontend
```bash
npm run build
# Les fichiers statiques sont dans le dossier build/
```

## 👨‍💻 Développeur
Projet créé pour le stage de fin d'études - Hahn Software Morocco 2026
