// does this book have any pairings?

// if yes >>>
    // create a votesObj with each drink from the votes on this book
        // e.g {wine:1, beer:2, ale: 4}
    
    // filter this list based on user pref

    // are there any drinks left in the votesObj?
    
    // if yes >>> 
        // offer the pairing with the highest votes (if a tie, offer any of the highest)

        // if accepted >>>
            // add vote to book

        // if declined >>>
            // remove the offered drink from the votesObj

            // are there any drinks left in the votesObj?
                //if yes >>>
                    //offer the pairing with the highest votes (if a tie, offer any of the highest)

                    //if accepted >>>
                        // add vote to book

                    //if declined >>>
                        // ask user to select from a list of all drinks filted by users pref

                        // add vote to book

                //if no >>>
                        // get a list of all drinks

                        // filter list to match user prefs

                        // randomly select a drink from the filted list

                        // offer this paring

                        // if accepted >>> 
                            //add vote to book

                        // if declined >>>
                            // ask user to select from a list of all drinks filted by users pref

                            // add vote to book
        

    // if no >>>
        // complete the "does this book have any pairing" >>> no code

// if No >>>
    // get a list of all drinks

    // filter list to match user prefs

    // randomly select a drink from the filted list

    // offer this paring

    // if accepted >>>
        // add vote to book
    
    // if declined >>>
        // remove surgested book from list

        // randomly select a drink from the filted list

        // offer this pairing

        // if accepted >>>
            // add vote to book

        // if declined >>>
            // ask user to select from a list of all drinks filted by users pref

            // add vote to book