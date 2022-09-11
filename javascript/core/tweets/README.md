Reference doc

https://developer.twitter.com/en/docs

Back to office curl request

curl --location --request GET 'https://api.twitter.com/2/tweets/search/recent?max_results=50&tweet.fields=attachments,author_id,created_at,entities,geo,id,in_reply_to_user_id,lang,possibly_sensitive,referenced_tweets,source,text,withheld&query=backtooffice' \
--header 'Authorization: Bearer PASTE_YOUR_OWN_TOKEN' \
--header 'Cookie: guest_id=v1%3A163172820455952387; personalization_id="v1_vlQM38DnXkIUmNeyj/pylQ=="'