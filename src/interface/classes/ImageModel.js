export default class ImageModel {
  /**
   * 
   * @param {Object} $source 
   * @param {String} url_thumb 
   * @param {String} url_download 
   */
  constructor($source, url_thumb, url_download) {
    // Requied
    this.$source = $source
    this.url_thumb = url_thumb
    this.url_download = url_download
    
    // Not Required
    this.url_preview = null
    this.attribution = null

    this.file_title = null
    this.file_description = null
    this.file_tags = []
    this.file_location = null
    this.file_name = null
  }
  /**
   * Add URL of image to preview larger (typeof:`string`)
   * 
   * @param {String} data 
   */
  setPreviewUrl(data) {
    this.url_preview = data
    return this
  }
  /**
   * Provide attribution information
   * 
   * @param {String} name 
   * @param {String} url 
   */
  setAttribution(name, url) {
    this.attribution = {
      name: name,
      url: url
    }
  }
  /**
   * Add title (typeof:`array`)
   * 
   * @param {String} data 
   */
  setTitle(data) {
    this.file_title = data
    return this
  }
  /**
   * Add title (typeof:`array`)
   * 
   * @param {String} data 
   */
  setDescription(data) {
    this.file_description = data
    return this
  }
  /**
   * Add tags (typeof:`array`)
   * 
   * @param {Array} data 
   */
  setTags(data) {
    this.file_tags = this.file_tags.concat(data)
    return this
  }
  /**
   * Add location (typeof:`string`)
   * 
   * @param {String} data 
   */
  setLocation(data) {
    this.file_location = data
    return this
  }
  /**
   * Add filename should have extension (typeof:`string`)
   * 
   * @param {String} data 
   */
  setFileName(data) {
    if(!data.includes('.')) { throw "Filename should be provided an extension"}
    this.file_name = data
    return this
  }
  /**
   * Return the data needed to provide to Directus import
   */
  getImportData() {
    let data = {}
    if(this.file_title) { data.title = this.file_title } 
    if(this.file_description) { data.description = this.file_description } 
    if(this.file_location) { data.location = this.file_location } 
    if(this.file_name) { data.filename_download = this.file_name } 
    // Always add this tag so we know it came from our system.
    const tags = this.file_tags.concat('resauce:image-scout', 'resauce:image-scout:xxx')
    if(this.file_tags) { data.tags = JSON.stringify(tags) }
    return data
  }
}