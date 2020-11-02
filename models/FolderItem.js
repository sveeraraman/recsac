class FolderItem {
  constructor(
    id,
    folderName,
    from,
    receivedDate,
    subject,
    snippetString,
    attachmentItems,
    signedUrl,
    expiry,
    size,
    storageClass,
    key,
    to,
    fromid,
    messagekey,
    tags
  ) {
    this.id = id;
    this.folderName = folderName;
    this.from = from;
    this.receivedDate = receivedDate;
    this.subject = subject;
    this.snippetString = snippetString;
    this.attachmentItems = attachmentItems;
    this.signedUrl = signedUrl;
    this.expiry = expiry;
    this.size = size;
    this.storageClass = storageClass;
    this.key = key;
    this.to = to;
    this.fromid = fromid;
    this.messagekey = messagekey;
    //console.log("signedUrl", tags);

    if (tags != null && tags.length > 0) {
      // console.log(tags);

      var expdaysKey = tags.filter((m) => m.Key == "expirydays");
      if (expdaysKey != null && expdaysKey.length > 0) {
        this.expiry = expdaysKey[0].Value;
      } else {
        this.expiry = "2";
      }

      var ttlDeleteAt = tags.filter((m) => m.Key == "ttlat");
      if (ttlDeleteAt != null && ttlDeleteAt.length > 0) {
        this.ttlDeleteAt = ttlDeleteAt[0].Value;
      } else {
        this.ttlDeleteAt = "";
      }
    }
  }
}

export default FolderItem;
