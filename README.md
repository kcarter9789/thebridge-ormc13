# thebridge-ormc13

# Database Setup
 - This setup guide assumes that you already have docker installed in your respective development environment.
 - Database will be running on the docker container hosted locally on your development environment

NOTE: 
    - If you dont have docker, you can still install mysql server on your system or somewhere you can have an access
    of the connection string

# Starting the docker container
 - A setup script is provided already. The file named "mysqldocker-container-setup.sh" contains all that is needed
 for setting up the container
 - This script is tested in linux environment, but is assumed it can work on majority of the operating systems

- To execute the script you have to provide the neccessary execute permision:

    $> chmod +x mysqldocker-container-setup.sh

# Run the script
    $> ./mysqldocker-container-setup.sh

- This will fire up the docker container for our mysql database. 

NOTE:
    This test is using Mysql image from oracle. You will need to register with oracle to to access the image.
    However, you can still use any free mysql docker image from docker hub

# Grant permision 
    - Once the container is up and running, you may need to grand the connection permision to the app from the localhost
    - By defualt Mysql blocks connections that are not within the container
    - Run the script below to enable connection
   
   $> docker exec -it mysqlEnterpriseServer mysql -uroot -p -e "GRANT ALL PRIVILEGES ON ecommerce_db.* TO 'appuser'@'%';"

   - When prompted for password provided : Password2023


# Run the application

    $> npm start 

# Seed the database

    $> npm run seed


NB:
 - You can now follow the provided video to test the endponts
