
function adjustCoverArtUrl(url, size = 't_cover_big') {
    if (!url) return '';
    const imageIdMatch = url.match(/\/t_([a-zA-Z0-9_]+)\/([a-zA-Z0-9]+)\.jpg/);
    if (!imageIdMatch) return url; 
    const imageId = imageIdMatch[2];
    return `https://images.igdb.com/igdb/image/upload/${size}/${imageId}.jpg`;
  }
  
  export default adjustCoverArtUrl;