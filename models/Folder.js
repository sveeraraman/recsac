class Folder {
  constructor(id, folderName, policy, itemscount, signedUrl) {
    this.id = id;
    this.folderName = folderName;
    this.policy = policy;
    this.itemscount = itemscount;
    this.signedUrl = signedUrl;
  }
}

export default Folder;
