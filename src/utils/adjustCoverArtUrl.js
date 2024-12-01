
function adjustCoverArtUrl(url, size = 't_cover_big') {
    if (!url) return '';
    const imageIdMatch = url.match(/\/t_([a-zA-Z0-9_]+)\/([a-zA-Z0-9]+)\.jpg/);
    if (!imageIdMatch) return url; 
    const imageId = imageIdMatch[2];
    return `https://images.igdb.com/igdb/image/upload/${size}/${imageId}.jpg`;
  }
  // const originalUrl = "//images.igdb.com/igdb/image/upload/t_thumb/co6x5r.jpg";
  // const newUrl = adjustCoverArtUrl(originalUrl, 't_cover_big'); // Replacing 't_thumb' with 't_cover_big'

  export default adjustCoverArtUrl;