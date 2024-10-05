/**
 * Reach out to the reddit API, and get the first page of results from
 * r/aww. Filter out posts without readily available images or videos,
 * and return a random result.
 * @returns The url of an image or video which is cute.
 */
export async function getCatImageUrl() {
    const response = await fetch(redditUrl, {
      headers: {
        'User-Agent': 'iamathousandyearoldelf',
      },
    });
    
    if (!response.ok) {
      let errorText = `Error fetching ${response.url}: ${response.status} ${response.statusText}`;
      try {
        const error = await response.text();
        if (error) {
          errorText = `${errorText} \n\n ${error}`;
        }
      } catch {
        // ignore
      }
      throw new Error(errorText);
    }
  
    const data = await response.json();
    const imagePosts = data.data.children
      .map((post) => post.data)
      .filter((postData) => {
        // Check if the URL ends with an image extension
        const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif'];
        return imageExtensions.some(ext => 
          postData.url.toLowerCase().endsWith(ext)
        );
      })
      .map(postData => postData.url);
  
    if (imagePosts.length === 0) {
      throw new Error('No image posts found');
    }
  
    const randomIndex = Math.floor(Math.random() * imagePosts.length);
    return imagePosts[randomIndex];
  }
  
  export const redditUrl = 'https://www.reddit.com/r/cats/hot.json';