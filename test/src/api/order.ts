
// async function clearCache() {
//   const cacheName = await caches.keys()
//   console.log(cacheName)
//   for (let key of cacheName){
//     console.log(key)
//    caches.delete(key)
//   }
  
// }
// setTimeout(() => clearCache(),10000)

export async function fetchRestaurants() {
  const cacheNames = await caches.has("restaurants");
  if (cacheNames) {
    const cacheName = await caches.keys();
    for (const name of cacheName) {
      const cache = await caches.open(name);
      for (const request of await cache.keys()) {
        if (request.url.endsWith("/restaurants/")) {
          const response = await cache.match(request);
          return response?.json();
        }
      }
    }
  } else {
    return fetch(
      "https://private-anon-36ebb7df1c-pizzaapp.apiary-mock.com/restaurants/"
    ).then((response) => {
      saveInCache()
      return response.json();
    });
  }
}
export async function fetchPizza(id:number) {
  const cacheNames = await caches.has(`pizzaFrom${id}`);
  if (cacheNames) {
    const cacheName = await caches.keys();
    for (const name of cacheName) {
      const cache = await caches.open(name);
      for (const request of await cache.keys()) {
        if (request.url.endsWith(`/restaurants/${id}/menu?category=Pizza`)) {
          const response = await cache.match(request);
          return response?.json();
        }
      }
    }
  } else {
    return fetch(
      `http://private-anon-36ebb7df1c-pizzaapp.apiary-mock.com/restaurants/${id}/menu?category=Pizza`
    ).then((response) => {
      savePizzaInCache(id)
      return response.json();
    });
  }
}
async function saveInCache() {
  const cache = await caches.open("restaurants");
  const request = new Request(
    "https://private-anon-36ebb7df1c-pizzaapp.apiary-mock.com/restaurants/"
  );
  const options = {
    mode: "cors",
    cache: "force-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", 
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "public,max-age=3600"
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
  };
  const jsonResponse = new Response("{}", options);
  cache.add(request);
  cache.put(request, jsonResponse);
  const response = await cache.match(request);
  return response?.json();
}
async function savePizzaInCache(id:number) {
  const cache = await caches.open(`pizzaFrom${id}`);
  const request = new Request(
    `http://private-anon-36ebb7df1c-pizzaapp.apiary-mock.com/restaurants/${id}/menu?category=Pizza`
  );
  const options = {
    mode: "cors", 
    cache: "force-cache", 
    credentials: "same-origin", 
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "public,max-age=3600",
  
    },
    redirect: "follow",
    referrerPolicy: "no-referrer", 
  };
  const jsonResponse = new Response("{}", options);
  cache.add(request);
  cache.put(request, jsonResponse);

  const response = await cache.match(request);
  return response?.json();
}
