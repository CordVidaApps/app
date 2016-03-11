# Projeto CordVida

Repositório inicial do projeto CordVida.




## Build

- mup deploy
- meteor build .build/local/ --server=http://app.cordvida.com.br/
- cd .build/local/android/
- jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 release-unsigned.apk cordvida-app
- rm production.apk
- ~/.meteor/android_bundle/android-sdk/build-tools/20.0.0/zipalign 4 release-unsigned.apk production.apk


## MODULUS BUILD (first time)

- modulus env set MONGO_URL "mongodb://pklien:vaipedrao@apollo.modulusmongo.net:27017/ba2vYxeg?autoReconnect=true&connectTimeoutMS=60000"

- modulus env set ROOT_URL http://cordvida-55649.onmodulus.net
-   modulus project restart


## ICONES E SPLASHS
- http://apetools.webprofusion.com/tools/imagegorilla

## DEPLOY INICIAL USANDO MUP
- http://sergelobatch.com/slog/2015/4/10/using-mup/