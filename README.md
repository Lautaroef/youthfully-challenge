# Youthfully coding challenge - Made by Lautaro Figueroa
Full-Stack development | Imgur API Version 3

See online: https://youthfully-challenge-lautaro-figueroa.vercel.app/

1. [Technical requirements](https://github.com/Lautaroef/youthfully-challenge/edit/main/README.md#technical-requirements)
2. [Solution - Step by steps](https://github.com/Lautaroef/youthfully-challenge/edit/main/README.md#solution---step-by-steps)
3. [Next.js - Applying the latest server-side and client-side features](https://github.com/Lautaroef/youthfully-challenge/edit/main/README.md#nextjs---applying-the-latest-server-side-and-client-side-features)
4. [Troubleshoots](https://github.com/Lautaroef/youthfully-challenge/edit/main/README.md#troubleshoots)
5. [Extras](https://github.com/Lautaroef/youthfully-challenge/edit/main/README.md#extras)
6. [Run the project](https://github.com/Lautaroef/youthfully-challenge/edit/main/README.md#run-the-project)


## Technical requirements

● Show gallery images in a grid of thumbnails

● Show image description in the thumbnail, top or bottom

● Allow selecting the gallery section: hot, top, user

● Allow including / excluding viralimages from the result set

● Allow specifying window and sort parameters

● When clicking an image in the gallery - show its details: big image, title, description, upvotes, downvotes and score

## Solution - Step by steps

This project was created using Next.js 13 and TypeScript

```jsx
npx create-next-app@latest --typescript
```

First of all, to be able to communicate with the IMGUR API, I had to create an application on the [IMGUR website](https://api.imgur.com/oauth2/addclient) and get the client ID as well as the client secret, so I registered one and received a **client_id** and **client_secret**.

Then I needed to **get an authorization token**, to do this in the most secure and easy way I chose to use POSTMAN, where I followed the step-by-step on this [IMGUR guide](https://apidocs.imgur.com/#intro).

- I familiarized myself with the basics of the Imgur API, which is a RESTful API based on HTTP requests and JSON responses using OAuth 2.0 for authentication.
- I used the Postman collection to **generate an access token** by:
  - Setting the Auth URL to **[https://api.imgur.com/oauth2/authorize](https://api.imgur.com/oauth2/authorize)**
    and the Access Token URL to **[https://api.imgur.com/oauth2/token](https://api.imgur.com/oauth2/token)**
  - Adding my client_id and client_secret
  - Requesting a token after logging in and granting access to my application
- I **saved the** **refresh token** in my Postman environment and ran the "Generate Access Token" endpoint to **receive an access token**.

Now with the **access_token received**, I could make requests to the Imgur API on any endpoint, using the following header:

```jsx
Authorization: `Client-ID ${process.env.NEXT_PUBLIC_IMGUR_CLIENT_ID}`;
```

## Next.js - Applying the latest server-side and client-side features

Now with the proper credentials on point, it was time to work on Next.js server and client components.

**Fetching the data**: On the Home page (app/page.tsx) a function called **_`getImages`_** is used to fetch to the [https://api.imgur.com/3/gallery/section/sort/window/page](https://api.imgur.com/3/gallery/$%7Bsection%7D/$%7Bsort%7D/$%7Bwindow%7D/$%7Bpage%7D) endpoint. Here I pass the Client ID as an authorization header and receive a Promise that resolves to the response of the requested resource. The data is then parsed using the JSON object.

**Error handling**: The function checks the **`ok`** property of the response object to determine if the request was successful. If it is not, it throws an error with the status text of the response.

**Server-side rendering**: Here I take the latest recommendations of using Next.js 13 for using Server components for data fetching, as this leads to a more efficient and secure application. Server-side calls are used for displaying the images on the home page

**Client-side rendering**: I apply this concept on the “/images/id” page when a user clicks an image on the home page. In Next.js 13, by using this approach I can also take control of caching and revalidation features which are great for delivering more complex applications.

**Loading UI**: To provide a better user experience while the data is being fetched, a loading UI “skeleton” is displayed.

## Troubleshoots

One troubleshooting I encountered was a **CORS issue when trying to call the IMGUR API endpoint from a client component.** This happened because the server and client are from different domains, and there is a restriction on making requests to different domains for security reasons.

To solve it, I installed the cors library and used it for the `pages/api/get-single-image` API endpoint when making the IMGUR back-end call. With a specific configuration I was able to successfully resolve it and call the IMGUR API endpoint

## Extras

In the filter section, whenever the user clicks the submit button, the call to the back-end is made and in addition, the **URL changes reflecting the filter values in the URL queries**.

This feature was achieved using `useRouter` hook from the `next/router` package. This improves the user experience as it allows for easy sharing of a specific set of filtered images with others by simply sharing the URL.

## Run the project
To run this repository:
`
git clone https://github.com/Lautaroef/youthfully-challenge.git
npm install
npm run dev
`
Then open it on http://localhost:3000/
