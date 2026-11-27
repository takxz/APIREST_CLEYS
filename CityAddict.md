# Ressources et relation

Ressources de l'application : 
- User
- Places
- Review
- List
- Favorite

Relation entre les ressources :
- User à de 0 à n List
- 1 Place peut avoir de 0 à n review
- 1 User peut avoir 0 à n review
- N Places dans N List

# Définir les points d'entrée, leurs méthodes et leurs paramètres

| Méthode | Point d'entrée | Paramètres | Description |
| :--- | :---: | :---: | ---:
| GET | /places | pagination, limit | Recevoir les places |
| GET | /places{id} | id | Recevoir le détail d'un place |
| POST | /places | JSON dans le body | Permet de poster un lieu | 
| POST | /places/{id}/review | id en query param et JSON en body | Permet de noter un lieu |
| PUT/PATCH | /places | JSON dans Body | Permet de modifier un lieu |
| PUT/PATCH | /places/{id}/review | id en query param et JSON en body | Permet de modifier la review d'un lieu
| POST | /favorites | JSON dans le body | Permet d'ajouter un favori
| DELETE | /favorites/{id} | JSON dans le body | Permet de supprimer un favori
| POST | /lists | JSON dans le body | Permet d'ajouter une liste
| POST/DELETE | /lists/{placesId} | JSON dans le body | Permet d'ajouter un lieu dans une liste

# Concevoir les structures de données entrantes 

- POST /places | PUT/PATCH /places
```json
{
    "id":1,
    "name":"Grand Place",
    "city":"Lille",
    "description":"Grand place de Lille",
    "rating":"4.2"
}
```

- POST /places/1/review | PUT/PATCH /places/1/review 
```json
{
    "review":"Jolie places.",
    "rating":"4"
}
```
Il faut également définir les codes HTTP associés (200 pour un succès, 201 pour created, 204 pour un no content, 400 pour bad request, 404 pour un Not Found)

Il faut également valider côté serveur que les données sont correctes, par exemple avec Joi. 
Par exemple, pour le rating, on autorise une note de 1 à 5, afin d'interdire les autres entrées.


# Structure de réponses :

- Pour le détail d'une place (GET /places/12) :
```json
{
    "id":"12",
    "name":"Mairie de Bailleul",
    "city":"Bailleul",
    "ratings":"4.6"
}
```

- Pour une liste (GET /places?page=2&limit=20")
```json
{ 
    "data": [ ... ], 
    "page": 2, 
    "limit": 20, 
    "total": 40 
}
```

Il faut également définir les codes HTTP associés (200 pour un succès, 201 pour created, 204 pour un no content, 400 pour bad request, 404 pour un Not Found)

