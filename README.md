# Quaff The Shelf 🍷 📚 🍇

## What is it?

Quaff The Shelf is a **React Native** app developed for iOS and Android using **Expo** and **Expo Go**.

It was built as part of a collaborative project using pair programming practices over the course of 8 days during the Northcoders bootcamp.

## What does it do?

It is a book and drink pairing app that allows a user to create an account and user profile, and then upload and store books in their cloud-hosted reading 'library'.

Users can receive and accept a drink pairing which persists in their library. This pairing is generated using the users selected preferences, which are then scored against other user votes for a particular book/drink pairing. In this way, recommendations become more accurate as user data accumulates.

## Back-end

The back-end uses **Firebase Authentication** to handle user creation and login. Firebase's NoSQL database, **Cloud Firestore** is used to store user data in collections.

**Expo Barcode Scanner** is utilized to look up books in the Open Library API using an ISBN number.

Data from this response is then stored in a collection and is accessible to queries.

## DevDependencies

This project uses **eslint** and **husky** to ensure consistent syntax is used across the group during development.

## Video Demo 

https://user-images.githubusercontent.com/66907465/153009643-f6b51662-b5ef-4d6c-9f19-b4c2ddc2ec7c.mp4


## Future Development

In the future, it would be great to build out some unrealised features. This could include; 
- Allowing users to mark books as read/currently reading and to see this represented visually in different shelves. 
- Being able to review/change their pairing and to see what drinks they have chosen previously all collated in one place. 
- Option to list ingredients / methods for cocktail suggestions.
- Reversing the current algorithm and make pairings by scanning a drink bar code and offering a book suggestion. 
- Have a social element in the app where users are able to create/ become members of reading clubs.
