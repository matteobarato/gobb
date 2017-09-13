#chown -R planetbolo:psacln .

find ./ -type d -exec chmod 775 {} +
find ./ -type f -exec chmod 664 {} +
chmod -R 775 ./storage
chmod -R 775 ./bootstrap/cache/
chmod 660 .env

