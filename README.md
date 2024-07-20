# Location Guesser

An online geography game that challenges players to guess their random location in the world using Google Street View images.

This project achieved the folowing:

User authorization, multiple game modes, user stat tracking, friend requests, user groups, and leaderboard rankings.

## Live Link

https://locationguesser.onrender.com/

## Technologies Used

<img src="https://camo.githubusercontent.com/442c452cb73752bb1914ce03fce2017056d651a2099696b8594ddf5ccc74825e/68747470733a2f2f63646e2e6a7364656c6976722e6e65742f67682f64657669636f6e732f64657669636f6e2f69636f6e732f6a6176617363726970742f6a6176617363726970742d6f726967696e616c2e737667" alt="drawing" width="50"/> <img src="https://camo.githubusercontent.com/27d0b117da00485c56d69aef0fa310a3f8a07abecc8aa15fa38c8b78526c60ac/68747470733a2f2f63646e2e6a7364656c6976722e6e65742f67682f64657669636f6e732f64657669636f6e2f69636f6e732f72656163742f72656163742d6f726967696e616c2e737667" alt="react" width="50"> 
<img src="https://developers.google.com/static/streetview/ready/images/svr-branding-badge.png" alt="googleStreetView" width="50" height="50"/> 
<img src="https://camo.githubusercontent.com/2b6b50702c658cdfcf440cef1eb88c7e0e5a16ce0eb6ab8bc933da7697c12213/68747470733a2f2f63646e2e6a7364656c6976722e6e65742f67682f64657669636f6e732f64657669636f6e2f69636f6e732f72656475782f72656475782d6f726967696e616c2e737667" alt="redux" width="50"> 
<img src="https://www.pngall.com/wp-content/uploads/5/Python-PNG.png" alt="python" width ="50"> 
<img src="https://user-images.githubusercontent.com/92463844/162601723-beb79065-3555-4c2d-86c1-37d914e6d7ae.png" alt="flask" width ="50"> 
<img src="https://camo.githubusercontent.com/d536b9cc0c533324368535ece721f5424f28eae3ec0e6f3847408948ecacfce6/68747470733a2f2f63646e2e6a7364656c6976722e6e65742f67682f64657669636f6e732f64657669636f6e2f69636f6e732f706f737467726573716c2f706f737467726573716c2d6f726967696e616c2e737667" alt="postgreSQL" width="50">
<img src="https://camo.githubusercontent.com/2e496d4bfc6f753ddca87b521ce95c88219f77800212ffa6d4401ad368c82170/68747470733a2f2f63646e2e6a7364656c6976722e6e65742f67682f64657669636f6e732f64657669636f6e2f69636f6e732f637373332f637373332d6f726967696e616c2e737667" alt="css3" width="50"> 
<img src="https://camo.githubusercontent.com/da7acacadecf91d6dc02efcd2be086bb6d78ddff19a1b7a0ab2755a6fda8b1e9/68747470733a2f2f63646e2e6a7364656c6976722e6e65742f67682f64657669636f6e732f64657669636f6e2f69636f6e732f68746d6c352f68746d6c352d6f726967696e616c2e737667" alt="html5" width="50"> 
<img src="https://camo.githubusercontent.com/dc9e7e657b4cd5ba7d819d1a9ce61434bd0ddbb94287d7476b186bd783b62279/68747470733a2f2f63646e2e6a7364656c6976722e6e65742f67682f64657669636f6e732f64657669636f6e2f69636f6e732f6769742f6769742d6f726967696e616c2e737667" alt="git" width="50"> 
<img src="https://camo.githubusercontent.com/5fa137d222dde7b69acd22c6572a065ce3656e6ffa1f5e88c1b5c7a935af3cc6/68747470733a2f2f63646e2e6a7364656c6976722e6e65742f67682f64657669636f6e732f64657669636f6e2f69636f6e732f7673636f64652f7673636f64652d6f726967696e616c2e737667" alt="vscode" width="50"> 


## Website Layout

### *Landing*

- Players have the choice to signup, login, or enter as a guest.   
- Successful enetry redirects to the homepage.   

![image](https://github.com/Sterling-Hebert/LocationGuesser/assets/60053292/9de245d8-5b00-4961-8478-60536d6e3f13)

### *Home Page*

- Now users have mutiple games modes to choose from, stats to view, and leaderboards to climb.
- The game modes include: World (hardest), United States (medium), and famous places (easy).
- The logout button is here for any players wanting to sign off.

![image](https://github.com/Sterling-Hebert/LocationGuesser/assets/60053292/4d79be44-1096-4154-a30d-ce9942c6ccd8)


## Running it locally

1. Clone the repository (branch main)

   ```
   https://github.com/Sterling-Hebert/LocationGuesser.git
   ```

2. Install dependencies

   ```bash
   npm install
   npm install @material-ui/core@4.12.4 axios@1.4.0 react-tsparticles@2.12.1
   pipenv install -r requirements.txt
   pipenv install boto3
   ```

3. Create a **.env** file based on the example with proper settings for your
   development environment
   
  ```bash
  SECRET_KEY= secret_key
  DATABASE_URL=sqlite:///dev.db
  SCHEMA=locationguesser_schema
  REACT_APP_GOOGLE_MAPS_API_KEY = google_api_key_here   
  ^^^^
  # Works without one
  # If you have your own key, consider that you will have to re-invert colors back to normal in the   /react-app/src/components/MapTools/defaultMap.css file.
  ```

   Should look like this:

  ![image](https://github.com/Sterling-Hebert/LocationGuesser/assets/60053292/27f872af-38c8-4b47-ba14-6af3d94e102b)


4. Make sure the SQLite3 database connection URL is in the **.env** file

5. This starter organizes all tables inside the `flask_schema` schema, defined
   by the `SCHEMA` environment variable. Replace the value for
   `SCHEMA` with a unique name, **making sure you use the snake_case
   convention**.

6. Get into your pipenv, migrate your database, seed your database, and run your Flask app

   ```bash
   pipenv shell
   ```

   ```bash
   flask db upgrade
   ```

   ```bash
   flask seed all
   ```

   ```bash
   flask run
   ```

7. To run the React App in development, first enter the following code below in the terminal to start the back-end:

   ```
   pipenv run flask run
   ```

8. Then run the front-end in a seperate split terminal, enter:

   ```
   npm start
   ```

9. Then navigate to http://localhost:3000

