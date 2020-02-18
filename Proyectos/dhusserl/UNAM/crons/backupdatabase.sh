#!/bin/bash
now=$(date +"%d_%m_%Y")
NOMBRE="$now""_respaldo.pgsql"
#su clafenor_termuse
echo $NOMBRE
pg_dump -U clafenor_termuse clafenor_terminos > /usr/share/UNAM/respaldos/$NOMBRE
if [ ! -f /usr/share/UNAM/respaldos/$NOMBRE ]; then
    echo "Ha habido un error..."
else
    echo "Se ha respaldado con exito!"
fi
exit
