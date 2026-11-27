### Ressources identifiées
- Demandes d'analyses médicales
- Liste des patients et leur dossiers médicaux
- Liste des établissements de santé
- Liste des professionnels de santé
- Résultats d'analyses médicales
- Factures

### Rôles et leur hiérarchie
- **Patient** : 
    - Accède à ses propres résultats d'analyses médicales
    - Peut consulter ses factures  

- **Professionnel de santé** :
    - Accède aux dossiers médicaux des patients qu'il suit --> Hérite du rôle de patient
    - Peut demander des analyses médicales pour ses patients
    - Peut consulter les résultats d'analyses médicales de ses patients --> Hérite du rôle de patient

- **Laboratoire d'analyses médicales** :
    - Accède aux demandes d'analyses médicales
    - Accèdes aux résultats d'analyses de tous les patients adressés --> Hérite du patient
    - Peut enregistrer ou modifier les résultats d'analyses médicales
    - Accède aux factures des analyses médicales qu'il a réalisées --> Hérite en partie du rôle de patient

- **Administrateur technique** :
    - Création et gestion des comptes utilisateurs (patients, professionnels de santé, laboratoires)
    - Il n'accède pas aux données médicales des patients, mais peut gérer les accès et les permissions des autres utilisateurs.


- **Super administrateur** :
    - Accède à toutes les ressources et fonctionnalités du système
    - Peut gérer les comptes utilisateurs, les rôles et les permissions
    - Peut consulter et modifier toutes les données médicales des patients
