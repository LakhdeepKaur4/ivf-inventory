<!-- MONGO_URI=mongodb://rohit1:mongo2310@tip-inv-shard-00-00-t6mm4.mongodb.net:27017,tip-inv-shard-00-01-t6mm4.mongodb.net:27017,tip-inv-shard-00-02-t6mm4.mongodb.net:27017/inventory?ssl=true&replicaSet=TIP-INV-shard-0&authSource=admin&retryWrites=true&w=majority -->

To remove any unwanted files/directories from the history.

git filter-branch --tree-filter "rm -rf pubic/images" --prune-empty HEAD
git for-each-ref --format="%(refname)" refs/original/ | xargs -n 1 git update-ref -d
echo public/images/ >> .gitignore
git add .gitignore
git commit -m 'Removing public/images from git history'
git gc
git push origin master --force


DO NOT USE THIS IF YOU DO NOT UNDERSTAND WHAT IT DOES.
