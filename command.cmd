To activate this project's virtualenv, run pipenv shell.
Alternatively, run a command inside the virtualenv with pipenv run.
To start backend run pipenv run flask run
To start frontend cd into react-app then run npm start

To migrate/seed tables run:
pipenv run flask db migrate
pipenv run flask db upgrade
pipenv run flask seed all

For Github help:
Here are the steps so we can all work on different feature branches.
We communicate with one another when we are going to merge with dev.
Steps:
1. git checkout -b “featurebranch name”
2. Work on features on your feature branch
3. git add .
4. git commit -m “blah”
5. git pull origin dev
6. fix merge conflict if any, add and commit those changes if need be
7. git push origin <featurebranch name>

8. on github, create pull request(merge) from featurebranch to dev
9. paste the PR to group chat
    - check/test for everyone’s approval
    - then click on merge to merge feature branch to dev.

Render Schema drop commands:
    \dn to list schema names
    SELECT * FROM "edh_deck_master"."users"; - lists all entries in a specific table

    DROP SCHEMA edh_deck_master CASCADE;
