Not sure if any npm installs have to be done or if the package.json does it for you. Copy pasted a lot of code from assignment 3 and am using it as a framework. Testing bootstrap stuff using the fakestore database, next step is probably making new data by snipping images and adding titles and descriptions. The first page (to see all the games) is working as intended (but will need to add a delete button for each game) (and button to add a new game at the bottom outside the products.map(...)).

But yeah pretty much next step would be to manually create 5 ish games to add to the mongodb database, whoever does this would have to send the other one a json of those games.

We want to:
    - See all games (GET) (DONE)
    - Delete a game (DELETE)
    - Add a game (POST)

    - See all reviews for one game (GET) (framework set up)
    - Add a review for one game (PUT (will require updating the reviews object attribute and the rating numbers/averages))